import { useNavigate, useParams } from 'react-router-dom';

import { getDoctors } from './doctorStorage';

import './DoctorDetails.css';

function DoctorDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const doctors = getDoctors();

  const doctor = doctors.find(
    (item) => item.id === Number(id)
  );

  if (!doctor) {
    return (
      <div className="doctor-details-page">
        <h2>Doctor not found!</h2>

        <button onClick={() => navigate('/admin/doctors')}>
          Back to Doctors
        </button>
      </div>
    );
  }

  return (
    <div className="doctor-details-page">

      <div className="doctor-details-header">

        <div>
          <h1>Doctor Details</h1>
          <p>View complete information about this doctor.</p>
        </div>

        <button
          className="back-doctors-btn"
          onClick={() => navigate('/admin/doctors')}
        >
          Back to Doctors
        </button>

      </div>

      <div className="doctor-details-card">

        <div className="doctor-profile-header">

          <div className="doctor-avatar">
            {doctor.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <h2>{doctor.name}</h2>
            <p>{doctor.specialization}</p>
          </div>

        </div>

        <div className="doctor-information">

          <div className="information-item">
            <label>Doctor ID</label>
            <h3>{doctor.id}</h3>
          </div>

          <div className="information-item">
            <label>Full Name</label>
            <h3>{doctor.name}</h3>
          </div>

          <div className="information-item">
            <label>Specialization</label>
            <h3>{doctor.specialization}</h3>
          </div>

          <div className="information-item">
            <label>Email Address</label>
            <h3>{doctor.email}</h3>
          </div>

          <div className="information-item">
            <label>Phone Number</label>
            <h3>{doctor.phone}</h3>
          </div>

          <div className="information-item">
            <label>Availability</label>

            <span className={`doctor-status ${doctor.status.toLowerCase()}`}>
              {doctor.status}
            </span>

          </div>

        </div>

        <button
          className="details-edit-btn"
          onClick={() => navigate(`/admin/doctors/edit/${doctor.id}`)}
        >
          Edit Doctor
        </button>

      </div>

    </div>
  );
}

export default DoctorDetails;