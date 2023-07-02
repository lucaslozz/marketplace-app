import { FlatList, HStack, Icon, Radio, Text, VStack, View } from 'native-base';

import { HomeHeader } from '../../../components/HomeHeader';
import { Button } from '../../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '../../../routes/app.routes';
import { ProductCard } from '../../../components/ProductCard';
import { useCallback, useRef, useState } from 'react';
import { useGetProducts } from '../../../services/requests/products/useGetProducts';
import { api } from '../../../services/api';
import { Input } from '../../../components/Input';
import { Pressable } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

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
  const { data } = useGetProducts('', '');
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  const sheetRef = useRef<BottomSheet>(null);

  const handleOpenModal = useCallback(() => {
    sheetRef.current?.expand();
    setIsModalOpen(true);
  }, []);

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
            InputRightElement={
              <HStack mr={4} alignItems="center">
                <Pressable key="search" onPress={() => console.log('search')}>
                  <Icon
                    as={MaterialIcons}
                    name="search"
                    size={5}
                    color="gray.200"
                  />
                </Pressable>
                <Text key="bar" color="gray.400" fontSize="lg" mr={3} ml={3}>
                  |
                </Text>
                <Pressable key="filter" onPress={() => handleOpenModal()}>
                  <Icon
                    as={MaterialIcons}
                    name="filter-center-focus"
                    size={5}
                    color="gray.200"
                  />
                </Pressable>
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

      <BottomSheet
        ref={sheetRef}
        snapPoints={['75%']}
        enablePanDownToClose
        onClose={() => setIsModalOpen(false)}
      >
        <BottomSheetView style={{ paddingHorizontal: 24, paddingVertical: 24 }}>
          <VStack></VStack>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}
