import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import quoteSlice from "./admin/quote-slice";
import dashboardSlice from "./admin/dashboard-slice";
import eventSlice from "./admin/event-slice";
import userSlice from "./admin/user-slice";
import blogSlice from "./admin/blog-slice";

const reducer = {
  auth: authSlice,
  dashboard: dashboardSlice,
  quote: quoteSlice,
  event: eventSlice,
  user: userSlice,
  blog: blogSlice,
};

// Factory for SSR (server-side)
export function createStore(preloadedState) {
  return configureStore({
    reducer,
    preloadedState, // optional for hydration
  });
}

// Singleton for CSR (client-side)
const store = configureStore({
  reducer,
});

export default store;