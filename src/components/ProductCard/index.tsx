import { Box, HStack, Image, Text, VStack, ZStack } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { UserPhoto } from '../UserPhoto';
import { useContext } from 'react';
import { UserContext } from '../../contexts/userContext/types';
import { api } from '../../services/api';

interface ProductCardProps {
  src: string;
  is_new: boolean;
  title: string;
  price: number;
}

export function ProductCard({ src, is_new, title, price }: ProductCardProps) {
  const { user } = useContext(UserContext);

  return (
    <VStack w={40}>
      <TouchableOpacity>
        <ZStack zIndex={2}>
          <HStack padding={1} space={20}>
            <UserPhoto
              size={6}
              alt="foto do usuário"
              source={{
                uri: `${api.defaults.baseURL}/images/${user?.user.avatar}`,
              }}
            />
            <Box
              bgColor={`${is_new ? 'blue.100' : 'gray.200'}`}
              mb={2}
              rounded="full"
              alignItems="center"
              justifyContent="center"
              w={50}
              h={6}
            >
              <Text fontFamily="heading" fontSize={10} color="white">
                {is_new ? 'NOVO' : 'USADO'}
              </Text>
            </Box>
          </HStack>
        </ZStack>

        <Image
          source={{ uri: src }}
          alt="Imagem do produto"
          w="full"
          h={'24'}
          rounded={6}
        />
      </TouchableOpacity>

      <Text mt={1} mb={1} color="gray.200" fontFamily="body" fontSize="sm">
        {title}
      </Text>
      <Text fontSize="xs" fontFamily="heading">
        R$ <Text fontSize="md">{price.toString() + ',00'}</Text>
      </Text>
    </VStack>
  );
}
