import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";
import locationReducer from "./locationSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    location: locationReducer,
  },
});

// Save cart to localStorage only when user is logged in
store.subscribe(() => {
  const { user } = store.getState().user;
  const { items } = store.getState().cart;

  if (user) {
    localStorage.setItem("cart", JSON.stringify(items));
  }
});

export default store;
