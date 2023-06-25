import {
  Box,
  Checkbox,
  HStack,
  Heading,
  Icon,
  ScrollView,
  Switch,
  Text,
  VStack,
  ZStack,
  useToast,
} from 'native-base';

import { TouchableOpacity } from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '../../../routes/app.routes';
import { usePhoto } from '../../../hooks/usePhoto';
import { useEffect } from 'react';
import { PhotoCard } from '../../../components/PhotoCard';
import { Input } from '../../../components/Input';
import { InputRadio } from '../../../components/InputRadio';
import { Button } from '../../../components/Button';

export function CreateAd() {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  const { photo, photoError, photoIsLoading, savePhoto, removePhoto } =
    usePhoto({ isMultiplePhotos: true });

  // const {}=useForm()

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
    <VStack bg="gray.600" paddingBottom="20" paddingTop="16">
      <ScrollView paddingX={6} showsVerticalScrollIndicator={false}>
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

          <Text
            color="gray.200"
            fontFamily="heading"
            mb="1"
            fontSize="md"
            mt="6"
          >
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

          <Text fontFamily="heading" fontSize="md" color="gray.200" mb="4">
            Sobre o produto
          </Text>

          <Input placeholder="Título do anúncio" mb="4" />

          <Input
            placeholder="Descrição do produto"
            textAlignVertical="top"
            numberOfLines={5}
            mb="5"
          />

          <InputRadio option1="Produto novo" option2="Produto usado" />

          <Text
            fontFamily="heading"
            fontSize="md"
            color="gray.200"
            mb="4"
            mt="8"
          >
            Venda
          </Text>

          <Input
            placeholder="Valor do produto"
            mb="4"
            defaultValue="R$"
            keyboardType="number-pad"
          />

          <VStack justifyItems="start">
            <Heading color="gray.200" fontSize={16} my={2}>
              Aceita troca?
            </Heading>

            <Switch
              size="lg"
              alignSelf="flex-start"
              mb="4"
              colorScheme="lightBlue"
            />
          </VStack>

          <Checkbox.Group
            accessibilityLabel="Escolha o método de pagamento."
            mb={6}
          >
            <Checkbox value="boleto">
              <Text color="gray.300" fontSize={16}>
                Boleto
              </Text>
            </Checkbox>
            <Checkbox value="pix">
              <Text color="gray.300" fontSize={16}>
                Pix
              </Text>
            </Checkbox>
            <Checkbox value="cash">
              <Text color="gray.300" fontSize={16}>
                Dinheiro
              </Text>
            </Checkbox>
            <Checkbox value="card">
              <Text color="gray.300" fontSize={16}>
                Cartão de Crédito
              </Text>
            </Checkbox>
            <Checkbox value="deposit">
              <Text color="gray.300" fontSize={16}>
                Depósito Bancário
              </Text>
            </Checkbox>
          </Checkbox.Group>
        </VStack>
      </ScrollView>

      <ZStack alignItems="center">
        <HStack bg="gray.700" flex={1} paddingX={6} paddingY={5}>
          <Button title="Cancelar" variant="terciary" mr="3" />
          <Button title="Avançar" variant="secondary" />
        </HStack>
      </ZStack>
    </VStack>
  );
}
