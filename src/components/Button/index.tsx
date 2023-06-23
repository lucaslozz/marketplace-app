import {
  Button as NativeBaseButton,
  IButtonProps,
  Text,
  Icon,
  HStack,
} from 'native-base';

import { AntDesign } from '@expo/vector-icons';

interface ButtonProps extends IButtonProps {
  title: string;
  hasIcon?: boolean;
  variant?: 'primary' | 'secondary' | 'terciary';
}

export function Button({
  title,
  variant = 'primary',
  hasIcon = false,
  ...props
}: ButtonProps) {
  return (
    <NativeBaseButton
      bgColor={
        variant === 'primary'
          ? 'lightBlue.100'
          : variant === 'secondary'
          ? 'gray.100'
          : 'gray.500'
      }
      borderRadius="6"
      p={3}
      w="full"
      flexShrink={1}
      fontFamily={'heading'}
      fontSize="sm"
      _pressed={{
        bgColor: 'gray.400',
      }}
      {...props}
    >
      <HStack alignItems="center" justifyContent="center">
        {hasIcon && (
          <Icon
            as={<AntDesign name="plus" />}
            size={4}
            mr="2"
            color="gray.600"
          />
        )}
        <Text
          fontFamily={'heading'}
          color={variant === 'terciary' ? 'gray.200' : 'gray.700'}
        >
          {title}
        </Text>
      </HStack>
    </NativeBaseButton>
  );
}
