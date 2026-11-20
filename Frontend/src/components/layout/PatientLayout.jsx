import { Outlet } from "react-router-dom";

import PatientSidebar from "./PatientSidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

import "./AdminLayout.css";

function PatientLayout() {
    return (
        <div className="admin-layout">
            <PatientSidebar />

            <div className="admin-main">
                <Navbar />

                <main className="admin-content">
                    <Outlet />
                </main>

                <Footer />
            </div>
        </div>
    );
}

export default PatientLayout;
