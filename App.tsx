import { StatusBar } from 'react-native';
import { Provider as ReduxProvider } from 'react-redux';

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

import { UserContextProvider } from './src/contexts/userContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { store } from './src/store';

import * as flipperDebbuger from 'react-query-native-devtools';

export default function App() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });

  const queryClient = new QueryClient();

  if (__DEV__) {
    flipperDebbuger.addPlugin({ queryClient });
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider theme={theme}>
        <UserContextProvider>
          <ReduxProvider store={store}>
            <StatusBar
              translucent
              backgroundColor="transparent"
              barStyle={'dark-content'}
            />
            <BottomSheetModalProvider>
              <GestureHandlerRootView style={{ flex: 1 }}>
                {fontsLoaded ? <Routes /> : <Loading />}
              </GestureHandlerRootView>
            </BottomSheetModalProvider>
          </ReduxProvider>
        </UserContextProvider>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}
