import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDoctors } from '../doctors/doctorStorage';
import {
  getEmergencyCases,
  saveEmergencyCases,
} from './emergencyStorage';
import './AddEmergency.css';

function AddEmergency() {
  const navigate = useNavigate();
  const doctors = getDoctors();

  const [formData, setFormData] = useState({
    patientName: '',
    age: '',
    gender: '',
    phone: '',
    emergencyType: '',
    priority: 'High',
    doctorId: '',
    admissionDate: new Date().toISOString().slice(0, 10),
    admissionTime: new Date().toTimeString().slice(0, 5),
    description: '',
    status: 'Admitted',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingCases = getEmergencyCases();

    const newCase = {
      ...formData,
      id: Date.now(),
      age: Number(formData.age),
      doctorId: Number(formData.doctorId),
    };

    saveEmergencyCases([...existingCases, newCase]);

    alert('Emergency case added successfully!');
    navigate('/admin/emergency');
  };

  return (
    <div className="add-emergency-page">
      <div className="add-emergency-header">
        <h1>Add Emergency Case</h1>
        <p>Register a new emergency patient.</p>
      </div>

      <form className="add-emergency-form" onSubmit={handleSubmit}>
        <h3>Patient Information</h3>

        <div className="emergency-form-grid">
          <div className="emergency-form-group">
            <label>Patient Name *</label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              placeholder="Enter patient name"
              required
            />
          </div>

          <div className="emergency-form-group">
            <label>Age *</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter age"
              min="0"
              max="120"
              required
            />
          </div>

          <div className="emergency-form-group">
            <label>Gender *</label>
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

          <div className="emergency-form-group">
            <label>Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              pattern="[0-9]{10}"
              title="Enter a 10-digit phone number"
              required
            />
          </div>
        </div>

        <h3>Emergency Information</h3>

        <div className="emergency-form-grid">
          <div className="emergency-form-group">
            <label>Emergency Type *</label>
            <select
              name="emergencyType"
              value={formData.emergencyType}
              onChange={handleChange}
              required
            >
              <option value="">Select Emergency Type</option>
              <option value="Accident">Accident</option>
              <option value="Cardiac">Cardiac</option>
              <option value="Breathing Difficulty">Breathing Difficulty</option>
              <option value="Fever">Fever</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="emergency-form-group">
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

          <div className="emergency-form-group">
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

          <div className="emergency-form-group">
            <label>Admission Date *</label>
            <input
              type="date"
              name="admissionDate"
              value={formData.admissionDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="emergency-form-group">
            <label>Admission Time *</label>
            <input
              type="time"
              name="admissionTime"
              value={formData.admissionTime}
              onChange={handleChange}
              required
            />
          </div>

          <div className="emergency-form-group">
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

        <div className="emergency-form-group emergency-description">
          <label>Emergency Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the patient's emergency condition..."
            rows="4"
            required
          />
        </div>

        <div className="emergency-form-actions">
          <button
            type="button"
            className="cancel-emergency-btn"
            onClick={() => navigate('/admin/emergency')}
          >
            Cancel
          </button>

          <button type="submit" className="save-emergency-btn">
            Save Emergency Case
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEmergency;