import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import UserList from './components/user/UserList'
import LoginUser from './components/loginRegister/loginUser'
import NavigationBar from './components/navigationBar'
import RegisterUser from './components/loginRegister/registerUser'
import EditRoom from './components/editroom/EditRoom'
// used to register react-toastify
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { login } from './features/authSlice'
import BookingList from './components/bookConfirm/Room-Bookings'
import AddRoom from './components/addroom/addRoom'
import DeleteRoom from './components/deleteroom/deleteRoom'
import EditRoomCall from './components/editroom/EditRoomCall'
import RoomAvaibility from './components/roomavailibilty/RoomAvaibility'
import Toolbar from './useComponents/Toolbar'
import { userlogin } from './features/userAuthSlice'
import Bookhistory from './useComponents/Bookhistory'
import Profile from './useComponents/Profile'
import Changepassword from './useComponents/Changepassword'
import Bookroom from './useComponents/Bookroom'
import Homescreen from './useComponents/Home'

function App() {
  // use selector accepts a function which passes the store global state
  // at the moment we are interested only in auth slice
  const loginStatus = useSelector((state) => state.auth.status)
  const userLoginStuatus = useSelector((state) => state.userAuth.status)

  const dispatch = useDispatch()

  useEffect(() => {
    // first read the current sessionStorage and see if user is logged in
    if (sessionStorage['name'] && sessionStorage['name'].length > 0) {
      // update the auth slice status to true
      dispatch(login())
    }

    else if (sessionStorage['userName'] && sessionStorage['userName'].length > 0) {
      // update the userAuth slice status to true
      dispatch(userlogin())
    }
    
  }, [])

  return (
    <div className='container-fluid'>
      {/* navigation bar here */}
      {/* conditional rendering */}
      {loginStatus && <NavigationBar />}
      { userLoginStuatus && <Toolbar/>}
      <div className='container'>
        <Routes>
          {/* home component  */}
          {/* <Route path='/' element={} /> */}

          {/* login component */}
          <Route path='/' element={<LoginUser />} />

          {/* register component */}
          <Route path='/register' element={<RegisterUser />} />

          {/* product-gallery component */}
          <Route path='/BookingList' element={<BookingList />} />

          
          {/* addroom component */}
          <Route path='/add_room' element={<AddRoom />} />

          {/* delete component */}
          <Route path='/delete_room' element={<DeleteRoom />} />


          {/* edit component */}
          <Route path='/edit_room' element={<EditRoom />} />

          <Route path='/edit_room/:roomNumber' element={<EditRoomCall />} />

          {/* edit component */}
          <Route path='/users_list' element={<UserList/>} />
          
          {/* room available component */}
          <Route path='room_available' element={<RoomAvaibility/>} />
          <Route
  path="/home"
  element={userLoginStuatus && <Homescreen /> }
/>
          <Route path="/history" element ={<Bookhistory/>} />
          <Route path="/profile" element ={<Profile/>} />
          <Route path="/history" element ={<Bookhistory/>} />
          <Route path="/change" element={<Changepassword/>} />
          <Route path="/book/:roomno/:CheckInDate/:CheckOutDate" element={<Bookroom/>} />
        </Routes>
      </div>
      <ToastContainer />
    </div>
  )
}

export default App