import { getOrders } from './action';
import orderSlice, { initialState } from './orderSlice';

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
      createdAt: '2025-03-22T13:46:25.234Z',
      updatedAt: '2025-03-22T13:46:25.914Z',
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
      createdAt: '2025-03-22T07:36:55.648Z',
      updatedAt: '2025-03-22T07:36:56.126Z',
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
      createdAt: '2025-03-22T07:34:44.831Z',
      updatedAt: '2025-03-22T07:34:45.280Z',
      number: 3
    }
  ],
  total: 3,
  totalToday: 3,
  success: true
};

describe('Проверка работы orderSlice', () => {
  test('Получение истории заказов pending', () => {
    const currentState = orderSlice.reducer(
      {
        ...initialState,
        error: 'Test error'
      },
      getOrders.pending('')
    );
    expect(currentState).toEqual({
      orderData: null,
      error: null,
      isLoading: true
    });
  });

  test('Получение истории заказов fulfilled', () => {
    const currentState = orderSlice.reducer(
      {
        ...initialState,
        isLoading: true
      },
      getOrders.fulfilled(ordersMock.orders, '')
    );
    expect(currentState).toEqual({
      orderData: ordersMock.orders,
      error: null,
      isLoading: false
    });
  });

  test('Получение истории заказов rejected', () => {
    const testError = new Error('Test error');
    const currentState = orderSlice.reducer(
      {
        ...initialState,
        isLoading: true
      },
      getOrders.rejected(testError, '')
    );
    expect(currentState).toEqual({
      orderData: null,
      error: 'Test error',
      isLoading: false
    });
  });
});
