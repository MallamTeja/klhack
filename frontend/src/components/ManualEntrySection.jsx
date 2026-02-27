import React from 'react';

const ManualEntrySection = ({ formData, onInputChange, onGenerate }) => {
  return (
    <div className="card">
      <h2 className="card-title">Manual Invoice Entry</h2>
      <form className="manual-form">
        <div className="form-group">
          <label htmlFor="gstin">GSTIN</label>
          <input
            type="text"
            id="gstin"
            name="gstin"
            value={formData.gstin}
            onChange={onInputChange}
            placeholder="Enter GSTIN"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="invoiceNumber">Invoice Number</label>
          <input
            type="text"
            id="invoiceNumber"
            name="invoiceNumber"
            value={formData.invoiceNumber}
            onChange={onInputChange}
            placeholder="Enter Invoice Number"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="invoiceDate">Invoice Date</label>
          <input
            type="date"
            id="invoiceDate"
            name="invoiceDate"
            value={formData.invoiceDate}
            onChange={onInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="billAmount">Bill Amount</label>
          <input
            type="number"
            id="billAmount"
            name="billAmount"
            value={formData.billAmount}
            onChange={onInputChange}
            placeholder="Enter Bill Amount"
            className="form-input"
          />
        </div>
        <button type="button" onClick={onGenerate} className="primary-btn">
          Generate GST Draft
        </button>
      </form>
    </div>
  );
};

export default ManualEntrySection;
