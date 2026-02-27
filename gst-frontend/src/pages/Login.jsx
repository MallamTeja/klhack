import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthCard from '../components/AuthCard';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailOrMobile: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.emailOrMobile.trim()) {
      newErrors.emailOrMobile = 'Email or mobile number is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    
    // Mock authentication
    setTimeout(() => {
      setIsLoading(false);
      // Mock successful login
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/dashboard');
    }, 1500);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-container">
      <div className="auth-layout">
        {/* Left Side */}
        <div className="auth-left">
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
            Simplify GST filing for your business
          </h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, lineHeight: 1.6 }}>
            Join thousands of Kirana store owners who are saving hours every month 
            with our AI-powered GST filing solution.
          </p>
        </div>
        
        {/* Right Side */}
        <div className="auth-right">
          <AuthCard
            title="Welcome Back"
            footerText="Don't have an account?"
            footerLink="/signup"
            footerLinkText="Create Account"
          >
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="emailOrMobile">
                  Email or Mobile Number
                </label>
                <input
                  type="text"
                  id="emailOrMobile"
                  name="emailOrMobile"
                  className={`form-input ${errors.emailOrMobile ? 'error' : ''}`}
                  value={formData.emailOrMobile}
                  onChange={handleChange}
                  placeholder="Enter your email or mobile"
                />
                {errors.emailOrMobile && (
                  <div className="error-message">{errors.emailOrMobile}</div>
                )}
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <div className="password-toggle">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    className={`form-input ${errors.password ? 'error' : ''}`}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="password-toggle-icon"
                    onClick={togglePassword}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                {errors.password && (
                  <div className="error-message">{errors.password}</div>
                )}
              </div>
              
              <div style={{ textAlign: 'right', marginBottom: '1.5rem' }}>
                <a 
                  href="#forgot" 
                  style={{ 
                    color: '#2563EB', 
                    textDecoration: 'none', 
                    fontSize: '0.875rem' 
                  }}
                >
                  Forgot Password?
                </a>
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary btn-full"
                disabled={isLoading}
              >
                {isLoading ? <span className="loading"></span> : 'Login'}
              </button>
              
              <div style={{ textAlign: 'center', margin: '1.5rem 0' }}>
                <span style={{ color: '#6B7280', fontSize: '0.875rem' }}>OR</span>
              </div>
              
              <button 
                type="button" 
                className="btn btn-outline btn-full"
                onClick={() => alert('Google login - UI only')}
              >
                Login with Google
              </button>
            </form>
          </AuthCard>
        </div>
      </div>
    </div>
  );
};

export default Login;
