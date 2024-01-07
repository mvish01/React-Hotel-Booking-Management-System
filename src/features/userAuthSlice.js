import { createSlice } from '@reduxjs/toolkit'

export const userAuthSlice = createSlice
(
    {
        // name of slice (must be unique)
        name: 'userAuth',
        initialState: 
        {
          status: false,
        },
        reducers: 
        {
          // action: action handler
          userlogin: (state) => 
          {
            state.status = true
          },
          // action: action handler
          userlogout: (state) => 
          {
            state.status = false
          },
        },
    }
)

export const { userlogin,userlogout } = userAuthSlice.actions
export default userAuthSlice.reducer
