import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import CombinedInvoiceSection from '../components/CombinedInvoiceSection';
import RecentInvoices from '../components/RecentInvoices';
import ProfileCard from '../components/ProfileCard';
import '../styles/dashboard.css';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedImage, setSelectedImage] = useState(null);
  const [manualFormData, setManualFormData] = useState({
    gstin: '',
    invoiceNumber: '',
    invoiceDate: '',
    billAmount: ''
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleManualInputChange = (e) => {
    const { name, value } = e.target;
    setManualFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUploadGenerate = () => {
    if (!selectedImage) {
      alert("Please upload an invoice image");
      return;
    }
    console.log("Uploaded file:", selectedImage);
    alert("GST Draft Generated Successfully");
  };

  const handleManualGenerate = () => {
    if (!manualFormData.gstin || !manualFormData.invoiceNumber || 
        !manualFormData.invoiceDate || !manualFormData.billAmount) {
      alert("Please fill all fields");
      return;
    }
    console.log("Manual form data:", manualFormData);
    alert("GST Draft Generated Successfully");
  };

  const handleProfileClick = () => {
    setActiveSection('profile');
  };

  const quickStats = [
    { label: 'Total Invoices Processed', value: '247', change: '+12%' },
    { label: 'Pending Drafts', value: '8', change: '-3%' },
    { label: 'This Month Revenue', value: '₹45,230', change: '+18%' },
    { label: 'Last Upload Date', value: 'Today', change: '2:30 PM' }
  ];

  return (
    <div className="dashboard-container">
      <Navbar onProfileClick={handleProfileClick} />
      <div className="dashboard-content">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <main className="main-content">
          {activeSection === 'dashboard' && (
            <>
              <div className="stats-grid">
                {quickStats.map((stat, index) => (
                  <div key={index} className="stat-card">
                    <h3>{stat.label}</h3>
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-change">{stat.change}</div>
                  </div>
                ))}
              </div>
              <div className="dashboard-overview">
                <RecentInvoices />
              </div>
            </>
          )}
          
          {activeSection === 'upload' && (
            <CombinedInvoiceSection
              selectedImage={selectedImage}
              onImageUpload={handleImageUpload}
              onUploadGenerate={handleUploadGenerate}
              manualFormData={manualFormData}
              onManualInputChange={handleManualInputChange}
              onManualGenerate={handleManualGenerate}
            />
          )}
          
          {activeSection === 'profile' && <ProfileCard />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
