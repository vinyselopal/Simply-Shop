import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit'
import { cartReducer, addItem, updateCartById, incrementQuantity } from './cartSlice'

const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
  actionCreator: addItem,
  effect: (action, listenerAPI) => {
    const cartStr = listenerAPI.getState().cart
    listenerAPI.dispatch(updateCartById({ cartStr, userID: 1 }))
  }
})

listenerMiddleware.startListening({
  actionCreator: incrementQuantity,
  effect: (action, listenerAPI) => {
    const cartStr = listenerAPI.getState().cart
    listenerAPI.dispatch(updateCartById({ cartStr, userID: 1 }))
  }
})

listenerMiddleware.startListening({
  actionCreator: addItem,
  effect: (action, listenerAPI) => {
    const cartStr = listenerAPI.getState().cart
    listenerAPI.dispatch(updateCartById({ cartStr, userID: 1 }))
  }
})

export const store = configureStore({
  reducer: cartReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware)
})
