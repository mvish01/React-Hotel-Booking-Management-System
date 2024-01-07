// import logo from './logo.svg';
// import './App.css';
import Toolbar from './Toolbar'
import { BrowserRouter, Route } from 'react-router-dom';
import Homescreen from './Home';
import Bookroom from './Bookroom';
import Register from './Register';
import Login from './Login';
import Profile from './Profile';
import Bookhistory from './Bookhistory';
import Changepassword from './Changepassword';
// import { Link } from 'react-router-dom';



function App() {

  var isUserLoggedIn = sessionStorage.getItem('isUserLoggedIn');

  return (

    <BrowserRouter>
      <Toolbar isUserLoggedIn={isUserLoggedIn} />
      <Route exact path="/" component={isUserLoggedIn === "true" ? Homescreen : Login} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/home" component={isUserLoggedIn === "true" ? Homescreen : Login} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/history" component={Bookhistory} />
      <Route exact path="/change" component={Changepassword} />
      <Route exact path="/book/:roomno/:CheckInDate/:CheckOutDate" component={Bookroom} />

    </BrowserRouter>

  );
}

export default App;

