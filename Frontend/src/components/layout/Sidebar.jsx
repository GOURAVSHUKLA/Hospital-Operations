import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { FaUserInjured } from "react-icons/fa";

import {
  FaHospital,
  FaHome,
  FaUserMd,
  FaUsers,
  FaUserNurse,
  FaCalendarCheck,
  FaBed,
  FaAmbulance,
  FaMoneyBillWave,
  FaBell,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <FaHome />,
    },
    {
      name: "Doctors",
      path: "/admin/doctors",
      icon: <FaUserMd />,
      end: true,
    },
    {
      name: "Patients",
      path: "/admin/patients",
      icon: <FaUserInjured />,
      end: true,
    },
    {
      name: "Doctor Availability",
      path: "/admin/doctors/availability",
      icon: <FaCalendarCheck />,
    },
   
    {
      name: "Employees",
      path: "/admin/employees",
      icon: <FaUserNurse />,
    },
    {
      name: "Appointments",
      path: "/admin/appointments",
      icon: <FaCalendarCheck />,
    },
    {
      name: "Rooms & Beds",
      path: "/admin/rooms",
      icon: <FaBed />,
    },
    {
      name: "Emergency",
      path: "/admin/emergency",
      icon: <FaAmbulance />,
    },
    {
      name: "Finance",
      path: "/admin/finance",
      icon: <FaMoneyBillWave />,
    },
    {
      name: "Notifications",
      path: "/admin/notifications",
      icon: <FaBell />,
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: <FaCog />,
    },
  ];
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <FaHospital className="hospital-icon" />
        <h2>MediCare</h2>
      </div>
      <nav className="sidebar-menu">
        <p className="menu-heading">MAIN MENU</p>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end || false}
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <span className="menu-icon">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-logout">
        <button
          className="logout-button"
          onClick={() => alert("Logout functionality coming soon")}
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
