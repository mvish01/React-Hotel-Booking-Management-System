// Import necessary modules
import axios from 'axios';
import { createUrl, log } from '../utils/utils'; // Assuming you've already defined these in your code.

// Define the function for profile retrieval
export async function fetchUserProfile(userId) {
  const url = createUrl(`/user/react_user/${userId}`);

  try 
  {
    const response = await axios.get(url);
    log("Profile retrieval response: " + JSON.stringify(response.data)); // Logging the response data

    // Handle the response data here as needed.
    // For example, you can set the user's profile state or perform other actions.

    return response.data;
  } 
  
  catch (error) 
  {
    log("Error during profile retrieval: " + error);
    return null;
  }
}

// Function for fetching booking history

// Function for fetching booking history from the API
export async function fetchBookingHistoryFromAPI(userId) 
{
  try 
  {
    const response = await axios.get(createUrl(`/user/react_user/Bookhistory/${userId}`)); // Use createUrl here
    return response.data.data;
  } 
  catch (error) 
  {
    console.error("Error fetching booking history:", error);
    throw error;
  }
}

// Function for canceling a booking
export async function cancelBooking(reservationId) {
  try {
    const response = await axios.delete(createUrl(`/room/${reservationId}`)); // Use createUrl here
    return response.data;
  } catch (error) {
    console.error("Error canceling booking:", error);
    throw error;
  }
}

// Function for fetching image
export async function fetchImage(imagePath) {
  try {
    const imageUrl = createUrl(`/${imagePath}`);
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

    // Assuming you are working with binary image data, you can return it as-is
    return response.data;
  } catch (error) {
    console.error("Error fetching image:", error);
    throw error;
  }
}

// Function for booking a reservation
export async function bookReservation(userId, roomId, checkInDate, checkOutDate) {
  const url = createUrl('/reservation/book_Reservation');
  const headers = {
    'Content-Type': 'application/json',
  };

  const reservationData = {
    userId: parseInt(userId),
    roomId: roomId,
    checkInDate: checkInDate,
    checkOutDate: checkOutDate,
  };

  try {
    const response = await axios.post(url, reservationData, { headers });
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error booking reservation:', error);
    throw error;
  }
}

// Function for fetching room data
export async function fetchRoomData(roomno) {
  const url = createUrl(`/room/${roomno}`);

  try {
    const response = await axios.get(url);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching room data:", error);
    throw error;
  }
}

// Function for fetching all rooms
export async function fetchAllRooms() {
  const url = createUrl('/room/getAllRooms');

  try {
    const response = await axios.get(url);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching all rooms:", error);
    throw error;
  }
}

// Function for fetching available rooms within a date range
export async function fetchAvailableRooms(checkInDate, checkOutDate) {
  const url = createUrl(`/room/react_user/availability/${checkInDate}/${checkOutDate}`);

  try {
    const response = await axios.get(url);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching available rooms:", error);
    throw error;
  }
}