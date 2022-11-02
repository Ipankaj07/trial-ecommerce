import { createSlice } from "@reduxjs/toolkit";

const initState = {
  products: [],
  product: {},
};

const productSlice = createSlice({
  name: "product",
  initialState: initState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setProduct(state, action) {
      state.product = action.payload;
    },
  },
});

export const { setProducts, setProduct } = productSlice.actions;

export default productSlice.reducer;
