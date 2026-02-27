import React from 'react';

const UploadSection = ({ selectedImage, onImageUpload, onGenerate }) => {
  return (
    <div className="card">
      <h2 className="card-title">Upload Invoice Photo</h2>
      <div className="upload-area">
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          onChange={onImageUpload}
          className="file-input"
        />
        <label htmlFor="imageUpload" className="upload-btn">
          📤 Upload Photo
        </label>
        {selectedImage && (
          <div className="file-info">
            <p>Selected: {selectedImage.name}</p>
          </div>
        )}
        <button onClick={onGenerate} className="primary-btn">
          Generate GST Draft
        </button>
      </div>
    </div>
  );
};

export default UploadSection;
