import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from "react-router-dom";

function Toolbar() 
{

    // var isUserLoggedIn = sessionStorage.getItem('isUserLoggedIn');
    var loggedInUserName = sessionStorage.getItem('userName');
    console.log(loggedInUserName) 

    var isUserLoggedIn = useSelector((state) => state.userAuth.status)
    // var history = useHistory();
    console.log(isUserLoggedIn) 
    var dispatch = useDispatch();

    function logout() 
    {
        sessionStorage.removeItem("userName");
        dispatch(userlogout)    
    }


    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
                <div className="container d-flex justify-content-center">
                    <a className="navbar-brand text-white justify-content-center" href="/home">Welcome to Our Hotel</a>
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {loggedInUserName}
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" href="/profile">Profile</a>
                                    <a className="dropdown-item" href="/history">Booking History</a>
                                    <a className="dropdown-item" href="/change">Change Password</a>
                                    <a className="dropdown-item" href="/" onClick={logout}>Logout</a>
                                </div>
                            </div>
                        
                    </ul>
                </div>
            </nav>

        </div>
    )
}

export default Toolbar
