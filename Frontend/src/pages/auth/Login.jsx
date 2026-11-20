import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./Login.css";

function Login() {
    const navigate = useNavigate();

    // Authentication context
    const { login } = useAuth();

    // Form states
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Password visibility
    const [showPassword, setShowPassword] = useState(false);

    // Error and loading states
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Role-based dashboard routes
    const dashboardRoutes = {
        ADMIN: "/admin/dashboard",
        DOCTOR: "/doctor/dashboard",
        PATIENT: "/patient/dashboard",
        STAFF: "/staff/dashboard",
    };

    // Handle login submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setError("Please fill all the fields");
            return;
        }

        try {
            setError("");
            setLoading(true);

            // Call Django JWT authentication
            const user = await login(username, password);

            // Get user role
            const role = user.role?.toUpperCase();

            // Find respective dashboard
            const dashboard = dashboardRoutes[role];

            if (dashboard) {
                navigate(dashboard, { replace: true });
            } else {
                setError("Invalid user role. Please contact administrator.");
            }

        } catch (error) {
            const responseData = error.response?.data;

            if (responseData?.detail) {
                setError(responseData.detail);
            } else if (responseData?.non_field_errors) {
                setError(responseData.non_field_errors[0]);
            } else {
                setError("Login failed. Please check your credentials.");
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">

                <div className="login-header">
                    <h1>Hospital Management</h1>
                    <p>Secure Login Portal</p>
                </div>

                <form onSubmit={handleSubmit}>

                    {/* Username Field */}
                    <div className="form-group">
                        <label>Username</label>

                        <input
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    {/* Password Field */}
                    <div className="form-group">
                        <label>Password</label>

                        <div className="password-field">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    {/* Remember Me */}
                    <div className="remember-section">
                        <label>
                            <input type="checkbox" />
                            Remember Me
                        </label>

                        <a href="#forgot-password">
                            Forgot Password?
                        </a>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <p className="error-message">
                            {error}
                        </p>
                    )}

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                <div className="login-footer">
                    <p>Hospital Management System</p>
                </div>

            </div>
        </div>
    );
}

export default Login;