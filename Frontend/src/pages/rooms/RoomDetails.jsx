import { useNavigate, useParams } from 'react-router-dom';
import { getRooms } from './roomStorage';
import './RoomDetails.css';

function RoomDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const rooms = getRooms();

  const room = rooms.find(
    (item) => Number(item.id) === Number(id)
  );

  if (!room) {
    return (
      <div className="room-details-page">
        <h2>Room not found</h2>
        <button onClick={() => navigate('/admin/rooms')}>
          Back to Rooms
        </button>
      </div>
    );
  }

  const availableBeds = room.capacity - room.occupiedBeds;

  return (
    <div className="room-details-page">
      <div className="room-details-header">
        <div>
          <h1>Room Details</h1>
          <p>Complete information about this hospital room.</p>
        </div>

        <button
          className="back-rooms-btn"
          onClick={() => navigate('/admin/rooms')}
        >
          Back to Rooms
        </button>
      </div>

      <div className="room-details-card">
        <div className="room-details-title">
          <h2>Room {room.roomNumber}</h2>

          <span className={`room-status ${room.status.toLowerCase()}`}>
            {room.status}
          </span>
        </div>

        <div className="room-details-grid">
          <div className="room-detail-item">
            <label>Room Number</label>
            <p>{room.roomNumber}</p>
          </div>

          <div className="room-detail-item">
            <label>Room Type</label>
            <p>{room.roomType}</p>
          </div>

          <div className="room-detail-item">
            <label>Floor</label>
            <p>{room.floor}</p>
          </div>

          <div className="room-detail-item">
            <label>Total Bed Capacity</label>
            <p>{room.capacity}</p>
          </div>

          <div className="room-detail-item">
            <label>Occupied Beds</label>
            <p>{room.occupiedBeds}</p>
          </div>

          <div className="room-detail-item">
            <label>Available Beds</label>
            <p>{availableBeds}</p>
          </div>

          <div className="room-detail-item">
            <label>Price Per Day</label>
            <p>₹{room.pricePerDay.toLocaleString('en-IN')}</p>
          </div>
        </div>

        <div className="room-details-actions">
          <button
            className="edit-room-details-btn"
            onClick={() => navigate(`/admin/rooms/edit/${room.id}`)}
          >
            Edit Room
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoomDetails;