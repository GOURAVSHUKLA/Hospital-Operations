import { useState } from 'react';
import './DoctorList.css';
import { useNavigate } from 'react-router-dom';

function DoctorList() {

  // Temporary doctors data
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: 'Dr. Amit Sharma',
      specialization: 'Cardiologist',
      email: 'amit@gmail.com',
      phone: '9876543210',
      status: 'Available'
    },
    {
      id: 2,
      name: 'Dr. Neha Verma',
      specialization: 'Neurologist',
      email: 'neha@gmail.com',
      phone: '9876543211',
      status: 'Available'
    },
    {
      id: 3,
      name: 'Dr. Raj Patel',
      specialization: 'Orthopedic',
      email: 'raj@gmail.com',
      phone: '9876543212',
      status: 'Unavailable'
    },
    {
      id: 4,
      name: 'Dr. Karan Singh',
      specialization: 'Dermatologist',
      email: 'karan@gmail.com',
      phone: '9876543213',
      status: 'Available'
    }
  ]);

  // Search state
  const [search, setSearch] = useState('');

  // Filter doctors according to search
  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(search.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="doctor-list-page">

      {/* Page Header */}
      <div className="doctor-list-header">
        <div>
          <h1>Doctors Management</h1>
          <p>Manage hospital doctors and their information.</p>
        </div>

        <button className="add-doctor-btn">
          + Add Doctor
        </button>
      </div>

      {/* Search */}
      <div className="doctor-search">
        <input
          type="text"
          placeholder="Search by doctor name or specialization..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Doctors Table */}
      <div className="doctor-table-container">

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Doctor Name</th>
              <th>Specialization</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td>{doctor.id}</td>
                  <td>{doctor.name}</td>
                  <td>{doctor.specialization}</td>
                  <td>{doctor.email}</td>
                  <td>{doctor.phone}</td>

                  <td>
                    <span className={`doctor-status ${doctor.status.toLowerCase()}`}>
                      {doctor.status}
                    </span>
                  </td>

                  <td>
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-doctors">
                  No doctors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

      </div>

    </div>
  );
}

export default DoctorList;