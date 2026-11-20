import {
    FaUserPlus,
    FaCalendarCheck,
    FaBed,
    FaUserNurse,
    FaClipboardList,
    FaClock
} from "react-icons/fa";

import "./StaffDashboard.css";

function StaffDashboard() {

    const stats = [
        {
            title: "Registered Patients",
            value: 450,
            icon: <FaUserPlus />,
            color: "#4e73df"
        },
        {
            title: "Today's Appointments",
            value: 35,
            icon: <FaCalendarCheck />,
            color: "#1cc88a"
        },
        {
            title: "Active Admissions",
            value: 28,
            icon: <FaBed />,
            color: "#f6c23e"
        },
        {
            title: "Available Beds",
            value: 18,
            icon: <FaUserNurse />,
            color: "#36b9cc"
        }
    ];

    const recentPatients = [
        {
            id: 1,
            name: "Rahul Sharma",
            age: 28,
            department: "Cardiology",
            date: "20 Nov 2026"
        },
        {
            id: 2,
            name: "Priya Verma",
            age: 35,
            department: "Neurology",
            date: "20 Nov 2026"
        },
        {
            id: 3,
            name: "Amit Patel",
            age: 42,
            department: "Orthopedics",
            date: "20 Nov 2026"
        },
        {
            id: 4,
            name: "Neha Singh",
            age: 31,
            department: "General Medicine",
            date: "20 Nov 2026"
        }
    ];

    const appointments = [
        {
            id: 1,
            patient: "Rahul Sharma",
            doctor: "Dr. Amit Sharma",
            time: "09:00 AM",
            status: "Confirmed"
        },
        {
            id: 2,
            patient: "Priya Verma",
            doctor: "Dr. Neha Verma",
            time: "10:30 AM",
            status: "Pending"
        },
        {
            id: 3,
            patient: "Amit Patel",
            doctor: "Dr. Raj Patel",
            time: "12:00 PM",
            status: "Confirmed"
        }
    ];

    return (

        <div className="staff-dashboard">

            {/* Header */}

            <div className="dashboard-header">
                <div>
                    <h2>Staff Dashboard</h2>
                    <p>
                        Welcome back! Here's your hospital
                        operations overview.
                    </p>
                </div>
            </div>

            {/* Statistics */}

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

            {/* Recent Patients */}

            <div className="dashboard-section">

                <h3>
                    <FaUserPlus /> Recent Patient Registrations
                </h3>

                <div className="table-responsive">

                    <table className="dashboard-table">

                        <thead>
                            <tr>
                                <th>Patient Name</th>
                                <th>Age</th>
                                <th>Department</th>
                                <th>Registration Date</th>
                            </tr>
                        </thead>

                        <tbody>

                            {recentPatients.map((patient) => (

                                <tr key={patient.id}>
                                    <td>{patient.name}</td>
                                    <td>{patient.age}</td>
                                    <td>{patient.department}</td>
                                    <td>{patient.date}</td>
                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

            {/* Upcoming Appointments */}

            <div className="dashboard-section">

                <h3>
                    <FaCalendarCheck /> Upcoming Appointments
                </h3>

                <div className="table-responsive">

                    <table className="dashboard-table">

                        <thead>
                            <tr>
                                <th>Patient</th>
                                <th>Doctor</th>
                                <th>Time</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>

                            {appointments.map((appointment) => (

                                <tr key={appointment.id}>
                                    <td>{appointment.patient}</td>
                                    <td>{appointment.doctor}</td>
                                    <td>{appointment.time}</td>

                                    <td>
                                        <span
                                            className={`status-badge ${appointment.status.toLowerCase()}`}
                                        >
                                            {appointment.status}
                                        </span>
                                    </td>
                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

            {/* Staff Availability */}

            <div className="dashboard-section availability-card">

                <h3>
                    <FaClock /> Staff Availability
                </h3>

                <p>
                    Manage your working schedule and availability
                    from the Staff Availability section.
                </p>

            </div>

        </div>
    );
}

export default StaffDashboard;