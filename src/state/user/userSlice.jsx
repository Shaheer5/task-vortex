import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    authIsReady: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAuthIsReady: (state, action) => {
      state.authIsReady = action.payload;
    },
  },
});

export const { setUser, setAuthIsReady } = userSlice.actions;
export default userSlice.reducer;
