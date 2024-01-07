import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getRoomList } from '../../services/room';
import { deleteRoom } from '../../services/room';
function DeleteRoom() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await getRoomList();
      if (response && response.status === 'success') {
        setRooms(response.data);
      } else {
        toast.error('Error while loading rooms.');
      }
    } catch (error) {
      console.error('Error while loading rooms:', error);
      toast.error('Error while loading rooms.');
    }
  };

  const handleDeleteRoom = async (roomId) => {
    try {
      console.log('Deleting room with ID:', roomId);
      const response = await deleteRoom(roomId);
      console.log(response.data);
      if (response.status == 'success') {
        console.log('Room deleted successfully!');
      toast.success('Room deleted successfully!');
      fetchRooms(); // Refresh the room list
      }
      else
      {
        toast.error('Room not deleted successfully!');

      }
      
    } catch (error) {
      console.error(error);
      toast.error('Error occurred while deleting room.');
    }
  };

  return (
    <div>
      <h3>Delete Room - List of Rooms</h3>

      <ul>
        {rooms.map((room) => (
          <li key={room._id}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <p>
                Room {room.room_number} - {room.room_type}
              </p>
              <button
                onClick={() => handleDeleteRoom(room.room_number)}
                className="btn btn-danger btn-sm"
                style={{ marginLeft: '10px' }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
}

export default DeleteRoom;