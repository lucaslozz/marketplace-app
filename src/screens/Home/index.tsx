import { Box, Text } from 'native-base';
import { Button } from '../../components/Button';
import { useContext } from 'react';
import { UserContext } from '../../contexts/userContext/types';

export function Home() {
  const { removeUser } = useContext(UserContext);
  return (
    <Box flex={1} alignContent="center" justifyContent="center" px="16">
      <Button title="Sair" onPress={removeUser} />
    </Box>
  );
}
