import {
  Image,
  IImageProps,
  Icon,
  IconButton,
  ZStack,
  Skeleton,
} from 'native-base';

import { Feather } from '@expo/vector-icons';

interface PhotoCardProps extends IImageProps {
  size: number;
  id: string;
  isLoading: boolean;
  deletePhoto: (id: string) => void;
}

export function PhotoCard({
  size,
  id,
  isLoading,
  deletePhoto,
  ...props
}: PhotoCardProps) {
  return isLoading ? (
    <Skeleton h={size} w={size} mr="2" rounded="4" />
  ) : (
    <ZStack w={size} h={size} position="relative" mr="2">
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
        onPress={() => deletePhoto(id)}
      />
    </ZStack>
  );
}
