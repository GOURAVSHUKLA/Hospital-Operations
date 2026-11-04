import { useNavigate, useParams } from 'react-router-dom';
import { getBills } from './billStorage';
import './BillDetails.css';

function BillDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const bill = getBills().find(
    (item) => item.id === Number(id)
  );

  if (!bill) {
    return (
      <div className="bill-details-page">
        <h2>Bill not found.</h2>
        <button onClick={() => navigate('/admin/finance/bills/list')}>
          Back to Bills
        </button>
      </div>
    );
  }

  const outstandingAmount = bill.totalAmount - bill.paidAmount;

  const formatCurrency = (amount) =>
    `₹${Number(amount).toLocaleString('en-IN')}`;

  return (
    <div className="bill-details-page">
      <div className="bill-details-header no-print">
        <div>
          <h1>Bill Details</h1>
          <p>View invoice and payment information.</p>
        </div>

        <div className="bill-details-actions">
          <button onClick={() => navigate('/admin/finance/bills/list')}>
            Back
          </button>

          <button
            onClick={() => navigate(`/admin/finance/bills/edit/${bill.id}`)}
          >
            Edit Bill
          </button>

          {outstandingAmount > 0 && (
            <button
              onClick={() =>
                navigate(`/admin/finance/bills/payment/${bill.id}`)
              }
            >
              + Add Payment
            </button>
          )}

          <button onClick={() => window.print()}>
            Print Invoice
          </button>
        </div>
      </div>

      <div className="bill-invoice">
        <div className="invoice-heading">
          <div>
            <h2>HOSPITAL MANAGEMENT SYSTEM</h2>
            <p>Patient Invoice / Payment Receipt</p>
          </div>

          <div className="invoice-number">
            <h3>{bill.billNumber}</h3>
            <span className={`bill-status ${bill.paymentStatus.toLowerCase().replaceAll(' ', '-')}`}>
              {bill.paymentStatus}
            </span>
          </div>
        </div>

        <hr />

        <div className="invoice-info">
          <div>
            <h4>Patient Information</h4>
            <p><strong>Name:</strong> {bill.patientName}</p>
            <p><strong>Patient ID:</strong> {bill.patientId}</p>
          </div>

          <div>
            <h4>Invoice Information</h4>
            <p><strong>Bill Date:</strong> {bill.billDate}</p>
            <p><strong>Due Date:</strong> {bill.dueDate}</p>
          </div>
        </div>

        <h3 className="invoice-section-title">Bill Items</h3>

        <div className="invoice-table-wrapper">
          <table className="invoice-table">
            <thead>
              <tr>
                <th>Item Description</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>
              {bill.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{formatCurrency(item.price)}</td>
                  <td>
                    {formatCurrency(item.quantity * item.price)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="invoice-summary">
          <div>
            <span>Total Amount</span>
            <strong>{formatCurrency(bill.totalAmount)}</strong>
          </div>

          <div>
            <span>Paid Amount</span>
            <strong>{formatCurrency(bill.paidAmount)}</strong>
          </div>

          <div className="invoice-outstanding">
            <span>Outstanding Amount</span>
            <strong>{formatCurrency(outstandingAmount)}</strong>
          </div>
        </div>

        <div className="invoice-payment-history">
          <h3>Payment History</h3>

          {bill.paymentHistory.length === 0 ? (
            <p>No payments recorded yet.</p>
          ) : (
            <div className="invoice-table-wrapper">
              <table className="invoice-table">
                <thead>
                  <tr>
                    <th>Payment Date</th>
                    <th>Payment Method</th>
                    <th>Amount Paid</th>
                  </tr>
                </thead>

                <tbody>
                  {bill.paymentHistory.map((payment) => (
                    <tr key={payment.id}>
                      <td>{payment.date}</td>
                      <td>{payment.method}</td>
                      <td>{formatCurrency(payment.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="invoice-footer">
          <p>Thank you for choosing our hospital.</p>
          <span>This is a computer-generated invoice.</span>
        </div>
      </div>
    </div>
  );
}

export default BillDetails;