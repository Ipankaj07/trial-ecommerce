import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./features/productSlice";
import cartReducer from "./features/cartSlice";
import orderReducer from "./features/orderSlice";

import { ecommerceCoreApi } from "./services/ecommerceCore";

export const store = configureStore({
  reducer: {
    [ecommerceCoreApi.reducerPath]: ecommerceCoreApi.reducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ecommerceCoreApi.middleware),
});
