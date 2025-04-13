import { userLogin, userLogout, userRegister, userUpdate } from './action';
import userSlice, { authChecked, initialState } from './userSlice';

const userMock = {
  success: true,
  user: {
    email: 'ya@ya.ru',
    name: 'Ya'
  },
  accessToken: 'testToken',
  refreshToken: 'testRefreshToken'
};

const loginMock = {
  email: 'ya@ya.ru',
  name: 'Ya',
  password: 'password'
};

const userUpdatedMock = {
  success: true,
  user: {
    email: 'ya@ya.ru',
    name: 'Ya'
  }
};

describe('Проверка работы userSlice', () => {
  test('Проверка аутентификации', () => {
    const state = {
      ...initialState,
      isAuth: false
    };

    const currentState = userSlice.reducer(state, authChecked());

    const expectedState = {
      ...state,
      isAuth: true
    };

    expect(currentState).toEqual(expectedState);
  });

  test('Регистрация пользователя pending', () => {
    const currentState = userSlice.reducer(
      initialState,
      userRegister.pending('', loginMock)
    );

    expect(currentState).toEqual({
      ...initialState,
      isAuthenticated: false,
      user: null,
      request: true
    });
  });

  test('Регистрация пользователя fulfilled', () => {
    const currentState = userSlice.reducer(
      initialState,
      userRegister.fulfilled(userMock.user, '', loginMock)
    );

    expect(currentState).toEqual({
      ...initialState,
      isAuthenticated: true,
      user: userMock.user,
      request: false
    });
  });

  test('Регистрация пользователя rejected', () => {
    const testError = new Error('User register error');
    const currentState = userSlice.reducer(
      initialState,
      userRegister.rejected(testError, '', loginMock)
    );

    expect(currentState).toEqual({
      ...initialState,
      isAuthenticated: false,
      error: 'User register error',
      request: false
    });
  });

  test('Вход пользователя pending', () => {
    const currentState = userSlice.reducer(
      initialState,
      userLogin.pending('', loginMock)
    );

    expect(currentState).toEqual({
      ...initialState,
      error: null,
      request: true
    });
  });

  test('Вход пользователя fulfilled', () => {
    const currentState = userSlice.reducer(
      initialState,
      userLogin.fulfilled(userMock.user, '', loginMock)
    );

    expect(currentState).toEqual({
      ...initialState,
      isAuth: true,
      isAuthenticated: true,
      user: userMock.user,
      request: false
    });
  });

  test('Вход пользователя rejected', () => {
    const testError = new Error('Login error');
    const currentState = userSlice.reducer(
      initialState,
      userLogin.rejected(testError, '', loginMock)
    );

    expect(currentState).toEqual({
      ...initialState,
      isAuth: true,
      isAuthenticated: false,
      error: 'Login error',
      request: false
    });
  });

  test('Выход пользователя pending', () => {
    const state = {
      ...initialState,
      isAuthenticated: true,
      user: userMock.user
    };

    const currentState = userSlice.reducer(
      state,
      userLogout.pending('')
    );

    expect(currentState).toEqual({
      ...state,
      request: true
    });
  });

  test('Выход пользователя fulfilled', () => {
    const currentState = userSlice.reducer(
      initialState,
      userLogout.fulfilled(userMock, '')
    );

    expect(currentState).toEqual({
      user: null,
      isAuth: false,
      isAuthenticated: false,
      error: null,
      request: false
    });
  });

  test('Выход пользователя rejected', () => {
    const testError = new Error('Logout error');

    const state = {
      ...initialState,
      isAuthenticated: true,
      user: userMock.user
    };

    const currentState = userSlice.reducer(
      state,
      userLogout.rejected(testError, '')
    );

    expect(currentState).toEqual({
      ...state,
      isAuthenticated: false,
      error: 'Logout error',
      request: false
    });
  });

  test('Обновление пользователя pending', () => {
    const currentState = userSlice.reducer(
      initialState,
      userUpdate.pending('', loginMock)
    );

    expect(currentState).toEqual({
      ...initialState,
      isAuthenticated: true,
      request: true
    });
  });

  test('Обновление пользователя fulfilled', () => {
    const currentState = userSlice.reducer(
      initialState,
      userUpdate.fulfilled(userUpdatedMock, '', userMock.user)
    );

    expect(currentState).toEqual({
      user: userUpdatedMock.user,
      isAuth: false,
      isAuthenticated: true,
      error: null,
      request: false
    });
  });

  test('Обновление пользователя rejected', () => {
    const testError = new Error('User update error');
    const currentState = userSlice.reducer(
      initialState,
      userUpdate.rejected(testError, '', userMock.user)
    );

    expect(currentState).toEqual({
      ...initialState,
      error: 'User update error',
      request: false
    });
  });
});
