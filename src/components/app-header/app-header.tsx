import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../../src/services/store';
import { getUser } from '../../../src/services/slices/user/userSlice';

export const AppHeader: FC = () => {
  const user = useSelector(getUser);

  return (
    <>
      <AppHeaderUI userName={user?.name} />;
    </>
  );
};
