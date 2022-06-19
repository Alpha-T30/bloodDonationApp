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
    updateUserSuccess: (state, action) => {
      state.allUsers[
        state.allUsers.findIndex((user) => user._id === action.payload._id)
      ] = action.payload;
    },
  },
});

export const { getAllUserSuccess, addNewUserSuccess, updateUserSuccess } =
  userSlice.actions;
export default userSlice.reducer;
