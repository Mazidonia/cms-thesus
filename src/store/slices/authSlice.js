import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isUserLoaded: false,
  permissions: null,
  name: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authSuccess: (state) => {
      state.isAuthenticated = true;
    },
    authFail: (state) => {
      state.isAuthenticated = false;
    },
    setUser: (state, action) => {
      state.name = action.payload?.name;
      state.isUserLoaded = true;
    },
  },
});

export const { authSuccess, setUser, authFail } = authSlice.actions;

export default authSlice.reducer;
