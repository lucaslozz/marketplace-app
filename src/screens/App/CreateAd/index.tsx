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
import { PhotoCard } from '../../../components/PhotoCard';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { InputCheckBox } from '../../../components/InputCheckBox';
import { InputRadio } from '../../../components/InputRadio';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useForm, Controller, set } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { usePhoto } from '../../../hooks/usePhoto';
import { AppNavigatorRoutesProps } from '../../../routes/app.routes';
import { PhotoProps } from '../../../hooks/usePhoto/types';

interface FormProps {
  name: string;
  description: string;
  price: string;
}

interface AdPreview extends FormProps {
  photo: PhotoProps[];
  productOptions: string[];
  paymentOptions: string[];
  acceptExchange: boolean;
}

const formSchema = yup.object({
  name: yup.string().required('Digite o nome do produto'),
  description: yup.string().required('Digite a descrição do produto'),
  price: yup.string().required('Digite o preço do produto'),
});

export function CreateAd() {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  const [productOptions, setProductOptions] = useState<string[]>([]);
  const [paymentOptions, setPaymentOptions] = useState<string[]>([]);
  const [acceptExchange, setAcceptExchange] = useState(false);

  const { photo, photoError, photoIsLoading, savePhoto, removePhoto } =
    usePhoto({ isMultiplePhotos: true });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: yupResolver(formSchema),
  });

  const { show } = useToast();

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

  function createPreview({ name, description, price }: FormProps) {
    const adPreview: AdPreview = {
      name,
      photo,
      description,
      price,
      productOptions,
      paymentOptions,
      acceptExchange,
    };

    if (
      paymentOptions.length !== 0 ||
      productOptions.length !== 0 ||
      photo.length !== 0
    ) {
      navigate('adpreview', { ...adPreview });
    }
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

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Título do anúncio"
                mb="4"
                value={value}
                isInvalid={!!errors.name}
                errorMessage={errors.name?.message}
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                placeholder="Descrição do produto"
                textAlignVertical="top"
                numberOfLines={5}
                mb="5"
                isInvalid={!!errors.description}
                errorMessage={errors.description?.message}
                onChangeText={onChange}
              />
            )}
          />

          <InputRadio
            name="Product quality"
            radioInputOptions={['Produto novo', 'Produto usado']}
            selectRadioInputOption={productOptionsSelect}
            isInvalid={
              productOptions.length === 0 &&
              !!(errors.description || errors.name || errors.price)
            }
            errorMessage="Selecione uma das opções"
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

          <Controller
            control={control}
            name="price"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Valor do produto"
                mb="4"
                defaultValue="R$ "
                keyboardType="number-pad"
                value={value}
                onChangeText={onChange}
                isInvalid={!!errors.price}
                errorMessage={errors.price?.message}
              />
            )}
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
              onChange={() => setAcceptExchange(!acceptExchange)}
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
            isInvalid={
              paymentOptions.length === 0 &&
              !!(errors.description || errors.name || errors.price)
            }
            errorMessage="Selecione pelo menos um meio de pagamento"
          />
        </VStack>
      </ScrollView>

      <ZStack alignItems="center">
        <HStack bg="gray.700" flex={1} paddingX={6} paddingY={5}>
          <Button title="Cancelar" variant="terciary" mr="3" />
          <Button
            title="Avançar"
            variant="secondary"
            onPress={handleSubmit(createPreview)}
          />
        </HStack>
      </ZStack>
    </VStack>
  );
}
