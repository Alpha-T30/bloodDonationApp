import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.currentUser = action.payload.userData;
    },
    usrUpdate: (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        ...action.payload,
      };
    },
    logOutSuccess: (state) => {
      state.currentUser = null;
    },
  },
});

export const { loginSuccess, logOutSuccess, usrUpdate } = authSlice.actions;
export default authSlice.reducer;
