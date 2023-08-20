import { NavigationContainer } from '@react-navigation/native';
import { AuthRoutes } from './auth.routes';

import { Loading } from '../components/Loading';
import { AppRoutes } from './app.routes';
import { useAppDispatch, useAppSelector } from '../store';
import { useEffect, useState } from 'react';
import { userToken_storage, user_storage } from '../storage/storageConfig';
import { getStorage } from '../storage/storage';
import { api } from '../services/api';
import { save } from '../store/slices/user';

export function Routes() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.user?.id);

  const getUser = async () => {
    try {
      setIsLoading(true);
      const userStored = await getStorage(user_storage);
      const userToken = await getStorage(userToken_storage);
      if (userStored && userToken) {
        api.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
        dispatch(save({ user: userStored, token: userToken }));
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {userId && !isLoading ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
