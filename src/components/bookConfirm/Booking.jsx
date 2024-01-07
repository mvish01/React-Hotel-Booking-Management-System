import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { confirmBooking } from '../../services/booking';
import { constants } from '../../utils/constants';

function Booking({ booking, loadBookings }) {
  const [confirmationAmount, setConfirmationAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState('');

  const handleConfirmBooking = async () => {
    try {
      // Check if amount and paymentDate are set
      if (!confirmationAmount || !paymentDate) {
        toast.error('Please enter confirmation amount and payment date');
        return;
      }

      // Send a request to confirm the booking with the given reservation_id, confirmationAmount, and paymentDate
      const response = await confirmBooking(booking.reservation_id, confirmationAmount, paymentDate);
      if (response['status'] === 'success') {
        toast.success('Booking confirmed successfully');
        // Refresh the booking list
        loadBookings();
      } else {
        toast.error('Error while confirming booking');
      }
    } catch (error) {
      toast.error('Error while confirming booking');
    }
  };

  return (
    <div className="col-md-4" key={booking.booking_id} style={{ marginBottom: '15px', width: '30%' }}>
      <div className="card" style={{ width: '100%' }}>
        <img
          src={constants.serverUrl + '/' + booking.images}
          style={{ height: '75px', width: '100%', objectFit: 'cover' }}
          alt=""
        />
        <div className="card-body" style={{width:'110%'}}>
          <h5 className="card-title">Room {booking.room_number}</h5>
          <p className="card-text" >
            Name: {booking.firstName} {booking.lastName}<br />
            Check-in: {booking.check_in_date}<br />
            Check-out: {booking.check_out_date }
          </p>
          <input style={{width:'90%'}}
            type="number"
            placeholder="Amount"
            value={confirmationAmount}
            onChange={(e) => setConfirmationAmount(e.target.value)}
          />
          <input
            type="date"
            placeholder="Payment Date"
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
          />
          <button
            className="btn btn-primary"
            onClick={handleConfirmBooking}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}

export default Booking;