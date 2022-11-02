import { createSlice } from "@reduxjs/toolkit";

const initState = {
  orderList: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState: initState,
  reducers: {
    addOrder(state, action) {
      const order = action.payload;
      state.orderList.push(order);
    },
  },
});

export const { addOrder } = orderSlice.actions;

export default orderSlice.reducer;
