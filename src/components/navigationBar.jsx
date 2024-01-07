import React from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { logout } from '../features/authSlice';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

function NavigationBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // logout the user
  const logoutUser = () => {
    // clear the session storage changes
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('Role');

    // hide the navigation bar
    dispatch(logout());

    // redirect to login page
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hotel-Booking
          </Typography>
          <Button color="inherit" component={RouterLink} to="/add_room">
            AddRoom
          </Button>
          <Button color="inherit" component={RouterLink} to="/delete_room">
            Delete-Room
          </Button>
          <Button color="inherit" component={RouterLink} to="/edit_room">
            Edit-Room
          </Button>
          <Button color="inherit" component={RouterLink} to="/BookingList">
            BookingList
          </Button>
          <Button color="inherit" component={RouterLink} to="/users_list">
            UserList
          </Button>
          <Button color="inherit" component={RouterLink} to="/room_available">
            Room_Available
          </Button>
          <div style={{ flexGrow: 1 }} />
          <Button color="inherit" onClick={logoutUser}>
            Logout
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavigationBar;
