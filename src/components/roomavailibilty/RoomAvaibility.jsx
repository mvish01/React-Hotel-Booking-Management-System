import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { checkRoomAvailability } from '../../services/booking';
import { toast } from 'react-toastify';
import {bookReservation} from '../../services/booking'
function RoomAvailability() {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [roomType, setRoomType] = useState('');
  const [capacity, setCapacity] = useState('');
  const [availableRooms, setAvailableRooms] = useState([]);

  const handleCheckAvailability = async () => {
    try {
      // Check if all fields are filled
      if (!checkInDate || !checkOutDate || !roomType || !capacity) {
        alert('Please fill in all fields');
        return;
      }

      const response = await checkRoomAvailability(checkInDate, checkOutDate, roomType, capacity);

      const data = response['data'];
      if (response['status'] === 'success') {
        setAvailableRooms(data);

        if (data.length > 0) {
          toast.success('Rooms are available!');
        } else {
          toast.error('No rooms available for the selected dates and criteria.');
        }
      } else {
        alert('Failed to check availability');
      }
    } catch (error) {
      console.error('Error checking availability:', error);
    }
  };

  const handleBookRoom = async (roomNumber, checkInDate, checkOutDate) => {
    try {
      const userId = sessionStorage.getItem('userId');
      console.log("roomavailibility handal book room")
      console.log(userId)
      
      // Check if all required parameters are provided
      if (!roomNumber || !checkInDate || !checkOutDate || !userId ) {
        toast.error('Please provide all required information to book the room.');
        return;
      }
      // Call the booking API function here
      const bookingResponse = await bookReservation(userId, roomNumber, checkInDate, checkOutDate);
  
      // Handle the response from the API
      if (bookingResponse && bookingResponse.status === 'success') {
        // Booking was successful
        toast.success(`Room ${roomNumber} ${userId} booked successfully from ${checkInDate.toISOString().split('T')[0]} to ${checkOutDate.toISOString().split('T')[0]} with capacity ${capacity}`);
      } else {
        // Booking failed
        toast.error('Failed to book the room. Please try again later.');
      }
    } catch (error) {
      console.error('Error booking room:', error);
      toast.error('An error occurred while booking the room. Please try again later.');
    }
  };
  


  return (
    <div className="container mt-5">
      <h2 className="mb-4">Check Room Availability</h2>
      <div className="mb-3">
        <label className="form-label">Check-in Date:</label>
        <DatePicker className="form-control" selected={checkInDate} onChange={(date) => setCheckInDate(date)} />
      </div>
      <div className="mb-3">
        <label className="form-label">Check-out Date:</label>
        <DatePicker className="form-control" selected={checkOutDate} onChange={(date) => setCheckOutDate(date)} />
      </div>
      <div className="mb-3">
        <label className="form-label">Room Type:</label>
        <select className="form-select" value={roomType} onChange={(e) => setRoomType(e.target.value)}>
          <option value="">Select Room Type</option>
          <option value="Standard">Standard</option>
          <option value="Suite">Suite</option>
          <option value="Deluxe">Deluxe</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Capacity:</label>
        <input type="number" className="form-control" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
      </div>
      <button className="btn btn-primary" onClick={handleCheckAvailability}>Check Availability</button>
      {availableRooms.length > 0 && (
        <div className="mt-4">
          <h3>Available Rooms:</h3>
          <ul className="list-group">
            {availableRooms.map((room) => (
              <li key={room.room_number} className="list-group-item">
                Room {room.room_number}, Type: {room.room_type}, Capacity: {room.capacity}, Price: {room.price_per_night}
                <button className="btn btn-success ms-2" onClick={() => handleBookRoom(room.room_number, checkInDate, checkOutDate, capacity)}>
                  Book Now
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default RoomAvailability;