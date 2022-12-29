import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getServerCart, updateServerCart } from '../apis'

export const fetchCartById = createAsyncThunk(
  'cart/fetchCartById',
  async () => {
    const response = await getServerCart() // use userID from token
    return response
  }
)

export const updateCartById = createAsyncThunk(
  'cart/updateCartById',
  async (options, thunkAPI) => {
    const { cart } = options
    const token = thunkAPI.getState().token
    const response = await updateServerCart({ cart }, token)
    return response
  }
)
const slice = createSlice({
  name: 'cart',
  initialState: {
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    token: JSON.parse(localStorage.getItem('token')),
    order: JSON.parse(localStorage.getItem('order'))
  },

  reducers: {
    addItem: (state, action) => {
      const item = action.payload
      state.cart.push({ item, quantity: 1 })
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    incrementQuantity: (state, action) => { // hash map with id keys
      const itemID = action.payload
      const cartItem = state.cart.find((a) => a.item.id === itemID)
      cartItem.quantity++
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    decrementQuantity: (state, action) => {
      const itemID = action.payload
      const cartItem = state.cart.find((a) => a.item.id === itemID)
      if (cartItem.quantity === 1) cartItem.quantity = 1
      else cartItem.quantity--
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    removeItem: (state, action) => {
      const itemID = action.payload
      const filteredCart = state.cart.filter((a) => a.item.id !== itemID)
      state.cart = filteredCart
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    setToken: (state, action) => {
      const token = action.payload
      state.token = token
    },

    setOrder: (state, action) => {
      const order = action.payload
      state.order = order
      localStorage.setItem('order', JSON.stringify(state.order))
    },
    setCart: (state, action) => {
      const cart = action.payload
      state.cart = cart
    }

  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartById.fulfilled, (state, action) => {
      const cart = action.payload
      state.cart = JSON.parse(cart)
    })
  }
})

export const cartReducer = slice.reducer

export const {
  addItem,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  setToken,
  setOrder,
  setCart
} = slice.actions

export const cartAsyncReducer = slice.extraReducers
