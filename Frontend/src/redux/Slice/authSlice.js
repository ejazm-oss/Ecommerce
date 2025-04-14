import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// REGISTER
export const registerUser = createAsyncThunk('auth/registerUser', async (userData, thunkAPI) => {
  try {
    const response = await axios.post(`${API}/auth/signup`, userData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.response?.data?.message || error.message });
  }
});

// LOGIN
export const loginUser = createAsyncThunk('auth/loginUser', async (userData, thunkAPI) => {
  try {
    const response = await axios.post(`${API}/auth/login`, userData);
    console.log('Login response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Login API Error:', error);
    return thunkAPI.rejectWithValue({ error: error.response?.data?.message || error.message });
  }
});

// ADMIN AUTH
// admin action
export const admin = createAsyncThunk("auth/admin", async (_, thunkAPI) => {
  const token = localStorage.getItem("token"); 

  if (!token) {
    return thunkAPI.rejectWithValue({ message: 'No token found' });
  }

  try {
    const response = await axios.post(
      `${API}/auth/admin`,{},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;  // This will be dispatched to the reducer
  } catch (error) {
    console.log("Admin API Error:", error);
    return thunkAPI.rejectWithValue({ error: error.response?.data?.message || error.message });
  }
});


// SAFELY PARSE LOCAL USER
let parsedUser = null;
try {
  const storedUser = localStorage.getItem('user');
  if (storedUser && storedUser !== 'undefined') {
    parsedUser = JSON.parse(storedUser);
  }
} catch (err) {
  console.error('Error parsing user from localStorage:', err);
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: parsedUser,
    token: localStorage.getItem('token') || null,
    isLoading: false,
    error: null,
    adminData: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.adminData = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const user = {
          name: action.payload.name,
          email: action.payload.email,
          phone: action.payload.phone,
          address: action.payload.address,
        };
        state.user = user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(user));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const user = {
          name: action.payload.name,
          email: action.payload.email,
          phone: action.payload.phone,
          address: action.payload.address,
          isAdmin: action.payload.isAdmin,
          token: action.payload.token
        };
        state.user = user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
      })
      
      // ADMIN AUTH
      .addCase(admin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(admin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.adminData = action.payload;
      })
      .addCase(admin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error || "Something went wrong!";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
