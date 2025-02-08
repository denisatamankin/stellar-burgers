import { TOrder } from '@utils-types';
import { feeds, orderByNumber } from './action';
import { createSlice } from '@reduxjs/toolkit';

type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | null | undefined;
  orderByNumber: TOrder | null;
};

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null,
  orderByNumber: null
};

export const feedSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    getOrders: (state) => state.orders,
    getTotal: (state) => state.total,
    getTotalToday: (state) => state.totalToday,
    getFeedLoading: (state) => state.isLoading,
    getFeedErrors: (state) => state.error,
    getOrderByNumber: (state) => state.orderByNumber
  },
  extraReducers: (builder) => {
    builder
      .addCase(feeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(feeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(feeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(orderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(orderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(orderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.orderByNumber = action.payload.orders[0];
      });
  }
});

export const {
  getOrders,
  getTotal,
  getTotalToday,
  getFeedLoading,
  getFeedErrors,
  getOrderByNumber
} = feedSlice.selectors;
