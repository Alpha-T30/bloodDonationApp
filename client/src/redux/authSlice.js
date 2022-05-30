import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
  currentUser: null,
   
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    logOutSuccess: (state) => {
      state.currentUser=null 
       
    },
  },
});

export const { loginSuccess, logOutSuccess } = authSlice.actions;
export default authSlice.reducer;
