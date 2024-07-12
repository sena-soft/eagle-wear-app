import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Products } from '../views/Products/types';

export interface ProductsState {
  data: Products[];
  products: Products[];
  loading: boolean;
}

const initialState: ProductsState = {
  data: [],
  products: [],
  loading: false,
};

const usersSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<Products[]>) {
      state.data = action.payload;
      state.products = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setFilteredProducts(state, action: PayloadAction<string>) {
      const filtered = state.data.filter( product => product.title.toLowerCase().includes(action.payload.toLowerCase()));
      state.products = filtered;
      state.loading = false;
    }
  }
});

export const { 
    setData, 
    setLoading,
    setFilteredProducts
} = usersSlice.actions;

export default usersSlice.reducer;
