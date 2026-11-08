
import React, { useState } from "react";
import "../design/login.css";

function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [emailReadOnly, setEmailReadOnly] = useState(true);
    const [passwordReadOnly, setPasswordReadOnly] = useState(true);

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage("");

        const cleanEmail = email.trim();

        if (!cleanEmail || !password) {
            setMessage("Please fill in all fields.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(cleanEmail)) {
            setMessage("Please enter a valid email.");
            return;
        }

        if (password.length < 8) {
            setMessage("Password must be at least 8 characters.");
            return;
        }

        if (typeof onLogin !== "function") {
            setMessage("Login service is not available.");
            return;
        }

        try {
            setLoading(true);

            await onLogin({
                email: cleanEmail,
                password,
                remember
            });

        } catch (error) {
            setMessage(
                error.message || "Invalid email or password. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">

            {/* LEFT SECTION */}

            <div className="left-section">

                <div className="brand"></div>

                <div className="hero-content">

                    <span className="welcome-tag">
                        MANAGEMENT SYSTEM
                    </span>

                    <h1>
                        Smarter Management.
                        <span>Stronger Tomorrow.</span>
                    </h1>

                    <p>
                        Manage your entire business from one
                        powerful platform. Monitor performance,
                        control operations, and make smarter
                        business decisions.
                    </p>

                    <div className="features">

                        <div className="feature">
                            <span>📊</span>
                            Business Control
                        </div>

                        <div className="feature">
                            <span>👥</span>
                            Team Management
                        </div>

                        <div className="feature">
                            <span>🔒</span>
                            Secure System
                        </div>

                        <div className="feature">
                            <span>📈</span>
                            Smart Analytics
                        </div>

                    </div>

                </div>

                <div className="left-footer">
                    © 2026 Management System. All Rights Reserved.
                </div>

            </div>

            {/* RIGHT SECTION */}

            <div className="right-section">

                <div className="login-card">

                    <div className="card-logo"></div>

                    <div className="login-heading">
                        <h2>Welcome Back</h2>
                        <p>Sign in to your executive account</p>
                    </div>

                    <form onSubmit={handleLogin} autoComplete="off">

                        {/* Dummy fields to discourage browser autofill */}
                        <input
                            type="text"
                            name="username"
                            autoComplete="username"
                            tabIndex="-1"
                            aria-hidden="true"
                            style={{
                                position: "absolute",
                                opacity: 0,
                                height: 0,
                                width: 0,
                                pointerEvents: "none"
                            }}
                        />

                        <input
                            type="password"
                            name="password"
                            autoComplete="current-password"
                            tabIndex="-1"
                            aria-hidden="true"
                            style={{
                                position: "absolute",
                                opacity: 0,
                                height: 0,
                                width: 0,
                                pointerEvents: "none"
                            }}
                        />

                        <div className="input-group">

                            <label htmlFor="login-email">
                                Email Address
                            </label>

                            <div className="input-box">

                                <span>✉</span>

                                <input
                                    id="login-email"
                                    type="email"
                                    name="omnicore_email_field"
                                    placeholder="Enter your email"
                                    value={email}
                                    autoComplete="off"
                                    readOnly={emailReadOnly}
                                    onFocus={() => setEmailReadOnly(false)}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />

                            </div>

                        </div>

                        <div className="input-group">

                            <label htmlFor="login-password">
                                Password
                            </label>

                            <div className="input-box">

                                <span>🔒</span>

                                <input
                                    id="login-password"
                                    type={showPassword ? "text" : "password"}
                                    name="omnicore_password_field"
                                    placeholder="Enter your password"
                                    value={password}
                                    autoComplete="new-password"
                                    readOnly={passwordReadOnly}
                                    onFocus={() => setPasswordReadOnly(false)}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />

                                <span
                                    className="toggle-password"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? "🙈" : "👁"}
                                </span>

                            </div>

                        </div>

                        <div className="login-options">

                            <label className="remember">

                                <input
                                    type="checkbox"
                                    checked={remember}
                                    onChange={(e) => setRemember(e.target.checked)}
                                />

                                Remember me

                            </label>

                            <button
                                type="button"
                                className="forgot-password"
                                onClick={() =>
                                    setMessage(
                                        "Contact your administrator to reset your password."
                                    )
                                }
                            >
                                Forgot password?
                            </button>

                        </div>

                        <button
                            type="submit"
                            className="login-btn"
                            disabled={loading}
                        >
                            {loading ? "Signing In..." : "Sign In →"}
                        </button>

                        <p className="message" role="alert">
                            {message}
                        </p>

                    </form>

                    <div className="security-note">
                        🔐 Secure Executive Access
                    </div>

                    <div className="card-footer">
                        Authorized personnel only.
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;

