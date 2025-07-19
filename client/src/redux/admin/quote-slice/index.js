import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  quotes: [],
  quote: null,
  totalCount: 0,
};

export const getQuotes = createAsyncThunk(
  "quote/get-quotes",
  async ({ trashed = false, page = 1, limit = 20, status = "all" } = {}) => {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/quote`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          trashed,
          page,
          limit,
          status,
        },
      }
    );

    return response.data;
  }
);

export const getQuote = createAsyncThunk("quote/get-quote", async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/quote/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
});

export const createQuote = createAsyncThunk(
  "quote/create-quote",
  async (data) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/quote`,
      data
    );
    return response.data;
  }
);

export const updateQuote = createAsyncThunk(
  "quote/update-quote",
  async ({ id, ...data }) => {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/quote/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const softDeleteQuote = createAsyncThunk(
  "quote/soft-delete-quote",
  async (ids) => {
    const token = localStorage.getItem("token");

    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/quote/soft-delete`,
      { ids },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const recoverQuote = createAsyncThunk(
  "quote/recover-quote",
  async (ids) => {
    const token = localStorage.getItem("token");

    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/quote/recover`,
      { ids },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const deleteQuote = createAsyncThunk(
  "quote/delete-quote",
  async (ids) => {
    const token = localStorage.getItem("token");

    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/quote`,
      { ids },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

const quoteSlice = createSlice({
  name: "quote",
  initialState,
  reducers: {
    resetQuote: (state) => {
      state.isLoading = true;
      state.quote = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getQuotes.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getQuotes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.quotes = action.payload.quotes;
      state.totalCount = action.payload.totalCount;
    });
    builder.addCase(getQuotes.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getQuote.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getQuote.fulfilled, (state, action) => {
      state.isLoading = false;
      state.quote = action.payload.quote;

      // Update the matching quote in the quotes array
      const index = state.quotes.findIndex(
        (q) => q._id === action.payload.quote._id
      );
      if (index !== -1) {
        state.quotes[index].status = "read";
      }
    });
    builder.addCase(getQuote.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createQuote.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createQuote.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(createQuote.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateQuote.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateQuote.fulfilled, (state, action) => {
      state.isLoading = false;

      const updated = action.payload.data;

      // Update the quote in the list if it exists
      const index = state.quotes.findIndex((q) => q._id === updated._id);
      if (index !== -1) {
        state.quotes[index] = {
          ...state.quotes[index],
          ...updated,
        };
      }

      // Also update single quote if it's the same one
      if (state.quote && state.quote._id === updated._id) {
        state.quote = {
          ...state.quote,
          ...updated,
        };
      }
    });

    builder.addCase(updateQuote.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(softDeleteQuote.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(softDeleteQuote.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(softDeleteQuote.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(recoverQuote.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(recoverQuote.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(recoverQuote.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(deleteQuote.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteQuote.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(deleteQuote.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { resetQuote } = quoteSlice.actions;

export default quoteSlice.reducer;
