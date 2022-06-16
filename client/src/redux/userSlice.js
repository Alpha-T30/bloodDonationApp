import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    allUsers: [],
  },
  reducers: {
    getAllUserSuccess: (state, action) => {
      state.allUsers = action.payload;
    },
    addNewUserSuccess: (state, action) => {
      state.allUsers.unshift(action.payload);
    },
  },
});

export const { getAllUserSuccess, addNewUserSuccess } = userSlice.actions;
export default userSlice.reducer;
