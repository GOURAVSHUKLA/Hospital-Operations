import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPatients } from '../../patients/patientStorage';
import { getBills, saveBills } from './billStorage';
import './AddBill.css';

function AddBill() {
  const navigate = useNavigate();
  const patients = getPatients();

  const [formData, setFormData] = useState({
    patientId: '',
    billDate: new Date().toISOString().split('T')[0],
    dueDate: '',
  });

  const [items, setItems] = useState([
    { name: '', quantity: 1, price: '' },
  ]);

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
      { name: '', quantity: 1, price: '' },
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

    if (items.some((item) => !item.name.trim() || Number(item.price) <= 0)) {
      alert('Please enter valid bill items and prices.');
      return;
    }

    const bills = getBills();

    const newBill = {
      id: Date.now(),
      billNumber: `BILL-${String(bills.length + 1).padStart(3, '0')}`,
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      billDate: formData.billDate,
      dueDate: formData.dueDate,
      items: items.map((item) => ({
        ...item,
        quantity: Number(item.quantity),
        price: Number(item.price),
      })),
      totalAmount,
      paidAmount: 0,
      paymentStatus: 'Pending',
      paymentHistory: [],
    };

    saveBills([...bills, newBill]);

    alert('Patient bill generated successfully!');

    navigate('/admin/finance/bills/list');
  };

  return (
    <div className="add-bill-page">
      <div className="add-bill-header">
        <h1>Generate Patient Bill</h1>
        <p>Create a new invoice for a patient.</p>
      </div>

      <form className="add-bill-form" onSubmit={handleSubmit}>
        <h3>Patient Information</h3>

        <div className="add-bill-grid">
          <div className="add-bill-group">
            <label>Select Patient *</label>

            <select
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              required
            >
              <option value="">Choose Patient</option>

              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.name}
                </option>
              ))}
            </select>
          </div>

          <div className="add-bill-group">
            <label>Bill Date *</label>

            <input
              type="date"
              name="billDate"
              value={formData.billDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="add-bill-group">
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

        <div className="add-bill-items-section">
          <div className="add-bill-items-header">
            <h3>Bill Items</h3>

            <button type="button" onClick={addItem}>
              + Add Item
            </button>
          </div>

          {items.map((item, index) => (
            <div className="add-bill-item-row" key={index}>
              <div className="add-bill-group">
                <label>Item Name *</label>

                <input
                  type="text"
                  value={item.name}
                  placeholder="e.g. Consultation Fees"
                  onChange={(e) =>
                    handleItemChange(index, 'name', e.target.value)
                  }
                  required
                />
              </div>

              <div className="add-bill-group">
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

              <div className="add-bill-group">
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
                className="remove-bill-item"
                onClick={() => removeItem(index)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="add-bill-total">
          <span>Total Bill Amount</span>
          <strong>
            ₹{totalAmount.toLocaleString('en-IN')}
          </strong>
        </div>

        <div className="add-bill-actions">
          <button
            type="button"
            onClick={() => navigate('/admin/finance/bills/list')}
          >
            Cancel
          </button>

          <button type="submit">
            Generate Bill
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBill;