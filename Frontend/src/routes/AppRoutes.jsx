import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Authentication
import Login from "../pages/auth/Login";
import ProtectedRoute from "./ProtectedRoute";

// Dashboard
import Dashboard from "../pages/dashboard/Dashboard";

// Doctors
import DoctorList from "../pages/doctors/DoctorList";
import AddDoctor from "../pages/doctors/AddDoctor";
import EditDoctor from "../pages/doctors/EditDoctor";
import DoctorDetails from "../pages/doctors/DoctorDetails";
import DoctorAvailability from "../pages/doctors/DoctorAvailability";

// Patients
import PatientList from "../pages/patients/PatientList";
import AddPatient from "../pages/patients/AddPatient";
import EditPatient from "../pages/patients/EditPatient";
import PatientDetails from "../pages/patients/PatientDetails";

// Employees
import EmployeeList from "../pages/employees/EmployeeList";
import AddEmployee from "../pages/employees/AddEmployee";
import EditEmployee from "../pages/employees/EditEmployee";
import EmployeeDetails from "../pages/employees/EmployeeDetails";

// Appointments
import AppointmentList from "../pages/appointments/AppointmentList";
import AddAppointment from "../pages/appointments/AddAppointment";
import EditAppointment from "../pages/appointments/EditAppointment";
import AppointmentDetails from "../pages/appointments/AppointmentDetails";

// Rooms & Beds
import RoomList from "../pages/rooms/RoomList";
import AddRoom from "../pages/rooms/AddRoom";
import EditRoom from "../pages/rooms/EditRoom";
import RoomDetails from "../pages/rooms/RoomDetails";

// Emergency
import EmergencyList from "../pages/emergency/EmergencyList";
import AddEmergency from "../pages/emergency/AddEmergency";
import EditEmergency from "../pages/emergency/EditEmergency";
import EmergencyDetails from "../pages/emergency/EmergencyDetails";

// Finance
import FinanceDashboard from "../pages/finance/FinanceDashboard";
import FinanceList from "../pages/finance/FinanceList";
import AddTransaction from "../pages/finance/AddTransaction";
import EditTransaction from "../pages/finance/EditTransaction";
import TransactionDetails from "../pages/finance/TransactionDetails";

// Bills & Payments
import BillsDashboard from "../pages/finance/bills/BillsDashboard";
import BillList from "../pages/finance/bills/BillList";
import AddBill from "../pages/finance/bills/AddBill";
import EditBill from "../pages/finance/bills/EditBill";
import BillDetails from "../pages/finance/bills/BillDetails";
import AddPayment from "../pages/finance/bills/AddPayment";

// Notifications
import NotificationList from "../pages/notifications/NotificationList";

// Settings
import Settings from "../pages/settings/Settings";

// Layout
import AdminLayout from "../components/layout/AdminLayout";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Login */}
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />

                {/* ADMIN ROUTES */}
                <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
                    <Route path="/admin" element={<AdminLayout />}>

                        {/* Dashboard */}
                        <Route path="dashboard" element={<Dashboard />} />

                        {/* Doctors */}
                        <Route path="doctors" element={<DoctorList />} />
                        <Route path="doctors/add" element={<AddDoctor />} />
                        <Route path="doctors/edit/:id" element={<EditDoctor />} />
                        <Route path="doctors/details/:id" element={<DoctorDetails />} />
                        <Route path="doctors/availability" element={<DoctorAvailability />} />

                        {/* Patients */}
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
                        <Route path="appointments/details/:id" element={<AppointmentDetails />} />

                        {/* Rooms & Beds */}
                        <Route path="rooms" element={<RoomList />} />
                        <Route path="rooms/add" element={<AddRoom />} />
                        <Route path="rooms/edit/:id" element={<EditRoom />} />
                        <Route path="rooms/details/:id" element={<RoomDetails />} />

                        {/* Emergency */}
                        <Route path="emergency" element={<EmergencyList />} />
                        <Route path="emergency/add" element={<AddEmergency />} />
                        <Route path="emergency/edit/:id" element={<EditEmergency />} />
                        <Route path="emergency/details/:id" element={<EmergencyDetails />} />

                        {/* Finance */}
                        <Route path="finance" element={<FinanceDashboard />} />
                        <Route path="finance/transactions" element={<FinanceList />} />
                        <Route path="finance/add" element={<AddTransaction />} />
                        <Route path="finance/edit/:id" element={<EditTransaction />} />
                        <Route path="finance/details/:id" element={<TransactionDetails />} />

                        {/* Bills & Payments */}
                        <Route path="finance/bills" element={<BillsDashboard />} />
                        <Route path="finance/bills/list" element={<BillList />} />
                        <Route path="finance/bills/add" element={<AddBill />} />
                        <Route path="finance/bills/edit/:id" element={<EditBill />} />
                        <Route path="finance/bills/details/:id" element={<BillDetails />} />
                        <Route path="finance/bills/payment/:id" element={<AddPayment />} />

                        {/* Notifications */}
                        <Route path="notifications" element={<NotificationList />} />

                        {/* Settings */}
                        <Route path="settings" element={<Settings />} />

                    </Route>
                </Route>

                {/* Unknown routes */}
                <Route
                    path="*"
                    element={<Navigate to="/login" replace />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;