import React from 'react';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'upload', label: 'Add Invoice', icon: '📤' }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-menu">
        {menuItems.map(item => (
          <button
            key={item.id}
            className={`sidebar-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => setActiveSection(item.id)}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
