import {configureStore} from '@reduxjs/toolkit';
import navReducer from './src/slices/navSlice';

const store = configureStore({
  reducer: {
    nav: navReducer,
  },
});

export default store;
