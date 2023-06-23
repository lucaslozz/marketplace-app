import { Box, Text } from 'native-base';

import { Alert } from 'react-native';

import { useCallback, useContext, useEffect } from 'react';
import { UserContext } from '../../../contexts/userContext/types';
import { Button } from '../../../components/Button';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '../../../routes/app.routes';

export function SignOut() {
  const { removeUser } = useContext(UserContext);

  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  useFocusEffect(
    useCallback(() => {
      Alert.alert(
        'Confirmação',
        'Deseja realmente sair do aplicativo',
        [
          {
            text: 'Não',
            onPress: () => navigate('home'),
            style: 'cancel',
          },
          {
            text: 'Sim',
            onPress: () => removeUser(),
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
