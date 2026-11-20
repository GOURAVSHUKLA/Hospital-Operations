import { Outlet } from "react-router-dom";

import StaffSidebar from "./StaffSidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

import "./AdminLayout.css";

function StaffLayout() {
    return (
        <div className="admin-layout">

            <StaffSidebar />

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

export default StaffLayout;