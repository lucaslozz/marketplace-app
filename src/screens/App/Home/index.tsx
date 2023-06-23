import { Box, Center, Text } from 'native-base';

import { useContext } from 'react';
import { UserContext } from '../../../contexts/userContext/types';
import { Button } from '../../../components/Button';

export function Home() {
  return (
    <Center flex={1} alignContent="center" justifyContent="center" px="16">
      <Text>Home</Text>
    </Center>
  );
}
