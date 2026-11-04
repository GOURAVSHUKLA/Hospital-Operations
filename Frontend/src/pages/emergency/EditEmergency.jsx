import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDoctors } from '../doctors/doctorStorage';
import {
  getEmergencyCases,
  saveEmergencyCases,
} from './emergencyStorage';
import './EditEmergency.css';

function EditEmergency() {
  const { id } = useParams();
  const navigate = useNavigate();

  const doctors = getDoctors();
  const emergencyCases = getEmergencyCases();

  const existingCase = emergencyCases.find(
    (item) => item.id === Number(id)
  );

  const [formData, setFormData] = useState(() => {
    if (!existingCase) return null;

    return {
      ...existingCase,
      age: String(existingCase.age),
      doctorId: String(existingCase.doctorId),
    };
  });

  if (!existingCase || !formData) {
    return (
      <div className="edit-emergency-page">
        <h2>Emergency case not found.</h2>
        <button onClick={() => navigate('/admin/emergency')}>
          Back to Emergency List
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

    const updatedCases = emergencyCases.map((item) =>
      item.id === Number(id)
        ? {
            ...formData,
            age: Number(formData.age),
            doctorId: Number(formData.doctorId),
          }
        : item
    );

    saveEmergencyCases(updatedCases);

    alert('Emergency case updated successfully!');
    navigate('/admin/emergency');
  };

  return (
    <div className="edit-emergency-page">
      <div className="edit-emergency-header">
        <h1>Edit Emergency Case</h1>
        <p>Update patient and emergency information.</p>
      </div>

      <form className="edit-emergency-form" onSubmit={handleSubmit}>
        <h3>Patient Information</h3>

        <div className="edit-emergency-grid">
          <div className="edit-emergency-group">
            <label>Patient Name *</label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="edit-emergency-group">
            <label>Age *</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min="0"
              max="120"
              required
            />
          </div>

          <div className="edit-emergency-group">
            <label>Gender *</label>
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

          <div className="edit-emergency-group">
            <label>Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              pattern="[0-9]{10}"
              required
            />
          </div>
        </div>

        <h3>Emergency Information</h3>

        <div className="edit-emergency-grid">
          <div className="edit-emergency-group">
            <label>Emergency Type *</label>
            <select
              name="emergencyType"
              value={formData.emergencyType}
              onChange={handleChange}
              required
            >
              <option value="Accident">Accident</option>
              <option value="Cardiac">Cardiac</option>
              <option value="Breathing Difficulty">Breathing Difficulty</option>
              <option value="Fever">Fever</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="edit-emergency-group">
            <label>Priority *</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              required
            >
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="edit-emergency-group">
            <label>Assign Doctor *</label>
            <select
              name="doctorId"
              value={formData.doctorId}
              onChange={handleChange}
              required
            >
              <option value="">Select Doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name} - {doctor.specialization}
                </option>
              ))}
            </select>
          </div>

          <div className="edit-emergency-group">
            <label>Admission Date *</label>
            <input
              type="date"
              name="admissionDate"
              value={formData.admissionDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="edit-emergency-group">
            <label>Admission Time *</label>
            <input
              type="time"
              name="admissionTime"
              value={formData.admissionTime}
              onChange={handleChange}
              required
            />
          </div>

          <div className="edit-emergency-group">
            <label>Status *</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="Admitted">Admitted</option>
              <option value="Under Treatment">Under Treatment</option>
              <option value="Discharged">Discharged</option>
            </select>
          </div>
        </div>

        <div className="edit-emergency-group edit-emergency-description">
          <label>Emergency Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>

        <div className="edit-emergency-actions">
          <button
            type="button"
            className="edit-emergency-cancel"
            onClick={() => navigate('/admin/emergency')}
          >
            Cancel
          </button>

          <button type="submit" className="edit-emergency-save">
            Update Emergency Case
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditEmergency;