import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getDoctors, saveDoctors } from './doctorStorage';

import './AddDoctor.css';

function AddDoctor() {

  const navigate = useNavigate();

  const [doctor, setDoctor] = useState({
    name: '',
    specialization: '',
    email: '',
    phone: '',
    status: 'Available',
  });

  // Handle input changes
  const handleChange = (e) => {

    const { name, value } = e.target;

    setDoctor({
      ...doctor,
      [name]: value,
    });

  };

  // Submit doctor details
  const handleSubmit = (e) => {

    e.preventDefault();

    const existingDoctors = getDoctors();

    const newDoctor = {
      id: Date.now(),
      ...doctor,
    };

    const updatedDoctors = [
      ...existingDoctors,
      newDoctor,
    ];

    saveDoctors(updatedDoctors);

    alert('Doctor added successfully!');

    navigate('/admin/doctors');

  };

  return (

    <div className="add-doctor-page">

      <h1>Add New Doctor</h1>

      <p>Enter the doctor's information below.</p>

      <form onSubmit={handleSubmit}>

        <div className="form-group">

          <label>Doctor Name</label>

          <input
            type="text"
            name="name"
            placeholder="Enter doctor name"
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
            placeholder="Enter specialization"
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
            placeholder="Enter email"
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
            placeholder="Enter phone number"
            value={doctor.phone}
            onChange={handleChange}
            pattern="[0-9]{10}"
            title="Enter a valid 10-digit phone number"
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

        <button type="submit" className="save-doctor-btn">
          Save Doctor
        </button>

      </form>

    </div>

  );

}

export default AddDoctor;