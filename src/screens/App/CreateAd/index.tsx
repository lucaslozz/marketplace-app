import {
  Box,
  Center,
  HStack,
  Icon,
  ScrollView,
  Text,
  VStack,
  useToast,
} from 'native-base';

import { TouchableOpacity } from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '../../../routes/app.routes';
import { usePhoto } from '../../../hooks/usePhoto';
import { useEffect, useState } from 'react';
import { PhotoCard } from '../../../components/PhotoCard';
import { Input } from '../../../components/Input';

export function CreateAd() {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  const { photo, photoError, photoIsLoading, savePhoto, removePhoto } =
    usePhoto({ isMultiplePhotos: true });

  const { show } = useToast();

  async function addPhoto() {
    await savePhoto();
  }

  function handleRemovePhoto(id: string) {
    removePhoto(id);
  }

  useEffect(() => {
    if (photoError) {
      show({
        title: photoError,
        placement: 'top',
        bgColor: 'red.500',
      });
    }
  }, [photoError]);

  return (
    <ScrollView paddingX={6} paddingY="12">
      <VStack>
        <HStack alignItems="center">
          <TouchableOpacity onPress={() => navigate('hometab')}>
            <Icon
              as={<AntDesign name="arrowleft" />}
              size={7}
              mr="2"
              color="gray.100"
            />
          </TouchableOpacity>
          <Text fontFamily={'heading'} fontSize="lg" marginLeft="20">
            Criar anúncio
          </Text>
        </HStack>

        <VStack mt="6">
          <Text color="gray.200" fontFamily="heading" mb="1" fontSize="md">
            Imagens
          </Text>
          <Text fontFamily="body" fontSize="sm" color="gray.300" mb="4">
            Escolha até 3 imagens para mostrar o quando o seu produto é
            incrível!
          </Text>

          <HStack mb="8">
            {photo.length > 0 &&
              photo.map((item) => {
                return (
                  <PhotoCard
                    key={item.uri}
                    id={item.uri}
                    source={{ uri: item.uri }}
                    size={24}
                    alt="Produto selecionado"
                    isLoading={photoIsLoading}
                    deletePhoto={handleRemovePhoto}
                  />
                );
              })}

            {photo.length < 3 && (
              <TouchableOpacity onPress={addPhoto}>
                <Box
                  size={24}
                  bgColor="gray.500"
                  rounded="4"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Icon
                    as={<AntDesign name="plus" />}
                    size={6}
                    color="gray.400"
                  />
                </Box>
              </TouchableOpacity>
            )}
          </HStack>

          <VStack>
            <Text fontFamily="heading" fontSize="md" color="gray.200" mb="4">
              Sobre o produto
            </Text>

            <Input placeholder="Título do anúncio" mb="4" />

            <Input
              placeholder="Descrição do produto"
              justifyContent="flex-start"
              numberOfLines={5}
            />
          </VStack>
        </VStack>
      </VStack>
    </ScrollView>
  );
}
