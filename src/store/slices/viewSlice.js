import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarCollapsed: false,
};

export const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    toggleSidebar: (state, action) => {
      state.sidebarCollapsed = action.payload;
    },
  },
});

export const { toggleSidebar } = viewSlice.actions;

export default viewSlice.reducer;
