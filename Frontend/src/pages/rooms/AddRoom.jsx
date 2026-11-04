import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRooms, saveRooms } from './roomStorage';
import './AddRoom.css';

function AddRoom() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    roomNumber: '',
    roomType: 'General',
    floor: '',
    capacity: '',
    occupiedBeds: '0',
    pricePerDay: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const rooms = getRooms();

    const roomExists = rooms.some(
      (room) =>
        room.roomNumber.toLowerCase() === formData.roomNumber.trim().toLowerCase()
    );

    if (roomExists) {
      alert('This room number already exists!');
      return;
    }

    const capacity = Number(formData.capacity);
    const occupiedBeds = Number(formData.occupiedBeds);

    if (occupiedBeds > capacity) {
      alert('Occupied beds cannot exceed room capacity!');
      return;
    }

    const newRoom = {
      id: Date.now(),
      roomNumber: formData.roomNumber.trim(),
      roomType: formData.roomType,
      floor: Number(formData.floor),
      capacity,
      occupiedBeds,
      pricePerDay: Number(formData.pricePerDay),
      status: occupiedBeds === capacity ? 'Occupied' : 'Available',
    };

    saveRooms([...rooms, newRoom]);

    alert('Room added successfully!');
    navigate('/admin/rooms');
  };

  return (
    <div className="add-room-page">
      <div className="add-room-header">
        <h1>Add New Room</h1>
        <p>Enter the hospital room details below.</p>
      </div>

      <form className="add-room-form" onSubmit={handleSubmit}>
        <div className="room-form-group">
          <label>Room Number</label>
          <input
            type="text"
            name="roomNumber"
            value={formData.roomNumber}
            onChange={handleChange}
            placeholder="Example: 301"
            required
          />
        </div>

        <div className="room-form-group">
          <label>Room Type</label>
          <select
            name="roomType"
            value={formData.roomType}
            onChange={handleChange}
            required
          >
            <option value="General">General</option>
            <option value="Private">Private</option>
            <option value="ICU">ICU</option>
            <option value="Emergency">Emergency</option>
          </select>
        </div>

        <div className="room-form-group">
          <label>Floor</label>
          <input
            type="number"
            name="floor"
            value={formData.floor}
            onChange={handleChange}
            min="0"
            placeholder="Enter floor number"
            required
          />
        </div>

        <div className="room-form-group">
          <label>Total Bed Capacity</label>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            min="1"
            placeholder="Enter total beds"
            required
          />
        </div>

        <div className="room-form-group">
          <label>Occupied Beds</label>
          <input
            type="number"
            name="occupiedBeds"
            value={formData.occupiedBeds}
            onChange={handleChange}
            min="0"
            placeholder="Enter occupied beds"
            required
          />
        </div>

        <div className="room-form-group">
          <label>Price Per Day (₹)</label>
          <input
            type="number"
            name="pricePerDay"
            value={formData.pricePerDay}
            onChange={handleChange}
            min="0"
            placeholder="Enter daily price"
            required
          />
        </div>

        <div className="room-form-actions">
          <button type="submit" className="save-room-btn">
            Add Room
          </button>

          <button
            type="button"
            className="cancel-room-btn"
            onClick={() => navigate('/admin/rooms')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddRoom;