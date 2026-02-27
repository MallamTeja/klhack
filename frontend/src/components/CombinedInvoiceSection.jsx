import React, { useState } from 'react';
import UploadSection from './UploadSection';
import ManualEntrySection from './ManualEntrySection';
import '../styles/dashboard.css';

const CombinedInvoiceSection = ({ 
  selectedImage, 
  onImageUpload, 
  onUploadGenerate, 
  manualFormData, 
  onManualInputChange, 
  onManualGenerate 
}) => {
  const [activeTab, setActiveTab] = useState('upload');

  return (
    <div className="combined-invoice-section">
      <div className="tab-toggle">
        <button 
          className={`tab-btn ${activeTab === 'upload' ? 'active' : ''}`}
          onClick={() => setActiveTab('upload')}
        >
          Upload Invoice
        </button>
        <button 
          className={`tab-btn ${activeTab === 'manual' ? 'active' : ''}`}
          onClick={() => setActiveTab('manual')}
        >
          Manual Entry
        </button>
      </div>
      
      <div className="tab-content">
        {activeTab === 'upload' && (
          <UploadSection
            selectedImage={selectedImage}
            onImageUpload={onImageUpload}
            onGenerate={onUploadGenerate}
          />
        )}
        
        {activeTab === 'manual' && (
          <ManualEntrySection
            formData={manualFormData}
            onInputChange={onManualInputChange}
            onGenerate={onManualGenerate}
          />
        )}
      </div>
    </div>
  );
};

export default CombinedInvoiceSection;
