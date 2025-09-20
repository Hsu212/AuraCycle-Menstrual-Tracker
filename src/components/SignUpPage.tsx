import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/SignUpPage.css';

interface SignUpPageProps {
  onSignUp: (formData: { firstName: string; lastName: string; email: string; password: string; profilePicture: string }) => void;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ onSignUp }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    profilePicture: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }
    try {
      await onSignUp(formData);
      setError('');
      setFormData({ firstName: '', lastName: '', email: '', password: '', profilePicture: '' });
    } catch (error: any) {
      setError(error.message || 'Sign-up failed');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <h1 className="signup-title">Join Aura Cycle</h1>
          <p className="signup-subtitle">Create your account</p>
        </div>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="name-inputs">
            <div className="input-group">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="input-field"
                required
              />
              <span className="input-icon">👤</span>
            </div>
            <div className="input-group">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="input-field"
                required
              />
              <span className="input-icon">👤</span>
            </div>
          </div>

          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
              required
            />
            <span className="input-icon">✉️</span>
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="input-field"
              required
            />
            <span className="input-icon">🔒</span>
          </div>

          <div className="input-group">
            <input
              type="text"
              name="profilePicture"
              placeholder="Profile Picture URL (optional)"
              value={formData.profilePicture}
              onChange={handleChange}
              className="input-field"
            />
            <span className="input-icon">🖼️</span>
          </div>

          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>

        <div className="signup-footer">
          <p className="signin-link">
            Already have an account? <Link to="/signin">Sign In</Link>
          </p>
        </div>

        <div className="signup-decoration">
          <div className="floating-heart">💖</div>
          <div className="floating-flower">🌸</div>
          <div className="floating-heart">💕</div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;