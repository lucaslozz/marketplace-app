import { Box, FlatList, HStack, VStack, View } from 'native-base';

import { HomeHeader } from '../../../components/HomeHeader';
import { Button } from '../../../components/Button';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '../../../routes/app.routes';
import { ProductCard } from '../../../components/ProductCard';
import { useCallback, useState } from 'react';
import { useGetProducts } from '../../../services/requests/products/useGetProducts';
import { api } from '../../../services/api';

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
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();
  const [products, setProducts] = useState<ProductsResponse[]>([]);

  const { data } = useGetProducts();

  useFocusEffect(
    useCallback(() => {
      if (data) {
        const productsData = data.map((obj) => [obj.values]);

        setProducts(data);
      }
    }, [data]),
  );
  return (
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

      <VStack mt={6} space={6}>
        <FlatList
          data={products}
          numColumns={2}
          keyExtractor={(product) => product.id}
          renderItem={(product) => (
            <ProductCard
              key={product.item.id}
              src={`${api.defaults.baseURL}/images/${product.item.product_images[0].path}`}
              title={product.item.name}
              is_new={product.item.is_new}
              price={product.item.price}
            />
          )}
        />
      </VStack>
    </VStack>
  );
}
