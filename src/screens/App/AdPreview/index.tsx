import { useNavigation, useRoute } from '@react-navigation/native';
import { Slider } from '../../../components/Slide';
import { PhotoProps } from '../../../hooks/usePhoto/types';
import {
  Box,
  HStack,
  Icon,
  ScrollView,
  StatusBar,
  Text,
  VStack,
  ZStack,
  useToast,
} from 'native-base';
import { UserPhoto } from '../../../components/UserPhoto';
import { Button } from '../../../components/Button';
import { AppNavigatorRoutesProps } from '../../../routes/app.routes';
import { useContext, useEffect } from 'react';

import avatarDefault from '../../../assets/avatarDefault.png';

import { Ionicons } from '@expo/vector-icons';
import { api } from '../../../services/api';
import {
  BodyProducts,
  useCreateAdProducts,
} from '../../../services/requests/products/useCreateAdProducts';
import { AppError } from '../../../utils/AppError';
import { useAppSelector } from '../../../store';

type RouteParams = {
  name: string;
  photo: PhotoProps[];
  description: string;
  price: string;
  productOptions: string[];
  paymentOptions: string[];
  acceptExchange: boolean;
};

export function AdPreview() {
  const { params } = useRoute();
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  const user = useAppSelector((state) => state.user.user);

  const { mutate, isLoading, error, isSuccess } = useCreateAdProducts();

  const { show } = useToast();

  const {
    photo,
    productOptions,
    name,
    price,
    description,
    acceptExchange,
    paymentOptions,
  } = params as RouteParams;

  const icons: Record<string, string> = {
    Boleto: 'barcode-sharp',
    Pix: 'qr-code-outline',
    Dinheiro: 'cash-outline',
    'Cartão de Crédito': 'card-outline',
    'Depósito Bancário': 'trending-up',
  };

  function handleCreateAd() {
    const payment: Record<string, string> = {
      Boleto: 'boleto',
      Pix: 'pix',
      Dinheiro: 'cash',
      'Cartão de Crédito': 'card',
      'Depósito Bancário': 'deposit',
    };
    const body: BodyProducts = {
      photo,
      name,
      price: +price.replace('R$', '').trim(),
      description,
      accept_trade: acceptExchange,
      is_new: productOptions[0] === 'Produto novo' ? true : false,
      payment_methods: paymentOptions.map((item) => payment[item]),
    };

    mutate(body);
  }

  const photoPath = photo.map((item) => {
    return item.uri;
  });

  useEffect(() => {
    const isAppError = error instanceof AppError;
    if (error) {
      show({
        title: isAppError
          ? error.message
          : 'Erro ao criar o anúncio. Tente mais tarde.',
        placement: 'top',
        bgColor: 'red.500',
      });
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      show({
        title: 'Anúncio criado com sucesso!',
        placement: 'top',
        bgColor: 'green.500',
      });
      navigate('hometab');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError ? error.message : 'Por favor, tente mais tarde';

      show({
        title: title,
        placement: 'top',
        bgColor: 'red.500',
      });
    }
  }, [error]);

  return (
    <VStack paddingBottom="20">
      <ScrollView showsVerticalScrollIndicator={false} pb={6}>
        <VStack bg="gray.600">
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle={'light-content'}
          />

          <Box
            w="full"
            bgColor="lightBlue.100"
            paddingTop={16}
            paddingBottom={4}
            alignItems="center"
          >
            <Text fontFamily="heading" color="gray.700" fontSize="md">
              Pré visualização do anúncio
            </Text>
            <Text color="gray.700">É assim que seu produto vai aparecer!</Text>
          </Box>

          <Slider photos={photoPath} />
        </VStack>

        <VStack mt={5} paddingX={6}>
          <HStack space={2} mb={6}>
            <UserPhoto
              size={6}
              source={
                user
                  ? {
                      uri: `${api.defaults.baseURL}/images/${user.avatar}`,
                    }
                  : avatarDefault
              }
              alt="foto de perfil do usuário"
            />
            <Text color="gray.100" fontFamily="body" fontSize="sm">
              {user?.name}
            </Text>
          </HStack>

          <Box
            bgColor="gray.500"
            mb={2}
            rounded="full"
            alignItems="center"
            justifyContent="center"
            w={50}
            h={6}
          >
            <Text fontFamily="heading" fontSize={10}>
              {productOptions[0] === 'Produto novo' ? 'NOVO' : 'USADO'}
            </Text>
          </Box>

          <HStack alignItems="center" justifyContent="space-between" mb={2}>
            <Text fontFamily="heading" fontSize="lg" color="gray.100">
              {name}
            </Text>
            <Text fontSize="lg" fontFamily="heading" color="lightBlue.100">
              {price}
              {!price.endsWith(',00') ? ',00' : ''}
            </Text>
          </HStack>

          <Text color="gray.200" fontFamily="body" fontSize="sm" mb={6}>
            {description}
            {description.endsWith('.') ? '' : '.'}
          </Text>

          <Text fontFamily="heading" mb={4} color="gray.200">
            Aceita troca?
            <Text fontFamily="body">{acceptExchange ? ' Sim' : ' Não'}</Text>
          </Text>

          <Text fontFamily="heading" color="gray.200" fontSize="sm" mb={2}>
            Meios de pagamento:
          </Text>

          {paymentOptions.map((option) => {
            return (
              <VStack mb={2} key={option}>
                <HStack space={2}>
                  <Icon
                    as={Ionicons}
                    name={icons[option]}
                    size={5}
                    color="gray.100"
                  />
                  <Text fontFamily="body" color="gray.200" fontSize="sm">
                    {option}
                  </Text>
                </HStack>
              </VStack>
            );
          })}
        </VStack>
      </ScrollView>
      <ZStack alignItems="center">
        <HStack bg="gray.700" flex={1} paddingX={6} paddingY={5}>
          <Button
            title="Voltar e editar"
            variant="terciary"
            mr="3"
            onPress={() => navigate('createad')}
          />
          <Button
            title="Publicar"
            variant="primary"
            onPress={() => handleCreateAd()}
            isLoading={isLoading}
          />
        </HStack>
      </ZStack>
    </VStack>
  );
}
