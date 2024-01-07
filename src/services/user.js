import axios from 'axios'
import { createUrl, log } from '../utils/utils'

export async function registerUser(
  firstName,
  lastName,
  email,
  password,
  phoneNumber,
  role
) {
  const url = createUrl('/user/register')
  const body = {
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    role
  }

  // wait till axios is making the api call and getting response from server
  try {
    const response = await axios.post(url, body)
    log(response.data)
    return response.data
  } catch (ex) {
    log(ex)
    return null
  }
}

export async function loginUser(email, password ) {
  const url = createUrl('/user/login')
  const body = {
    email,
    password  
  }

  // wait till axios is making the api call and getting response from server
  try {
    const response = await axios.post(url, body)
    log("login responce"+response.data)
    return response.data
  } catch (ex) {
    log(ex)
    return null
  }
}

export async function getUsersList() {
  const url = createUrl('/user/all');

  try {
    const response = await axios.get(url);
    log(response.data);
    return response.data;
  } catch (ex) {
    log(ex);
    return null;
  }
}

export async function deleteUser(userId) {
  const url = createUrl(`/user/${userId}`); // Update the URL to include the userId
  try {
    const response = await axios.delete(url);
    log(response.data);
    return response.data;
  } catch (ex) {
    log(ex);
    return null;
  }
} 