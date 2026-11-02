import { Outlet } from 'react-router-dom';

import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';

import './AdminLayout.css';

function AdminLayout() {
  return (
    <div className="admin-layout">

      <Sidebar />

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

export default AdminLayout;