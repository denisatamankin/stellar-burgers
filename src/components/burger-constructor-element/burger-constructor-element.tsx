import { FC, memo } from 'react';
import { BurgerConstructorElementUI, Preloader } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch, useSelector } from '../../services/store';
import {
  getIsLoading,
  moveDownIngredient,
  moveUpIngredient,
  removeIngredient
} from '../../services/slices/burgerConstructor/burgerConstructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const isLoading = useSelector(getIsLoading);

    if (isLoading) {
      return <Preloader />;
    }
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      dispatch(moveDownIngredient(index));
    };
    const handleMoveUp = () => {
      dispatch(moveUpIngredient(index));
    };
    const handleClose = () => {
      dispatch(removeIngredient(ingredient));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
