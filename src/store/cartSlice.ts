import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartProduct, UserCartProps } from '../views/Cart/types';

export interface CartState {
  data: UserCartProps;
  loading: boolean;
}

const initialState: CartState = {
  data: {
    id: 0,
    userId: 0,
    date: '',
    products: []
  },
  loading: false,
};

const usersSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart(state, action: PayloadAction<UserCartProps>) {
      state.data = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setNewProductCart(state, action: PayloadAction<CartProduct>) {
      const cart = {...state.data};
      const exists = cart.products.find(product => product.productId === action.payload.productId);
      if (exists) {
        cart.products.forEach(element => {
          if (element.productId === action.payload.productId) {
            element.quantity += action.payload.quantity
          }
        });
      } else {
        cart.products = [
          ...cart.products,
          action.payload
        ]
      }
      state.data = cart;
    },
    setRemoveProductCart(state, action: PayloadAction<number>) {
      const cart = {...state.data};
      cart.products = cart.products.filter(product => product.productId !== action.payload);
      state.data = cart;
    },
  }
});

export const { 
    setCart, 
    setLoading,
    setNewProductCart,
    setRemoveProductCart
} = usersSlice.actions;

export default usersSlice.reducer;
