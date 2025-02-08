import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrders } from './action';

type TOrderState = {
  orderData: TOrder[] | null;
  error: null | string | undefined;
  isLoading: boolean;
};

const initialState: TOrderState = {
  orderData: null,
  error: null,
  isLoading: false
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    getOrderData: (state) => state.orderData,
    getOrderError: (state) => state.error,
    getIsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        (state.isLoading = true), (state.error = null);
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        (state.orderData = action.payload),
          (state.isLoading = false),
          (state.error = null);
      })
      .addCase(getOrders.rejected, (state, action) => {
        (state.error = action.error.message || 'Error order'),
          (state.isLoading = false);
      });
  }
});

export const { getOrderData, getOrderError, getIsLoading } =
  orderSlice.selectors;
