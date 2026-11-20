import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getDashboardRoute } from "../utils/dashboardRoutes";

// Authentication
import Login from "../pages/auth/Login";
import ProtectedRoute from "./ProtectedRoute";

// Admin Dashboard
import Dashboard from "../pages/dashboard/Dashboard";

// Other Dashboards
import DoctorDashboard from "../pages/DoctorDashboard";
import StaffDashboard from "../pages/StaffDashboard";
import PatientDashboard from "../pages/PatientDashboard";

// Layouts
import AdminLayout from "../components/layout/AdminLayout";
import DoctorLayout from "../components/layout/DoctorLayout";
import StaffLayout from "../components/layout/StaffLayout";
import PatientLayout from "../components/layout/PatientLayout";

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

// Rooms
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

// Bills
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

function HomeRoute() {
    const { isAuthenticated, loading, user } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Login />;
    }

    const dashboard = getDashboardRoute(user?.role);
    return dashboard
        ? <Navigate to={dashboard} replace />
        : <Login />;
}

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                {/* LOGIN */}
                <Route path="/" element={<HomeRoute />} />
                <Route path="/login" element={<Login />} />

                {/* ADMIN */}
                <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
                    <Route path="/admin" element={<AdminLayout />}>

                        <Route path="dashboard" element={<Dashboard />} />

                        <Route path="doctors" element={<DoctorList />} />
                        <Route path="doctors/add" element={<AddDoctor />} />
                        <Route path="doctors/edit/:id" element={<EditDoctor />} />
                        <Route path="doctors/details/:id" element={<DoctorDetails />} />
                        <Route path="doctors/availability" element={<DoctorAvailability />} />

                        <Route path="patients" element={<PatientList />} />
                        <Route path="patients/add" element={<AddPatient />} />
                        <Route path="patients/edit/:id" element={<EditPatient />} />
                        <Route path="patients/details/:id" element={<PatientDetails />} />

                        <Route path="employees" element={<EmployeeList />} />
                        <Route path="employees/add" element={<AddEmployee />} />
                        <Route path="employees/edit/:id" element={<EditEmployee />} />
                        <Route path="employees/details/:id" element={<EmployeeDetails />} />

                        <Route path="appointments" element={<AppointmentList />} />
                        <Route path="appointments/add" element={<AddAppointment />} />
                        <Route path="appointments/edit/:id" element={<EditAppointment />} />
                        <Route path="appointments/details/:id" element={<AppointmentDetails />} />

                        <Route path="rooms" element={<RoomList />} />
                        <Route path="rooms/add" element={<AddRoom />} />
                        <Route path="rooms/edit/:id" element={<EditRoom />} />
                        <Route path="rooms/details/:id" element={<RoomDetails />} />

                        <Route path="emergency" element={<EmergencyList />} />
                        <Route path="emergency/add" element={<AddEmergency />} />
                        <Route path="emergency/edit/:id" element={<EditEmergency />} />
                        <Route path="emergency/details/:id" element={<EmergencyDetails />} />

                        <Route path="finance" element={<FinanceDashboard />} />
                        <Route path="finance/transactions" element={<FinanceList />} />
                        <Route path="finance/add" element={<AddTransaction />} />
                        <Route path="finance/edit/:id" element={<EditTransaction />} />
                        <Route path="finance/details/:id" element={<TransactionDetails />} />

                        <Route path="finance/bills" element={<BillsDashboard />} />
                        <Route path="finance/bills/list" element={<BillList />} />
                        <Route path="finance/bills/add" element={<AddBill />} />
                        <Route path="finance/bills/edit/:id" element={<EditBill />} />
                        <Route path="finance/bills/details/:id" element={<BillDetails />} />
                        <Route path="finance/bills/payment/:id" element={<AddPayment />} />

                        <Route path="notifications" element={<NotificationList />} />
                        <Route path="settings" element={<Settings />} />

                    </Route>
                </Route>

                {/* DOCTOR */}
                <Route element={<ProtectedRoute allowedRoles={["DOCTOR"]} />}>
                    <Route path="/doctor" element={<DoctorLayout />}>
                        <Route path="dashboard" element={<DoctorDashboard />} />
                    </Route>
                </Route>

                {/* STAFF */}
                <Route element={<ProtectedRoute allowedRoles={["STAFF"]} />}>
                    <Route path="/staff" element={<StaffLayout />}>
                        <Route path="dashboard" element={<StaffDashboard />} />
                    </Route>
                </Route>

                {/* PATIENT */}
                <Route element={<ProtectedRoute allowedRoles={["PATIENT"]} />}>
                    <Route path="/patient" element={<PatientLayout />}>
                        <Route path="dashboard" element={<PatientDashboard />} />
                    </Route>
                </Route>

                {/* UNKNOWN ROUTES */}
                <Route path="*" element={<Navigate to="/login" replace />} />

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;