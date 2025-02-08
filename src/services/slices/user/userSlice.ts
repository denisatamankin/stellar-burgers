import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  userGet,
  userLogin,
  userLogout,
  userRegister,
  userUpdate
} from './action';

type TUserState = {
  user: TUser | null;
  isAuth: boolean;
  isAuthenticated: boolean;
  error: null | string | undefined;
  request: boolean;
};

const initialState: TUserState = {
  user: null,
  isAuth: false,
  isAuthenticated: false,
  error: null,
  request: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuth = true;
    }
  },
  selectors: {
    getUser: (state) => state.user,
    getIsAuth: (state) => state.isAuth,
    getIsAuthenticated: (state) => state.isAuthenticated,
    getError: (state) => state.error,
    getRequest: (state) => state.request
  },
  extraReducers: (builder) => {
    builder
      .addCase(userGet.pending, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
        state.request = true;
      })
      .addCase(userGet.rejected, (state, action) => {
        state.user = null;
        state.isAuth = true;
        state.isAuthenticated = false;
        state.error = action.error.message;
        state.request = false;
      })
      .addCase(userGet.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuth = true;
        state.isAuthenticated = true;
        state.error = null;
        state.request = false;
      })
      .addCase(userRegister.pending, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
        state.request = true;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.error.message;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.request = false;
      })
      .addCase(userLogin.pending, (state) => {
        state.error = null;
        state.request = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.request = false;
        state.isAuth = true;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.request = false;
        state.error = action.error.message;
        state.isAuth = true;
      })
      .addCase(userLogout.pending, (state) => {
        state.isAuthenticated = true;
        state.request = true;
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        state.isAuthenticated = false;
        state.request = false;
        state.user = null;
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.request = false;
        state.error = action.error.message;
      })
      .addCase(userUpdate.pending, (state) => {
        state.isAuthenticated = true;
        state.request = true;
      })
      .addCase(userUpdate.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.request = false;
      })
      .addCase(userUpdate.rejected, (state, action) => {
        state.error = action.error.message;
        state.request = false;
      });
  }
});

export const { authChecked } = userSlice.actions;
export const { getUser, getIsAuth, getIsAuthenticated, getError, getRequest } =
  userSlice.selectors;
