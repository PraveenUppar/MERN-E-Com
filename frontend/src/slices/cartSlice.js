import { createSlice } from "@reduxjs/toolkit";
// It contain all the calucaltion to caluate the total amount + tax + quantity or the items present in the cart
import { updateCart } from "../utils/cartUtils";

//  defines the initial state of the cart. Crucially, it checks localStorage first if not the cartItems are set as empty array
// This means if a user closes their browser and comes back, their cart items (and shipping/payment info) are still there.
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "" }; // cartItems are stored as array of list

const cartSlice = createSlice({
  name: "cart",
  initialState, // will be zero
  reducers: {
    //  handle the logic for adding an item to the shopping cart.
    addToCart: (state, action) => {
      // The action object is what's passed to the reducer when you dispatch an action. It contains a payload propert
      // The payload holds the actual data that you want to use to update the state. In this case, action.payload will be the new product object that the user wants to add to the cart.
      const item = action.payload;
      // checks if the items bring added is already present in the cart if false move to next
      const existItem = state.cartItems.find((i) => i._id === item._id);
      if (existItem) {
        // if the item is already present in the cart
        // It replaces the old item with the item from the payload. This is how you update the quantity or other properties of an item that is already in the cart.
        state.cartItems = state.cartItems.map((i) =>
          i._id === existItem._id ? item : i
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      // passes the new state to the updateCart function
      return updateCart(state);
    },
    // Handle the logic of removing product from the cart
    removeFromCart: (state, action) => {
      // Takes product Id as the action payload
      const id = action.payload;
      // Filters out the item with the given id from the cartItems array ans returns the updated cart
      state.cartItems = state.cartItems.filter((item) => item._id !== id);
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
