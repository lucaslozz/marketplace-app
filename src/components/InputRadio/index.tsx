import {
  FormControl,
  Radio,
  IRadioGroupProps,
  WarningOutlineIcon,
  HStack,
} from 'native-base';

interface InputRadioProps extends IRadioGroupProps {
  radioInputOptions: string[];
  selectRadioInputOption: (value: string) => void;
}

export function InputRadio({
  radioInputOptions,
  selectRadioInputOption,
  ...props
}: InputRadioProps) {
  return (
    <FormControl isInvalid={false}>
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
      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        You must select a Prize.
      </FormControl.ErrorMessage>
    </FormControl>
  );
}
