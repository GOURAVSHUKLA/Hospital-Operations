import { useEffect, useState } from "react";
import { getAppointments } from "../../pages/appointments/appointmentStorage";
import { getDoctors } from "../../pages/doctors/doctorStorage";
import { getPatients } from "../../pages/patients/patientStorage";
import "./RecentAppointments.css";

function RecentAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const savedAppointments = getAppointments();
    const doctors = getDoctors();
    const patients = getPatients();

    const recentAppointments = savedAppointments
      .map((appointment) => {
        const patient = patients.find(
          (item) => item.id === appointment.patientId
        );
        const doctor = doctors.find(
          (item) => item.id === appointment.doctorId
        );

        return {
          ...appointment,
          patientName: patient ? patient.name : "Unknown Patient",
          doctorName: doctor ? doctor.name : "Unknown Doctor",
        };
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    setAppointments(recentAppointments);
  }, []);

  return (
    <div className="recent-appointments">
      <h2>Recent Appointments</h2>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Department</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="5">No appointments found.</td>
              </tr>
            ) : (
              appointments.map((appointment) => {
                const status = appointment.status || "Unknown";

                return (
                  <tr key={appointment.id}>
                    <td>{appointment.patientName}</td>
                    <td>{appointment.doctorName}</td>
                    <td>{appointment.department}</td>
                    <td>{appointment.date}</td>
                    <td>
                      <span
                        className={`status ${status
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        {status}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentAppointments;
