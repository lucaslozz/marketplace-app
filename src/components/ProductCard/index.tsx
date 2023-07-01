import { Box, HStack, Image, Text, VStack, ZStack } from 'native-base';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { UserPhoto } from '../UserPhoto';
import { api } from '../../services/api';

interface ProductCardProps extends TouchableOpacityProps {
  src: string;
  avatarSrc: string;
  is_new: boolean;
  title: string;
  price: number;
  mb: number;
}

export function ProductCard({
  src,
  is_new,
  title,
  price,
  avatarSrc,
  mb,
  ...props
}: ProductCardProps) {
  return (
    <VStack w={40} mb={mb}>
      <TouchableOpacity {...props}>
        <ZStack zIndex={2}>
          <HStack padding={1} space={20}>
            <UserPhoto
              size={6}
              alt="foto do usuário"
              source={{
                uri: `${api.defaults.baseURL}/images/${avatarSrc}`,
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
