import React from 'react';
import { Button } from 'reactstrap'; // Import your button component or styling library
import 'bootstrap/dist/css/bootstrap.min.css';
import { constants } from '../../utils/constants';
import { Link } from 'react-router-dom';
function RoomDetail({ room }) {
  
  return (
    <div className="card" style={{ width: '18rem', margin: '10px' }}>
      <img src={constants.serverUrl + '/' + room.images} className="card-img-top" alt={`Room ${room.room_number}`} />
      <div className="card-body">
        <h5 className="card-title">Room {room.room_number}</h5>
        <p className="card-text">Type: {room.room_type}</p>
        <p className="card-text">Capacity: {room.capacity}</p>
        <p className="card-text">Price per Night: ₹{room.price_per_night}</p>
        {/* Other room details */}
        <Button color="primary" style={{ color: 'white', fontWeight: 'bold' }}>
  <Link to={`/edit_room/${room.room_number}`} style={{ color: 'white', textDecoration: 'none' }}>
    Edit
  </Link>
</Button>

      </div>
    </div>
  );
}

export default RoomDetail;