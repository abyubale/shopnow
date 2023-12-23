import { configureStore } from "@reduxjs/toolkit";
import cartReducers from "../components/AddSubItem/addSubSlice";
export const store = configureStore({
  reducer: {
    addsub: cartReducers,
  },
});
