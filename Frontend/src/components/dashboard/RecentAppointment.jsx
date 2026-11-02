import "./RecentAppointments.css";

const appointments = [
  {
    id: 1,
    patient: "Rahul Sharma",
    doctor: "Dr. Amit",
    department: "Cardiology",
    date: "02 Nov 2026",
    status: "Confirmed",
  },
  {
    id: 2,
    patient: "Priya Verma",
    doctor: "Dr. Neha",
    department: "Neurology",
    date: "02 Nov 2026",
    status: "Pending",
  },
  {
    id: 3,
    patient: "Aman Singh",
    doctor: "Dr. Raj",
    department: "Orthopedics",
    date: "03 Nov 2026",
    status: "Completed",
  },
  {
    id: 4,
    patient: "Sneha Patel",
    doctor: "Dr. Karan",
    department: "Dermatology",
    date: "03 Nov 2026",
    status: "Confirmed",
  },
];

function RecentAppointments() {
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
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.patient}</td>
                <td>{appointment.doctor}</td>
                <td>{appointment.department}</td>
                <td>{appointment.date}</td>
                <td>
                  <span className={`status ${appointment.status.toLowerCase()}`}>
                    {appointment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentAppointments;