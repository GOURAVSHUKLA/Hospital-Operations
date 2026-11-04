import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getAppointments,
  saveAppointments,
} from './appointmentStorage';
import { getDoctors } from '../doctors/doctorStorage';
import { getPatients } from '../patients/patientStorage';
import './EditAppointment.css';

function EditAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const doctors = getDoctors();
  const patients = getPatients();
  const appointments = getAppointments();

  const existingAppointment = appointments.find(
    (appointment) => Number(appointment.id) === Number(id)
  );

  const [formData, setFormData] = useState(() => {
    if (!existingAppointment) return null;

    return {
      ...existingAppointment,
      patientId: String(existingAppointment.patientId),
      doctorId: String(existingAppointment.doctorId),
    };
  });

  if (!existingAppointment || !formData) {
    return (
      <div className="edit-appointment-page">
        <h2>Appointment not found</h2>
        <button onClick={() => navigate('/admin/appointments')}>
          Back to Appointments
        </button>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'doctorId') {
      const selectedDoctor = doctors.find(
        (doctor) => Number(doctor.id) === Number(value)
      );

      setFormData((previousData) => ({
        ...previousData,
        doctorId: value,
        department: selectedDoctor?.specialization || '',
      }));

      return;
    }

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedAppointments = appointments.map((appointment) =>
      Number(appointment.id) === Number(id)
        ? {
            ...formData,
            patientId: Number(formData.patientId),
            doctorId: Number(formData.doctorId),
          }
        : appointment
    );

    saveAppointments(updatedAppointments);

    alert('Appointment updated successfully!');
    navigate('/admin/appointments');
  };

  return (
    <div className="edit-appointment-page">
      <div className="edit-appointment-header">
        <h1>Edit Appointment</h1>
        <p>Update the appointment details below.</p>
      </div>

      <form className="edit-appointment-form" onSubmit={handleSubmit}>
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
          />
        </div>

        <div className="appointment-form-group">
          <label>Appointment Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
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
            Update Appointment
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

export default EditAppointment;