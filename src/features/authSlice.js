import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice
(
  {
  // name of slice (must be unique)
  name: 'auth',
  initialState: 
  {
    status: false,
  },
  reducers: 
  {
    // action: action handler
    login: (state) => 
    {
      state.status = true
    },
    // action: action handler
    logout: (state) => 
    {
      state.status = false
    },
  },
  }
)

export const { login, logout } = authSlice.actions
export default authSlice.reducer
