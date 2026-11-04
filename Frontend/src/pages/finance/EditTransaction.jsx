import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTransactions, saveTransactions } from './financeStorage';
import './EditTransaction.css';

function EditTransaction() {
  const { id } = useParams();
  const navigate = useNavigate();

  const transactions = getTransactions();

  const existingTransaction = transactions.find(
    (item) => item.id === Number(id)
  );

  const [formData, setFormData] = useState(() =>
    existingTransaction
      ? { ...existingTransaction, amount: String(existingTransaction.amount) }
      : null
  );

  if (!existingTransaction || !formData) {
    return (
      <div className="edit-transaction-page">
        <h2>Transaction not found.</h2>
        <button onClick={() => navigate('/admin/finance/transactions')}>
          Back to Transactions
        </button>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedTransactions = transactions.map((item) =>
      item.id === Number(id)
        ? { ...formData, amount: Number(formData.amount) }
        : item
    );

    saveTransactions(updatedTransactions);

    alert('Transaction updated successfully!');
    navigate('/admin/finance/transactions');
  };

  return (
    <div className="edit-transaction-page">
      <div className="edit-transaction-header">
        <h1>Edit Transaction</h1>
        <p>Update income or expense information.</p>
      </div>

      <form className="edit-transaction-form" onSubmit={handleSubmit}>
        <h3>Transaction Information</h3>

        <div className="edit-transaction-grid">
          <div className="edit-transaction-group">
            <label>Transaction Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="edit-transaction-group">
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

          <div className="edit-transaction-group">
            <label>Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
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

          <div className="edit-transaction-group">
            <label>Amount (₹) *</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              min="0.01"
              step="0.01"
              required
            />
          </div>

          <div className="edit-transaction-group">
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

          <div className="edit-transaction-group">
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

        <div className="edit-transaction-group edit-transaction-description">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <div className="edit-transaction-actions">
          <button
            type="button"
            className="edit-transaction-cancel"
            onClick={() => navigate('/admin/finance/transactions')}
          >
            Cancel
          </button>

          <button type="submit" className="edit-transaction-save">
            Update Transaction
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditTransaction;