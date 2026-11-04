import { useNavigate, useParams } from 'react-router-dom';
import { getAppointments } from './appointmentStorage';
import { getDoctors } from '../doctors/doctorStorage';
import { getPatients } from '../patients/patientStorage';
import './AppointmentDetails.css';

function AppointmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const appointments = getAppointments();
  const doctors = getDoctors();
  const patients = getPatients();

  const appointment = appointments.find(
    (item) => Number(item.id) === Number(id)
  );

  if (!appointment) {
    return (
      <div className="appointment-details-page">
        <h2>Appointment not found</h2>
        <button onClick={() => navigate('/admin/appointments')}>
          Back to Appointments
        </button>
      </div>
    );
  }

  const patient = patients.find(
    (item) => Number(item.id) === Number(appointment.patientId)
  );

  const doctor = doctors.find(
    (item) => Number(item.id) === Number(appointment.doctorId)
  );

  return (
    <div className="appointment-details-page">
      <div className="appointment-details-header">
        <div>
          <h1>Appointment Details</h1>
          <p>Complete information about this appointment.</p>
        </div>

        <button
          className="back-appointments-btn"
          onClick={() => navigate('/admin/appointments')}
        >
          Back to Appointments
        </button>
      </div>

      <div className="appointment-details-card">
        <div className="appointment-details-title">
          <h2>Appointment #{appointment.id}</h2>

          <span className={`appointment-status ${appointment.status.toLowerCase()}`}>
            {appointment.status}
          </span>
        </div>

        <div className="appointment-details-grid">
          <div className="appointment-detail-item">
            <label>Patient Name</label>
            <p>{patient?.name || 'Patient Not Found'}</p>
          </div>

          <div className="appointment-detail-item">
            <label>Doctor Name</label>
            <p>{doctor?.name || 'Doctor Not Found'}</p>
          </div>

          <div className="appointment-detail-item">
            <label>Department</label>
            <p>{appointment.department}</p>
          </div>

          <div className="appointment-detail-item">
            <label>Appointment Date</label>
            <p>{appointment.date}</p>
          </div>

          <div className="appointment-detail-item">
            <label>Appointment Time</label>
            <p>{appointment.time}</p>
          </div>

          <div className="appointment-detail-item">
            <label>Reason</label>
            <p>{appointment.reason}</p>
          </div>
        </div>

        <div className="appointment-details-actions">
          <button
            className="edit-appointment-details-btn"
            onClick={() => navigate(`/admin/appointments/edit/${appointment.id}`)}
          >
            Edit Appointment
          </button>
        </div>
      </div>
    </div>
  );
}

export default AppointmentDetails;