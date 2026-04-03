import { createSlice } from "@reduxjs/toolkit";

const getInitialOrdersState = () => {
  try {
    const savedOrders = localStorage.getItem("orders");
    return {
      items: savedOrders ? JSON.parse(savedOrders) : [],
    };
  } catch (error) {
    console.error("Orders hydration failed:", error);
    return { items: [] };
  }
};

const initialState = getInitialOrdersState();

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      // Order contains: id, date, total, items array
      state.items.unshift(action.payload); // Add new orders to the front
      localStorage.setItem("orders", JSON.stringify(state.items));
    },
    loadOrdersFromStorage: (state, action) => {
      state.items = action.payload;
    },
    clearOrders: (state) => {
      state.items = [];
      localStorage.removeItem("orders"); // Ensure cleared history stays cleared after reload
    },
  },
});

export const { addOrder, loadOrdersFromStorage, clearOrders } = ordersSlice.actions;

export default ordersSlice.reducer;
