import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getRoomList } from '../../services/room';
import RoomDetail from '../addroom/RoomDetail';

function EditRoom() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // get the list of rooms from the server
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      const response = await getRoomList();
      if (response.status === 'success') {
        setRooms(response.data);
      } else {
        toast.error('Error while fetching room data');
      }
    } catch (error) {
      toast.error('Error while fetching room data');
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Edit Room</h1>
      <div className="row" style={{ display: 'flex', justifyContent: 'center' }}>
        {rooms.map((room) => (
          <RoomDetail key={room.room_number} room={room} />
        ))}
      </div>
    </div>
  );
}

export default EditRoom;