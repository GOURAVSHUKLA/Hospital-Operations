import { useMemo } from "react";

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

import { getDoctors } from "../doctors/doctorStorage";
import { getPatients } from "../patients/patientStorage";
import { getEmployees } from "../employees/employeeStorage";
import { getAppointments } from "../appointments/appointmentStorage";
import { getRooms } from "../rooms/roomStorage";
import { getTransactions } from "../finance/financeStorage";

function Dashboard() {
  const dashboardStats = useMemo(() => {
    const doctors = getDoctors();
    const patients = getPatients();
    const employees = getEmployees();
    const appointments = getAppointments();
    const rooms = getRooms();
    const transactions = getTransactions();

    const availableBeds = rooms.reduce(
      (total, room) => total + Number(room.availableBeds || 0),
      0
    );

    const today = new Date().toISOString().split("T")[0];

    const todaysAppointments = appointments.filter(
      (appointment) => appointment.date === today
    ).length;

    const currentMonth = today.slice(0, 7);

    const monthlyRevenue = transactions
      .filter(
        (transaction) =>
          transaction.type === "Income" &&
          transaction.date?.startsWith(currentMonth)
      )
      .reduce(
        (total, transaction) => total + Number(transaction.amount || 0),
        0
      );

    return [
      {
        id: 1,
        title: "Total Doctors",
        value: doctors.length,
        icon: <FaUserMd />,
      },
      {
        id: 2,
        title: "Total Patients",
        value: patients.length,
        icon: <FaUsers />,
      },
      {
        id: 3,
        title: "Total Employees",
        value: employees.length,
        icon: <FaUserTie />,
      },
      {
        id: 4,
        title: "Available Beds",
        value: availableBeds,
        icon: <FaBed />,
      },
      {
        id: 5,
        title: "Today's Appointments",
        value: todaysAppointments,
        icon: <FaCalendarCheck />,
      },
      {
        id: 6,
        title: "Monthly Revenue",
        value: `₹${monthlyRevenue.toLocaleString("en-IN")}`,
        icon: <FaMoneyBillWave />,
      },
    ];
  }, []);

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