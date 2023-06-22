import { StatusBar } from 'react-native';

import {
  useFonts,
  Karla_400Regular,
  Karla_700Bold,
} from '@expo-google-fonts/karla';

import { NativeBaseProvider } from 'native-base';
import { theme } from './src/theme';
import { Loading } from './src/components/Loading';
import { Routes } from './src/routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function App() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider theme={theme}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={'dark-content'}
        />
        {fontsLoaded ? <Routes /> : <Loading />}
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}
