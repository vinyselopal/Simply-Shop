import * as toolkitRaw from '@reduxjs/toolkit'
import { getServerCart, updateServerCart, getProductsOfCategory } from '../apis'
const { createSlice, createAsyncThunk } = toolkitRaw.default ?? toolkitRaw

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

export const addItemToCart = createAsyncThunk(
  'cart/addItemToCart',
  async (item, thunkAPI) => {
    const newCart = [...thunkAPI.getState().cart, { item, quantity: 1 }]
    const response = await updateServerCart({ cart: newCart })
    return newCart
  }
)

export const incrementItemQuantityInCart = createAsyncThunk(
  'cart/incrementItemQuantityInCart',
  async (itemID, thunkAPI) => {
    const cart = thunkAPI.getState().cart
    const newCart = cart.map(a => {
      if (a.item.id === itemID) {
        return { ...a, quantity: a.quantity + 1 }
      }
      return a
    })
    const response = await updateServerCart({ cart: newCart })
    return newCart
  }
)

export const decrementItemQuantityInCart = createAsyncThunk(
  'cart/decrementItemQuantityInCart',
  async (itemID, thunkAPI) => {
    const cart = thunkAPI.getState().cart
    const newCart = cart.map(a => {
      if (a.item.id === itemID) {
        if (a.quantity === 1) return { ...a, quantity: 1 }
        return { ...a, quantity: a.quantity - 1 }
      }
      return a
    })
    const response = await updateServerCart({ cart: newCart })
    return newCart
  }
)

export const removeItemFromCart = createAsyncThunk(
  'cart/removeItemFromCart',
  async (itemID, thunkAPI) => {
    const cart = thunkAPI.getState().cart
    const newCart = cart.filter(cartItem => cartItem.item.id === itemID)
    const response = await updateServerCart({ cart: newCart })
    return newCart
  }
)

export const setCart = createAsyncThunk(
  'cart/setCart',
  async (newCart, thunkAPI) => {
    const response = await updateServerCart({ cart: newCart })
    return newCart
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCartById.fulfilled, (state, action) => {
      const cart = action.payload
      state.cart = JSON.parse(cart)
    })
    builder.addCase(getProductsOfCategoryThunk.fulfilled, (state, action) => {
      const products = action.payload
      state.products = products
    })
    builder.addCase(addItemToCart.fulfilled, (state, action) => {
      const cart = action.payload
      state.cart = cart
    })
    builder.addCase(removeItemFromCart.fulfilled, (state, action) => {
      const cart = action.payload
      state.cart = cart
    })
    builder.addCase(incrementItemQuantityInCart.fulfilled, (state, action) => {
      const cart = action.payload
      state.cart = cart
    })
    builder.addCase(decrementItemQuantityInCart.fulfilled, (state, action) => {
      const cart = action.payload
      state.cart = cart
    })
    builder.addCase(setCart.fulfilled, (state, action) => {
      const cart = action.payload
      state.cart = cart
    })
  }
})

export const cartReducer = slice.reducer

export const cartAsyncReducer = slice.extraReducers
