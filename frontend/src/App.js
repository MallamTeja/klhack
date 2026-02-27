import React, { useState, useRef } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('');
  const [activeNav, setActiveNav] = useState('Dashboard');
  const fileInputRef = useRef(null);

  // Manual entry form state
  const [manualEntry, setManualEntry] = useState({
    gstin: '',
    invoiceNumber: '',
    date: '',
    amount: '',
    taxPercentage: ''
  });

  // Dummy data for table
  const dummyInvoices = [
    { gstin: '27AAAPL1234C1ZV', invoiceNo: 'INV-001', date: '2024-01-15', amount: '15,000', taxPercentage: '18%' },
    { gstin: '27AAAPL5678D2EF', invoiceNo: 'INV-002', date: '2024-01-16', amount: '8,500', taxPercentage: '12%' },
    { gstin: '27AAAPL9012F3GH', invoiceNo: 'INV-003', date: '2024-01-17', amount: '22,000', taxPercentage: '18%' },
    { gstin: '27AAAPL3456G4IJ', invoiceNo: 'INV-004', date: '2024-01-18', amount: '5,750', taxPercentage: '5%' }
  ];

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        setProcessingStatus('Processing...');
        
        // Simulate processing
        setTimeout(() => {
          setProcessingStatus('Draft Ready');
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleManualEntryChange = (e) => {
    const { name, value } = e.target;
    setManualEntry(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    console.log('Manual entry submitted:', manualEntry);
    // Dummy handler
    alert('Invoice submitted successfully!');
    setManualEntry({
      gstin: '',
      invoiceNumber: '',
      date: '',
      amount: '',
      taxPercentage: ''
    });
  };

  const handleGenerateDraft = () => {
    console.log('Generating GST draft...');
    // Dummy handler
    alert('GST Draft generated successfully!');
  };

  const navItems = ['Dashboard', 'Upload', 'History', 'Logout'];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>GST Agent</h2>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item}
              className={`nav-item ${activeNav === item ? 'active' : ''}`}
              onClick={() => setActiveNav(item)}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="dashboard-header">
          <h1>Welcome back, User</h1>
        </header>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          {/* Section 1: Upload Invoice */}
          <div className="card">
            <h2>Upload Invoice Photo</h2>
            <div 
              className={`upload-area ${isDragging ? 'dragging' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                style={{ display: 'none' }}
              />
              
              {uploadedImage ? (
                <div className="image-preview">
                  <img src={uploadedImage} alt="Uploaded invoice" />
                  {processingStatus && (
                    <div className="processing-status">
                      {processingStatus}
                    </div>
                  )}
                </div>
              ) : (
                <div className="upload-placeholder">
                  <div className="upload-icon">📷</div>
                  <p>Drag & drop your invoice image here</p>
                  <p className="upload-hint">or click to browse</p>
                </div>
              )}
            </div>
          </div>

          {/* Section 2: Manual Invoice Entry */}
          <div className="card">
            <h2>Manual Invoice Entry</h2>
            <form className="manual-entry-form" onSubmit={handleManualSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="gstin">GSTIN</label>
                  <input
                    type="text"
                    id="gstin"
                    name="gstin"
                    value={manualEntry.gstin}
                    onChange={handleManualEntryChange}
                    placeholder="Enter GSTIN"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="invoiceNumber">Invoice Number</label>
                  <input
                    type="text"
                    id="invoiceNumber"
                    name="invoiceNumber"
                    value={manualEntry.invoiceNumber}
                    onChange={handleManualEntryChange}
                    placeholder="Enter invoice number"
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={manualEntry.date}
                    onChange={handleManualEntryChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="amount">Amount</label>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={manualEntry.amount}
                    onChange={handleManualEntryChange}
                    placeholder="Enter amount"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="taxPercentage">Tax %</label>
                  <input
                    type="number"
                    id="taxPercentage"
                    name="taxPercentage"
                    value={manualEntry.taxPercentage}
                    onChange={handleManualEntryChange}
                    placeholder="Tax %"
                    min="0"
                    max="100"
                    required
                  />
                </div>
              </div>
              <button type="submit" className="submit-btn">
                Submit Invoice
              </button>
            </form>
          </div>

          {/* Table Preview Section */}
          <div className="card">
            <h2>Processed Invoices</h2>
            <div className="table-container">
              <table className="invoices-table">
                <thead>
                  <tr>
                    <th>GSTIN</th>
                    <th>Invoice No</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Tax %</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyInvoices.map((invoice, index) => (
                    <tr key={index}>
                      <td>{invoice.gstin}</td>
                      <td>{invoice.invoiceNo}</td>
                      <td>{invoice.date}</td>
                      <td>₹{invoice.amount}</td>
                      <td>{invoice.taxPercentage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Generate GST Draft Button */}
          <div className="generate-section">
            <button className="generate-btn" onClick={handleGenerateDraft}>
              Generate GST Draft
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
