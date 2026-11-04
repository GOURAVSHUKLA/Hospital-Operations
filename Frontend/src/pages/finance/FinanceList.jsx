import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTransactions, saveTransactions } from './financeStorage';
import './FinanceList.css';

function FinanceList() {
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState(getTransactions());
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      typeFilter === 'All' || transaction.type === typeFilter;

    return matchesSearch && matchesType;
  });

  const formatAmount = (amount) =>
    `₹${Number(amount).toLocaleString('en-IN')}`;

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this transaction?'
    );

    if (confirmDelete) {
      const updatedTransactions = transactions.filter(
        (transaction) => transaction.id !== id
      );

      setTransactions(updatedTransactions);
      saveTransactions(updatedTransactions);
    }
  };

  return (
    <div className="finance-list-page">
      <div className="finance-list-header">
        <div>
          <h1>Income & Expenses</h1>
          <p>Manage all hospital financial transactions.</p>
        </div>

        <button
          className="add-transaction-btn"
          onClick={() => navigate('/admin/finance/add')}
        >
          + Add Transaction
        </button>
      </div>

      <div className="finance-list-filters">
        <input
          type="text"
          placeholder="Search transaction or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="All">All Transactions</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
      </div>

      <div className="finance-list-table-container">
        <table className="finance-list-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Transaction Title</th>
              <th>Category</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Payment Method</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.id}</td>
                  <td>{transaction.title}</td>
                  <td>{transaction.category}</td>
                  <td>
                    <span
                      className={`finance-list-type ${transaction.type.toLowerCase()}`}
                    >
                      {transaction.type}
                    </span>
                  </td>
                  <td>{formatAmount(transaction.amount)}</td>
                  <td>{transaction.paymentMethod}</td>
                  <td>{transaction.date}</td>
                  <td className="finance-list-actions">
                    <button
                      className="finance-view-btn"
                      onClick={() =>
                        navigate(`/admin/finance/details/${transaction.id}`)
                      }
                    >
                      View
                    </button>

                    <button
                      className="finance-edit-btn"
                      onClick={() =>
                        navigate(`/admin/finance/edit/${transaction.id}`)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="finance-delete-btn"
                      onClick={() => handleDelete(transaction.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="finance-no-data">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FinanceList;