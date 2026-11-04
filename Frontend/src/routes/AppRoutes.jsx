import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import DoctorList from "../pages/doctors/DoctorList";
import AddDoctor from "../pages/doctors/AddDoctor";
import EditDoctor from "../pages/doctors/EditDoctor";
import DoctorDetails from "../pages/doctors/DoctorDetails";
import DoctorAvailability from "../pages/doctors/DoctorAvailability";
import PatientList from '../pages/patients/PatientList';
import AddPatient from "../pages/patients/AddPatient";
import EditPatient from "../pages/patients/EditPatient";
import PatientDetails from "../pages/patients/PatientDetails";


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
