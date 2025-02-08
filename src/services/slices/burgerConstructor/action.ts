import { orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (data: string[]) => {
    const reply = await orderBurgerApi(data);
    return reply;
  }
);
