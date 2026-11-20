import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ allowedRoles = [] }) => {
    const { user, isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    // Check whether user is logged in
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Check whether user has permission
    if (
        allowedRoles.length > 0 &&
        !allowedRoles.includes(user?.role)
    ) {
        // Redirect user to their own dashboard
        const dashboardRoutes = {
            ADMIN: "/admin/dashboard",
            DOCTOR: "/doctor/dashboard",
            PATIENT: "/patient/dashboard",
            STAFF: "/staff/dashboard",
        };

        return (
            <Navigate
                to={dashboardRoutes[user?.role] || "/login"}
                replace
            />
        );
    }

    return <Outlet />;
};

export default ProtectedRoute;