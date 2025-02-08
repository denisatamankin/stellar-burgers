import { deleteCookie, getCookie, setCookie } from '../../../utils/cookie';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TRegisterData,
  updateUserApi
} from './../../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { authChecked } from './userSlice';

export const userGet = createAsyncThunk(
  'user/check',
  async () => await getUserApi()
);

export const userRegister = createAsyncThunk(
  'user/register',
  async ({ email, password, name }: TRegisterData) => {
    const reply = await registerUserApi({ email, password, name });

    setCookie('accessToken', reply.accessToken);
    localStorage.setItem('refreshToken', reply.refreshToken);

    return reply.user;
  }
);

export const userLogin = createAsyncThunk(
  'user/login',
  async ({ email, password }: Omit<TRegisterData, 'name'>) => {
    const reply = await loginUserApi({ email, password });

    setCookie('accessToken', reply.accessToken);
    localStorage.setItem('refreshToken', reply.refreshToken);

    return reply.user;
  }
);

export const userUpdate = createAsyncThunk(
  'user/update',
  async (user: Partial<TRegisterData>) => await updateUserApi(user)
);

export const userLogout = createAsyncThunk('user/logout', async () => {
  const reply = await logoutApi();

  deleteCookie('acessToken');
  localStorage.clear;

  return reply;
});

export const userCheck = createAsyncThunk('user/check', (_, { dispatch }) => {
  if (getCookie('accessToken')) {
    dispatch(userGet()).finally(() => {
      dispatch(authChecked());
    });
  } else {
    dispatch(authChecked());
  }
});
