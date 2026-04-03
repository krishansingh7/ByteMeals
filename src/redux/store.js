import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";
import locationReducer from "./locationSlice";
import ordersReducer from "./ordersSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    location: locationReducer,
    orders: ordersReducer,
  },
});

// Save cart to localStorage only when user is logged in
store.subscribe(() => {
  const { user } = store.getState().user;
  const { items: cartItems } = store.getState().cart;
  const { items: orderItems } = store.getState().orders;

  if (user) {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    localStorage.setItem("orders", JSON.stringify(orderItems));
  }
});

export default store;
