import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getServerCart, updateServerCart } from '../apis'

export const fetchCartById = createAsyncThunk(
  'cart/fetchCartById',
  async (userId) => {
    const response = await getServerCart(userId)
    return response
  }
)

export const updateCartById = createAsyncThunk(
  'cart/updateCartById',
  async (options) => {
    const { cartStr, userID } = options
    const response = await updateServerCart(cartStr, userID)
    return response
  }
)
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    loading: 'idle'
  },

  reducers: {
    addItem: (state, action) => {
      console.log('inside addItem action')
      state.cart.push({ item: action.payload, quantity: 1 })
    },
    incrementQuantity: (state, action) => { // hash map with id keys
      const cartItem = state.cart.find((a) => a.item.id === action.payload)
      cartItem.quantity++
    },
    decrementQuantity: (state, action) => {
      const cartItem = state.cart.find((a) => a.item.id === action.payload) // name the payload
      if (cartItem.quantity === 1) cartItem.quantity = 1
      else cartItem.quantity--
    },
    removeItem: (state, action) => {
      console.log('action payload', action.payload)
      const filteredCart = state.cart.filter((a) => a.item.id !== action.payload)
      state.cart = filteredCart
    }

  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartById.fulfilled, (state, action) => {
      console.log('action payload in extra reducers', JSON.parse(action.payload))
      state.cart = JSON.parse(action.payload)
    })
  }
})

export const cartReducer = cartSlice.reducer
export const {
  addItem,
  incrementQuantity,
  decrementQuantity,
  removeItem
} = cartSlice.actions

export const cartAsyncReducer = cartSlice.extraReducers
