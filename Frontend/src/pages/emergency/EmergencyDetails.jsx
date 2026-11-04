import { useNavigate, useParams } from 'react-router-dom';
import { getDoctors } from '../doctors/doctorStorage';
import { getEmergencyCases } from './emergencyStorage';
import './EmergencyDetails.css';

function EmergencyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const emergencyCases = getEmergencyCases();
  const doctors = getDoctors();

  const emergencyCase = emergencyCases.find(
    (item) => item.id === Number(id)
  );

  if (!emergencyCase) {
    return (
      <div className="emergency-details-page">
        <h2>Emergency case not found.</h2>
        <button onClick={() => navigate('/admin/emergency')}>
          Back to Emergency List
        </button>
      </div>
    );
  }

  const doctor = doctors.find(
    (item) => Number(item.id) === Number(emergencyCase.doctorId)
  );

  return (
    <div className="emergency-details-page">
      <div className="emergency-details-header">
        <div>
          <h1>Emergency Case Details</h1>
          <p>Complete information about the emergency patient.</p>
        </div>

        <button
          className="emergency-details-edit"
          onClick={() =>
            navigate(`/admin/emergency/edit/${emergencyCase.id}`)
          }
        >
          Edit Case
        </button>
      </div>

      <div className="emergency-details-card">
        <div className="emergency-details-title">
          <h2>{emergencyCase.patientName}</h2>
          <span
            className={`emergency-details-priority ${emergencyCase.priority.toLowerCase()}`}
          >
            {emergencyCase.priority} Priority
          </span>
        </div>

        <div className="emergency-details-grid">
          <div className="emergency-detail-item">
            <span>Case ID</span>
            <strong>{emergencyCase.id}</strong>
          </div>

          <div className="emergency-detail-item">
            <span>Patient Age</span>
            <strong>{emergencyCase.age} Years</strong>
          </div>

          <div className="emergency-detail-item">
            <span>Gender</span>
            <strong>{emergencyCase.gender}</strong>
          </div>

          <div className="emergency-detail-item">
            <span>Phone Number</span>
            <strong>{emergencyCase.phone}</strong>
          </div>

          <div className="emergency-detail-item">
            <span>Emergency Type</span>
            <strong>{emergencyCase.emergencyType}</strong>
          </div>

          <div className="emergency-detail-item">
            <span>Assigned Doctor</span>
            <strong>{doctor?.name || 'Doctor Not Assigned'}</strong>
          </div>

          <div className="emergency-detail-item">
            <span>Admission Date</span>
            <strong>{emergencyCase.admissionDate}</strong>
          </div>

          <div className="emergency-detail-item">
            <span>Admission Time</span>
            <strong>{emergencyCase.admissionTime}</strong>
          </div>

          <div className="emergency-detail-item">
            <span>Current Status</span>
            <strong>{emergencyCase.status}</strong>
          </div>
        </div>

        <div className="emergency-details-description">
          <span>Emergency Description</span>
          <p>{emergencyCase.description}</p>
        </div>

        <div className="emergency-details-actions">
          <button
            onClick={() => navigate('/admin/emergency')}
            className="emergency-details-back"
          >
            Back to Emergency List
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmergencyDetails;