import { useState } from 'react';
import { getTransactions } from './financeStorage';
import './FinanceDashboard.css';

function FinanceDashboard() {
  const [transactions] = useState(getTransactions());

  const totalIncome = transactions
    .filter((item) => item.type === 'Income')
    .reduce((total, item) => total + Number(item.amount), 0);

  const totalExpenses = transactions
    .filter((item) => item.type === 'Expense')
    .reduce((total, item) => total + Number(item.amount), 0);

  const netProfit = totalIncome - totalExpenses;

  const formatAmount = (amount) =>
    `₹${amount.toLocaleString('en-IN')}`;

  return (
    <div className="finance-dashboard">
      <div className="finance-dashboard-header">
        <div>
          <h1>Finance Dashboard</h1>
          <p>Overview of hospital income and expenses.</p>
        </div>
      </div>

      <div className="finance-stats-grid">
        <div className="finance-stat-card income-card">
          <div className="finance-stat-icon">↗</div>
          <div>
            <p>Total Income</p>
            <h2>{formatAmount(totalIncome)}</h2>
          </div>
        </div>

        <div className="finance-stat-card expense-card">
          <div className="finance-stat-icon">↘</div>
          <div>
            <p>Total Expenses</p>
            <h2>{formatAmount(totalExpenses)}</h2>
          </div>
        </div>

        <div className="finance-stat-card profit-card">
          <div className="finance-stat-icon">₹</div>
          <div>
            <p>Net Profit</p>
            <h2>{formatAmount(netProfit)}</h2>
          </div>
        </div>

        <div className="finance-stat-card transaction-card">
          <div className="finance-stat-icon">≡</div>
          <div>
            <p>Total Transactions</p>
            <h2>{transactions.length}</h2>
          </div>
        </div>
      </div>

      <div className="finance-recent-section">
        <h2>Recent Transactions</h2>

        <div className="finance-recent-table-container">
          <table className="finance-recent-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {transactions.length > 0 ? (
                [...transactions]
                  .sort((a, b) => b.id - a.id)
                  .slice(0, 5)
                  .map((transaction) => (
                    <tr key={transaction.id}>
                      <td>{transaction.title}</td>
                      <td>{transaction.category}</td>
                      <td>
                        <span
                          className={`finance-type-badge ${transaction.type.toLowerCase()}`}
                        >
                          {transaction.type}
                        </span>
                      </td>
                      <td>{formatAmount(Number(transaction.amount))}</td>
                      <td>{transaction.date}</td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="5" className="finance-empty-message">
                    No transactions available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FinanceDashboard;