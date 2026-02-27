import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [activities, setActivities] = useState([]);

  // Mock data for recent activities
  const mockActivities = [
    {
      id: 1,
      invoiceName: 'INV-2024-001.jpg',
      date: '2024-01-15',
      status: 'processed',
      amount: '₹15,000'
    },
    {
      id: 2,
      invoiceName: 'INV-2024-002.jpg',
      date: '2024-01-14',
      status: 'processed',
      amount: '₹8,500'
    },
    {
      id: 3,
      invoiceName: 'INV-2024-003.jpg',
      date: '2024-01-13',
      status: 'pending',
      amount: '₹22,000'
    },
    {
      id: 4,
      invoiceName: 'INV-2024-004.jpg',
      date: '2024-01-12',
      status: 'processed',
      amount: '₹12,750'
    },
    {
      id: 5,
      invoiceName: 'INV-2024-005.jpg',
      date: '2024-01-11',
      status: 'pending',
      amount: '₹18,300'
    }
  ];

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Load mock activities
    setActivities(mockActivities);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  const handleFileUpload = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      setIsUploading(true);
      
      // Mock upload process
      setTimeout(() => {
        const newActivity = {
          id: activities.length + 1,
          invoiceName: files[0].name,
          date: new Date().toISOString().split('T')[0],
          status: 'pending',
          amount: '₹0'
        };
        
        setActivities(prev => [newActivity, ...prev]);
        setIsUploading(false);
        alert('Invoice uploaded successfully! Processing started.');
      }, 2000);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setIsUploading(true);
      
      setTimeout(() => {
        const newActivity = {
          id: activities.length + 1,
          invoiceName: files[0].name,
          date: new Date().toISOString().split('T')[0],
          status: 'pending',
          amount: '₹0'
        };
        
        setActivities(prev => [newActivity, ...prev]);
        setIsUploading(false);
        alert('Invoice uploaded successfully! Processing started.');
      }, 2000);
    }
  };

  const handleDownloadGST = (activityId) => {
    alert(`Downloading GST draft for invoice ${activityId}`);
  };

  return (
    <div className="dashboard-container">
      <Navbar isAuthenticated={true} onLogout={handleLogout} />
      
      <div className="dashboard-header">
        <div className="container">
          <h1 style={{ color: '#1F2933', margin: 0 }}>Dashboard</h1>
        </div>
      </div>
      
      <div className="dashboard-content">
        <div className="container">
          {/* Welcome Section */}
          <div className="welcome-section">
            <h2 style={{ color: '#1F2933', marginBottom: '0.5rem' }}>
              Welcome back! 👋
            </h2>
            <p style={{ color: '#6B7280', fontSize: '1.1rem' }}>
              Upload your invoices to generate GST drafts instantly
            </p>
          </div>
          
          {/* Upload Card */}
          <div className="upload-card card">
            <h3 style={{ color: '#1F2933', marginBottom: '1.5rem', textAlign: 'center' }}>
              Upload Invoice
            </h3>
            
            <div 
              className="upload-area"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-input').click()}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📄</div>
              <h4 style={{ color: '#1F2933', marginBottom: '0.5rem' }}>
                {isUploading ? 'Processing...' : 'Drop your invoice here'}
              </h4>
              <p style={{ color: '#6B7280', marginBottom: '1rem' }}>
                or click to browse files
              </p>
              <button className="btn btn-primary" disabled={isUploading}>
                {isUploading ? <span className="loading"></span> : 'Choose File'}
              </button>
              <input
                id="file-input"
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
            </div>
            
            <p style={{ 
              textAlign: 'center', 
              color: '#6B7280', 
              fontSize: '0.875rem', 
              marginTop: '1rem' 
            }}>
              Supported formats: JPG, PNG, PDF (Max size: 10MB)
            </p>
          </div>
          
          {/* Recent Activity Table */}
          <div className="activity-table">
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #E5E7EB' }}>
              <h3 style={{ color: '#1F2933', margin: 0 }}>Recent Activity</h3>
            </div>
            
            <div style={{ overflowX: 'auto' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Invoice Name</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity) => (
                    <tr key={activity.id}>
                      <td style={{ fontWeight: '500' }}>
                        {activity.invoiceName}
                      </td>
                      <td>{activity.date}</td>
                      <td>{activity.amount}</td>
                      <td>
                        <span className={`status-badge status-${activity.status}`}>
                          {activity.status}
                        </span>
                      </td>
                      <td>
                        {activity.status === 'processed' ? (
                          <button 
                            className="btn btn-secondary"
                            style={{ 
                              padding: '0.5rem 1rem', 
                              fontSize: '0.875rem' 
                            }}
                            onClick={() => handleDownloadGST(activity.id)}
                          >
                            Download GST
                          </button>
                        ) : (
                          <button 
                            className="btn btn-outline"
                            style={{ 
                              padding: '0.5rem 1rem', 
                              fontSize: '0.875rem',
                              cursor: 'not-allowed',
                              opacity: '0.6'
                            }}
                            disabled
                          >
                            Processing...
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {activities.length === 0 && (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '3rem', 
                  color: '#6B7280' 
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📭</div>
                  <p>No invoices uploaded yet</p>
                  <p style={{ fontSize: '0.875rem' }}>
                    Upload your first invoice to get started
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
