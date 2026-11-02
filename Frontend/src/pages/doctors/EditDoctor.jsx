import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getDoctors, saveDoctors } from './doctorStorage';

import './EditDoctor.css';

function EditDoctor() {

  const { id } = useParams();
  const navigate = useNavigate();

  const doctors = getDoctors();

  const existingDoctor = doctors.find(
    (doctor) => doctor.id === Number(id)
  );

  const [doctor, setDoctor] = useState(() => ({
    name: existingDoctor?.name || '',
    specialization: existingDoctor?.specialization || '',
    email: existingDoctor?.email || '',
    phone: existingDoctor?.phone || '',
    status: existingDoctor?.status || 'Available',
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDoctor({
      ...doctor,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!existingDoctor) {
      alert('Doctor not found!');
      navigate('/admin/doctors');
      return;
    }

    const updatedDoctors = doctors.map((item) =>
      item.id === Number(id)
        ? { ...item, ...doctor }
        : item
    );

    saveDoctors(updatedDoctors);

    alert('Doctor updated successfully!');

    navigate('/admin/doctors');
  };

  if (!existingDoctor) {
    return (
      <div className="edit-doctor-page">
        <h2>Doctor not found!</h2>
        <button onClick={() => navigate('/admin/doctors')}>
          Back to Doctors
        </button>
      </div>
    );
  }

  return (
    <div className="edit-doctor-page">

      <h1>Edit Doctor</h1>
      <p>Update the doctor's information below.</p>

      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Doctor Name</label>
          <input
            type="text"
            name="name"
            value={doctor.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Specialization</label>
          <input
            type="text"
            name="specialization"
            value={doctor.specialization}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={doctor.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={doctor.phone}
            onChange={handleChange}
            pattern="[0-9]{10}"
            required
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            name="status"
            value={doctor.status}
            onChange={handleChange}
          >
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>

        <button type="submit" className="update-doctor-btn">
          Update Doctor
        </button>

      </form>

    </div>
  );
}

export default EditDoctor;