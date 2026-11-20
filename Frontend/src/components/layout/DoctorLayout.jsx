import { Outlet } from "react-router-dom";

import DoctorSidebar from "./DoctorSidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

import "./AdminLayout.css";

function DoctorLayout() {
    return (
        <div className="admin-layout">

            <DoctorSidebar />

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

export default DoctorLayout;