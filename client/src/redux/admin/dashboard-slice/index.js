import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  totalMail: 0,
  accepted: 0,
  rejected: 0,
  pending: 0,
  unseen: 0,
  chartData: [],
  todayInbox: [],
};

export const getDashboardData = createAsyncThunk(
  "dashboard/get-dashboard-data",
  async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/dashboard`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    updateUnseen: (state, action) => {
      state.unseen = state.unseen + action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getDashboardData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getDashboardData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.totalMail = action.payload.totalMail;
      state.accepted = action.payload.accepted;
      state.rejected = action.payload.rejected;
      state.pending = action.payload.pending;
      state.unseen = action.payload.unseen;
      state.chartData = action.payload.chartData;
      state.todayInbox = action.payload.todayInbox;
    });
    builder.addCase(getDashboardData.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { updateUnseen } = dashboardSlice.actions;

export default dashboardSlice.reducer;
