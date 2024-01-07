import { useState } from "react";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addRoomCall } from "../../services/room";
import { log } from "../../utils/utils";

const AddRoom = () => {
  // debugger;
    const [roomDetails, setRoomDetails] = useState({
        room_number: '',
        room_type: '',
        capacity: '',
        price_per_night: '',
        images: '',
        ac_non_ac: '',
        bed_type: '',
        room_size: ''
      });
      
   
    const handleAddRoom = async () => {
      try 
      {
        console.log(roomDetails)
        const responce = await addRoomCall(roomDetails);
    log(responce['status'])
        if (responce['status'] == 'success') {
          console.log('Room added successfully:', responce.data);
          toast.success("Room added successfully!"); // Display toast
        } else {
          console.error('Failed to add room.');
          toast.error("Failed to add room. Please try again."); // Display toast
        }
      } catch (error) {
        console.error('Error adding room:', error);
        toast.error("An error occurred while adding the room. Please try again later."); // Display toast
      }
    };

      
      const handleInputChange = (event) => {
        const { name, value } = event.target;
      
        // If the selected field is "room_type," update the images state based on the selected room type
        if (name === "room_type") {
          const selectedOption = event.target.options[event.target.selectedIndex];
          const selectedImage = selectedOption.getAttribute("data-image");
          
          setRoomDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
            images: selectedImage // Update the images state with the selected image filename
          }));
        } else {
          setRoomDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
          }));
        }

      };
      

      return(<>
            <h3>Room Management</h3>

      <div className="mb-3">
        <label htmlFor="room_number" className="form-label">Room Number:</label>
        <input type="number" name="room_number" className="form-control" placeholder="int" value={roomDetails.room_number} onChange={handleInputChange} />
      </div>
     
      <div className="mb-3">
  <label htmlFor="room_type" className="form-label">Room Type:</label>
  <select name="room_type" className="form-control" value={roomDetails.room_type} onChange={handleInputChange}>
    <option value="">Select Room Type</option>
    <option value="Standard" data-image="standard.png">Standard</option>
    <option value="Deluxe" data-image="Deluxe.png">Deluxe</option>
    <option value="Suite" data-image="Suite.png">Suite</option>
  </select>
</div>


      <div className="mb-3">
        <label htmlFor="capacity" className="form-label">Capacity:</label>
        <input type="number" name="capacity" className="form-control" placeholder="int" value={roomDetails.capacity} onChange={handleInputChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="price_per_night" className="form-label">Price per Night:</label>
        <input type="number" name="price_per_night" className="form-control" placeholder="int" value={roomDetails.price_per_night} onChange={handleInputChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="images" className="form-label">Images:</label>
        <input type="text" name="images" className="form-control" value={roomDetails.images} onChange={handleInputChange} />
      </div>
      <div className="mb-3">
    <label htmlFor="ac_non_ac" className="form-label">AC/Non-AC:</label>
    <select name="ac_non_ac" className="form-control" value={roomDetails.ac_non_ac} onChange={handleInputChange}>
      <option value="">Select AC/Non-AC</option>
      <option value="AC">AC</option>
      <option value="Non-AC">Non-AC</option>
    </select>
  </div>
 
  <div className="mb-3">
  <label htmlFor="bed_type" className="form-label">Bed Type:</label>
  <select name="bed_type" className="form-control" value={roomDetails.bed_type} onChange={handleInputChange}>
    <option value="">Select Bed Type</option>
    <option value="Queen">Queen</option>
    <option value="King">King</option>
    <option value="Double">Double</option>
    <option value="Twin">Twin</option>
    <option value="Single">Single</option>
  </select>
</div>

<div className="mb-3">
  <label htmlFor="room_size" className="form-label">Room Size:</label>
  <div className="input-group">
    <input type="text" name="room_size" className="form-control" value={roomDetails.room_size} onChange={handleInputChange} />
    <span className="input-group-text">sqft</span>
  </div>
</div>

      <button type="button" onClick={handleAddRoom} className="btn btn-primary">Add Room</button>
      </>);
}

export default AddRoom;