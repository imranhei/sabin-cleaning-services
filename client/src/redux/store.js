import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import quoteSlice from "./admin/quote-slice";

const store = configureStore({
  reducer: { 
    auth: authSlice,
    quote: quoteSlice
 },
});
export default store;
