import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getRooms, saveRooms } from './roomStorage';
import './EditRoom.css';

function EditRoom() {
  const { id } = useParams();
  const navigate = useNavigate();

  const rooms = getRooms();

  const existingRoom = rooms.find(
    (room) => Number(room.id) === Number(id)
  );

  const [formData, setFormData] = useState(() => {
    if (!existingRoom) return null;

    return {
      ...existingRoom,
      floor: String(existingRoom.floor),
      capacity: String(existingRoom.capacity),
      occupiedBeds: String(existingRoom.occupiedBeds),
      pricePerDay: String(existingRoom.pricePerDay),
    };
  });

  if (!existingRoom || !formData) {
    return (
      <div className="edit-room-page">
        <h2>Room not found</h2>
        <button onClick={() => navigate('/admin/rooms')}>
          Back to Rooms
        </button>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const roomExists = rooms.some(
      (room) =>
        Number(room.id) !== Number(id) &&
        room.roomNumber.toLowerCase() ===
          formData.roomNumber.trim().toLowerCase()
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

    const updatedRooms = rooms.map((room) =>
      Number(room.id) === Number(id)
        ? {
            ...formData,
            roomNumber: formData.roomNumber.trim(),
            floor: Number(formData.floor),
            capacity,
            occupiedBeds,
            pricePerDay: Number(formData.pricePerDay),
            status: occupiedBeds === capacity ? 'Occupied' : 'Available',
          }
        : room
    );

    saveRooms(updatedRooms);

    alert('Room updated successfully!');
    navigate('/admin/rooms');
  };

  return (
    <div className="edit-room-page">
      <div className="edit-room-header">
        <h1>Edit Room</h1>
        <p>Update the hospital room details below.</p>
      </div>

      <form className="edit-room-form" onSubmit={handleSubmit}>
        <div className="room-form-group">
          <label>Room Number</label>
          <input
            type="text"
            name="roomNumber"
            value={formData.roomNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="room-form-group">
          <label>Room Type</label>
          <select
            name="roomType"
            value={formData.roomType}
            onChange={handleChange}
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
            required
          />
        </div>

        <div className="room-form-actions">
          <button type="submit" className="save-room-btn">
            Update Room
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

export default EditRoom;