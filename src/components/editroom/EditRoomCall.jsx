import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { createUrl, log } from '../../utils/utils';
import { editRoom } from '../../services/room';
import { toast } from 'react-toastify'

function EditRoomCall() {
  const { roomNumber } = useParams();
  const [room, setRoom] = useState({
    room_number: roomNumber,
    room_type: '',
    capacity: '',
    price_per_night: '',
    images: '',
    ac_non_ac: '',
    bed_type: '',
    room_size: ''
  });
  const [selectedImage, setSelectedImage] = useState('');

  const [message, setMessage] = useState("");

  const showMessage = (message, duration) => {
    setMessage(message);
    setTimeout(() => {
      setMessage("");
    }, duration);
  };

  useEffect(() => {
    // Fetch room details from the API and update the state
    fetchRoomDetails();
  }, []);

  const fetchRoomDetails = async () => {
    const url = createUrl(`/room/${roomNumber}`);

    try {
      const response = await axios.get(url);
      const roomDetails = response.data.data;
      setRoom(roomDetails);
    } catch (ex) {
      log(ex);
      // Handle error or show an error message
    }
  };

  const handleEditSubmit = async (editedRoom) => {
    debugger;
    try {
      const response = await editRoom(roomNumber, editedRoom);
      if (response['status'] === 'success') {
        setTimeout(() => {
          toast.success('Room details updated successfully', { autoClose: 3000 });
        }, 2000); // Delay of 500 milliseconds before showing the toast
        showMessage("Room details updated successfully");
      } else {
        // Handle error or show an error message
        toast.error('Error updating room details');
      } 
    } catch (ex) {
      log(ex);
      // Handle error or show an error message
      toast.error('Error updating room details');
    }
  };
  const imageOptions = [
    { value: 'standard.png', label: 'Standard' },
    { value: 'Deluxe.png', label: 'Deluxe' },
    { value: 'Suite.png', label: 'Suite' },
  ];
  return (
    <div className="container mt-4">
      <h1>Edit Room {room.room_number}</h1>
      <form>
        <div className="form-group">
          <label>Room Type:</label>
          <input
            type="text"
            className="form-control"
            value={room.room_type}
            onChange={(e) => setRoom({ ...room, room_type: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Capacity:</label>
          <input
            type="number"
            className="form-control"
            value={room.capacity}
            onChange={(e) => setRoom({ ...room, capacity: e.target.value })}
          />
        </div>
        <div className="form-group">
  <label>Room Image:</label>
  <select
    className="form-control"
    value={room.images}
    onChange={(e) => setRoom({ ...room, images: e.target.value })}
  >
    <option value="">Select Image</option>
    {imageOptions.map(option => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
</div>

        <div className="form-group">
          <label>Price per Night:</label>
          <input
            type="number"
            className="form-control"
            value={room.price_per_night}
            onChange={(e) => setRoom({ ...room, price_per_night: e.target.value })}
          />
        </div>
        {/* Add more form fields */}
        <div className="form-group">
          <label>AC/Non-AC:</label>
          <input
            type="text"
            className="form-control"
            value={room.ac_non_ac}
            onChange={(e) => setRoom({ ...room, ac_non_ac: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Bed Type:</label>
          <input
            type="text"
            className="form-control"
            value={room.bed_type}
            onChange={(e) => setRoom({ ...room, bed_type: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Room Size:</label>
          <input
            type="text"
            className="form-control"
            value={room.room_size}
            onChange={(e) => setRoom({ ...room, room_size: e.target.value })}
          />
                <div>{message}</div>

        </div>
        <button   type='button' className="btn btn-primary" onClick={() => handleEditSubmit(room)}>
          Save
        </button>
      </form>
    </div>
  );
}

export default EditRoomCall;