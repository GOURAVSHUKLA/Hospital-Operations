import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmergencyCases, saveEmergencyCases } from './emergencyStorage';
import { getDoctors } from '../doctors/doctorStorage';
import './EmergencyList.css';

function EmergencyList() {
  const navigate = useNavigate();

  const [cases, setCases] = useState(getEmergencyCases());
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');

  const doctors = getDoctors();

  const getDoctorName = (doctorId) =>
    doctors.find((doctor) => Number(doctor.id) === Number(doctorId))?.name ||
    'Doctor Not Assigned';

  const filteredCases = cases.filter((emergencyCase) => {
    const matchesSearch =
      emergencyCase.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emergencyCase.emergencyType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getDoctorName(emergencyCase.doctorId).toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPriority =
      priorityFilter === 'All' || emergencyCase.priority === priorityFilter;

    return matchesSearch && matchesPriority;
  });

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this emergency case?'
    );

    if (confirmDelete) {
      const updatedCases = cases.filter(
        (emergencyCase) => emergencyCase.id !== id
      );

      setCases(updatedCases);
      saveEmergencyCases(updatedCases);
    }
  };

  return (
    <div className="emergency-list-page">
      <div className="emergency-list-header">
        <div>
          <h1>Emergency Management</h1>
          <p>Monitor and manage hospital emergency cases.</p>
        </div>

        <button
          className="add-emergency-btn"
          onClick={() => navigate('/admin/emergency/add')}
        >
          + Add Emergency Case
        </button>
      </div>

      <div className="emergency-filters">
        <input
          type="text"
          placeholder="Search patient, emergency type or doctor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="All">All Priorities</option>
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <div className="emergency-table-container">
        <table className="emergency-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient</th>
              <th>Emergency Type</th>
              <th>Priority</th>
              <th>Assigned Doctor</th>
              <th>Admission Date</th>
              <th>Admission Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredCases.length > 0 ? (
              filteredCases.map((emergencyCase) => (
                <tr key={emergencyCase.id}>
                  <td>{emergencyCase.id}</td>
                  <td>{emergencyCase.patientName}</td>
                  <td>{emergencyCase.emergencyType}</td>
                  <td>
                    <span
                      className={`emergency-priority ${emergencyCase.priority.toLowerCase()}`}
                    >
                      {emergencyCase.priority}
                    </span>
                  </td>
                  <td>{getDoctorName(emergencyCase.doctorId)}</td>
                  <td>{emergencyCase.admissionDate}</td>
                  <td>{emergencyCase.admissionTime}</td>
                  <td>
                    <span
                      className={`emergency-status ${emergencyCase.status.toLowerCase().replaceAll(' ', '-')}`}
                    >
                      {emergencyCase.status}
                    </span>
                  </td>
                  <td className="emergency-actions">
                    <button
                      className="emergency-view-btn"
                      onClick={() =>
                        navigate(`/admin/emergency/details/${emergencyCase.id}`)
                      }
                    >
                      View
                    </button>

                    <button
                      className="emergency-edit-btn"
                      onClick={() =>
                        navigate(`/admin/emergency/edit/${emergencyCase.id}`)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="emergency-delete-btn"
                      onClick={() => handleDelete(emergencyCase.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="no-emergency-cases">
                  No emergency cases found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmergencyList;