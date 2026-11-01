import { useState } from 'react';
import './Login.css';

function Login() {

    // Managing email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Managing password visibility
    const [showPassword, setShowPassword] = useState(false);

    // Managing error message
    const [error, setError] = useState('');

    // Handling form submission
    const handleSubmit = (e) => {

        e.preventDefault();

        if (!email || !password) {
            setError('Please fill all the fields');
            return;
        }

        setError('');

        console.log('Email:', email);
        console.log('Password:', password);

        alert('Login form submitted successfully!');
    };

    return (

        <div className="login-container">

            <div className="login-card">

                <div className="login-header">

                    <h1>Hospital Management</h1>

                    <p>Admin Portal</p>

                </div>

                <form onSubmit={handleSubmit}>

                    {/* Email Field */}

                    <div className="form-group">

                        <label>Email Address</label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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

                    <button type="submit" className="login-button">

                        Login

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