import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/authSlice'
import userAuthSlice from './features/userAuthSlice'
// create a new store
export const store = configureStore({
  reducer: {
    auth: authSlice,
    userAuth: userAuthSlice,
  },
})
