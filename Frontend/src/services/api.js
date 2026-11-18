import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Refresh tracking
let isRefreshing = false;
let failedQueue = [];

// Process waiting requests
const processQueue = (error, token = null) => {
    failedQueue.forEach((promise) => {
        if (error) {
            promise.reject(error);
        } else {
            promise.resolve(token);
        }
    });

    failedQueue = [];
};

// Clear authentication information
const clearAuthentication = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");

    window.dispatchEvent(new Event("auth:session-expired"));
};

// Request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status !== 401 ||
            !originalRequest ||
            originalRequest._retry ||
            originalRequest.url?.includes("/api/token/")
        ) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        const refreshToken = localStorage.getItem("refresh");

        // Refresh token missing
        if (!refreshToken) {
            clearAuthentication();
            window.location.assign("/login");

            return Promise.reject(error);
        }

        // Another request is already refreshing
        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                failedQueue.push({
                    resolve,
                    reject,
                });
            }).then((newToken) => {
                originalRequest.headers.Authorization =
                    `Bearer ${newToken}`;

                return api(originalRequest);
            });
        }

        isRefreshing = true;

        try {
            // Use plain Axios to avoid interceptor recursion
            const response = await axios.post(
                `${BASE_URL}/api/token/refresh/`,
                {
                    refresh: refreshToken,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const newAccessToken = response.data.access;

            // Save new access token
            localStorage.setItem("access", newAccessToken);

            // Notify AuthContext
            window.dispatchEvent(
                new CustomEvent("auth:token-refreshed", {
                    detail: {
                        access: newAccessToken,
                    },
                })
            );

            // Process waiting requests
            processQueue(null, newAccessToken);

            // Retry original request
            originalRequest.headers.Authorization =
                `Bearer ${newAccessToken}`;

            return api(originalRequest);

        } catch (refreshError) {

            // Reject waiting requests
            processQueue(refreshError, null);

            // Clear authentication and redirect
            clearAuthentication();

            window.location.assign("/login");

            return Promise.reject(refreshError);

        } finally {
            isRefreshing = false;
        }
    }
);

export default api;