import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Slice/authSlice";
import categoryReducer from "../Slice/categorySlice";
import productReducer from "../Slice/productSlice";
import cartReducer from "../Slice/cartSlice";
import addressReducer from "../Slice/AddressSlice"
import orderReducer from "../Slice/orderSlice"
import statusReducer from "../Slice/adminOrderSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer, 
    product: productReducer,
    cart: cartReducer,
    address: addressReducer,
    order: orderReducer,
    adminOrders: statusReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});
