import {
  Checkbox,
  ICheckboxGroupProps,
  FormControl,
  WarningOutlineIcon,
} from 'native-base';

interface InputCheckBoxProps extends ICheckboxGroupProps {
  inputOptions: string[];

  selectOption: (value: string) => void;
}

export function InputCheckBox({
  inputOptions,
  selectOption,
  ...props
}: InputCheckBoxProps) {
  return (
    <FormControl isInvalid={false}>
      <Checkbox.Group
        colorScheme="lightBlue"
        accessibilityLabel="choose multiple items"
        onChange={(values) => {
          selectOption(values || '');
        }}
        alignItems="flex-start"
        {...props}
      >
        {inputOptions.map((item) => {
          return (
            <Checkbox key={item} value={item} my="1">
              {item}
            </Checkbox>
          );
        })}
      </Checkbox.Group>
      <FormControl.ErrorMessage
        _stack={{
          alignItems: 'flex-start',
        }}
        leftIcon={<WarningOutlineIcon size="xs" mt={1} />}
      >
        You must select at least three methods
      </FormControl.ErrorMessage>
    </FormControl>
  );
}
