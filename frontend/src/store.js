// It simplifies setting up a Redux store by combining multiple reducers, adding middleware, and enabling the Redux DevTools Extension.
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";

// imports a new slice you've created for managing the shopping cart and users
import cartReducer from "./slices/cartSlice";
import userReducer from "./slices/userSlice";

// reducer: This is an object where you define all the different parts of your application's state.
const store = configureStore({
  reducer: {
    // integrate the RTK Query API slice into the store.
    [apiSlice.reducerPath]: apiSlice.reducer,
    // This part of the state will be managed by the cartSlice and userSlice
    cart: cartReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    // allows RTK Query to automatically handle network requests, caching, and state updates based on the endpoints you've defined.
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true, // enables the powerful Redux DevTools browser extension.
});

export default store;
