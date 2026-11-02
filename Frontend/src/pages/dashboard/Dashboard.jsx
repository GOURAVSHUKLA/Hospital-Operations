import StatCard from "../../components/dashboard/StatCard";
import "./Dashboard.css";

import {
  FaUserMd,
  FaUsers,
  FaUserTie,
  FaBed,
  FaCalendarCheck,
  FaMoneyBillWave,
} from "react-icons/fa";

import AppointmentChart from "../../components/dashboard/AppointmentChart";
import RecentAppointments from "../../components/dashboard/RecentAppointment";

function Dashboard() {
  const dashboardStats = [
    {
      id: 1,
      title: "Total Doctors",
      value: 25,
      icon: <FaUserMd />,
    },
    {
      id: 2,
      title: "Total Patients",
      value: 450,
      icon: <FaUsers />,
    },
    {
      id: 3,
      title: "Total Employees",
      value: 60,
      icon: <FaUserTie />,
    },
    {
      id: 4,
      title: "Available Beds",
      value: 35,
      icon: <FaBed />,
    },
    {
      id: 5,
      title: "Today's Appointments",
      value: 18,
      icon: <FaCalendarCheck />,
    },
    {
      id: 6,
      title: "Monthly Revenue",
      value: "₹2,50,000",
      icon: <FaMoneyBillWave />,
    },
  ];

  return (
    <div className="dashboard">
      <h1>Welcome to Admin Dashboard</h1>
      <p>Manage your hospital operations from here.</p>

      <div className="stats-container">
        {dashboardStats.map((stat) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>

      <AppointmentChart />
      <RecentAppointments />
    </div>
  );
}

export default Dashboard;