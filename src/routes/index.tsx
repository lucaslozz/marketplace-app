import { NavigationContainer } from '@react-navigation/native';
import { AuthRoutes } from './auth.routes';
import { Loading } from '../components/Loading';
import { AppRoutes } from './app.routes';
import { useAppSelector } from '../store';

export function Routes() {
  const userId = useAppSelector((state) => state.user.user?.id);

  const isUserLoading = useAppSelector((state) => state.user.isLoading);

  if (isUserLoading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {userId ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
