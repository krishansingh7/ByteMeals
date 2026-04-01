import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import cartReducer from './cartSlice';

import locationReducer from './locationSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    location: locationReducer,
  },
});

export default store;
