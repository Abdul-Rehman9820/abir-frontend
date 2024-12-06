

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './Action_and_Reducer/cartSlice';


const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
