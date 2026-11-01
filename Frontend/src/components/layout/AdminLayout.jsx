import Sidebar from './Sidebar';

import Navbar from './Navbar';

import Footer from './Footer';

import './AdminLayout.css';

function AdminLayout({ children }) {

    return (

        <div className="admin-layout">

            <Sidebar />


            <div className="admin-main">

                <Navbar />


                <main className="admin-content">

                    {children}

                </main>


                <Footer />

            </div>

        </div>

    );

}

export default AdminLayout;