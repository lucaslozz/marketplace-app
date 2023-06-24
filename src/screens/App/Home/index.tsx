import { HStack, VStack } from 'native-base';

import { HomeHeader } from '../../../components/HomeHeader';
import { Button } from '../../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '../../../routes/app.routes';

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
    </VStack>
  );
}
