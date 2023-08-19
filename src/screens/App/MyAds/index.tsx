import { Box, HStack, Icon, Text, VStack, ZStack } from 'native-base';
import { AntDesign } from '@expo/vector-icons';

import { FlatList } from 'react-native';

import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '../../../routes/app.routes';
import { Loading } from '../../../components/Loading';
import { useGetUserProducts } from '../../../services/requests/products/useGetUserProducts';
import { ProductCard } from '../../../components/ProductCard';
import { api } from '../../../services/api';

export function MyAds() {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  const { data, isFetching } = useGetUserProducts();

  return (
    <VStack flex={1} mt={16} paddingX={6}>
      <HStack alignItems="center" justifyContent="center" mb={8}>
        <Text fontFamily="heading" fontSize="lg">
          Meus anúncios
        </Text>
      </HStack>
      <ZStack position="absolute" right={6} top={1}>
        <TouchableOpacity onPress={() => navigate('createad')}>
          <Icon as={AntDesign} name="plus" size={5} color="gray.100" />
        </TouchableOpacity>
      </ZStack>

      <HStack>
        <Text></Text>
      </HStack>

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
        )}
      </Box>
    </VStack>
  );
}
