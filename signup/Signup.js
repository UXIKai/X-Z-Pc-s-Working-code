import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

function SignupPage({ setUser }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignup = () => {
    if (!username.trim() || !email.trim() || !password.trim()) {
      setError("All fields are required.");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: username.trim(),
      email: email.trim(),
    };

    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
    navigate("/chat");
  };

  return (
    <div className="signup-fullpage">
      <div className="signup-container">
        <h2>Create Account</h2>
        {error && <div className="login-error">{error}</div>}

        <input
          className="login-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="login-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
  <div className="oauth-buttons icons-only">
          <button className="oauth-btn google">
            <FcGoogle size={24} />
          </button>
          <button className="oauth-btn apple">
            <FaApple size={24} />
          </button>
        </div>
        <div className="login-button-group">
          <button className="login-back-button" onClick={() => navigate(-1)}>
            Back
          </button>
          <button className="login-submit-button" onClick={handleSignup}>
            Sign Up
          </button>
        </div>

      
      </div>
    </div>
  );
}

export default SignupPage;
