import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from '../pages/auth/Login';
import Dashboard from '../pages/dashboard/Dashboard';
import DoctorList from '../pages/doctors/DoctorList';
import AddDoctor from '../pages/doctors/AddDoctor';


function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />
                <Route

                    path="/admin/dashboard"

                    element={<Dashboard />}

                />
                <Route path="/admin/doctors" element={<DoctorList />} />
<Route path="/admin/doctors/add" element={<AddDoctor />} />

            </Routes>

        </BrowserRouter>

    );

}

export default AppRoutes;