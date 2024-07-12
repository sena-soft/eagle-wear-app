import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../views/Auth/types';

export interface AuthState {
  user: User;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  loading: false,
  isAuthenticated: false,
  user: {
    user: '',
    token: null,
    idUser: 0
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload.token ?? '');
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setLogout(state, action: PayloadAction<string>) {
      state.user = { user: action.payload, token: null, idUser: 0};
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  }
});

export const { 
    setLoading,
    setLogin,
    setLogout
} = authSlice.actions;

export default authSlice.reducer;
