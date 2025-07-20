import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import quoteSlice from "./admin/quote-slice";
import dashboardSlice from "./admin/dashboard-slice";

const store = configureStore({
  reducer: { 
    auth: authSlice,
    dashboard: dashboardSlice,
    quote: quoteSlice,
 },
});
export default store;
