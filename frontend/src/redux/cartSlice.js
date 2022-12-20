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
  async (options, thunkAPI) => {
    const { cartStr, userID } = options
    const token = thunkAPI.getState().token
    const response = await updateServerCart(cartStr, userID, token)
    return response
  }
)
const cartSlice = createSlice({ // name as global
  name: 'cart',
  initialState: {
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    token: JSON.parse(localStorage.getItem('token')),
    userID: JSON.parse(localStorage.getItem('userID'))
  },

  reducers: {
    addItem: (state, action) => {
      state.cart.push({ item: action.payload, quantity: 1 })
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    incrementQuantity: (state, action) => { // hash map with id keys
      const cartItem = state.cart.find((a) => a.item.id === action.payload)
      cartItem.quantity++
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    decrementQuantity: (state, action) => {
      const cartItem = state.cart.find((a) => a.item.id === action.payload) // name the payload
      if (cartItem.quantity === 1) cartItem.quantity = 1
      else cartItem.quantity--
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    removeItem: (state, action) => {
      const filteredCart = state.cart.filter((a) => a.item.id !== action.payload)
      state.cart = filteredCart
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    setToken: (state, action) => {
      state.token = action.payload
    },
    setUserID: (state, action) => {
      state.userID = action.payload
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
  removeItem,
  setToken,
  setUserID
} = cartSlice.actions

export const cartAsyncReducer = cartSlice.extraReducers
