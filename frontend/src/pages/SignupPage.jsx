import { useState } from "react";
import { signupUser } from "../services/api";
import "./SignupPage.css";

function SignupPage({ onSignupSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
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
      const data = await signupUser(formData);

      setMessage(data.message);

      setFormData({
        name: "",
        email: "",
        password: "",
      });

      setTimeout(() => {
        onSignupSuccess();
      }, 1000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <div className="auth-header">
          <span className="auth-badge">Create account</span>
          <h1>Signup</h1>
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label className="form-label">Name</label>
            <input
              className="text-input"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

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

          <button className="signup-button" type="submit">
            Create Account
          </button>
        </form>

        {message && <p className="signup-message">{message}</p>}
        {error && <p className="signup-error">{error}</p>}
      </div>
    </div>
  );
}

export default SignupPage;