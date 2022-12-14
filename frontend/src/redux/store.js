import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit'
import { cartReducer, addItem, updateCartById } from './cartSlice'

const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
  actionCreator: addItem,
  effect: (action, listenerAPI) => {
    console.log('inside listener effect')
    const cartStr = listenerAPI.getState().cart
    console.log('cartStr in listener', cartStr)
    listenerAPI.dispatch(updateCartById({ cartStr, userID: 1 }))
  }
})
export const store = configureStore({
  reducer: cartReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware)
})
