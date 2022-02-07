import { createAction } from '@reduxjs/toolkit';
import { LoginRequest, User } from '../models/Auth';

export const AUTH_SLICE = 'auth';

export const login = createAction<LoginRequest>(`${AUTH_SLICE}/login`);
export const loginSuccess = createAction<User>(`${AUTH_SLICE}/loginSuccess`);
export const logout = createAction(`${AUTH_SLICE}/logout`);
