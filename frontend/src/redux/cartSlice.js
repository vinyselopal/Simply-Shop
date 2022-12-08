import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: []
  },

  reducers: {
    addItem: (state, action) => {
      state.cart.push({ item: action.payload, quantity: 1 })
    },
    incrementQuantity: (state, action) => {
      const cartItem = state.cart.find((a) => a.item.id === action.payload)
      cartItem.quantity++
    },
    decrementQuantity: (state, action) => {
      const cartItem = state.cart.find((a) => a.item.id === action.payload)
      if (cartItem.quantity === 1) cartItem.quantity = 1
      else cartItem.quantity--
    },
    removeItem: (state, action) => {
      console.log('action payload', action.payload)
      const filteredCart = state.cart.filter((a) => a.item.id !== action.payload)
      state.cart = filteredCart
    }

  }
})

export const cartReducer = cartSlice.reducer
export const {
  addItem,
  incrementQuantity,
  decrementQuantity,
  removeItem
} = cartSlice.actions
