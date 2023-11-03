import { configureStore } from '@reduxjs/toolkit'
import userSlices from './slices/UserSlices'

const store = configureStore({
  reducer: {
    user: userSlices, 
  },
})

export {store};