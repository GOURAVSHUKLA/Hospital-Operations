import {
    FaCalendarCheck,
    FaFileMedical,
    FaMoneyBillWave,
    FaUserMd,
    FaPlus,
    FaClock
} from "react-icons/fa";

import "./PatientDashboard.css";

function PatientDashboard() {

    const stats = [
        {
            title: "Total Appointments",
            value: 12,
            icon: <FaCalendarCheck />,
            color: "#4e73df"
        },
        {
            title: "Upcoming Appointments",
            value: 3,
            icon: <FaClock />,
            color: "#1cc88a"
        },
        {
            title: "Medical Records",
            value: 8,
            icon: <FaFileMedical />,
            color: "#36b9cc"
        },
        {
            title: "Pending Bills",
            value: "₹2,500",
            icon: <FaMoneyBillWave />,
            color: "#f6c23e"
        }
    ];

    const appointments = [
        {
            id: 1,
            doctor: "Dr. Amit Sharma",
            department: "Cardiology",
            date: "22 Nov 2026",
            time: "10:00 AM",
            status: "Confirmed"
        },
        {
            id: 2,
            doctor: "Dr. Neha Verma",
            department: "Neurology",
            date: "25 Nov 2026",
            time: "11:30 AM",
            status: "Pending"
        },
        {
            id: 3,
            doctor: "Dr. Raj Patel",
            department: "Orthopedics",
            date: "28 Nov 2026",
            time: "02:00 PM",
            status: "Confirmed"
        }
    ];

    const medicalRecords = [
        {
            id: 1,
            title: "Blood Test Report",
            date: "15 Nov 2026",
            doctor: "Dr. Amit Sharma"
        },
        {
            id: 2,
            title: "General Health Checkup",
            date: "10 Nov 2026",
            doctor: "Dr. Neha Verma"
        },
        {
            id: 3,
            title: "ECG Report",
            date: "05 Nov 2026",
            doctor: "Dr. Amit Sharma"
        }
    ];

    return (

        <div className="patient-dashboard">

            {/* Welcome Section */}

            <div className="patient-welcome">

                <div>
                    <h2>Welcome Back!</h2>
                    <p>
                        Manage your appointments and health
                        information from your dashboard.
                    </p>
                </div>

                <button className="book-appointment-btn">
                    <FaPlus />
                    Book Appointment
                </button>

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

            {/* Upcoming Appointments */}

            <div className="dashboard-section">

                <h3>
                    <FaCalendarCheck />
                    Upcoming Appointments
                </h3>

                <div className="table-responsive">

                    <table className="dashboard-table">

                        <thead>
                            <tr>
                                <th>Doctor</th>
                                <th>Department</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>

                            {appointments.map((appointment) => (

                                <tr key={appointment.id}>

                                    <td>{appointment.doctor}</td>
                                    <td>{appointment.department}</td>
                                    <td>{appointment.date}</td>
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

            {/* Medical Records */}

            <div className="dashboard-section">

                <h3>
                    <FaFileMedical />
                    Recent Medical Records
                </h3>

                <div className="table-responsive">

                    <table className="dashboard-table">

                        <thead>
                            <tr>
                                <th>Record</th>
                                <th>Date</th>
                                <th>Doctor</th>
                            </tr>
                        </thead>

                        <tbody>

                            {medicalRecords.map((record) => (

                                <tr key={record.id}>

                                    <td>{record.title}</td>
                                    <td>{record.date}</td>
                                    <td>{record.doctor}</td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

            {/* Doctor Assistance */}

            <div className="dashboard-section patient-help">

                <h3>
                    <FaUserMd />
                    Need Medical Assistance?
                </h3>

                <p>
                    Book an appointment with our doctors
                    to get the medical care you need.
                </p>

            </div>

        </div>
    );
}

export default PatientDashboard;