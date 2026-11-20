import { FaCalendarCheck, FaUserInjured, FaClock, FaCheckCircle } from "react-icons/fa";
import "./DoctorDashboard.css";
function DoctorDashboard() {

    const stats = [
        {
            title: "Today's Appointments",
            value: 12,
            icon: <FaCalendarCheck />,
            color: "#4e73df"
        },
        {
            title: "Total Patients",
            value: 85,
            icon: <FaUserInjured />,
            color: "#1cc88a"
        },
        {
            title: "Pending Appointments",
            value: 4,
            icon: <FaClock />,
            color: "#f6c23e"
        },
        {
            title: "Completed Appointments",
            value: 8,
            icon: <FaCheckCircle />,
            color: "#36b9cc"
        }
    ];

    const appointments = [
        {
            id: 1,
            patient: "Rahul Sharma",
            time: "09:00 AM",
            reason: "Regular Checkup",
            status: "Confirmed"
        },
        {
            id: 2,
            patient: "Priya Verma",
            time: "10:30 AM",
            reason: "Fever",
            status: "Confirmed"
        },
        {
            id: 3,
            patient: "Amit Patel",
            time: "12:00 PM",
            reason: "Heart Checkup",
            status: "Pending"
        },
        {
            id: 4,
            patient: "Neha Singh",
            time: "02:00 PM",
            reason: "Follow-up",
            status: "Confirmed"
        }
    ];

    return (
        <div className="doctor-dashboard">

            <div className="dashboard-header">
                <div>
                    <h2>Doctor Dashboard</h2>
                    <p>Welcome back! Here's your daily overview.</p>
                </div>
            </div>

            {/* Statistics Cards */}

            <div className="dashboard-stats">

                {stats.map((stat, index) => (

                    <div className="stat-card" key={index}>

                        <div>
                            <p>{stat.title}</p>
                            <h2>{stat.value}</h2>
                        </div>

                        <div
                            className="stat-icon"
                            style={{ backgroundColor: stat.color }}
                        >
                            {stat.icon}
                        </div>

                    </div>

                ))}

            </div>

            {/* Today's Appointments */}

            <div className="dashboard-section">

                <h3>Today's Appointments</h3>

                <div className="table-responsive">

                    <table className="dashboard-table">

                        <thead>
                            <tr>
                                <th>Patient Name</th>
                                <th>Time</th>
                                <th>Reason</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>

                            {appointments.map((appointment) => (

                                <tr key={appointment.id}>

                                    <td>{appointment.patient}</td>

                                    <td>{appointment.time}</td>

                                    <td>{appointment.reason}</td>

                                    <td>
                                        <span className={`status-badge ${appointment.status.toLowerCase()}`}>
                                            {appointment.status}
                                        </span>
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}

export default DoctorDashboard;