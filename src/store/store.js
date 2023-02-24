import { configureStore } from "@reduxjs/toolkit";
import viewSlice from "store/slices/viewSlice";
import authSlice from "store/slices/authSlice";

export const store = configureStore({
  reducer: { view: viewSlice, auth: authSlice },
});
