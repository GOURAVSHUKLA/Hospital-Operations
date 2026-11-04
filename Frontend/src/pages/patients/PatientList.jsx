import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPatients, savePatients } from './patientStorage';
import './PatientList.css';

function PatientList() {
  const navigate = useNavigate();

  const [patients, setPatients] = useState(getPatients());
  const [searchTerm, setSearchTerm] = useState('');

  // Search patients
  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.disease.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Delete patient
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this patient?'
    );

    if (confirmDelete) {
      const updatedPatients = patients.filter(
        (patient) => patient.id !== id
      );

      setPatients(updatedPatients);
      savePatients(updatedPatients);
    }
  };

  return (
    <div className="patient-list-page">

      {/* Page Header */}
      <div className="patient-list-header">
        <div>
          <h1>Patients</h1>
          <p>Manage all hospital patients here.</p>
        </div>

        <button
          className="add-patient-btn"
          onClick={() => navigate('/admin/patients/add')}
        >
          + Add Patient
        </button>
      </div>

      {/* Search */}
      <div className="patient-search">
        <input
          type="text"
          placeholder="Search by patient name or disease..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Patients Table */}
      <div className="patient-table-container">
        <table className="patient-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Patient Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Disease</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.id}</td>
                  <td>{patient.name}</td>
                  <td>{patient.age}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.phone}</td>
                  <td>{patient.email}</td>
                  <td>{patient.disease}</td>

                  <td>
                    <span
                      className={`patient-status ${patient.status
                        .toLowerCase()
                        .replaceAll(' ', '-')}`}
                    >
                      {patient.status}
                    </span>
                  </td>

                  <td className="patient-actions">
                    <button
                      className="patient-view-btn"
                      onClick={() =>
                        navigate(`/admin/patients/details/${patient.id}`)
                      }
                    >
                      View
                    </button>

                    <button
                      className="patient-edit-btn"
                      onClick={() =>
                        navigate(`/admin/patients/edit/${patient.id}`)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="patient-delete-btn"
                      onClick={() => handleDelete(patient.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="no-patients">
                  No patients found.
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

    </div>
  );
}

export default PatientList;