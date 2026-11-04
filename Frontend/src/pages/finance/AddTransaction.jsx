import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTransactions, saveTransactions } from './financeStorage';
import './AddTransaction.css';

function AddTransaction() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    type: 'Income',
    category: '',
    amount: '',
    paymentMethod: 'Cash',
    date: new Date().toISOString().slice(0, 10),
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingTransactions = getTransactions();

    const newTransaction = {
      ...formData,
      id: Date.now(),
      amount: Number(formData.amount),
    };

    saveTransactions([...existingTransactions, newTransaction]);

    alert('Transaction added successfully!');
    navigate('/admin/finance/transactions');
  };

  return (
    <div className="add-transaction-page">
      <div className="add-transaction-header">
        <h1>Add Transaction</h1>
        <p>Record a new hospital income or expense.</p>
      </div>

      <form className="add-transaction-form" onSubmit={handleSubmit}>
        <h3>Transaction Information</h3>

        <div className="transaction-form-grid">
          <div className="transaction-form-group">
            <label>Transaction Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Patient Consultation"
              required
            />
          </div>

          <div className="transaction-form-group">
            <label>Transaction Type *</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>

          <div className="transaction-form-group">
            <label>Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Consultation">Consultation</option>
              <option value="Room Charges">Room Charges</option>
              <option value="Medicine">Medicine</option>
              <option value="Medical Supplies">Medical Supplies</option>
              <option value="Salary">Salary</option>
              <option value="Equipment">Equipment</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="transaction-form-group">
            <label>Amount (₹) *</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              min="0.01"
              step="0.01"
              required
            />
          </div>

          <div className="transaction-form-group">
            <label>Payment Method *</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
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

          <div className="transaction-form-group">
            <label>Transaction Date *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="transaction-form-group transaction-description">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter transaction details..."
            rows="4"
          />
        </div>

        <div className="transaction-form-actions">
          <button
            type="button"
            className="transaction-cancel-btn"
            onClick={() => navigate('/admin/finance/transactions')}
          >
            Cancel
          </button>

          <button type="submit" className="transaction-save-btn">
            Save Transaction
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTransaction;
