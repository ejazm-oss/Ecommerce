import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getCategories = createAsyncThunk("api/getCategories", async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${API}/api/category`);
    return res.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.response?.data?.message || error.message });
  }
});

export const createCategory = createAsyncThunk("api/create-category", async (name, thunkAPI) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return thunkAPI.rejectWithValue({ message: 'No token found' });
  }

  try {
    const res = await axios.post(`${API}/api/create-category`, { name }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    return res.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.response?.data?.message || error.message });
  }
});


export const updateCategory = createAsyncThunk("api/update-category", async ({ name, id }, thunkAPI) => {
  const token = localStorage.getItem('token');

  if(!token){
    return thunkAPI.rejectWithValue({message:"No token found"});
  }
  try {
    const res = await axios.put(`${API}/api/update-category/${id}`, {name},{
      headers:{
        Authorization:`Bearer ${token}`
      }
    });
    return res.data.category;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.response?.data?.message || error.message });
  }
});

export const deleteCategory = createAsyncThunk("api/delete-category", async (id, thunkAPI) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return thunkAPI.rejectWithValue({ message: 'No token found' });
  }
  try {
    await axios.delete(`${API}/api/delete-category/${id}`,{
      headers:{
        Authorization: `Bearer ${token}`,
      }
    });
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.response?.data?.message || error.message });
  }
});

export const singleCategory = createAsyncThunk("/api/single-category", async (slug, thunkAPI) => {
  try {
    const res = await axios.get(`${API}/single-category/${slug}`);
    return res.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.response?.data?.message || error.message });
  }
});

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    category: [],
    loading: false,
    error: null,
    singleCategory: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all categories
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })

      // Create category
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })

      // Update category
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category = state.category.map((cat) =>
          cat._id === action.payload._id ? action.payload : cat
        );
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })

      // Delete category
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category = state.category.filter((cat) => cat._id !== action.payload);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })

      // Get single category
      .addCase(singleCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.singleCategory = null;
      })
      .addCase(singleCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.singleCategory = action.payload;
      })
      .addCase(singleCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
        state.singleCategory = null;
      });
  },
});

export default categorySlice.reducer;
