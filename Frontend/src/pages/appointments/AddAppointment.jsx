import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAppointments, saveAppointments } from './appointmentStorage';
import { getDoctors } from '../doctors/doctorStorage';
import { getPatients } from '../patients/patientStorage';
import './AddAppointment.css';

function AddAppointment() {
  const navigate = useNavigate();

  const doctors = getDoctors();
  const patients = getPatients();

  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    date: '',
    time: '',
    department: '',
    reason: '',
    status: 'Pending',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Automatically select the doctor's specialization
    if (name === 'doctorId') {
      const selectedDoctor = doctors.find(
        (doctor) => Number(doctor.id) === Number(value)
      );

      setFormData((previousData) => ({
        ...previousData,
        doctorId: value,
        department: selectedDoctor?.specialization || '',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const appointments = getAppointments();

    const newAppointment = {
      id: Date.now(),
      ...formData,
      patientId: Number(formData.patientId),
      doctorId: Number(formData.doctorId),
    };

    saveAppointments([...appointments, newAppointment]);

    alert('Appointment booked successfully!');
    navigate('/admin/appointments');
  };

  return (
    <div className="add-appointment-page">
      <div className="add-appointment-header">
        <h1>Book Appointment</h1>
        <p>Enter the appointment details below.</p>
      </div>

      <form className="add-appointment-form" onSubmit={handleSubmit}>
        <div className="appointment-form-group">
          <label>Select Patient</label>
          <select
            name="patientId"
            value={formData.patientId}
            onChange={handleChange}
            required
          >
            <option value="">Select Patient</option>

            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.name}
              </option>
            ))}
          </select>
        </div>

        <div className="appointment-form-group">
          <label>Select Doctor</label>
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

        <div className="appointment-form-group">
          <label>Department</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            readOnly
            placeholder="Select a doctor first"
            required
          />
        </div>

        <div className="appointment-form-group">
          <label>Appointment Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={new Date().toLocaleDateString('en-CA')}
            required
          />
        </div>

        <div className="appointment-form-group">
          <label>Appointment Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>

        <div className="appointment-form-group">
          <label>Reason for Appointment</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Enter reason for appointment"
            rows="4"
            required
          />
        </div>

        <div className="appointment-form-group">
          <label>Appointment Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="appointment-form-actions">
          <button type="submit" className="save-appointment-btn">
            Book Appointment
          </button>

          <button
            type="button"
            className="cancel-appointment-btn"
            onClick={() => navigate('/admin/appointments')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddAppointment;