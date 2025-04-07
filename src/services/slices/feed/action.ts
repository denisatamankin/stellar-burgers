import { getFeedsApi, getOrderByNumberApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const feeds = createAsyncThunk(
  'feed/getFeeds',
  async () => await getFeedsApi()
);

export const orderByNumber = createAsyncThunk(
  'order/orderByNumber',
  async (number: number) => await getOrderByNumberApi(number)
);
