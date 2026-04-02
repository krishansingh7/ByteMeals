import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lat: "28.6139391", // Default: Delhi
  lng: "77.2090212",
  city: "Delhi",
  address: "New Delhi, Delhi, India",
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
