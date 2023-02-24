import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  LINKS: [{ label: "Home" }],
};

export const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    setLink: (state, action) => {
      state.LINKS = action.payload;
    },
  },
});

export const { setLink } = headerSlice.actions;

export default headerSlice.reducer;
