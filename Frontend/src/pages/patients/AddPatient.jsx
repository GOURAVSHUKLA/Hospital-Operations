import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPatients, savePatients } from './patientStorage';
import './AddPatient.css';

function AddPatient() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    disease: '',
    status: 'Admitted',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const patients = getPatients();

    const newPatient = {
      id: Date.now(),
      ...formData,
      age: Number(formData.age),
    };

    savePatients([...patients, newPatient]);

    alert('Patient added successfully!');

    navigate('/admin/patients');
  };

  return (
    <div className="add-patient-page">
      <div className="add-patient-header">
        <h1>Add New Patient</h1>
        <p>Enter patient details below.</p>
      </div>

      <form className="add-patient-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Patient Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter patient name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            name="age"
            placeholder="Enter age"
            min="1"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter phone number"
            pattern="[0-9]{10}"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Disease</label>
          <input
            type="text"
            name="disease"
            placeholder="Enter disease"
            value={formData.disease}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Patient Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Admitted">Admitted</option>
            <option value="Discharged">Discharged</option>
            <option value="Under Treatment">Under Treatment</option>
          </select>
        </div>

        <div className="form-buttons">
          <button type="submit" className="save-patient-btn">
            Save Patient
          </button>

          <button
            type="button"
            className="cancel-patient-btn"
            onClick={() => navigate('/admin/patients')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPatient;