import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import authSlice from './authSlice';
import cartSlice from './cartSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    auth: authSlice,
    cart: cartSlice
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
