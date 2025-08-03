import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const initialState = {
  blogs: [],
  currentBlog: null,
  isLoading: false,
  error: null,
};

export const getBlogs = createAsyncThunk(
  "blog/getBlogs",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/api/blog`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const getBlog = createAsyncThunk(
  "blog/getBlog",
  async (blogId, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/api/blog/${blogId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const createBlog = createAsyncThunk(
  "blog/createBlog",
  async (formData, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${API_URL}/api/blog`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const updateBlog = createAsyncThunk(
  "blog/updateBlog",
  async ({ blogId, formData }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(`${API_URL}/api/blog/${blogId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "blog/deleteBlog",
  async (blogId, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`${API_URL}/api/blog/${blogId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    clearCurrentBlog: (state) => {
      state.currentBlog = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // getBlogs
      .addCase(getBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogs = action.payload.blogs;
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(getBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentBlog = action.payload.blog;
      })
      .addCase(getBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(createBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogs.push(action.payload.blog);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateBlog.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        // const index = state.blogs.findIndex(b => b._id === action.payload._id);
        // if (index !== -1) state.blogs[index] = action.payload;
        // if (state.currentBlog?._id === action.payload._id) {
        //   state.currentBlog = action.payload;
        // }
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteBlog.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogs = state.blogs.filter(
          (b) => b._id !== action.payload.blogId
        );
        if (state.currentBlog?._id === action.payload.blogId) {
          state.currentBlog = null;
        }
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentBlog, clearError } = blogSlice.actions;
export default blogSlice.reducer;
