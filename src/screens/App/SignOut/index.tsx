import { Box } from 'native-base';

import { Alert } from 'react-native';

import { useCallback } from 'react';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '../../../routes/app.routes';
import { useAppDispatch } from '../../../store';
import { remove } from '../../../store/slices/user';

export function SignOut() {
  const dispatch = useAppDispatch();

  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  function userLogout() {
    dispatch(remove());
  }

  useFocusEffect(
    useCallback(() => {
      Alert.alert(
        'Confirmação',
        'Deseja realmente sair do aplicativo',
        [
          {
            text: 'Não',
            onPress: () => navigate('hometab'),
            style: 'cancel',
          },
          {
            text: 'Sim',
            onPress: () => userLogout(),
          },
        ],
        { cancelable: false },
      );
    }, []),
  );

  return (
    <Box flex={1} alignContent="center" justifyContent="center" px="16"></Box>
  );
}
