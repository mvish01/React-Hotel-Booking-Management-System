import axios from 'axios'
import { createUrl, log } from '../utils/utils'
// import { response } from 'express';

export async function addRoomCall(newRoomDetails) {
  const url = createUrl('/room/addroom');

  try {
    const response = await axios.post(url, newRoomDetails);
    log(response.data);
    return response.data;
  } catch (ex) {
    log(ex);
    return null;
  }
}

export async function deleteRoom(roomId)
{
  const url = createUrl(`/room/${roomId}`);

  try 
  {
    const response = await axios.delete(url )
      log(response.data);
      return response.data;
  }
  catch(ex)
  {
    log(ex);
    return  null;
  }
}


export async function getRoomList() {
  const url = createUrl('/room/getAllRooms')

  try {
    

    // make the api call using the token in the header
    const response = await axios.get(url)
    log(response.data)
    return response.data
  } catch (ex) {
    log(ex)
    return null
  }
}

export async function editRoom(roomId, updatedRoomDetails) {
  const url = createUrl(`/room/${roomId}`);

  try {
    const response = await axios.put(url, updatedRoomDetails);
    log(response.data);
    return response.data;
  } catch (ex) {
    log(ex);
    return null;
  }
}

export async function getRoomById(roomId) {
  const url = createUrl(`/room/${roomId}`);

  try {
    const response = await axios.put(url);
    log(response.data);
    return response.data;
  } catch (ex) {
    log(ex);
    return null;
  }
}