import { NavigationContainer } from '@react-navigation/native';
import { AuthRoutes } from './auth.routes';
import { useContext } from 'react';
import { UserContext } from '../contexts/userContext/types';
import { Loading } from '../components/Loading';
import { AppRoutes } from './app.routes';

export function Routes() {
  const { user, loadingUser } = useContext(UserContext);

  if (loadingUser) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
