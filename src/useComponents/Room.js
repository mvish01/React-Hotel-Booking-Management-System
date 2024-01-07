import React from 'react'
import { Link } from 'react-router-dom';


function Room({ rooms, CheckInDate, CheckOutDate }) {
    return (
        <div className='row'>
            <div className="col-md-4">
                <img src={`http://192.168.0.110:4000/${rooms.images}`} alt="Image" className="img-fluid img-thumbnail" style={{ height: "100px" }} />
            </div>
            <div className="col-md-6">
                <h2>Room Number : {rooms.room_number}</h2>
                <p>Room Type : {rooms.room_type}</p>
                <p>Capacity : {rooms.capacity}</p>
                <p>Price per Night : ₹{rooms.price_per_night}</p>
            </div>
            <div>
                <Link to={`/book/${rooms.room_number}/${CheckInDate}/${CheckOutDate}`}>
                    <button> BOOK ROOM  </button>
                </Link>
            </div>

        </div>
    )
}

export default Room
