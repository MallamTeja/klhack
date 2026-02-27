import React from 'react';

const RecentInvoices = () => {
  const invoices = [
    { invoiceNo: 'INV-001', gstin: '27AAAPL1234C1ZV', amount: '₹12,500', status: 'Completed', date: '2024-02-26' },
    { invoiceNo: 'INV-002', gstin: '27AAAPL1234C1ZV', amount: '₹8,750', status: 'Draft', date: '2024-02-25' },
    { invoiceNo: 'INV-003', gstin: '27BBBPL5678D2ZV', amount: '₹15,200', status: 'Completed', date: '2024-02-24' },
    { invoiceNo: 'INV-004', gstin: '27AAAPL1234C1ZV', amount: '₹6,300', status: 'Draft', date: '2024-02-23' },
    { invoiceNo: 'INV-005', gstin: '27CCCPPL9012E3ZV', amount: '₹22,100', status: 'Completed', date: '2024-02-22' }
  ];

  return (
    <div className="card">
      <h2 className="card-title">Recent Invoices</h2>
      <div className="table-container">
        <table className="invoices-table">
          <thead>
            <tr>
              <th>Invoice No</th>
              <th>GSTIN</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => (
              <tr key={index}>
                <td>{invoice.invoiceNo}</td>
                <td>{invoice.gstin}</td>
                <td>{invoice.amount}</td>
                <td>
                  <span className={`status-badge ${invoice.status.toLowerCase()}`}>
                    {invoice.status}
                  </span>
                </td>
                <td>{invoice.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentInvoices;
