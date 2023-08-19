import { Box, HStack, Text } from 'native-base';

import { TouchableOpacity } from 'react-native';
import { useFilterStore } from '../../../../../stores/useFilterStore/useFilterStore';

export function IsNewToggle() {
  const { isNew, setIsNew } = useFilterStore();
  return (
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
  );
}
