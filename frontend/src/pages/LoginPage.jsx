import { useState } from "react";
import { loginUser } from "../services/api";
import "./LoginPage.css";

function LoginPage({ onSignup }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    try {
      const data = await loginUser(formData);

      setMessage(data.message);

      localStorage.setItem("token", data.access_token);

      window.location.reload();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="auth-header">
          <span className="auth-badge">Welcome back</span>
          <h1>Login</h1>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label className="form-label">Email</label>
            <input
              className="text-input"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label className="form-label">Password</label>
            <input
              className="text-input"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button className="primary-button" type="submit">
            Login
          </button>
        </form>

        <p className="auth-switch">
          Don&apos;t have an account? {" "}
          <button type="button" className="mini-link-button" onClick={onSignup}>
            Signup
          </button>
        </p>

        {message && <p className="message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default LoginPage;