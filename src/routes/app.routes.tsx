import { CreateAd } from '../screens/App/CreateAd';
import { TabRoutes } from './tab.routes';

import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

export type AppRoutes = {
  hometab: undefined;
  createad: undefined;
};

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AppRoutes>();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="hometab" component={TabRoutes} />
      {<Screen name="createad" component={CreateAd} />}
    </Navigator>
  );
}
