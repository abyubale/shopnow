import { configureStore } from "@reduxjs/toolkit";
import cartReducers from "../components/AddSubItem/AddSubSlice";
export const store = configureStore({
  reducer: {
    addsub: cartReducers,
  },
});
