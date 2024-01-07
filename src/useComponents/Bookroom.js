import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {bookReservation , fetchRoomData} from '../services/userSide'

function Bookroom() {
    const { roomno, CheckInDate, CheckOutDate } = useParams();
    const [room, setRoom] = useState([]);
    const [numberOfDays, setNumberOfDays] = useState();

    useEffect(() => {
        fetchRoomInfo(roomno);
        if (CheckInDate && CheckOutDate) {
          const startDate = new Date(CheckInDate);
          const endDate = new Date(CheckOutDate);
          const timeDifference = endDate - startDate;
          const days = timeDifference / (24 * 60 * 60 * 1000);
          setNumberOfDays(days);
        }
      }, [roomno, CheckInDate, CheckOutDate]);
    
      const fetchRoomInfo = function () {
        fetchRoomData(roomno)
          .then((data) => {
            console.log(data);
            setRoom(data);
          })
          .catch((error) => {
            console.error("Error fetching room data:", error);
          });
      };


    var DoBook = function () {
        const userId = sessionStorage.getItem('userUserId');
        const roomId = room.room_number;
        const headers = {
          'Content-Type': 'application/json',
        };
      
        bookReservation(userId, roomId, CheckInDate, CheckOutDate)
          .then((response) => {
            if (response.status === 'success') {
              alert('Booking successful!');
              window.location.href = '/home';
            }
          })
          .catch((error) => {
            console.error('Error:', error);
            alert('Booking failed. Please try again.');
          });
      };

    return (<>
        <div className="container text-center mt-5">
            <div className="row">
                <div className="col-md-12">
                    <img src={`http://192.168.0.110:4000/${room.images}`} alt="Image" className="img-fluid img-thumbnail" style={{ maxHeight: "100px", width: "auto" }} />
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-12">
                    <h2>Room Number : {room.room_number}</h2>
                    <p>Room Type : {room.room_type}</p>
                    <p>Capacity : {room.capacity}</p>
                    <p>Bed Type : {room.bed_type}</p>
                    <p>Room Size : {room.room_size}</p>
                    <p>Ac / NonAc : {room.ac_non_ac}</p>
                    <p>Check-in Date : {CheckInDate}</p>
                    <p>Check-out Date : {CheckOutDate}</p>
                    <p>Price per Night : ₹{room.price_per_night}</p>
                    <p>Number of Nights : {numberOfDays}</p>
                    <p>Total Price : ₹{room.price_per_night * numberOfDays}</p>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-12">
                    <button onClick={DoBook}>PAY NOW</button>
                </div>
            </div>
        </div>
    </>

    )
}

export default Bookroom