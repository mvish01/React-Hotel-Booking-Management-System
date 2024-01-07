import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {fetchUserProfile} from '../services/userSide'
import { log } from '../utils/utils';

function Profile() {

  const userId = sessionStorage.getItem('userUserId');
  console.log(userId);
  var [profile, setProfile] = useState({});

  useEffect(() => {
   

    fetchData(userId);
  }, []);

 // Fetch the user profile when the component mounts
 const fetchData = async () => {
  const userProfile = await fetchUserProfile(userId);
  log("use effect profile retrival")
  log(userProfile)
  setProfile(userProfile['data']);
  log(profile)
};
  return (
    <div className="profile-container mt-5">
      <h1>Profile Details</h1>
      <p>First Name: {profile.firstName}</p>
      <p>Last Name: {profile.lastName}</p>
      <p>Email: {profile.email}</p>
      <p>Phone Number: {profile.phoneNumber}</p>
    </div>
  )
}

export default Profile
