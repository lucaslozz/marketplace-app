import {
  FormControl,
  Radio,
  IRadioGroupProps,
  WarningOutlineIcon,
  HStack,
} from 'native-base';

interface InputRadioProps extends IRadioGroupProps {
  radioInputOptions: string[];
  errorMessage?: string;
  isInvalid?: boolean;
  selectRadioInputOption: (value: string) => void;
}

export function InputRadio({
  radioInputOptions,
  selectRadioInputOption,
  isInvalid = false,
  errorMessage,
  ...props
}: InputRadioProps) {
  return (
    <FormControl isInvalid={isInvalid}>
      <Radio.Group
        onChange={(value) => {
          selectRadioInputOption(value || '');
        }}
        {...props}
      >
        <HStack space={6}>
          {radioInputOptions.map((item) => {
            return (
              <Radio value={item} key={item}>
                {item}
              </Radio>
            );
          })}
        </HStack>
      </Radio.Group>
      <FormControl.ErrorMessage
        leftIcon={<WarningOutlineIcon size="xs" />}
        position="absolute"
        top={6}
      >
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}
