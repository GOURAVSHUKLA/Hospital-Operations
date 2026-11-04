import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import DoctorList from "../pages/doctors/DoctorList";
import AddDoctor from "../pages/doctors/AddDoctor";
import EditDoctor from "../pages/doctors/EditDoctor";
import DoctorDetails from "../pages/doctors/DoctorDetails";
import DoctorAvailability from "../pages/doctors/DoctorAvailability";
import PatientList from "../pages/patients/PatientList";
import AddPatient from "../pages/patients/AddPatient";
import EditPatient from "../pages/patients/EditPatient";
import PatientDetails from "../pages/patients/PatientDetails";
import EmployeeList from "../pages/employees/EmployeeList";
import AddEmployee from "../pages/employees/AddEmployee";
import EditEmployee from "../pages/employees/EditEmployee";
import EmployeeDetails from "../pages/employees/EmployeeDetails";
import AppointmentList from "../pages/appointments/AppointmentList";
import AddAppointment from "../pages/appointments/AddAppointment";
import EditAppointment from "../pages/appointments/EditAppointment";
import AppointmentDetails from "../pages/appointments/AppointmentDetails";
import RoomList from "../pages/rooms/RoomList";
import AddRoom from "../pages/rooms/AddRoom";
import EditRoom from "../pages/rooms/EditRoom";
import RoomDetails from "../pages/rooms/RoomDetails";
import EmergencyList from "../pages/emergency/EmergencyList";
import AddEmergency from "../pages/emergency/AddEmergency";

// Layout
import AdminLayout from "../components/layout/AdminLayout";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="doctors/edit/:id" element={<EditDoctor />} />
          <Route path="patients" element={<PatientList />} />
          <Route path="patients" element={<PatientList />} />
          <Route path="patients/add" element={<AddPatient />} />
          <Route path="patients/edit/:id" element={<EditPatient />} />
          <Route path="patients/details/:id" element={<PatientDetails />} />

          {/* Employees */}
          <Route path="employees" element={<EmployeeList />} />
          <Route path="employees/add" element={<AddEmployee />} />
          <Route path="employees/edit/:id" element={<EditEmployee />} />
          <Route path="employees/details/:id" element={<EmployeeDetails />} />

          {/* Appointments */}
          <Route path="appointments" element={<AppointmentList />} />
          <Route path="appointments/add" element={<AddAppointment />} />
          <Route path="appointments/edit/:id" element={<EditAppointment />} />
          <Route
            path="appointments/details/:id"
            element={<AppointmentDetails />}
          />

          {/* Rooms & Beds */}
          <Route path="rooms" element={<RoomList />} />
          <Route path="rooms/add" element={<AddRoom />} />
          <Route path="rooms/edit/:id" element={<EditRoom />} />
          <Route path="rooms/details/:id" element={<RoomDetails />} />

          {/* Emergency */}
          <Route path="emergency" element={<EmergencyList />} />
          <Route path="emergency/add" element={<AddEmergency />} />

          {/* Dashboard */}
          <Route path="dashboard" element={<Dashboard />} />

          {/* Doctors */}
          <Route path="doctors" element={<DoctorList />} />
          <Route path="doctors/add" element={<AddDoctor />} />
          <Route path="doctors/edit/:id" element={<EditDoctor />} />
          <Route path="doctors/details/:id" element={<DoctorDetails />} />
          <Route path="doctors/availability" element={<DoctorAvailability />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
