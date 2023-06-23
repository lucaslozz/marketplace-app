import { useTheme } from 'native-base';

import {
  MaterialCommunityIcons,
  Octicons,
  MaterialIcons,
} from '@expo/vector-icons';
import {
  createMaterialBottomTabNavigator,
  MaterialBottomTabNavigationProp,
} from '@react-navigation/material-bottom-tabs';
import { Home } from '../screens/App/Home';
import { SignOut } from '../screens/App/SignOut';
import { MyAds } from '../screens/App/MyAds';

export type AppRoutes = {
  home: undefined;
  ads: undefined;
  signout: undefined;
};

export type AppNavigatorRoutesProps =
  MaterialBottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createMaterialBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  const { sizes, colors } = useTheme();
  const iconSize = sizes[6];

  return (
    <Navigator
      initialRouteName="home"
      activeColor={colors.gray[200]}
      inactiveColor={colors.gray[400]}
      labeled={false}
      barStyle={{ backgroundColor: `${colors.gray[700]}`, height: 72 }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Octicons name="home" size={iconSize} color={color} />
          ),
        }}
      />
      <Screen
        name="ads"
        component={MyAds}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="ticket-percent-outline"
              size={iconSize}
              color={color}
            />
          ),
        }}
      />
      <Screen
        name="signout"
        component={SignOut}
        options={{
          tabBarIcon: () => (
            <MaterialIcons
              name="logout"
              size={iconSize}
              color={colors.red[100]}
            />
          ),
        }}
      />
    </Navigator>
  );
}
