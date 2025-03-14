import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { feeds } from '../../services/slices/feed/action';
import { getFeeds, getIsLoading } from '../../services/slices/feed/feedSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);

  const orders: TOrder[] = useSelector(getFeeds);

  useEffect(() => {
    dispatch(feeds());
  }, []);

  if (!orders.length || isLoading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => dispatch(feeds())} />;
};
