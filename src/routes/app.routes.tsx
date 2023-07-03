import { PhotoProps } from '../hooks/usePhoto/types';
import { AdInfo } from '../screens/App/AdInfo';
import { AdPreview } from '../screens/App/AdPreview';
import { CreateAd } from '../screens/App/CreateAd';
import { TabRoutes } from './tab.routes';
import { PortalProvider } from '@gorhom/portal';

import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

export type AppRoutes = {
  hometab: undefined;
  createad: undefined;
  adpreview: {
    name: string;
    photo: PhotoProps[];
    description: string;
    price: string;
    productOptions: string[];
    paymentOptions: string[];
    acceptExchange: boolean;
  };
  adInfo: {
    id: string;
  };
};

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AppRoutes>();

export function AppRoutes() {
  return (
    <PortalProvider>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="hometab" component={TabRoutes} />
        <Screen name="createad" component={CreateAd} />
        <Screen name="adpreview" component={AdPreview} />
        <Screen name="adInfo" component={AdInfo} />
      </Navigator>
    </PortalProvider>
  );
}
