import { useNavigate, useParams } from 'react-router-dom';
import { getPatients } from './patientStorage';
import './PatientDetails.css';

function PatientDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const patients = getPatients();

  const patient = patients.find(
    (item) => Number(item.id) === Number(id)
  );

  if (!patient) {
    return (
      <div className="patient-details-page">
        <h2>Patient not found!</h2>
        <button onClick={() => navigate('/admin/patients')}>
          Back to Patients
        </button>
      </div>
    );
  }

  return (
    <div className="patient-details-page">
      <div className="patient-details-header">
        <div>
          <h1>Patient Details</h1>
          <p>Complete information about the patient.</p>
        </div>

        <button
          className="back-patient-btn"
          onClick={() => navigate('/admin/patients')}
        >
          Back to Patients
        </button>
      </div>

      <div className="patient-details-card">
        <div className="patient-profile">
          <div className="patient-avatar">
            {patient.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <h2>{patient.name}</h2>
            <p>Patient ID: {patient.id}</p>
          </div>
        </div>

        <div className="patient-details-grid">
          <div className="detail-item">
            <label>Age</label>
            <p>{patient.age} years</p>
          </div>

          <div className="detail-item">
            <label>Gender</label>
            <p>{patient.gender}</p>
          </div>

          <div className="detail-item">
            <label>Phone</label>
            <p>{patient.phone}</p>
          </div>

          <div className="detail-item">
            <label>Email</label>
            <p>{patient.email}</p>
          </div>

          <div className="detail-item">
            <label>Disease</label>
            <p>{patient.disease}</p>
          </div>

          <div className="detail-item">
            <label>Status</label>
            <span className={`patient-status ${patient.status.toLowerCase().replaceAll(' ', '-')}`}>
              {patient.status}
            </span>
          </div>
        </div>

        <button
          className="edit-patient-details-btn"
          onClick={() => navigate(`/admin/patients/edit/${patient.id}`)}
        >
          Edit Patient
        </button>
      </div>
    </div>
  );
}

export default PatientDetails;