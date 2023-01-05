import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getServerCart, updateServerCart, getProductsOfCategory } from '../apis'

export const fetchCartById = createAsyncThunk(
  'cart/fetchCartById',
  async () => {
    const response = await getServerCart()
    return response
  }
)

export const getProductsOfCategoryThunk = createAsyncThunk(
  'products/getProductsOfCategoryThunk',
  async (categories) => {
    const products = {}
    for (let i = 0; i < categories.length; i++) {
      const response = await getProductsOfCategory(categories[i])
      products[categories[i]] = response
    }
    return products
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
    order: null,
    products: null
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
      console.log('setOrder triggered')
      const order = action.payload
      state.order = order
      localStorage.setItem('order', JSON.stringify(state.order))
    },
    setCart: (state, action) => {
      const cart = action.payload
      state.cart = cart
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    setOrderAddress: (state, action) => {
      console.log('setOrderAddress triggered')
      const address = action.payload
      state.order.address = address
      return state
    },
    setOrderPaymentMethod: (state, action) => {
      console.log('setOrderPaymentMethod triggered')
      const paymentMethod = action.payload
      state.order.paymentMethod = paymentMethod
      return state
    },
    setOrderExpectedDelivery: (state, action) => {
      const expectedDelivery = action.payload
      state.order.expectedDelivery = expectedDelivery
    }

  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartById.fulfilled, (state, action) => {
      const cart = action.payload
      state.cart = JSON.parse(cart)
    })
    builder.addCase(getProductsOfCategoryThunk.fulfilled, (state, action) => {
      const products = action.payload
      state.products = products
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
  setCart,
  setOrderAddress,
  setOrderExpectedDelivery,
  setOrderPaymentMethod
} = slice.actions

export const cartAsyncReducer = slice.extraReducers
