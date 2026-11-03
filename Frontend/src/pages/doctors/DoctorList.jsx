import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDoctors, saveDoctors } from './doctorStorage';
import './DoctorList.css';

function DoctorList() {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState(getDoctors());
  const [searchTerm, setSearchTerm] = useState('');

  // Get saved availability from Local Storage
  const doctorAvailability = JSON.parse(
    localStorage.getItem('doctorAvailability') || '[]'
  );

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

      <div className="doctor-search">
        <input
          type="text"
          placeholder="Search by doctor name or specialization..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="doctor-table-container">
        <table className="doctor-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Doctor Name</th>
              <th>Specialization</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Working Days</th>
              <th>Working Hours</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor) => {

                // Find availability for the current doctor
                const availability = doctorAvailability.find(
                  (item) => Number(item.doctorId) === Number(doctor.id)
                );

                return (
                  <tr key={doctor.id}>
                    <td>{doctor.id}</td>
                    <td>{doctor.name}</td>
                    <td>{doctor.specialization}</td>
                    <td>{doctor.email}</td>
                    <td>{doctor.phone}</td>

                    <td>
                      {availability
                        ? availability.days.join(', ')
                        : 'Not Set'}
                    </td>

                    <td>
                      {availability
                        ? `${availability.startTime} - ${availability.endTime}`
                        : 'Not Set'}
                    </td>

                    <td>
                      <span
                        className={`doctor-status ${
                          availability
                            ? availability.status.toLowerCase()
                            : 'unavailable'
                        }`}
                      >
                        {availability
                          ? availability.status
                          : 'Not Set'}
                      </span>
                    </td>

                    <td className="doctor-actions">
                      <button
                        className="edit-btn"
                        onClick={() =>
                          navigate(`/admin/doctors/details/${doctor.id}`)
                        }
                      >
                        View
                      </button>

                      <button
                        className="edit-btn"
                        onClick={() =>
                          navigate(`/admin/doctors/edit/${doctor.id}`)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(doctor.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="9" className="no-doctors">
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