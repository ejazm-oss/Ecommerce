import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// ADD TO CART
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return thunkAPI.rejectWithValue("Please login to add items");

      const res = await axios.post(
        `${API}/cart/add-to-cart`,
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data.cartItem;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// GET CART ITEMS
export const getCartItems = createAsyncThunk(
  "cart/cart-items",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return thunkAPI.rejectWithValue("Please login to view cart");

      const res = await axios.get(`${API}/cart/cart-items`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.cartItems;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// UPDATE CART QUANTITY
export const updateCartQuantity = createAsyncThunk(
  "cart/update-cart",
  async ({ productId, quantity }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return thunkAPI.rejectWithValue("Please login");

      const res = await axios.put(
        `${API}/cart/update-cart`,
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data.cartItem;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// REMOVE FROM CART
export const removeFromCart = createAsyncThunk(
  "cart/remove-cart",
  async (productId, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return thunkAPI.rejectWithValue("Please login");

      await axios.delete(`${API}/cart/remove-cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return productId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const clearCartBackend = createAsyncThunk("cart/clear-cart", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.delete(`${API}/cart/clear-cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return true;
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to clear cart");
  }
});

// SLICE
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // ADD TO CART
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        const existing = state.cartItems.find(
          (item) => item.product._id === action.payload.product._id
        );
        if (existing) {
          existing.quantity = action.payload.quantity;
        } else {
          state.cartItems.push(action.payload);
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET CART
      .addCase(getCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE QUANTITY
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        const updatedItem = action.payload;
      
        state.cartItems = state.cartItems.map((item) =>
          item.product._id === updatedItem.product._id ? updatedItem : item
        );
      })
      
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.error = action.payload;
      })

      // REMOVE ITEM
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.filter(
          (item) => item.product._id !== action.payload
        );
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});
export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
