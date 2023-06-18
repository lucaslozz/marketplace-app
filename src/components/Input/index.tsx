import {
  Input as NativeBaseInput,
  IInputProps,
  FormControl,
  WarningOutlineIcon,
} from 'native-base';

interface InputProps extends IInputProps {
  errorMessage?: string;
}

export function Input({ errorMessage, isInvalid, ...props }: InputProps) {
  return (
    <FormControl isInvalid={isInvalid}>
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
      <FormControl.ErrorMessage
        leftIcon={<WarningOutlineIcon size="xs" />}
        position="absolute"
        bottom={0.45}
      >
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}
