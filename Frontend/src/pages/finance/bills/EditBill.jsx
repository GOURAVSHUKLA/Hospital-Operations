import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBills, saveBills } from './billStorage';
import { getPatients } from '../../patients/patientStorage';
import './EditBill.css';

function EditBill() {
  const { id } = useParams();
  const navigate = useNavigate();

  const bills = getBills();
  const patients = getPatients();

  const existingBill = bills.find(
    (bill) => bill.id === Number(id)
  );

  const [formData, setFormData] = useState(() =>
    existingBill
      ? {
          patientId: String(existingBill.patientId),
          billDate: existingBill.billDate,
          dueDate: existingBill.dueDate,
        }
      : null
  );

  const [items, setItems] = useState(() =>
    existingBill
      ? existingBill.items.map((item) => ({
          ...item,
          quantity: String(item.quantity),
          price: String(item.price),
        }))
      : []
  );

  if (!existingBill || !formData) {
    return (
      <div className="edit-bill-page">
        <h2>Bill not found.</h2>
        <button onClick={() => navigate('/admin/finance/bills/list')}>
          Back to Bills
        </button>
      </div>
    );
  }

  const totalAmount = items.reduce(
    (total, item) =>
      total + Number(item.quantity) * Number(item.price || 0),
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];

    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    };

    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([
      ...items,
      { name: '', quantity: '1', price: '' },
    ]);
  };

  const removeItem = (index) => {
    if (items.length === 1) {
      alert('At least one bill item is required.');
      return;
    }

    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedPatient = patients.find(
      (patient) => patient.id === Number(formData.patientId)
    );

    if (!selectedPatient) {
      alert('Please select a patient.');
      return;
    }

    if (
      items.some(
        (item) =>
          !item.name.trim() ||
          Number(item.quantity) <= 0 ||
          Number(item.price) <= 0
      )
    ) {
      alert('Please enter valid bill items, quantities and prices.');
      return;
    }

    if (totalAmount < existingBill.paidAmount) {
      alert('Total bill amount cannot be less than the amount already paid.');
      return;
    }

    const updatedBills = bills.map((bill) =>
      bill.id === Number(id)
        ? {
            ...bill,
            patientId: selectedPatient.id,
            patientName: selectedPatient.name,
            billDate: formData.billDate,
            dueDate: formData.dueDate,
            items: items.map((item) => ({
              name: item.name,
              quantity: Number(item.quantity),
              price: Number(item.price),
            })),
            totalAmount,
            paymentStatus:
              Number(bill.paidAmount) >= totalAmount
                ? 'Paid'
                : Number(bill.paidAmount) > 0
                  ? 'Partially Paid'
                  : 'Pending',
          }
        : bill
    );

    saveBills(updatedBills);

    alert('Bill updated successfully!');

    navigate('/admin/finance/bills/list');
  };

  return (
    <div className="edit-bill-page">
      <div className="edit-bill-header">
        <h1>Edit Patient Bill</h1>
        <p>Update invoice information and bill items.</p>
      </div>

      <form className="edit-bill-form" onSubmit={handleSubmit}>
        <h3>Patient Information</h3>

        <div className="edit-bill-grid">
          <div className="edit-bill-group">
            <label>Select Patient *</label>

            <select
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              required
            >
              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.name}
                </option>
              ))}
            </select>
          </div>

          <div className="edit-bill-group">
            <label>Bill Date *</label>

            <input
              type="date"
              name="billDate"
              value={formData.billDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="edit-bill-group">
            <label>Due Date *</label>

            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              min={formData.billDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="edit-bill-items-section">
          <div className="edit-bill-items-header">
            <h3>Bill Items</h3>

            <button type="button" onClick={addItem}>
              + Add Item
            </button>
          </div>

          {items.map((item, index) => (
            <div className="edit-bill-item-row" key={index}>
              <div className="edit-bill-group">
                <label>Item Name *</label>

                <input
                  type="text"
                  value={item.name}
                  onChange={(e) =>
                    handleItemChange(index, 'name', e.target.value)
                  }
                  required
                />
              </div>

              <div className="edit-bill-group">
                <label>Quantity *</label>

                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(index, 'quantity', e.target.value)
                  }
                  required
                />
              </div>

              <div className="edit-bill-group">
                <label>Price (₹) *</label>

                <input
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={item.price}
                  onChange={(e) =>
                    handleItemChange(index, 'price', e.target.value)
                  }
                  required
                />
              </div>

              <button
                type="button"
                className="edit-bill-remove"
                onClick={() => removeItem(index)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="edit-bill-total">
          <span>Total Bill Amount</span>
          <strong>₹{totalAmount.toLocaleString('en-IN')}</strong>
        </div>

        <div className="edit-bill-actions">
          <button
            type="button"
            onClick={() => navigate('/admin/finance/bills/list')}
          >
            Cancel
          </button>

          <button type="submit">
            Update Bill
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditBill;
