import {
  Box,
  FlatList,
  HStack,
  Icon,
  Radio,
  Switch,
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
import { TouchableOpacity } from 'react-native';

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

export function Home() {
  const [searchParams, setSearchParams] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<ProductsResponse[]>([]);

  const [productOptions, setProductOptions] = useState<string[]>([]);
  const [paymentOptions, setPaymentOptions] = useState<string[]>([]);
  const [acceptExchange, setAcceptExchange] = useState(false);

  const { data } = useGetProducts('', '');
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  const sheetRef = useRef<BottomSheet>(null);

  const handleOpenModal = useCallback(() => {
    sheetRef.current?.expand();
    setIsModalOpen(true);
  }, []);

  function paymentOptionsSelect(payment: string) {
    setPaymentOptions([...payment]);
  }

  function productOptionsSelect(optionSelected: string) {
    setProductOptions([optionSelected]);
  }

  function handleSearch() {}

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
            }}
          >
            <VStack>
              <Text color="gray.200" fontSize={20} fontFamily="heading" mb={6}>
                Filtrar Anúncios
              </Text>
              <InputRadio
                name="condition"
                selectRadioInputOption={productOptionsSelect}
                radioInputOptions={['NOVO', 'USADO']}
              />
              <Text color="gray.200" fontSize="md" my={2} fontFamily="heading">
                Condição
              </Text>
              <Text color="gray.200" fontSize="md" my={2} fontFamily="heading">
                Aceita troca?
              </Text>

              <Switch
                size="lg"
                alignSelf="flex-start"
                mb="4"
                colorScheme="lightBlue"
                onChange={() => setAcceptExchange(!acceptExchange)}
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
                defaultValue={paymentOptions}
                selectOption={paymentOptionsSelect}
              />
            </VStack>
          </BottomSheetView>
        </BottomSheet>
        <PortalHost name="custom_host" />
      </Portal>
    </View>
  );
}
