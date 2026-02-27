import React, { useState, useRef, useEffect } from 'react';

const Navbar = ({ onProfileClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    console.log('Logout clicked');
    alert('Logout functionality to be implemented');
  };

  const handleProfileOptionClick = () => {
    setIsDropdownOpen(false);
    onProfileClick();
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>GST Filing Agent</h1>
      </div>
      <div className="navbar-actions">
        <div className="user-profile" ref={dropdownRef}>
          <div 
            className="profile-icon"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span>U</span>
          </div>
          {isDropdownOpen && (
            <div className="profile-dropdown">
              <button 
                className="dropdown-item"
                onClick={handleProfileOptionClick}
              >
                Profile
              </button>
              <button 
                className="dropdown-item logout-item"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
