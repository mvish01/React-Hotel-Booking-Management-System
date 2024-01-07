import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getUnconfirmBookingList } from '../../services/booking';
import Booking from './Booking';

function BookingList() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // get the list of bookings from the server
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const response = await getUnconfirmBookingList();
      if (response['status'] === 'success') {
        setBookings(response['data']);
      } else {
        toast.error('Error while calling get /booking api');
      }
    } catch (error) {
      toast.error('Error while calling get /booking api');
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Room Bookings</h1>
      <div className="row" style={{ display: 'flex', justifyContent: 'center' }}>
        {bookings.map((booking) => (
          <Booking key={booking.booking_id} booking={booking} loadBookings={loadBookings} />
        ))}
      </div>
    </div>
  );
}

export default BookingList;