import {
  Box,
  Center,
  HStack,
  Icon,
  ScrollView,
  Text,
  VStack,
} from 'native-base';

import { TouchableOpacity } from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '../../../routes/app.routes';

export function CreateAd() {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  function addPhoto() {
    console.log('chamou');
  }

  return (
    <ScrollView paddingX={6} paddingY="12">
      <VStack>
        <HStack alignItems="center">
          <TouchableOpacity onPress={() => navigate('home')}>
            <Icon
              as={<AntDesign name="arrowleft" />}
              size={7}
              mr="2"
              color="gray.100"
            />
          </TouchableOpacity>
          <Text fontFamily={'heading'} fontSize="lg" marginLeft="20">
            Criar anúncio
          </Text>
        </HStack>

        <VStack mt="6">
          <Text color="gray.200" fontFamily="heading" mb="1" fontSize="md">
            Imagens
          </Text>
          <Text fontFamily="body" fontSize="sm" color="gray.300" mb="4">
            Escolha até 3 imagens para mostrar o quando o seu produto é
            incrível!
          </Text>

          <TouchableOpacity onPress={addPhoto}>
            <Box
              size={24}
              bgColor="gray.500"
              rounded="4"
              alignItems="center"
              justifyContent="center"
            >
              <Icon as={<AntDesign name="plus" />} size={6} color="gray.400" />
            </Box>
          </TouchableOpacity>
        </VStack>
      </VStack>
    </ScrollView>
  );
}
