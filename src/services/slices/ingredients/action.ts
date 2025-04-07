import { getIngredientsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const ingredients = createAsyncThunk(
  'ingredients/getIngredients',
  async () => {
    const reply = await getIngredientsApi();
    return reply;
  }
);
