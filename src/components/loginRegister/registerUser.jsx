import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { registerUser as registerUserApi } from '../../services/user'

function RegisterUser() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState(''); 

  // get the navigation object
  const navigate = useNavigate()

  const registerUser = async () => {
    if (firstName.length === '') {
      toast.error('Please enter first name')
    } else if (lastName.length === '') {
      toast.error('Please enter last name')
    } else if (email.length === '') {
      toast.error('Please enter email')
    } else if (mobile.length === '') {
      toast.error('Please enter mobile')
    } else if (password.length === '') {
      toast.error('Please enter password')
    } else if (confirmPassword.length === '') {
      toast.error('Please confirm password')
    } else if (password !== confirmPassword) {
      toast.error('Password does not match')
    } else {
      // call register api
      const response = await registerUserApi(
        firstName,
        lastName,
        email,
        password,
        mobile,
        role
      )

      // parse the response
      if (response['status'] === 'success') {
        toast.success('Successfully registered a new user')

        // go back to login
        navigate('/')
      } else {
        toast.error('Error while registering a new user, please try again')
      }
    }
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: 10 }}>Register User</h1>

      <div className='row'>
        <div className='col'></div>
        <div className='col'>
          <div className='form'>
            <div className='mb-3'>
              <label htmlFor=''>First Name</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => {
                  setFirstName(e.target.value)
                }}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor=''>Last Name</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => {
                  setLastName(e.target.value)
                }}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor=''>Email</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </div>
            <div className='mb-3'>
        <label htmlFor='role'>Role</label>
        <select
  className='form-control'
  value={role}
  onChange={(e) => {
    console.log('Selected Role:', e.target.value);
    setRole(e.target.value);
  }}
>
  <option value='Customer'>Customer</option>
  <option value='Admin'>Admin</option>
</select>

      </div>
            <div className='mb-3'>
              <label htmlFor=''>Mobile Number</label>
              <input
                type='tel'
                className='form-control'
                onChange={(e) => {
                  setMobile(e.target.value)
                }}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor=''>Password</label>
              <input
                type='password'
                className='form-control'
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor=''>Confirm Password</label>
              <input
                type='password'
                className='form-control'
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                }}
              />
            </div>

            <div className='mb-3'>
              <div className='mb-3'>
                Already got an account? <Link to='/'>Login here</Link>
              </div>
              <button onClick={registerUser} className='btn btn-success'>
                Register
              </button>
            </div>
          </div>
        </div>
        <div className='col'></div>
      </div>
    </div>
  )
}

export default RegisterUser