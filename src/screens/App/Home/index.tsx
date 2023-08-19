import {
  Box,
  Center,
  FlatList,
  HStack,
  Icon,
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

import { MaterialIcons, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { InputCheckBox } from '../../../components/InputCheckBox';
import { Portal, PortalHost } from '@gorhom/portal';
import { Loading } from '../../../components/Loading';
import { TabNavigatorRoutesProps } from '../../../routes/tab.routes';
import { useFilterStore } from '../../../stores/useFilterStore/useFilterStore';
import { IsNewToggle } from './components/IsNewToggle';

type ProductQuality = 'true' | 'false' | 'disabled';

interface SearchParamsProps {
  query: string;
  is_new: string;
  accept_trade: string;
  payment_methods: string[];
}

const InitialParamsToSearch = {
  query: '',
  accept_trade: '',
  is_new: '',
  payment_methods: [],
};

export function Home() {
  const [paramsToSearch, setParamsToSearch] = useState<SearchParamsProps>(
    InitialParamsToSearch,
  );
  const [acceptExchange, setAcceptExchange] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentOptions, setPaymentOptions] = useState<string[]>([]);
  const [query, setQuery] = useState('');

  // const { isNew, setIsNew } = useFilterStore();

  const { data, isFetching } = useGetProducts(paramsToSearch);
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const tabNavigaton = useNavigation<TabNavigatorRoutesProps>();

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
    const dataToSearch: SearchParamsProps = {
      query,
      accept_trade: '',
      is_new: '',
      payment_methods: [],
    };
    setParamsToSearch(dataToSearch);
  }

  function handleSearchWithFilters() {
    const payment: Record<string, string> = {
      Boleto: 'boleto',
      Pix: 'pix',
      Dinheiro: 'cash',
      'Cartão de Crédito': 'card',
      'Depósito Bancário': 'deposit',
    };

    const dataWithFilters: SearchParamsProps = {
      query: query,
      is_new: isNew !== 'disabled' ? isNew : '',
      accept_trade: String(acceptExchange),
      payment_methods: paymentOptions.map((item) => payment[item]),
    };

    setParamsToSearch(dataWithFilters);
    sheetRef.current?.close();
  }

  function handleCleanFilter() {
    setIsNew('disabled');
    setPaymentOptions([]);
    setAcceptExchange(false);

    sheetRef.current?.close();
    setIsModalOpen(false);
    setParamsToSearch(InitialParamsToSearch);
  }

  return (
    <View flex={1}>
      <VStack paddingTop={16} marginX={6} flex={1}>
        <HStack mb={8}>
          <HomeHeader />
          <Button
            title="Criar anúncio"
            variant="secondary"
            marginLeft={10}
            hasIcon
            onPress={() => navigation.navigate('createad')}
          />
        </HStack>

        <Text mb={3} fontFamily="body" fontSize="sm" color="gray.300">
          Seus produtos anunciados para venda
        </Text>
        <HStack
          alignItems="center"
          bg="blue.100:alpha.10"
          paddingX={4}
          paddingY={3}
          borderRadius="6"
          space={4}
        >
          <Icon
            as={FontAwesome5}
            name="tags"
            size={5}
            color="blue.100"
            flex={1}
          />
          <VStack>
            <Text color="gray.200" fontFamily="heading" fontSize="xl">
              4
            </Text>
            <Text color="gray.200" fontSize={16}>
              anúncios ativos
            </Text>
          </VStack>

          <TouchableOpacity onPress={() => tabNavigaton.navigate('ads')}>
            <HStack space={2}>
              <Text color="blue.100" fontSize={14} fontFamily="heading">
                Meus anúncios
              </Text>
              <Icon
                as={AntDesign}
                name="arrowright"
                size={5}
                color="blue.100"
              />
            </HStack>
          </TouchableOpacity>
        </HStack>

        <VStack mt={6} flexGrow={1}>
          <Text mb={3} color="gray.300" fontFamily="body" fontSize="sm">
            Compre produtos variados
          </Text>
          <Input
            placeholder="Buscar anúncio"
            mb={6}
            isReadOnly={isModalOpen}
            onChangeText={(text) => setQuery(text)}
            InputRightElement={
              <HStack mr={4} alignItems="center">
                <TouchableOpacity
                  key="search"
                  disabled={isFetching}
                  onPress={() => handleSearch()}
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
                  disabled={isModalOpen || isFetching}
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
          <Box flex={1}>
            {isFetching ? (
              <Loading />
            ) : (
              <FlatList
                data={data?.data}
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
                      navigation.navigate('adInfo', { ...product.item });
                    }}
                  />
                )}
                showsVerticalScrollIndicator={false}
              />
            )}
          </Box>
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

              <IsNewToggle />

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
                onPress={() => handleSearchWithFilters()}
              />
            </HStack>
          </BottomSheetView>
        </BottomSheet>
        <PortalHost name="custom_host" />
      </Portal>
    </View>
  );
}
