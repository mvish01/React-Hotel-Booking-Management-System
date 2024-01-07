import axios from 'axios'
import { createUrl, log } from '../utils/utils'

export async function bookReservation(userId, roomId, checkInDate, checkOutDate) {
  const url = createUrl('/reservation/book_Reservation');

  const requestData = {
    userId,
    roomId,
    checkInDate: checkInDate.toISOString().split('T')[0],
    checkOutDate: checkOutDate.toISOString().split('T')[0],
  };

  try {
    const response = await axios.post(url, requestData);
    log(response.data);
    return response.data;
  } catch (ex) {
    log(ex);
    return null;
  }
}

export async function checkRoomAvailability(checkInDate, checkOutDate, roomType, capacity) {
  const url = createUrl('/room/availability');

  const requestData = {
    checkInDate: checkInDate.toISOString().split('T')[0],
    checkOutDate: checkOutDate.toISOString().split('T')[0],
    roomType,
    capacity: parseInt(capacity),
  };
console.log(requestData)
  try {
    //debugger;
    const response = await axios.post(url, requestData);
    log(response.data);
    return response.data;
  } catch (ex) {
    log(ex);
    return null;
  }
}

export async function getBookingList() {
  const url = createUrl('/reservation/bookings')

  try {
    // get the current user's token from session storage
    const { name } = sessionStorage

    // create a header to send the token
    const header = {
      headers: {
        name,
      },
    }

    // make the api call using the token in the header
    const response = await axios.get(url, header)
    log(response.data)
    return response.data
  } catch (ex) {
    log(ex)
    return null
  }
}

export async function getUnconfirmBookingList() {
  const url = createUrl('/reservation/bookings_unconfirmed')

  try {
    // get the current user's token from session storage
    const { name } = sessionStorage

    // create a header to send the token
    const header = {
      headers: {
        name,
      },
    }

    // make the api call using the token in the header
    const response = await axios.get(url, header)
    log(response.data)
    return response.data
  } catch (ex) {
    log(ex)
    return null
  }
}


export async function confirmBooking( reservationId, amount, paymentDate) {
  const url = createUrl('/confirmation/confirmations');
  const data = {
    reservationId,
    amount,
    paymentDate,
  };

  try {
    const response = await axios.post(url, data);
    log(response.data);
    return response.data;
  } catch (ex) {
    log(ex);
    return null;
  }
}

export async function deleteReservation(reservationId) {
  const url = createUrl(`/reservation/${reservationId}`);
  
  try {
    const response = await axios.delete(url);
    log(response.data);
    return response.data;
  } catch (ex) {
    log(ex);
    return null;
  }
}