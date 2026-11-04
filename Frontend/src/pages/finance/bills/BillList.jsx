import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBills, saveBills } from './billStorage';
import './BillList.css';

function BillList() {
  const navigate = useNavigate();
  const [bills, setBills] = useState(getBills());
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const formatAmount = (amount) =>
    `₹${Number(amount).toLocaleString('en-IN')}`;

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this bill?'
    );

    if (!confirmDelete) return;

    const updatedBills = bills.filter((bill) => bill.id !== id);

    setBills(updatedBills);
    saveBills(updatedBills);
  };

  const filteredBills = bills.filter((bill) => {
    const matchesSearch =
      bill.patientName.toLowerCase().includes(search.toLowerCase()) ||
      bill.billNumber.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === 'All' || bill.paymentStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bill-list-page">
      <div className="bill-list-header">
        <div>
          <h1>Patient Bills</h1>
          <p>View and manage all patient invoices.</p>
        </div>

        <button
          className="bill-add-btn"
          onClick={() => navigate('/admin/finance/bills/add')}
        >
          + Generate Bill
        </button>
      </div>

      <div className="bill-list-filters">
        <input
          type="text"
          placeholder="Search by patient or bill number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Partially Paid">Partially Paid</option>
        </select>
      </div>

      <div className="bill-table-container">
        <table className="bill-table">
          <thead>
            <tr>
              <th>Bill Number</th>
              <th>Patient</th>
              <th>Bill Date</th>
              <th>Total Amount</th>
              <th>Paid Amount</th>
              <th>Outstanding</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredBills.length > 0 ? (
              filteredBills.map((bill) => (
                <tr key={bill.id}>
                  <td>{bill.billNumber}</td>
                  <td>{bill.patientName}</td>
                  <td>{bill.billDate}</td>
                  <td>{formatAmount(bill.totalAmount)}</td>
                  <td>{formatAmount(bill.paidAmount)}</td>
                  <td>
                    {formatAmount(
                      Number(bill.totalAmount) - Number(bill.paidAmount)
                    )}
                  </td>
                  <td>
                    <span
                      className={`bill-status ${bill.paymentStatus
                        .toLowerCase()
                        .replaceAll(' ', '-')}`}
                    >
                      {bill.paymentStatus}
                    </span>
                  </td>
                  <td>
                    <div className="bill-actions">
                      <button
                        onClick={() =>
                          navigate(`/admin/finance/bills/details/${bill.id}`)
                        }
                      >
                        View
                      </button>

                      <button
                        onClick={() =>
                          navigate(`/admin/finance/bills/edit/${bill.id}`)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="bill-delete-btn"
                        onClick={() => handleDelete(bill.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="bill-empty">
                  No bills found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BillList;