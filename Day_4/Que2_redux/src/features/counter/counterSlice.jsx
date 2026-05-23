import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartCount: 0,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addToCart: (state) => {
      state.cartCount += 1
    },
    removeFromCart: (state) => {
      if(state.cartCount > 0) {
        state.cartCount -= 1
      }
    },
    incrementByAmount: (state, action) => {
      state.cartCount += action.payload
    },
    resetCart: (state) => {
      state.cartCount = 0
    }
  },
})

export const { addToCart, removeFromCart, incrementByAmount, resetCart } = counterSlice.actions

export default counterSlice.reducer