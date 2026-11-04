import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRooms, saveRooms } from './roomStorage';
import './RoomList.css';

function RoomList() {
  const navigate = useNavigate();

  const [rooms, setRooms] = useState(getRooms());
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      typeFilter === 'All' || room.roomType === typeFilter;

    return matchesSearch && matchesType;
  });

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this room?'
    );

    if (confirmDelete) {
      const updatedRooms = rooms.filter((room) => room.id !== id);

      setRooms(updatedRooms);
      saveRooms(updatedRooms);
    }
  };

  return (
    <div className="room-list-page">
      <div className="room-list-header">
        <div>
          <h1>Rooms & Beds</h1>
          <p>Manage hospital rooms and bed availability.</p>
        </div>

        <button
          className="add-room-btn"
          onClick={() => navigate('/admin/rooms/add')}
        >
          + Add Room
        </button>
      </div>

      <div className="room-filters">
        <input
          type="text"
          placeholder="Search by room number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="All">All Room Types</option>
          <option value="General">General</option>
          <option value="Private">Private</option>
          <option value="ICU">ICU</option>
          <option value="Emergency">Emergency</option>
        </select>
      </div>

      <div className="room-table-container">
        <table className="room-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Room No.</th>
              <th>Room Type</th>
              <th>Floor</th>
              <th>Capacity</th>
              <th>Occupied Beds</th>
              <th>Available Beds</th>
              <th>Price/Day</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredRooms.length > 0 ? (
              filteredRooms.map((room) => (
                <tr key={room.id}>
                  <td>{room.id}</td>
                  <td>{room.roomNumber}</td>
                  <td>{room.roomType}</td>
                  <td>{room.floor}</td>
                  <td>{room.capacity}</td>
                  <td>{room.occupiedBeds}</td>
                  <td>{room.capacity - room.occupiedBeds}</td>
                  <td>₹{room.pricePerDay.toLocaleString('en-IN')}</td>
                  <td>
                    <span className={`room-status ${room.status.toLowerCase()}`}>
                      {room.status}
                    </span>
                  </td>
                  <td className="room-actions">
                    <button
                      className="room-view-btn"
                      onClick={() => navigate(`/admin/rooms/details/${room.id}`)}
                    >
                      View
                    </button>

                    <button
                      className="room-edit-btn"
                      onClick={() => navigate(`/admin/rooms/edit/${room.id}`)}
                    >
                      Edit
                    </button>

                    <button
                      className="room-delete-btn"
                      onClick={() => handleDelete(room.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="no-rooms">
                  No rooms found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RoomList;