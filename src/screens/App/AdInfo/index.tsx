import { useNavigation, useRoute } from '@react-navigation/native';
import { Slider } from '../../../components/Slide';
import {
  Box,
  HStack,
  Icon,
  ScrollView,
  Text,
  VStack,
  ZStack,
} from 'native-base';
import { UserPhoto } from '../../../components/UserPhoto';
import { Button } from '../../../components/Button';
import { AppNavigatorRoutesProps } from '../../../routes/app.routes';

import avatarDefault from '../../../assets/avatarDefault.png';

import { Ionicons, AntDesign } from '@expo/vector-icons';
import { api } from '../../../services/api';
import { useGetInfoProduct } from '../../../services/requests/products/useGetInfoProduct';
import { Loading } from '../../../components/Loading';

import * as Linking from 'expo-linking';

interface PaymentMethod {
  key: string;
  name: string;
}

interface User {
  avatar: string;
}

interface ProductImage {
  path: string;
  id: string;
}

type RouteParams = {
  id: string;
  name: string;
  price: number;
  is_new: boolean;
  accept_trade: boolean;
  product_images: ProductImage[];
  payment_methods: PaymentMethod[];
  user: User;
};

export function AdInfo() {
  const { params } = useRoute();
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  const { id } = params as RouteParams;

  const { data, isLoading } = useGetInfoProduct(id);

  const icons: Record<string, string> = {
    boleto: 'barcode-sharp',
    pix: 'qr-code-outline',
    cash: 'cash-outline',
    card: 'card-outline',
    deposit: 'trending-up',
  };

  const photoPath = data?.data.product_images.map((image) => {
    return `${api.defaults.baseURL}/images/${image.path}`;
  });

  if (isLoading) {
    return <Loading />;
  }

  function handleLinking() {
    Linking.openURL(
      `https://api.whatsapp.com/send?phone=55${data?.data.user.tel}&text=Olá! Eu gostaria de comprar ${data?.data.name} que você anunciou!`,
    );
  }

  return (
    <VStack paddingBottom="20">
      <ScrollView showsVerticalScrollIndicator={false} pb={6}>
        <Box w="full" paddingTop={16} paddingBottom={4} bg="white" paddingX={6}>
          <Icon
            as={AntDesign}
            name="arrowleft"
            size={6}
            color="gray.100"
            onPress={() => navigate('hometab')}
          />
        </Box>
        <VStack bg="gray.600" borderTopWidth={1} borderTopColor="gray.700">
          <Slider photos={photoPath ?? []} />
        </VStack>

        <VStack mt={5} paddingX={6}>
          <HStack space={2} mb={6}>
            <UserPhoto
              size={6}
              source={
                data?.data.user
                  ? {
                      uri: `${api.defaults.baseURL}/images/${data.data.user.avatar}`,
                    }
                  : avatarDefault
              }
              alt="foto de perfil do usuário"
            />
            <Text color="gray.100" fontFamily="body" fontSize="sm">
              {data?.data.user.name}
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
              {data?.data.is_new ? 'NOVO' : 'USADO'}
            </Text>
          </Box>

          <HStack alignItems="center" justifyContent="space-between" mb={2}>
            <Text fontFamily="heading" fontSize="lg" color="gray.100">
              {data?.data.name}
            </Text>
            <Text fontSize="lg" fontFamily="heading" color="lightBlue.100">
              R$ {data?.data.price.toString()}
              {!data?.data.price.toString().endsWith(',00') ? ',00' : ''}
            </Text>
          </HStack>

          <Text color="gray.200" fontFamily="body" fontSize="sm" mb={6}>
            {data?.data.description}
            {data?.data.description.endsWith('.') ? '' : '.'}
          </Text>

          <Text fontFamily="heading" mb={4} color="gray.200">
            Aceita troca?
            <Text fontFamily="body">
              {data?.data.accept_trade ? ' Sim' : ' Não'}
            </Text>
          </Text>

          <Text fontFamily="heading" color="gray.200" fontSize="sm" mb={2}>
            Meios de pagamento:
          </Text>

          {data?.data.payment_methods.map((option) => {
            return (
              <VStack mb={2} key={option.key}>
                <HStack space={2}>
                  <Icon
                    as={Ionicons}
                    name={icons[option.key]}
                    size={5}
                    color="gray.100"
                  />
                  <Text fontFamily="body" color="gray.200" fontSize="sm">
                    {option.name}
                  </Text>
                </HStack>
              </VStack>
            );
          })}
        </VStack>
      </ScrollView>
      <ZStack alignItems="center">
        <HStack bg="gray.700" flex={1} paddingX={6} paddingY={5}>
          <Text
            w="full"
            flexShrink={1}
            color="blue.100"
            fontFamily="heading"
            fontSize="sm"
            textAlign="left"
            alignSelf="center"
          >
            R${' '}
            <Text fontSize="xl">
              {data?.data.price.toString()}
              {!data?.data.price.toString().endsWith(',00') ? ',00' : ''}
            </Text>
          </Text>
          <Button
            title="Entrar em contato"
            variant="primary"
            onPress={() => handleLinking()}
          />
        </HStack>
      </ZStack>
    </VStack>
  );
}
