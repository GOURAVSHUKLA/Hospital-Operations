import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import useAuth from "../../hooks/useAuth";

import {
    FaHospital,
    FaHome,
    FaCalendarCheck,
    FaUserInjured,
    FaClock,
    FaBell,
    FaUserCircle,
    FaSignOutAlt,
} from "react-icons/fa";

function DoctorSidebar() {

    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    const menuItems = [
        {
            name: "Dashboard",
            path: "/doctor/dashboard",
            icon: <FaHome />,
        },
        {
            name: "My Appointments",
            path: "/doctor/appointments",
            icon: <FaCalendarCheck />,
        },
        {
            name: "Patient Records",
            path: "/doctor/patients",
            icon: <FaUserInjured />,
        },
        {
            name: "My Availability",
            path: "/doctor/availability",
            icon: <FaClock />,
        },
        {
            name: "Notifications",
            path: "/doctor/notifications",
            icon: <FaBell />,
        },
        {
            name: "My Profile",
            path: "/doctor/profile",
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

                <p className="menu-heading">DOCTOR PANEL</p>

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

export default DoctorSidebar;