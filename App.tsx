import { StatusBar } from 'expo-status-bar';

import {
  useFonts,
  Karla_400Regular,
  Karla_700Bold,
} from '@expo-google-fonts/karla';
import { Text, View } from 'native-base';

import { NativeBaseProvider } from 'native-base';
import { theme } from './src/theme';
import { Loading } from './src/theme/components/Loading';

export default function App() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });

  return (
    <NativeBaseProvider theme={theme}>
      {fontsLoaded ? (
        <View flex={1} alignItems="center" justifyContent="center">
          <Text>Hello World</Text>
          <StatusBar style="auto" />
        </View>
      ) : (
        <Loading />
      )}
    </NativeBaseProvider>
  );
}
