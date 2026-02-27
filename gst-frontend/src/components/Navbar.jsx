import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated = false, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-container">
          <Link to="/" className="navbar-brand">
            GST Agent
          </Link>
          
          <div className="navbar-nav">
            {isAuthenticated ? (
              <>
                <div className="avatar">U</div>
                <button className="btn btn-outline" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/#features" className="navbar-link">
                  Features
                </Link>
                <Link to="/#how-it-works" className="navbar-link">
                  How it Works
                </Link>
                <Link to="/login" className="navbar-link">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
