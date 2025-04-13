import { ingredients } from './action';
import ingredientsSlice, { initialState } from './ingredientsSlice';

const ingredientMock = [
  {
    _id: '643d69a5c3f7b9001cfa0940',
    name: 'Говяжий метеорит (отбивная)',
    type: 'main',
    proteins: 800,
    fat: 800,
    carbohydrates: 300,
    calories: 2674,
    price: 3000,
    image: 'https://code.s3.yandex.net/react/code/meat-04.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png'
  }
];

describe('Проверка работы ingredientSlice', () => {
  test('Получение ингредиентов pending', () => {
    const currentState = ingredientsSlice.reducer(
      {
        ...initialState,
        error: 'Test error'
      },
      ingredients.pending('')
    );

    expect(currentState).toEqual({
      ingredients: [],
      isLoading: true,
      error: null
    });
  });

  test('Получение ингредиентов fulfilled', () => {
    const currentState = ingredientsSlice.reducer(
      {
        ...initialState,
        isLoading: true
      },
      ingredients.fulfilled(ingredientMock, '')
    );

    expect(currentState).toEqual({
      ingredients: ingredientMock,
      isLoading: false,
      error: null
    });
  });

  test('Получение ингредиентов rejected', () => {
    const testError = new Error('Test error');
    const currentState = ingredientsSlice.reducer(
      {
        ...initialState,
        isLoading: true
      },
      ingredients.rejected(testError, '')
    );

    expect(currentState).toEqual({
      ingredients: [],
      isLoading: false,
      error: 'Test error'
    });
  });
});
