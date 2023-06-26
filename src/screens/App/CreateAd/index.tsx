import {
  Box,
  Checkbox,
  HStack,
  Heading,
  Icon,
  Radio,
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
import { useEffect, useState } from 'react';
import { PhotoCard } from '../../../components/PhotoCard';
import { Input } from '../../../components/Input';

import { Button } from '../../../components/Button';
import { InputCheckBox } from '../../../components/InputCheckBox';
import { InputRadio } from '../../../components/InputRadio';

export function CreateAd() {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  const [productOptions, setProductOptions] = useState<string[]>([]);
  const [paymentOptions, setPaymentOptions] = useState<string[]>([]);
  const [acceptExchange, setAcceptExchange] = useState(false);

  const { photo, photoError, photoIsLoading, savePhoto, removePhoto } =
    usePhoto({ isMultiplePhotos: true });

  const { show } = useToast();

  console.log(productOptions);

  function paymentOptionsSelect(payment: string) {
    setPaymentOptions([...payment]);
  }

  function productOptionsSelect(optionSelected: string) {
    setProductOptions([optionSelected]);
  }

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

          <InputRadio
            name="Product quality"
            radioInputOptions={['Produto novo', 'Produto usado']}
            selectRadioInputOption={productOptionsSelect}
          />

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
            <Heading color="gray.200" fontSize="md" my={2}>
              Aceita troca?
            </Heading>

            <Switch
              size="lg"
              alignSelf="flex-start"
              mb="4"
              colorScheme="lightBlue"
            />
          </VStack>

          <Text fontFamily="heading" fontSize="md" mb={3}>
            Meios de pagamento aceitos
          </Text>
          <InputCheckBox
            inputOptions={[
              'Boleto',
              'Pix',
              'Dinheiro',
              'Cartão de Crédito',
              'Depósito Bancário',
            ]}
            defaultValue={paymentOptions}
            selectOption={paymentOptionsSelect}
            mb={6}
          />
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
