import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getDashboardRoute } from "../utils/dashboardRoutes";

function ProtectedRoute({ allowedRoles = [] }) {
    const { isAuthenticated, loading, user } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    const role = typeof user?.role === "string"
        ? user.role.trim().toUpperCase()
        : "";

    if (!allowedRoles.includes(role)) {
        return (
            <Navigate
                to={getDashboardRoute(role) ?? "/login"}
                replace
            />
        );
    }

    return <Outlet />;
}

export default ProtectedRoute;