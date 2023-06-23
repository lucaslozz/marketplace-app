import { useTheme } from 'native-base';

import { FontAwesome5 } from '@expo/vector-icons';
import {
  createMaterialBottomTabNavigator,
  MaterialBottomTabNavigationProp,
} from '@react-navigation/material-bottom-tabs';
import { Home } from '../screens/Home';

type AppRoutes = {
  home: undefined;
  history: undefined;
  profile: undefined;
};

export type AppNavigatorRoutesProps =
  MaterialBottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createMaterialBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  const { sizes, colors } = useTheme();
  const iconSize = sizes[6];

  return (
    <Navigator
    // screenOptions={{
    //   headerShown: false,
    //   tabBarShowLabel: false,
    //   tabBarActiveTintColor: colors.primary[500],
    //   tabBarStyle: {
    //     borderTopWidth: 0,
    //     height: sizes[16],
    //   },
    // }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="home" size={iconSize} color={color} />
          ),
        }}
      />
    </Navigator>
  );
}
