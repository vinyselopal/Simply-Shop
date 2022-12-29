import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit'
import { cartReducer, addItem, updateCartById, incrementQuantity, decrementQuantity, removeItem } from './slice'

const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
  actionCreator: addItem,
  effect: (action, listenerAPI) => {
    const cartStr = listenerAPI.getState().cart
    listenerAPI.dispatch(updateCartById({ cartStr }))
  }
})

listenerMiddleware.startListening({
  actionCreator: incrementQuantity,
  effect: (action, listenerAPI) => {
    const cartStr = listenerAPI.getState().cart
    listenerAPI.dispatch(updateCartById({ cartStr }))
  }
})

listenerMiddleware.startListening({
  actionCreator: decrementQuantity,
  effect: (action, listenerAPI) => {
    const cartStr = listenerAPI.getState().cart
    listenerAPI.dispatch(updateCartById({ cartStr }))
  }
})

listenerMiddleware.startListening({
  actionCreator: removeItem,
  effect: (action, listenerAPI) => {
    const cartStr = listenerAPI.getState().cart
    listenerAPI.dispatch(updateCartById({ cartStr }))
  }
})

export const store = configureStore({
  reducer: cartReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware)
})
