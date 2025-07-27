import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import quoteSlice from "./admin/quote-slice";
import dashboardSlice from "./admin/dashboard-slice";
import eventSlice from "./admin/event-slice";

const store = configureStore({
  reducer: { 
    auth: authSlice,
    dashboard: dashboardSlice,
    quote: quoteSlice,
    event: eventSlice
 },
});
export default store;
