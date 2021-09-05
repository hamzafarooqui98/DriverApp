import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  origin: null,
  destination: null,
  travelTimeInformation: null,
  user: null,
  tripCost: null,
  guideLocation: null,
};

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setTravelTimeInformation: (state, action) => {
      state.travelTimeInformation = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setTripCost: (state, action) => {
      state.tripCost = action.payload;
    },
    setGuideLocation: (state, action) => {
      state.guideLocation = action.payload;
    },
  },
});

export const {
  setDestination,
  setOrigin,
  setTravelTimeInformation,
  setUser,
  setTripCost,
  setGuideLocation,
} = navSlice.actions;

// Slectors

export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) =>
  state.nav.travelTimeInformation;
export const selectUser = (state) => state.nav.user;
export const selectTripCost = (state) => state.nav.tripCost;
export const selectGuideLocation = (state) => state.nav.guideLocation;

export default navSlice.reducer;
