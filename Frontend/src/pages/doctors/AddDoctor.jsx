import { useState } from 'react';
import './AddDoctor.css';

function AddDoctor() {

  const [doctor, setDoctor] = useState({
    name: '',
    specialization: '',
    email: '',
    phone: '',
    status: 'Available'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDoctor({
      ...doctor,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('New Doctor:', doctor);

    alert('Doctor details submitted successfully!');
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
            placeholder="e.g. Cardiologist"
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