import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useAuth();

    // Wait until authentication is restored
    if (loading) {
        return <div>Loading...</div>;
    }

    // Redirect unauthenticated users
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Allow authenticated users
    return <Outlet />;
};

export default ProtectedRoute;