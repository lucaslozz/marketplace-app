import { useTheme } from 'native-base';

import { Home } from '../screens/App/Home';
import { MyAds } from '../screens/App/MyAds';
import { SignOut } from '../screens/App/SignOut';

import {
  MaterialCommunityIcons,
  Octicons,
  MaterialIcons,
} from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

type TabRoutesProps = {
  home: undefined;
  ads: undefined;
  logout: undefined;
};

export type TabNavigatorRoutesProps = BottomTabNavigationProp<TabRoutesProps>;

const { Navigator, Screen } = createBottomTabNavigator();

export function TabRoutes() {
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
    </Navigator>
  );
}
