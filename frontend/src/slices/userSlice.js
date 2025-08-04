import { createSlice } from "@reduxjs/toolkit";

// initialState: It initializes the state by checking if a userInfo object already exists in localStorage
// localStorage.getItem("userInfo"): It retrieves the user data from local storage.
const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

// It stores the user information in the local storage and handles its expiration.
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // reducer to store the user info in the local storage with expiration time
    //  It stores the user's information in your application's state and also saves it to the browser's local storage so that the user stays logged in
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      const expirationTime = Date.now() + 3 * 24 * 60 * 60 * 1000; // 3 days
      localStorage.setItem("expirationTime", expirationTime);
    },
    // logout reducer
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("expirationTime");
    },
  },
});

export const { setCredentials, logout } = userSlice.actions;
export default userSlice.reducer;
