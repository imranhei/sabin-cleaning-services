import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  user: null,
  isLoadingAuth: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        data
      );
      return response.data;
    } catch (error) {
      // Return proper error message from backend
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// export const register = createAsyncThunk("auth/register", async (data) => {
//   const response = await axios.post(
//     `${import.meta.env.VITE_API_URL}/api/auth/register`,
//     data
//   );
//   return response.data;
// });

export const checkAuth = createAsyncThunk("auth/check-auth", async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/auth/check-auth`
  );
  return response.data;
});

export const resetPassword = createAsyncThunk(
  "auth/reset-password",
  async (data) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/reset-password`,
      data
    );
    return response.data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetTokenAndCredentials: (state) => {
      // no subdomain
      state.user = null;
      state.isAuthenticated = false;
      sessionStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
    })
    .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoadingAuth = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoadingAuth = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoadingAuth = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resetPassword.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default authSlice.reducer;
