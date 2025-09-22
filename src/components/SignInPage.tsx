import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/SignInPage.css';

interface SignInPageProps {
  onSignIn: (email: string, password: string) => void;
}

const SignInPage: React.FC<SignInPageProps> = ({ onSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    try {
      setIsLoading(true);
      const minimumDelay = new Promise((resolve) => setTimeout(resolve, 10000));
      await Promise.all([onSignIn(email, password), minimumDelay]);
      setError('');
      setEmail('');
      setPassword('');
    } catch (error: any) {
      setError(error.message || 'Sign-in failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signin-container">
      {isLoading ? (
        <div className="spinner-overlay">
          <img src="Heart.gif" alt="Loading..." className="spinner" />
        </div>
      ) : (
        <>
          <div className="intro-section">
            <h1 className="intro-title">AuraCycle</h1>
            <h2 className="intro-subtitle">🩸Menstruation Tracker</h2>
            <p className="intro-description">
              Track your cycle with a touch of magic! AuraCycle helps you stay in tune with your body, predict your periods, and embrace every phase with confidence and care. Join our community and make your journey sparkle! 
            </p>
            <div className="intro-decoration">
              <div className="floating-heart">🌸</div>
              <div className="floating-flower">🌸</div>
              <div className="floating-heart">🌸</div>
            </div>
          </div>
          <div className="signin-card">
            <div className="signin-header">
              <h1 className="signin-title">Welcome Back!</h1>
              <p className="signin-subtitle">Sign in to AuraCycle</p>
            </div>

            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleSubmit} className="signin-form">
              <div className="input-group">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  required
                />
                <span className="input-icon">✉️</span>
              </div>

              <div className="input-group">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  required
                />
                <span className="input-icon">🔒</span>
              </div>

              <button type="submit" className="signin-button" disabled={isLoading}>
                Sign In
              </button>
            </form>

            <div className="signin-footer">
              <p className="signup-link">
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </p>
            </div>

            <div className="signin-decoration">
              <div className="floating-heart">💖</div>
              <div className="floating-heart">💕</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SignInPage;
