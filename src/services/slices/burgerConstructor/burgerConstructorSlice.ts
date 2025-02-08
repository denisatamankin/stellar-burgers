import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { createOrder } from './action';

type TBurgerConstructorState = {
  constructorItems: {
    bun: TIngredient | null;
    ingredients: Array<TConstructorIngredient>;
  };
  request: boolean;
  modalData: TOrder | null;
  isLoading: boolean;
  error: null | string | undefined;
};

const initialState: TBurgerConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  request: false,
  modalData: null,
  isLoading: false,
  error: null
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const key = nanoid();
        return { payload: { ...ingredient, id: key } };
      }
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload.id
        );
    },
    moveUpIngredient: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index > 0) {
        const ingredients = state.constructorItems.ingredients;
        [ingredients[index - 1], ingredients[index]] = [
          ingredients[index],
          ingredients[index - 1]
        ];
      }
    },
    moveDownIngredient: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index < state.constructorItems.ingredients.length - 1) {
        const ingredients = state.constructorItems.ingredients;
        [ingredients[index + 1], ingredients[index]] = [
          ingredients[index],
          ingredients[index + 1]
        ];
      }
    },
    clearIngredient: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.request = true;
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.request = false;
        state.error = action.error.message;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.request = false;
        state.modalData = action.payload.order;
        state.constructorItems.bun = null;
        state.constructorItems.ingredients = [];
        state.error = null;
      });
  },
  selectors: {
    getConstructorItems: (state) => state.constructorItems,
    getOrderRequest: (state) => state.request,
    getOrderModalData: (state) => state.modalData,
    getIsLoading: (state) => state.isLoading,
    getError: (state) => state.error
  }
});

export const {
  getConstructorItems,
  getOrderRequest,
  getOrderModalData,
  getIsLoading,
  getError
} = burgerConstructorSlice.selectors;
export const {
  addIngredient,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient,
  clearIngredient
} = burgerConstructorSlice.actions;
