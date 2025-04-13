import { initialState, feedSlice } from './feedSlice';
import { feeds, orderByNumber } from './action';

const ordersMock = {
  orders: [
    {
      _id: '1',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0943'
      ],
      status: 'done',
      name: 'Краторный space био-марсианский бургер',
      createdAt: '2025-03-02T13:46:25.234Z',
      updatedAt: '2025-03-02T13:46:25.914Z',
      number: 1
    },
    {
      _id: '2',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0942'
      ],
      status: 'done',
      name: 'Флюоресцентный spicy люминесцентный бургер',
      createdAt: '2025-03-02T07:36:55.648Z',
      updatedAt: '2025-03-02T07:36:56.126Z',
      number: 2
    },
    {
      _id: '3',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa094a',
        '643d69a5c3f7b9001cfa0945'
      ],
      status: 'done',
      name: 'Краторный антарианский астероидный метеоритный бургер',
      createdAt: '2025-03-02T07:34:44.831Z',
      updatedAt: '2025-03-02T07:34:45.280Z',
      number: 3
    }
  ],
  total: 3,
  totalToday: 3,
  success: true
};

describe('Проверка работы feedSlice', () => {
  test('Получение заказов pending', () => {
    const currentState = feedSlice.reducer(
      {
        ...initialState,
        error: 'Test error'
      },
      feeds.pending('')
    );
    expect(currentState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      isLoading: true,
      error: null,
      orderByNumber: null
    });
  });

  test('Получение заказов fulfilled', () => {
    const currentState = feedSlice.reducer(
      {
        ...initialState,
        isLoading: true
      },
      feeds.fulfilled(ordersMock, '')
    );
    expect(currentState).toEqual({
      orders: ordersMock.orders,
      total: ordersMock.total,
      totalToday: ordersMock.totalToday,
      isLoading: false,
      error: null,
      orderByNumber: null
    });
  });

  test('Получение заказов rejected', () => {
    const testError = new Error('Test error');
    const currentState = feedSlice.reducer(
      {
        ...initialState,
        isLoading: true
      },
      feeds.rejected(testError, '')
    );
    expect(currentState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      isLoading: false,
      error: 'Test error',
      orderByNumber: null
    });
  });

  test('Заказ по номеру pending', () => {
    const currentState = feedSlice.reducer(
      {
        ...initialState,
        error: 'Test error'
      },
      orderByNumber.pending('1', 1)
    );
    expect(currentState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      isLoading: true,
      error: null,
      orderByNumber: null
    });
  });

  test('Заказ по номеру fulfilled', () => {
    const currentState = feedSlice.reducer(
      {
        ...initialState,
        isLoading: true
      },
      orderByNumber.fulfilled(ordersMock, '1', 1)
    );
    expect(currentState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      isLoading: false,
      error: null,
      orderByNumber: ordersMock.orders[0]
    });
  });

  test('Заказ по номеру rejected', () => {
    const testError = new Error('Test error');
    const currentState = feedSlice.reducer(
      {
        ...initialState,
        isLoading: true
      },
      orderByNumber.rejected(testError, '1', 1)
    );
    expect(currentState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      isLoading: false,
      error: 'Test error',
      orderByNumber: null
    });
  });
});
