import {
  addIngredient,
  clearIngredient,
  initialState,
  moveDownIngredient,
  moveUpIngredient,
  removeIngredient,
  TBurgerConstructorState
} from './burgerConstructorSlice';
import burgerConstructorSlice from './burgerConstructorSlice';

describe('Проверка работы burgerConstructorSlice', () => {
  const bunMock = {
    id: '1',
    _id: '643d69a5c3f7b9001cfa093d',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
  };

  const ingredientMock = {
    id: '2',
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
  };

  const sauceMock = {
    id: '3',
    _id: '643d69a5c3f7b9001cfa0944',
    name: 'Соус традиционный галактический',
    type: 'sauce',
    proteins: 42,
    fat: 24,
    carbohydrates: 42,
    calories: 99,
    price: 15,
    image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png'
  };

  let state: TBurgerConstructorState;

  beforeEach(() => {
    state = initialState;
  });

  test('Проверка добавления булки', () => {
    const state = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(bunMock)
    );

    expect(state.constructorItems.bun).toEqual({
      ...bunMock,
      id: expect.any(String)
    });
  });

  test('Проверка добавления ингредиента', () => {
    const state = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(ingredientMock)
    );

    expect(state.constructorItems.ingredients).toHaveLength(1);
    expect(state.constructorItems.ingredients[0]).toEqual({
      ...ingredientMock,
      id: expect.any(String)
    });
  });

  test('Проверка удаления ингредиента', () => {
    const state = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(ingredientMock)
    );

    const newState = burgerConstructorSlice.reducer(
      state,
      removeIngredient(state.constructorItems.ingredients[0])
    );

    expect(newState).toEqual(initialState);
  });

  test('Проверка перемещения ингредиента вверх', () => {
    const state = {
      constructorItems: {
        bun: bunMock,
        ingredients: [ingredientMock, sauceMock]
      },
      request: false,
      modalData: null,
      isLoading: false,
      error: null
    };

    const newState = burgerConstructorSlice.reducer(state, moveUpIngredient(1));

    expect(newState.constructorItems.ingredients[0]).toEqual({
      ...sauceMock,
      id: expect.any(String)
    });

    expect(newState.constructorItems.ingredients[1]).toEqual({
      ...ingredientMock,
      id: expect.any(String)
    });
  });

  test('Проверка перемещения ингредиента вниз', () => {
    const state = {
      constructorItems: {
        bun: bunMock,
        ingredients: [ingredientMock, sauceMock]
      },
      request: false,
      modalData: null,
      isLoading: false,
      error: null
    };

    const newState = burgerConstructorSlice.reducer(
      state,
      moveDownIngredient(0)
    );

    expect(newState.constructorItems.ingredients[1]).toEqual({
      ...ingredientMock,
      id: expect.any(String)
    });

    expect(newState.constructorItems.ingredients[0]).toEqual({
      ...sauceMock,
      id: expect.any(String)
    });
  });

  test('Проверка очистки заказа', () => {
    const state = {
      constructorItems: {
        bun: bunMock,
        ingredients: [ingredientMock, sauceMock]
      },
      request: false,
      modalData: null,
      isLoading: false,
      error: null
    };

    const newState = burgerConstructorSlice.reducer(
      initialState,
      clearIngredient()
    );

    expect(newState.constructorItems).toEqual({
      bun: null,
      ingredients: []
    });
  });
});
