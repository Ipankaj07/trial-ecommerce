import { createSlice } from "@reduxjs/toolkit";

const initState = {
  cart: [],
  checkOut: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const item = state.cart.find((item) => item.id === product.id);
      if (item) {
        item.quantity++;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },
    increamentQuantity(state, action) {
      const id = action.payload;
      const item = state.cart.find((item) => item.id === id);
      item.quantity++;
    },
    decreamentQuantity(state, action) {
      const id = action.payload;
      const item = state.cart.find((item) => item.id === id);
      if (item.quantity > 1) {
        item.quantity--;
      }
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const item = state.cart.find((item) => item.id === id);
      state.cart.splice(state.cart.indexOf(item), 1);
    },
    clearCart(state) {
      state.cart = [];
    },
    /* if by change checkout is true then clear cart items */
    checkOut(state, action) {
      state.checkOut = action.payload;
      if (state.checkOut) {
        state.cart = [];
      }
    },
  },
});

export const {
  addToCart,
  increamentQuantity,
  decreamentQuantity,
  removeFromCart,
  clearCart,
  checkOut,
} = cartSlice.actions;

export default cartSlice.reducer;
