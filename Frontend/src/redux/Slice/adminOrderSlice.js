import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// GET all orders (admin)
export const getAllOrders = createAsyncThunk("admin/orders", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${API}/status/admin/orders`, {
      headers: { Authorization: `Bearer ${token}`},
    });
    console.log(res.data);
    return res.data.orders;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Error fetching orders");
  }
});

// UPDATE order status
export const updateOrderStatus = createAsyncThunk("admin/update-status", async ({ orderId, status }, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.put(`${API}/status/admin/order-status/${orderId}`, { status }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.order;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to update status");
  }
});

const adminOrderSlice = createSlice({
  name: "adminOrders",
  initialState: {
    adminOrderList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.adminOrderList = action.payload;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updated = action.payload;
        state.adminOrderList = state.adminOrderList.map((order) =>
          order._id === updated._id ? updated : order
        );
      })
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

export default adminOrderSlice.reducer;
