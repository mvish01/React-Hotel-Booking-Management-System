import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { userlogout } from '../features/userAuthSlice';
import { useDispatch } from 'react-redux';



function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    var navigate = useNavigate();
    var dispatch = useDispatch();
    
    const ChangePassword = () => {
        if (newPassword !== confirmPassword) {
            setMessage('New password and confirm password do not match');
            return;
        }

        const userId = sessionStorage.getItem('userUserId');

        axios
            .put(`http://192.168.0.110:4000/user/react_user/changepassword/${userId}`, { newPassword })
            .then((response) => {
                setMessage(response.data.data);
                sessionStorage.removeItem("userName");
                sessionStorage.removeItem("userUserId");
                dispatch(userlogout())
                navigate('/')   
            })
            .catch((error) => {
                console.error('Error changing password:', error);
                setMessage('Error changing password');
            });
    };

    return (
        <div className="change-password-container mt-5">
            <h2>Change Password</h2>
            <div className="input-container">
                <label>Old Password:</label>
                <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />
            </div>
            <div className="input-container">
                <label>New Password:</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>
            <div className="input-container">
                <label>Confirm Password:</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <button className="change-password-button" onClick={ChangePassword}>
                Change Password
            </button>
            <p className="message">{message}</p>
        </div>
    );
}

export default ChangePassword;
