import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDoctors, saveDoctors } from './doctorStorage';
import './DoctorList.css';

function DoctorList() {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState(getDoctors());
  const [searchTerm, setSearchTerm] = useState('');

  // Search doctors by name or specialization
  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Delete doctor
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this doctor?'
    );

    if (confirmDelete) {
      const updatedDoctors = doctors.filter(
        (doctor) => doctor.id !== id
      );

      setDoctors(updatedDoctors);
      saveDoctors(updatedDoctors);
    }
  };

  return (
    <div className="doctor-list-page">

      {/* Page Header */}
      <div className="doctor-list-header">
        <div>
          <h1>Doctors</h1>
          <p>Manage all hospital doctors here.</p>
        </div>

        <button
          className="add-doctor-btn"
          onClick={() => navigate('/admin/doctors/add')}
        >
          + Add Doctor
        </button>
      </div>

      {/* Search Box */}
      <div className="doctor-search">
        <input
          type="text"
          placeholder="Search by doctor name or specialization..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Doctors Table */}
      <div className="doctor-table-container">
        <table className="doctor-table">

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
                    <span
                      className={`doctor-status ${doctor.status.toLowerCase()}`}
                    >
                      {doctor.status}
                    </span>
                  </td>

                  <td className="doctor-actions">

                    {/* View Button */}
                    <button
                      className="edit-btn"
                      onClick={() =>
                        navigate(`/admin/doctors/details/${doctor.id}`)
                      }
                    >
                      View
                    </button>

                    {/* Edit Button */}
                    <button
                      className="edit-btn"
                      onClick={() =>
                        navigate(`/admin/doctors/edit/${doctor.id}`)
                      }
                    >
                      Edit
                    </button>

                    {/* Delete Button */}
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(doctor.id)}
                    >
                      Delete
                    </button>

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