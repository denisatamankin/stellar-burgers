import { configureStore, combineReducers } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import { ingredientsSlice } from './slices/ingredients/ingredientsSlice';
import { userSlice } from './slices/user/userSlice';
import { feedSlice } from './slices/feed/feedSlice';
import { orderSlice } from './slices/order/orderSlice';
import { burgerConstructorSlice } from './slices/burgerConstructor/burgerConstructorSlice';

const rootReducer = combineReducers({
  [ingredientsSlice.reducerPath]: ingredientsSlice.reducer,
  [userSlice.reducerPath]: userSlice.reducer,
  [feedSlice.reducerPath]: feedSlice.reducer,
  [orderSlice.reducerPath]: orderSlice.reducer,
  [burgerConstructorSlice.reducerPath]: burgerConstructorSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
