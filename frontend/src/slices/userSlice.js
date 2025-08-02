import { createSlice } from "@reduxjs/toolkit";

// initialState: It initializes the state by checking if a userInfo object already exists in localStorage
// localStorage.getItem("userInfo"): It retrieves the user data from local storage.
const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

//
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      const expirationTime = Date.now() + 30 * 24 * 60 * 60 * 1000; // 30 days
      localStorage.setItem("expirationTime", expirationTime);
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("expirationTime");
    },
  },
});

export const { setCredentials, logout } = userSlice.actions;

export default userSlice.reducer;
