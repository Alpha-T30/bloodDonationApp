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
  },
});

export const { getAllUserSuccess } = userSlice.actions;
export default userSlice.reducer;
