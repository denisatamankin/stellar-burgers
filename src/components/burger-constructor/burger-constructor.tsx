import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI, Preloader } from '@ui';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearIngredient,
  getConstructorItems,
  getIsLoading,
  getOrderModalData,
  getOrderRequest
} from '../../services/slices/burgerConstructor/burgerConstructorSlice';
import { getIsAuthenticated } from '../../services/slices/user/userSlice';
import { createOrder } from '../../services/slices/burgerConstructor/action';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector(getConstructorItems);
  const orderRequest = useSelector(getOrderRequest);
  const orderModalData = useSelector(getOrderModalData);
  const isLoading = useSelector(getIsLoading);
  const isAuthenticated = useSelector(getIsAuthenticated);

  if (isLoading) {
    return <Preloader />;
  }

  const onOrderClick = () => {
    if (!isAuthenticated) {
      return navigate('/login');
    }
    if (!constructorItems.bun || orderRequest) return;

    const order = [
      constructorItems.bun?._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun?._id
    ].filter(Boolean);
    dispatch(createOrder(order));
  };

  const closeOrderModal = () => {
    dispatch(clearIngredient());
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
