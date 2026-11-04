import { useNavigate, useParams } from 'react-router-dom';
import { getTransactions } from './financeStorage';
import './TransactionDetails.css';

function TransactionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const transaction = getTransactions().find(
    (item) => item.id === Number(id)
  );

  if (!transaction) {
    return (
      <div className="transaction-details-page">
        <h2>Transaction not found.</h2>
        <button onClick={() => navigate('/admin/finance/transactions')}>
          Back to Transactions
        </button>
      </div>
    );
  }

  return (
    <div className="transaction-details-page">
      <div className="transaction-details-header">
        <div>
          <h1>Transaction Details</h1>
          <p>Complete information about this transaction.</p>
        </div>

        <button
          className="transaction-details-back"
          onClick={() => navigate('/admin/finance/transactions')}
        >
          Back to Transactions
        </button>
      </div>

      <div className="transaction-details-card">
        <div className="transaction-details-title">
          <h2>{transaction.title}</h2>
          <span className={`transaction-type ${transaction.type.toLowerCase()}`}>
            {transaction.type}
          </span>
        </div>

        <div className="transaction-details-amount">
          ₹{Number(transaction.amount).toLocaleString('en-IN')}
        </div>

        <div className="transaction-details-grid">
          <div>
            <span>Transaction ID</span>
            <strong>#{transaction.id}</strong>
          </div>

          <div>
            <span>Category</span>
            <strong>{transaction.category}</strong>
          </div>

          <div>
            <span>Payment Method</span>
            <strong>{transaction.paymentMethod}</strong>
          </div>

          <div>
            <span>Transaction Date</span>
            <strong>{transaction.date}</strong>
          </div>
        </div>

        <div className="transaction-details-description">
          <span>Description</span>
          <p>{transaction.description || 'No description provided.'}</p>
        </div>

        <div className="transaction-details-actions">
          <button
            onClick={() => navigate(`/admin/finance/edit/${transaction.id}`)}
          >
            Edit Transaction
          </button>
        </div>
      </div>
    </div>
  );
}

export default TransactionDetails;