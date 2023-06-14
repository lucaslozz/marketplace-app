import { Input as NativeBaseInput, IInputProps } from 'native-base';

interface InputProps extends IInputProps {}

export function Input({ ...props }: InputProps) {
  return (
    <NativeBaseInput
      w="full"
      bgColor="gray.700"
      fontFamily="body"
      borderRadius="6"
      paddingX="4"
      paddingY="3"
      placeholderTextColor="gray.400"
      fontSize="md"
      borderWidth={0}
      _focus={{
        borderWidth: 1,
        borderColor: 'black',
      }}
      {...props}
    />
  );
}
