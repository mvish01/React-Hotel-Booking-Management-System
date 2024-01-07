import React, { useEffect, useState } from 'react';
import Room from './Room';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {fetchAllRooms, fetchAvailableRooms} from '../services/userSide'

function Homescreen() {
    // const [room, setRoom] = useState([]);
    const [displayedRooms, setDisplayedRooms] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [formattedCheckInDate, setFormattedCheckInDate] = useState(null);
    const [formattedCheckOutDate, setFormattedCheckOutDate] = useState(null);;

    useEffect(() => {
        Select();
    }, []);

    const Select = function () {
        fetchAllRooms()
          .then((data) => {
            setDisplayedRooms(data);
          })
          .catch((error) => {
            console.error("Error fetching room data:", error);
          });
      }


    useEffect(() => {
        filterRoomsByDateRange();
    }, [startDate, endDate]);




    const filterRoomsByDateRange = () => {
        if (startDate && endDate) {
            console.log(startDate)

            const yearIn = startDate.getFullYear();
            const monthIn = (startDate.getMonth() + 1).toString().padStart(2, '0');
            const dayIn = startDate.getDate().toString().padStart(2, '0');
            const formattedCheckInDate = `${yearIn}-${monthIn}-${dayIn}`;

            console.log(formattedCheckInDate)

            const yearOut = endDate.getFullYear();
            const monthOut = (endDate.getMonth() + 1).toString().padStart(2, '0');
            const dayOut = endDate.getDate().toString().padStart(2, '0');
            const formattedCheckOutDate = `${yearOut}-${monthOut}-${dayOut}`;


            setFormattedCheckInDate(formattedCheckInDate)
            setFormattedCheckOutDate(formattedCheckOutDate)

            fetchAvailableRooms(formattedCheckInDate, formattedCheckOutDate)
            .then((data) => {
              setDisplayedRooms(data);
            })
            .catch((error) => {
              console.error("Error fetching available room data:", error);
            });
        }
    };


    return (
        <div className='container'>
            <div className="row justify-content-center mt-5">
                <div className="col-md-12  date-pickers">
                    <DatePicker
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        placeholderText="Select start date"
                    />
                    <DatePicker
                        selected={endDate}
                        onChange={date => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        placeholderText="Select end date"
                    />
                </div>

                {displayedRooms.map((roomitem) => (
                    <div key={roomitem.room_number} className="col-md-9 mt-3">
                        <Room rooms={roomitem} CheckInDate={formattedCheckInDate} CheckOutDate={formattedCheckOutDate} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Homescreen;
