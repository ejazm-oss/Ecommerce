import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// PLACE ORDER
export const placeOrder = createAsyncThunk("order/place-order", async (orderData, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(`${API}/order/place-order`, orderData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.order;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Something went wrong");
  }
});

// GET USER ORDERS
export const getUserOrders = createAsyncThunk("order/my-orders", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${API}/order/my-orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.orders;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch orders");
  }
});

// CANCEL ORDER
export const cancelOrder = createAsyncThunk("order/cancel", async (orderId, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.put(`${API}/order/cancel/${orderId}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.order;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to cancel order");
  }
});

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderList: [],
    loading: false,
    error: null,
    placedOrder: null,
  },
  reducers: {
    resetPlacedOrder: (state) => {
      state.placedOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // PLACE ORDER
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.placedOrder = action.payload;
      })

      // GET ORDERS
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.orderList = action.payload;
      })

      // CANCEL ORDER
      .addCase(cancelOrder.fulfilled, (state, action) => {
        const cancelledId = action.payload._id;
        state.orderList = state.orderList.map((order) =>
          order._id === cancelledId ? action.payload : order
        );
      })

      // Loading & Error Handling
      .addMatcher((action) => action.type.endsWith("/pending"), (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher((action) => action.type.endsWith("/rejected"), (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addMatcher((action) => action.type.endsWith("/fulfilled"), (state) => {
        state.loading = false;
      });
  },
});

export const { resetPlacedOrder } = orderSlice.actions;
export default orderSlice.reducer;
