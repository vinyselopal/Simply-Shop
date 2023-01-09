import { configureStore } from '@reduxjs/toolkit'
import { cartAsyncReducer } from './slice'
export const store = configureStore({
  reducer: cartAsyncReducer
})
