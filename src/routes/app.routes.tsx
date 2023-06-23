import { useTheme } from 'native-base';

import {
  MaterialCommunityIcons,
  Octicons,
  MaterialIcons,
} from '@expo/vector-icons';

import { Home } from '../screens/App/Home';
import { SignOut } from '../screens/App/SignOut';
import { MyAds } from '../screens/App/MyAds';
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import { TouchableOpacity } from 'react-native';
import { CreateAd } from '../screens/App/CreateAd';

export type AppRoutes = {
  home: undefined;
  ads: undefined;
  signout: undefined;
  createad: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  const { sizes, colors } = useTheme();
  const iconSize = sizes[6];

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarButton: (props) => <TouchableOpacity {...props} />,
        tabBarActiveTintColor: colors.gray[200],
        tabBarStyle: {
          backgroundColor: `${colors.gray[700]}`,
          height: 72,
        },
      }}
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

      <Screen
        name="createad"
        component={CreateAd}
        options={{ tabBarButton: () => null }}
      />
    </Navigator>
  );
}
