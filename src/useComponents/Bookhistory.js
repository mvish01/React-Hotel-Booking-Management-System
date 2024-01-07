import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {fetchBookingHistoryFromAPI} from '../services/userSide'

function Bookhistory() {

  const userId = sessionStorage.getItem('userUserId');
  const [history, sethistory] = useState([]);
  // const [show,setshow] = useState([]);

  useEffect(() => {
    fetchBookingHistory(userId);
  }, []);

  const fetchBookingHistory = async (userId) =>
  {
    try 
    {
      console.log(userId);
      const bookingHistory = await fetchBookingHistoryFromAPI(userId);
      sethistory(bookingHistory);
    } 
    catch (error) {
      console.error("Error fetching booking history:", error);
    }
  };

  const handleCancelBooking = async (reservationId) => {
    try {
      await cancelBooking(reservationId);
      alert("BOOKING CANCELED");
      fetchBookingHistory(userId); // Refresh booking history after cancellation
      // Optionally, you can use React Router to navigate to the history page
      // window.location.href = '/history';
    } catch (error) {
      console.error("Error canceling booking:", error);
    }
  };

  return (
    <div className="book-history-container">
      <h2>Your Reservation History</h2>
      {history.length > 0 ? (
        <ul className="reservation-list">
          {history.map((reservation) => (
            <li key={reservation.reservation_id} className="reservation-item">
              <img src={`http://192.168.0.110:4000/${reservation.images}`} alt="Image" className="img-fluid img-thumbnail" style={{ maxHeight: "100px", width: "auto" }} />
              <p>Reservation ID: {reservation.reservation_id}</p>
              <p>Room Number: {reservation.room_number}</p>
              <p>Room Type: {reservation.room_type}</p>
              <p>Check-in Date: {reservation.check_in_date}</p>
              <p>Check-out Date: {reservation.check_out_date}</p>
              <p>Status: Booked</p>
              <button onClick={() => handleCancelBooking(reservation.reservation_id)}>Cancel Reservation</button>
            </li>
          ))}.
        </ul>
      ) : (
        <p><h1>No reservation history available.</h1></p>
      )}
    </div>
  )
}

export default Bookhistory
