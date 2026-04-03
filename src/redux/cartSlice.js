import { createSlice } from "@reduxjs/toolkit";

const getInitialCartState = () => {
  try {
    const savedCart = localStorage.getItem("cart");
    return {
      items: savedCart ? JSON.parse(savedCart) : [],
      restaurant: null,
    };
  } catch (error) {
    console.error("Cart hydration failed:", error);
    return { items: [], restaurant: null };
  }
};

const initialState = getInitialCartState();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload,
      );
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter(
            (item) => item.id !== action.payload,
          );
        }
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      state.restaurant = null;
      localStorage.removeItem("cart"); // wipe on clear
    },
    loadCartFromStorage: (state, action) => {
      state.items = action.payload; // restore cart after login
    },
  },
});

export const { addItem, removeItem, clearCart, loadCartFromStorage } =
  cartSlice.actions;
export default cartSlice.reducer;
