import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import quoteSlice from "./admin/quote-slice";
import dashboardSlice from "./admin/dashboard-slice";
import eventSlice from "./admin/event-slice";
import userSlice from "./admin/user-slice";
import blogSlice from "./admin/blog-slice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    dashboard: dashboardSlice,
    quote: quoteSlice,
    event: eventSlice,
    user: userSlice,
    blog: blogSlice,
  },
});
export default store;
