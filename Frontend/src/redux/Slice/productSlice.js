import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// Create Product
export const createProduct = createAsyncThunk(
  "product/create-product",
  async (data, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return thunkAPI.rejectWithValue({ error: "No token found" });
    }
    try {
      const res = await axios.post(`${API}/product/create-product`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        error: error.response?.data?.message || error.message,
      });
    }
  }
);

// Get All Products
export const getProduct = createAsyncThunk(
  "product/get-product",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${API}/product/get-product`);
      return res.data.product;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        error: error.response?.data?.message || error.message,
      });
    }
  }
);

// Get Single Product
export const singleProduct = createAsyncThunk(
  "product/single-product",
  async (slug, thunkAPI) => {
    try {
      const res = await axios.get(`${API}/product/single-product/${slug}`);
      return res.data.product;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        error: error.response?.data?.message || error.message,
      });
    }
  }
);

// Update Product
export const updateProduct = createAsyncThunk(
  "product/update-product",
  async ({ id, updatedData }, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return thunkAPI.rejectWithValue({ error: "No token found" });
    }
    try {
      const res = await axios.put(
        `${API}/product/update-product/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data.product;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        error: error.response?.data?.message || error.message,
      });
    }
  }
);

// Delete Product
export const deleteProduct = createAsyncThunk(
  "product/delete-product",
  async (id, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return thunkAPI.rejectWithValue({ error: "No token found" });
    }
    try {
      await axios.delete(`${API}/product/delete-product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        error: error.response?.data?.message || error.message,
      });
    }
  }
);

export const filterProductByCategory = createAsyncThunk(
  "product/filter-by-category",
  async (category, thunkAPI) => {
    try {
      const res = await axios.get(
        `${API}/product/filter-product?category=${category}`
      );
      return res.data.product;
    } catch (err) {
      return thunkAPI.rejectWithValue({
        error: err.response?.data?.message || err.message,
      });
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    product: [],
    singleProduct: null,
    filteredProduct: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })

      // Get All Products
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })

      // Get Single Product
      .addCase(singleProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(singleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload;
      })
      .addCase(singleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })

      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.product.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index !== -1) {
          state.product[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })

      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = state.product.filter((p) => p._id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      
      // Filter Product by Category
      .addCase(filterProductByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(filterProductByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredProduct = action.payload;
      })
      .addCase(filterProductByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export default productSlice.reducer;
