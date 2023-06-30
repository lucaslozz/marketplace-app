import { Box, HStack, VStack, View } from 'native-base';

import { HomeHeader } from '../../../components/HomeHeader';
import { Button } from '../../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '../../../routes/app.routes';
import { ProductCard } from '../../../components/ProductCard';

export function Home() {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();
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
        <ProductCard
          src="https://media.istockphoto.com/id/1413086617/pt/foto/white-womens-leather-sneakers-on-white-background-top-view-flat-lay-stylish-youth-sneakers.jpg?s=1024x1024&w=is&k=20&c=7Ix8Xwgfk4jxPALuOrSFaXuBsTGRgG2GUt7TXCFB7e4="
          title="Sapato Branco"
          is_new
          price={100}
        />
      </VStack>
    </VStack>
  );
}
