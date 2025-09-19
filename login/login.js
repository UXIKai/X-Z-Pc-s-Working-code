import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

function LoginPage({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      setError("Username and password cannot be empty.");
      return;
    }

    const user = { id: Date.now(), name: username.trim() };
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    navigate("/chat");
  };

  return (
    <div className="login-fullpage">
      <div className="login-container">
        <h2>Log In</h2>
        {error && <p className="login-error">{error}</p>}

        

      

        <input
          className="login-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setError("");
            setUsername(e.target.value);
          }}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setError("");
            setPassword(e.target.value);
          }}
        />
<div className="oauth-buttons">
          <button className="oauth-btn google">
            <FcGoogle size={20} style={{ marginRight: 10 }} />
          </button>
          <button className="oauth-btn apple">
            <FaApple size={20} style={{ marginRight: 10 }} />
          </button>
        </div>
        <div className="login-button-group">
          <button className="login-back-button" onClick={() => navigate(-1)}>
            Back
          </button>
          <button className="login-submit-button" onClick={handleLogin}>
            Log In
          </button>
        </div>

        <p>
          Don't have an account?{" "}
          <span className="signup-link" onClick={() => navigate("/signup")}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
