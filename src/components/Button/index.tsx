import { Button as NativeBaseButton, IButtonProps, Text } from 'native-base';

interface ButtonProps extends IButtonProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'terciary';
}

export function Button({ title, variant = 'primary', ...props }: ButtonProps) {
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
      fontFamily={'heading'}
      fontSize="sm"
      _pressed={{
        bgColor: 'gray.400',
      }}
      {...props}
    >
      <Text
        fontFamily={'heading'}
        color={variant === 'terciary' ? 'gray.200' : 'gray.700'}
      >
        {title}
      </Text>
    </NativeBaseButton>
  );
}
