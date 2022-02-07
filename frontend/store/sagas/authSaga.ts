import axios, { AxiosResponse } from 'axios';
import { put } from 'redux-saga/effects';
import { login } from '../actions/authActions';
import { loginSuccess } from '../actions/authActions';
import { User } from '../models/Auth';
import { Error, Routes, SERVER } from '../../constants/server';
import { addError, setLoading } from '../features/globalSlice';
import Router from 'next/router';
import { Paths } from '../../constants/paths';

export function* AuthLoginSaga(action: ReturnType<typeof login>): Generator {
  try {
    yield put(setLoading(true));
    const res = (yield axios.post(SERVER + Routes.LOGIN, {
      ...action.payload,
    })) as AxiosResponse<User>;
    yield put(loginSuccess(res.data));
    yield Router.push(Paths.CHAT);
  } catch (e) {
    const error = e as Error;
    yield put(addError(error.response.data.message));
  } finally {
    yield put(setLoading(false));
  }
}
