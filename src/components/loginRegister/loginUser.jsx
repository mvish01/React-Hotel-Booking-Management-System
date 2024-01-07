import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login } from '../../features/authSlice'
import  {userlogin} from '../../features/userAuthSlice'
import { loginUser as loginUserApi } from '../../services/user'

function LoginUser() 
{
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  // get the navigation object
  const navigate = useNavigate()

  // get dispatcher object
  const dispatch = useDispatch()

  const loginUser = async () => {
    if (email.length === '') {
      toast.error('Please enter email')
    } 
    else if (password.length === '') 
    {
      toast.error('Please enter password')
    }
    else 
     {
      // call register api
      const response = await loginUserApi(email, password)

      // parse the response
      if (response['status'] === 'success') 
      {
       
        if (response['data'].Role === 'Admin') 
        {
          console.log("inside adminloginuser res - userid:")
          console.log(response['data'].userId)
          const { name } = response['data'];

        // store the token for making other apis
       
        sessionStorage['name'] = name
        sessionStorage.setItem('userId',response['data'].userId);


        // update global store's authSlice with status = true
        dispatch(login())

        toast.success(`Welcome Admin ${name} to Hotel application`)

        // go back to login
        navigate('/BookingList')   
        } 

        else 
        {
          if (response['data'].Role == 'Customer') 
          {
            console.log("inside normal-loginuser res - userid:")
            console.log(response['data'].userId)
            const { name } = response['data'];
  
            // store the token for making other apis
         
            sessionStorage['userName'] = name
            sessionStorage.setItem('userUserId',response['data'].userId);
  
  
            // update global store's authSlice with status = true
            dispatch(userlogin())
  
            toast.success(`Welcome User ${name} to Hotel application`)
            navigate('/home')   

          }
           
        
        }
       
      } 
     

      else {
        toast.error('Invalid user name or password')
      }
    }
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: 10 }}>Login</h1>

      <div className='row'>
        <div className='col'></div>
        <div className='col'>
          <div className='form'>
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
              <div className='mb-3'>
                Don't have an account? <Link to='/register'>Register here</Link>
              </div>
              <button onClick={loginUser} className='btn btn-success'>
                Login
              </button>
            </div>
          </div>
        </div>
        <div className='col'></div>
      </div>
    </div>
  )
}

export default LoginUser