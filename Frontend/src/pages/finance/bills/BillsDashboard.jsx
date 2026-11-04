import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBills } from './billStorage';
import './BillsDashboard.css';

function BillsDashboard() {
  const navigate = useNavigate();
  const [bills] = useState(getBills());

  const totalAmount = bills.reduce(
    (total, bill) => total + Number(bill.totalAmount),
    0
  );

  const paidAmount = bills.reduce(
    (total, bill) => total + Number(bill.paidAmount),
    0
  );

  const outstandingAmount = totalAmount - paidAmount;

  const paidBills = bills.filter(
    (bill) => bill.paymentStatus === 'Paid'
  ).length;

  const pendingBills = bills.filter(
    (bill) => bill.paymentStatus === 'Pending'
  ).length;

  const partialBills = bills.filter(
    (bill) => bill.paymentStatus === 'Partially Paid'
  ).length;

  const formatAmount = (amount) =>
    `₹${amount.toLocaleString('en-IN')}`;

  return (
    <div className="bills-dashboard">
      <div className="bills-dashboard-header">
        <div>
          <h1>Bills & Payments</h1>
          <p>Manage patient bills and payment records.</p>
        </div>

        <div className="bills-dashboard-actions">
          <button
            onClick={() => navigate('/admin/finance/bills/list')}
          >
            View All Bills
          </button>

          <button
            onClick={() => navigate('/admin/finance/bills/add')}
          >
            + Generate Bill
          </button>
        </div>
      </div>

      <div className="bills-stats-grid">
        <div className="bills-stat-card">
          <p>Total Bills</p>
          <h2>{bills.length}</h2>
        </div>

        <div className="bills-stat-card">
          <p>Total Bill Amount</p>
          <h2>{formatAmount(totalAmount)}</h2>
        </div>

        <div className="bills-stat-card">
          <p>Amount Received</p>
          <h2>{formatAmount(paidAmount)}</h2>
        </div>

        <div className="bills-stat-card">
          <p>Outstanding Amount</p>
          <h2>{formatAmount(outstandingAmount)}</h2>
        </div>
      </div>

      <div className="bills-status-section">
        <h2>Payment Status Overview</h2>

        <div className="bills-status-grid">
          <div className="bills-status-card paid">
            <h3>{paidBills}</h3>
            <p>Paid Bills</p>
          </div>

          <div className="bills-status-card pending">
            <h3>{pendingBills}</h3>
            <p>Pending Bills</p>
          </div>

          <div className="bills-status-card partial">
            <h3>{partialBills}</h3>
            <p>Partially Paid Bills</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BillsDashboard;