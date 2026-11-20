import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { getDashboardRoute } from "../../utils/dashboardRoutes";
import "./Login.css";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username.trim() || !password) {
            setError("Please fill all the fields");
            return;
        }

        try {
            setError("");
            setLoading(true);

            const user = await login(username, password);
            const dashboard = getDashboardRoute(user?.role);

            if (!dashboard) {
                setError("Invalid user role. Contact administrator.");
                return;
            }

            navigate(dashboard, { replace: true });

        } catch (error) {
            const responseData = error.response?.data;

            if (responseData?.detail) {
                setError(responseData.detail);
            } else if (responseData?.non_field_errors) {
                setError(responseData.non_field_errors[0]);
            } else if (responseData) {
                setError("Invalid username or password.");
            } else {
                setError("Unable to connect to server. Please try again.");
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

                    <div className="form-group">
                        <label>Username</label>

                        <input
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="username"
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>

                        <div className="password-field">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <div className="remember-section">
                        <label>
                            <input type="checkbox" />
                            Remember Me
                        </label>

                        <a href="#forgot-password">
                            Forgot Password?
                        </a>
                    </div>

                    {error && (
                        <p className="error-message">
                            {error}
                        </p>
                    )}

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