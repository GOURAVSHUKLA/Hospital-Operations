import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBills, saveBills } from './billStorage';
import './AddPayment.css';

function AddPayment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const bill = getBills().find(
    (item) => item.id === Number(id)
  );

  const [formData, setFormData] = useState({
    amount: '',
    method: 'UPI',
    date: new Date().toISOString().split('T')[0],
  });

  if (!bill) {
    return (
      <div className="add-payment-page">
        <h2>Bill not found.</h2>
        <button onClick={() => navigate('/admin/finance/bills/list')}>
          Back to Bills
        </button>
      </div>
    );
  }

  const outstandingAmount = bill.totalAmount - bill.paidAmount;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const amount = Number(formData.amount);

    if (!Number.isFinite(amount) || amount <= 0) {
      alert('Please enter a valid payment amount.');
      return;
    }

    if (amount > outstandingAmount) {
      alert('Payment cannot exceed the outstanding amount.');
      return;
    }

    const updatedPaidAmount = Number(bill.paidAmount) + amount;

    const paymentStatus =
      updatedPaidAmount >= bill.totalAmount
        ? 'Paid'
        : 'Partially Paid';

    const payment = {
      id: Date.now(),
      amount,
      method: formData.method,
      date: formData.date,
    };

    const updatedBills = getBills().map((item) =>
      item.id === bill.id
        ? {
            ...item,
            paidAmount: updatedPaidAmount,
            paymentStatus,
            paymentHistory: [
              ...(item.paymentHistory || []),
              payment,
            ],
          }
        : item
    );

    saveBills(updatedBills);

    alert('Payment recorded successfully!');

    navigate(`/admin/finance/bills/details/${bill.id}`);
  };

  return (
    <div className="add-payment-page">
      <div className="add-payment-header">
        <h1>Record Payment</h1>
        <p>Add a payment against the selected patient bill.</p>
      </div>

      <div className="payment-bill-summary">
        <h3>{bill.billNumber}</h3>

        <p>
          <strong>Patient:</strong> {bill.patientName}
        </p>

        <p>
          <strong>Total Bill:</strong>{' '}
          ₹{Number(bill.totalAmount).toLocaleString('en-IN')}
        </p>

        <p>
          <strong>Already Paid:</strong>{' '}
          ₹{Number(bill.paidAmount).toLocaleString('en-IN')}
        </p>

        <div className="payment-outstanding">
          <span>Outstanding Amount</span>

          <strong>
            ₹{outstandingAmount.toLocaleString('en-IN')}
          </strong>
        </div>
      </div>

      <form className="add-payment-form" onSubmit={handleSubmit}>
        <h3>Payment Information</h3>

        <div className="add-payment-grid">
          <div className="add-payment-group">
            <label>Payment Amount (₹) *</label>

            <input
              type="number"
              name="amount"
              min="0.01"
              max={outstandingAmount}
              step="0.01"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter payment amount"
              required
            />
          </div>

          <div className="add-payment-group">
            <label>Payment Method *</label>

            <select
              name="method"
              value={formData.method}
              onChange={handleChange}
              required
            >
              <option value="Cash">Cash</option>
              <option value="UPI">UPI</option>
              <option value="Card">Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Cheque">Cheque</option>
            </select>
          </div>

          <div className="add-payment-group">
            <label>Payment Date *</label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="add-payment-actions">
          <button
            type="button"
            onClick={() =>
              navigate(`/admin/finance/bills/details/${bill.id}`)
            }
          >
            Cancel
          </button>

          <button type="submit">
            Save Payment
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPayment;