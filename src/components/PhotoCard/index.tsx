import {
  Image,
  IImageProps,
  Box,
  Icon,
  Pressable,
  IconButton,
  ZStack,
} from 'native-base';
import { TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';

interface PhotoCardProps extends IImageProps {
  size: number;
  deletePhoto: () => void;
}

export function PhotoCard({ size, deletePhoto, ...props }: PhotoCardProps) {
  return (
    <ZStack w={size} h={size} position="relative">
      <Image size={size} rounded="4" {...props} resizeMode="cover" />
      <IconButton
        icon={<Icon as={Feather} name="x" color="gray.700" size="3" />}
        bgColor="gray.200"
        borderRadius="full"
        w={4}
        h={4}
        position="absolute"
        top={1}
        right={1}
        onPress={() => deletePhoto()}
      />
    </ZStack>
  );
}
