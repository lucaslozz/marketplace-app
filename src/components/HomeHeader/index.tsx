import { HStack, VStack, Text } from 'native-base';
import { UserPhoto } from '../UserPhoto';

import avatarDefault from '../../assets/avatarDefault.png';
import { useContext } from 'react';
import { UserContext } from '../../contexts/userContext/types';
import { api } from '../../services/api';

export function HomeHeader() {
  const { user } = useContext(UserContext);

  return (
    <HStack>
      <HStack>
        <UserPhoto
          source={
            user
              ? {
                  uri: 'http://192.168.0.109:3333/images/61400221f2fe110b6964-WhatsApp%20Image%202023-06-05%20at%2016.32.37.jpeg',
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
            {user?.user.name}!
          </Text>
        </VStack>
      </HStack>
    </HStack>
  );
}
