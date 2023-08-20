import { HStack, VStack, Text } from 'native-base';
import { UserPhoto } from '../UserPhoto';

import avatarDefault from '../../assets/avatarDefault.png';
import { useContext } from 'react';
import { UserContext } from '../../contexts/userContext/types';
import { api } from '../../services/api';
import { useAppSelector } from '../../store';

export function HomeHeader() {
  const user = useAppSelector((state) => state.user.user);

  console.log(user);

  return (
    <HStack>
      <HStack>
        <UserPhoto
          source={
            user
              ? {
                  uri: `${api.defaults.baseURL}/images/${user.avatar}`,
                }
              : avatarDefault
          }
          alt="Foto do usuário"
          size={45}
        />

        <VStack marginLeft="3">
          <Text color="gray.100" fontSize={16} fontFamily="body">
            Boas vindas,
          </Text>
          <Text fontFamily={'heading'} color="gray.100">
            {user?.name}!
          </Text>
        </VStack>
      </HStack>
    </HStack>
  );
}
