import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPatients, savePatients } from './patientStorage';
import './EditPatient.css';

function EditPatient() {
  const navigate = useNavigate();
  const { id } = useParams();

  const patients = getPatients();

  const patient = patients.find(
    (item) => Number(item.id) === Number(id)
  );

  const [formData, setFormData] = useState(() => {
    if (!patient) return null;

    return {
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      phone: patient.phone,
      email: patient.email,
      disease: patient.disease,
      status: patient.status,
    };
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

    const updatedPatients = patients.map((item) =>
      Number(item.id) === Number(id)
        ? {
            ...item,
            ...formData,
            age: Number(formData.age),
          }
        : item
    );

    savePatients(updatedPatients);

    alert('Patient updated successfully!');

    navigate('/admin/patients');
  };

  if (!patient) {
    return (
      <div className="edit-patient-page">
        <h2>Patient not found!</h2>
        <button onClick={() => navigate('/admin/patients')}>
          Back to Patients
        </button>
      </div>
    );
  }

  return (
    <div className="edit-patient-page">
      <div className="edit-patient-header">
        <h1>Edit Patient</h1>
        <p>Update patient information below.</p>
      </div>

      <form className="edit-patient-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Patient Name</label>
          <input
            type="text"
            name="name"
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
            Update Patient
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

export default EditPatient;