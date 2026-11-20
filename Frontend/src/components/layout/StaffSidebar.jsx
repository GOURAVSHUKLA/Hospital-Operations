import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import useAuth from "../../hooks/useAuth";

import {
    FaHospital,
    FaHome,
    FaUserInjured,
    FaCalendarCheck,
    FaBed,
    FaClock,
    FaBell,
    FaUserCircle,
    FaSignOutAlt,
    FaClipboardList,
} from "react-icons/fa";

function StaffSidebar() {

    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    const menuItems = [
        {
            name: "Dashboard",
            path: "/staff/dashboard",
            icon: <FaHome />,
        },
        {
            name: "Patient Registration",
            path: "/staff/patients",
            icon: <FaUserInjured />,
        },
        {
            name: "Appointments",
            path: "/staff/appointments",
            icon: <FaCalendarCheck />,
        },
        {
            name: "Admissions",
            path: "/staff/admissions",
            icon: <FaClipboardList />,
        },
        {
            name: "Rooms & Beds",
            path: "/staff/rooms",
            icon: <FaBed />,
        },
        {
            name: "Staff Availability",
            path: "/staff/availability",
            icon: <FaClock />,
        },
        {
            name: "Notifications",
            path: "/staff/notifications",
            icon: <FaBell />,
        },
        {
            name: "My Profile",
            path: "/staff/profile",
            icon: <FaUserCircle />,
        },
    ];

    return (
        <aside className="sidebar">

            <div className="sidebar-logo">
                <FaHospital className="hospital-icon" />
                <h2>MediCare</h2>
            </div>

            <nav className="sidebar-menu">

                <p className="menu-heading">STAFF PANEL</p>

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

export default StaffSidebar;