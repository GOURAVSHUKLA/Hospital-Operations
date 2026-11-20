import {
    createContext,
    useState,
    useEffect,
    useContext
} from "react";

import authService from "../services/authService";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [accessToken, setAccessToken] = useState(
        localStorage.getItem("access")
    );

    const [refreshToken, setRefreshToken] = useState(
        localStorage.getItem("refresh")
    );

    const [loading, setLoading] = useState(true);

    // Restore authentication
    useEffect(() => {

        const restoreAuthentication = () => {

            const storedAccess = localStorage.getItem("access");
            const storedRefresh = localStorage.getItem("refresh");
            const storedUser = localStorage.getItem("user");

            if (storedAccess && storedRefresh && storedUser) {
                try {
                    setAccessToken(storedAccess);
                    setRefreshToken(storedRefresh);
                    setUser(JSON.parse(storedUser));
                } catch (error) {
                    logout();
                }
            }

            setLoading(false);
        };

        restoreAuthentication();

    }, []);

    // Token refresh and session expiration
    useEffect(() => {

        const handleTokenRefresh = (event) => {

            const newAccess = event.detail.access;

            setAccessToken(newAccess);
            localStorage.setItem("access", newAccess);

        };

        const handleSessionExpired = () => {

            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            localStorage.removeItem("user");

            setAccessToken(null);
            setRefreshToken(null);
            setUser(null);

        };

        window.addEventListener(
            "auth:token-refreshed",
            handleTokenRefresh
        );

        window.addEventListener(
            "auth:session-expired",
            handleSessionExpired
        );

        return () => {

            window.removeEventListener(
                "auth:token-refreshed",
                handleTokenRefresh
            );

            window.removeEventListener(
                "auth:session-expired",
                handleSessionExpired
            );

        };

    }, []);

    // Login
    const login = async (username, password) => {

        const data = await authService.login(username, password);

        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        localStorage.setItem("user", JSON.stringify(data.user));

        setAccessToken(data.access);
        setRefreshToken(data.refresh);
        setUser(data.user);

        return data.user;

    };

    // Logout
    const logout = () => {

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");

        setAccessToken(null);
        setRefreshToken(null);
        setUser(null);

    };

    const value = {

        user,
        accessToken,
        refreshToken,
        loading,

        isAuthenticated: !!accessToken && !!user,

        login,
        logout,

    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );

};

// Custom authentication hook
export const useAuth = () => {

    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;

};