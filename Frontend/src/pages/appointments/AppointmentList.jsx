import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAppointments, saveAppointments } from './appointmentStorage';
import { getDoctors } from '../doctors/doctorStorage';
import { getPatients } from '../patients/patientStorage';
import './AppointmentList.css';

function AppointmentList() {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState(getAppointments());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const doctors = getDoctors();
  const patients = getPatients();

  // Find patient and doctor names using their IDs
  const getPatientName = (patientId) =>
    patients.find((patient) => Number(patient.id) === Number(patientId))?.name
    || 'Patient Not Found';

  const getDoctorName = (doctorId) =>
    doctors.find((doctor) => Number(doctor.id) === Number(doctorId))?.name
    || 'Doctor Not Found';

  // Search and filter appointments
  const filteredAppointments = appointments.filter((appointment) => {
    const patientName = getPatientName(appointment.patientId).toLowerCase();
    const doctorName = getDoctorName(appointment.doctorId).toLowerCase();

    const matchesSearch =
      patientName.includes(searchTerm.toLowerCase()) ||
      doctorName.includes(searchTerm.toLowerCase()) ||
      appointment.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'All' || appointment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Delete appointment
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this appointment?'
    );

    if (confirmDelete) {
      const updatedAppointments = appointments.filter(
        (appointment) => appointment.id !== id
      );

      setAppointments(updatedAppointments);
      saveAppointments(updatedAppointments);
    }
  };

  return (
    <div className="appointment-list-page">

      <div className="appointment-list-header">
        <div>
          <h1>Appointments</h1>
          <p>Manage all hospital appointments here.</p>
        </div>

        <button
          className="add-appointment-btn"
          onClick={() => navigate('/admin/appointments/add')}
        >
          + Book Appointment
        </button>
      </div>

      <div className="appointment-filters">
        <input
          type="text"
          placeholder="Search patient, doctor or department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div className="appointment-table-container">
        <table className="appointment-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Department</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.id}</td>
                  <td>{getPatientName(appointment.patientId)}</td>
                  <td>{getDoctorName(appointment.doctorId)}</td>
                  <td>{appointment.department}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.time}</td>

                  <td>
                    <span
                      className={`appointment-status ${appointment.status.toLowerCase()}`}
                    >
                      {appointment.status}
                    </span>
                  </td>

                  <td className="appointment-actions">
                    <button
                      className="appointment-view-btn"
                      onClick={() =>
                        navigate(`/admin/appointments/details/${appointment.id}`)
                      }
                    >
                      View
                    </button>

                    <button
                      className="appointment-edit-btn"
                      onClick={() =>
                        navigate(`/admin/appointments/edit/${appointment.id}`)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="appointment-delete-btn"
                      onClick={() => handleDelete(appointment.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="no-appointments">
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default AppointmentList;