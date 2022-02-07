import { createSlice } from '@reduxjs/toolkit';
import userStorage from '../../utils/localStorage';
import { User } from '../models/Auth';
import { loginSuccess, logout } from '../actions/authActions';

export interface AuthState {
  user: User;
}

const initialState: AuthState = {
  user: userStorage.getUser() || null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginSuccess, (state, action) => {
        state.user = action.payload;
        userStorage.setUser(action.payload);
      })
      .addCase(logout, (state) => {
        state.user = null;
        userStorage.clearUser();
      });
  },
});

export default authSlice.reducer;
