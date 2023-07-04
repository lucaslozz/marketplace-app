import {
  Box,
  FlatList,
  HStack,
  Icon,
  Radio,
  Text,
  VStack,
  View,
  useTheme,
} from 'native-base';

import { HomeHeader } from '../../../components/HomeHeader';
import { Button } from '../../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '../../../routes/app.routes';
import { ProductCard } from '../../../components/ProductCard';
import { useCallback, useRef, useState } from 'react';
import { useGetProducts } from '../../../services/requests/products/useGetProducts';
import { api } from '../../../services/api';
import { Input } from '../../../components/Input';
import { TouchableOpacity, Switch } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { InputCheckBox } from '../../../components/InputCheckBox';
import { InputRadio } from '../../../components/InputRadio';
import { Portal, PortalHost } from '@gorhom/portal';

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

interface ProductsResponse {
  id: string;
  name: string;
  price: number;
  is_new: boolean;
  accept_trade: boolean;
  product_images: ProductImage[];
  payment_methods: PaymentMethod[];
  user: User;
}

type ProductQuality = 'true' | 'false' | 'disabled';

export function Home() {
  const [acceptExchange, setAcceptExchange] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [paymentOptions, setPaymentOptions] = useState<string[]>([]);
  const [isNew, setIsNew] = useState<ProductQuality>('disabled');

  const { data } = useGetProducts('', '');
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  const sheetRef = useRef<BottomSheet>(null);

  const { colors } = useTheme();

  const handleOpenModal = useCallback(() => {
    sheetRef.current?.expand();
    setIsModalOpen(true);
  }, []);

  function paymentOptionsSelect(payment: string) {
    setPaymentOptions([...payment]);
  }

  function handleSearch() {
    const payment: Record<string, string> = {
      Boleto: 'boleto',
      Pix: 'pix',
      Dinheiro: 'cash',
      'Cartão de Crédito': 'card',
      'Depósito Bancário': 'deposit',
    };

    const dataWithFilters = {
      is_new: isNew,
      accept_trade: String(acceptExchange),
      payment_methods: paymentOptions.map((item) => payment[item]),
    };

    console.log(dataWithFilters);
  }

  function handleCleanFilter() {
    setIsNew('disabled');
    setPaymentOptions([]);
    setAcceptExchange(false);

    sheetRef.current?.close();
    setIsModalOpen(false);
  }

  return (
    <View flex={1}>
      <VStack paddingY={16} marginX={6}>
        <HStack>
          <HomeHeader />
          <Button
            title="Criar anúncio"
            variant="secondary"
            marginLeft={10}
            hasIcon
            onPress={() => navigate('createad')}
          />
        </HStack>

        <VStack mt={6}>
          <Input
            placeholder="Buscar anúncio"
            mb={6}
            isReadOnly={isModalOpen}
            InputRightElement={
              <HStack mr={4} alignItems="center">
                <TouchableOpacity
                  key="search"
                  onPress={() => console.log('search')}
                >
                  <Box paddingRight={3}>
                    <Icon
                      as={MaterialIcons}
                      name="search"
                      size={5}
                      color="gray.200"
                    />
                  </Box>
                </TouchableOpacity>
                <Text key="bar" color="gray.400" fontSize="lg">
                  |
                </Text>
                <TouchableOpacity
                  key="filter"
                  onPress={() => handleOpenModal()}
                  disabled={isModalOpen}
                >
                  <Box paddingLeft={3}>
                    <Icon
                      as={MaterialIcons}
                      name="filter-center-focus"
                      size={5}
                      color="gray.200"
                    />
                  </Box>
                </TouchableOpacity>
              </HStack>
            }
          />
          <FlatList
            data={data}
            numColumns={2}
            keyExtractor={(product) => product.id}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            renderItem={(product) => (
              <ProductCard
                key={product.item.id}
                avatarSrc={product.item.user.avatar}
                src={`${api.defaults.baseURL}/images/${product.item.product_images[0].path}`}
                title={product.item.name}
                is_new={product.item.is_new}
                price={product.item.price}
                mb={6}
                onPress={() => {
                  navigate('adInfo', { ...product.item });
                }}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        </VStack>
      </VStack>

      <Portal>
        <BottomSheet
          ref={sheetRef}
          snapPoints={['75%']}
          index={-1}
          enablePanDownToClose
          onClose={() => setIsModalOpen(false)}
        >
          <BottomSheetView
            style={{
              paddingHorizontal: 24,
              paddingVertical: 24,
              flex: 1,
              justifyContent: 'space-between',
            }}
          >
            <VStack>
              <Text color="gray.200" fontSize={20} fontFamily="heading" mb={3}>
                Filtrar Anúncios
              </Text>
              <Text color="gray.200" fontSize="md" my={2} fontFamily="heading">
                Condição
              </Text>

              <HStack space={2}>
                <Box
                  bgColor={`${isNew === 'true' ? 'lightBlue.100' : 'gray.500'}`}
                  mb={2}
                  rounded="full"
                  alignItems="center"
                  justifyContent="center"
                  w={76}
                  h={8}
                >
                  <TouchableOpacity onPress={() => setIsNew('true')}>
                    <Text
                      fontFamily="heading"
                      fontSize="xs"
                      color={`${isNew === 'true' ? 'white' : 'gray.300'}`}
                    >
                      NOVO
                    </Text>
                  </TouchableOpacity>
                </Box>
                <Box
                  bgColor={`${
                    isNew === 'true'
                      ? 'gray.500'
                      : `${isNew === 'false' ? 'lightBlue.100' : 'gray.500'}`
                  }`}
                  mb={2}
                  rounded="full"
                  alignItems="center"
                  justifyContent="center"
                  w={76}
                  h={8}
                >
                  <TouchableOpacity onPress={() => setIsNew('false')}>
                    <Text
                      fontFamily="heading"
                      fontSize="xs"
                      color={`${
                        isNew === 'true'
                          ? 'gray.300'
                          : `${isNew === 'false' ? 'white' : 'gray.300'}`
                      }`}
                    >
                      USADO
                    </Text>
                  </TouchableOpacity>
                </Box>
              </HStack>

              <Text color="gray.200" fontSize="md" my={2} fontFamily="heading">
                Aceita troca?
              </Text>

              <Switch
                trackColor={{
                  false: `${colors.gray[500]}`,
                  true: `${colors.lightBlue[100]}`,
                }}
                thumbColor={`${colors.gray[700]}`}
                focusable={false}
                style={{ alignSelf: 'flex-start' }}
                value={acceptExchange}
                onValueChange={(value) => setAcceptExchange(value)}
              />

              <Text color="gray.200" fontSize={16} my={2} fontFamily="heading">
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
                value={paymentOptions}
                selectOption={paymentOptionsSelect}
              />
            </VStack>

            <HStack mb={8}>
              <Button
                title="Resetar filtros"
                variant="terciary"
                mr="3"
                onPress={handleCleanFilter}
              />
              <Button
                title="Aplicar filtros"
                variant="secondary"
                onPress={() => handleSearch()}
              />
            </HStack>
          </BottomSheetView>
        </BottomSheet>
        <PortalHost name="custom_host" />
      </Portal>
    </View>
  );
}
