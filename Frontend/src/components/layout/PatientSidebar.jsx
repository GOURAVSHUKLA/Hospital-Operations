import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import useAuth from "../../hooks/useAuth";

import {
    FaHospital,
    FaHome,
    FaCalendarCheck,
    FaFileMedical,
    FaFileInvoiceDollar,
    FaBell,
    FaUserCircle,
    FaSignOutAlt,
} from "react-icons/fa";

function PatientSidebar() {

    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    const menuItems = [
        {
            name: "Dashboard",
            path: "/patient/dashboard",
            icon: <FaHome />,
        },
        {
            name: "Book Appointment",
            path: "/patient/appointments/book",
            icon: <FaCalendarCheck />,
        },
        {
            name: "My Appointments",
            path: "/patient/appointments",
            icon: <FaCalendarCheck />,
        },
        {
            name: "Medical Records",
            path: "/patient/medical-records",
            icon: <FaFileMedical />,
        },
        {
            name: "Bills & Payments",
            path: "/patient/bills",
            icon: <FaFileInvoiceDollar />,
        },
        {
            name: "Notifications",
            path: "/patient/notifications",
            icon: <FaBell />,
        },
        {
            name: "My Profile",
            path: "/patient/profile",
            icon: <FaUserCircle />,
        },
    ];

    return (
        <aside className="sidebar">

            {/* Logo */}
            <div className="sidebar-logo">
                <FaHospital className="hospital-icon" />
                <h2>MediCare</h2>
            </div>

            {/* Navigation */}
            <nav className="sidebar-menu">

                <p className="menu-heading">PATIENT PANEL</p>

                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end
                        className={({ isActive }) =>
                            isActive ? "menu-item active" : "menu-item"
                        }
                    >
                        <span className="menu-icon">
                            {item.icon}
                        </span>

                        <span>{item.name}</span>

                    </NavLink>
                ))}

            </nav>

            {/* Logout */}
            <div className="sidebar-logout">

                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    <FaSignOutAlt />
                    <span>Logout</span>
                </button>

            </div>

        </aside>
    );
}

export default PatientSidebar;