import { HStack, VStack } from 'native-base';

import { HomeHeader } from '../../../components/HomeHeader';
import { Button } from '../../../components/Button';

export function Home() {
  return (
    <VStack paddingY={16} marginX={6}>
      <HStack>
        <HomeHeader />
        <Button
          title="Criar anúncio"
          variant="secondary"
          marginLeft={10}
          hasIcon
        />
      </HStack>
    </VStack>
  );
}
