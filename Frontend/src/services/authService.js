import api from "./api";

// Login using Django JWT authentication
const login = async (username, password) => {
    const response = await api.post("/api/token/", {
        username,
        password,
    });

    return response.data;
};

// Refresh access token
const refreshToken = async (refresh) => {
    const response = await api.post("/api/token/refresh/", {
        refresh,
    });

    return response.data;
};

const authService = {
    login,
    refreshToken,
};

export default authService;