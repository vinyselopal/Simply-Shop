import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit'
import { cartReducer, setCart, addItem, updateCartById, incrementQuantity, decrementQuantity, removeItem } from './slice'

const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
  actionCreator: setCart,
  effect: (action, listenerAPI) => {
    const cart = listenerAPI.getState().cart
    listenerAPI.dispatch(updateCartById({ cart }))
  }
})

listenerMiddleware.startListening({
  actionCreator: addItem,
  effect: (action, listenerAPI) => {
    const cart = listenerAPI.getState().cart
    listenerAPI.dispatch(updateCartById({ cart }))
  }
})

listenerMiddleware.startListening({
  actionCreator: incrementQuantity,
  effect: (action, listenerAPI) => {
    const cart = listenerAPI.getState().cart
    listenerAPI.dispatch(updateCartById({ cart }))
  }
})

listenerMiddleware.startListening({
  actionCreator: decrementQuantity,
  effect: (action, listenerAPI) => {
    const cart = listenerAPI.getState().cart
    listenerAPI.dispatch(updateCartById({ cart }))
  }
})

listenerMiddleware.startListening({
  actionCreator: removeItem,
  effect: (action, listenerAPI) => {
    const cart = listenerAPI.getState().cart
    listenerAPI.dispatch(updateCartById({ cart }))
  }
})

export const store = configureStore({
  reducer: cartReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware)
})
