import { expect, test } from '@jest/globals';
import store from './store';

describe('Тест работы корневого редьюсера', () => {
  test('Корневой редьюсер возвращает корректное начальное состояние хранилища', () => {
    const initialState = store.getState();
    store.dispatch({ type: 'UNKNOWN_ACTION' });
    expect(store.getState()).toEqual(initialState);
  });
});
