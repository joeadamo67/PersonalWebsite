import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../assets/styles/login.css';

// Import an image for the login page background
import loginBgImage from '../assets/images/moon.jpg'; // This assumes you've saved Image 2 as moon.jpg

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { currentUser, login, error: authError } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // If user is already logged in, redirect to dashboard
  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await login(email, password);
      // The redirect will happen automatically due to the useEffect above
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div 
      className="login-page" 
      style={{ backgroundImage: `url(${loginBgImage})` }}
    >
      <div className="login-container">
        <div className="login-card">
          <h2>Admin Login</h2>
          <p className="login-subtitle">
            Log in to access your dashboard and manage blog content.
          </p>
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>
            
            {authError && (
              <div className="error-message">
                {authError}
              </div>
            )}
            
            <button 
              type="submit" 
              className="login-button" 
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
          
          <div className="login-footer">
            <p>
              Note: This area is for authorized administrators only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;