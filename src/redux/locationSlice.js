import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lat: '19.0759837', // Default: Mumbai
  lng: '72.8776559',
  city: 'Mumbai',
  address: 'Mumbai, Maharashtra, India',
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation: (state, action) => {
      // payload expects { lat, lng, city, address }
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
      
      // If provided, format city or string
      if (action.payload.city) state.city = action.payload.city;
      if (action.payload.address) state.address = action.payload.address;
    },
  },
});

export const { setLocation } = locationSlice.actions;

export default locationSlice.reducer;
