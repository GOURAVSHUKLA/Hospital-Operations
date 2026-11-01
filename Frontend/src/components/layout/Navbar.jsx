import { FaBell, FaSearch, FaUserCircle } from 'react-icons/fa';

import './Navbar.css';

function Navbar() {

    return (

        <header className="navbar">

            <div className="navbar-left">

                <h2>Hospital Admin Panel</h2>

            </div>


            <div className="navbar-right">

                <div className="navbar-search">

                    <FaSearch />

                    <input
                        type="text"
                        placeholder="Search..."
                    />

                </div>


                <button className="notification-button">

                    <FaBell />

                    <span className="notification-dot"></span>

                </button>


                <div className="admin-profile">

                    <FaUserCircle className="profile-icon" />

                    <div>

                        <h4>Admin</h4>

                        <p>Super Admin</p>

                    </div>

                </div>

            </div>

        </header>

    );

}

export default Navbar;