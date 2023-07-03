import {
  Checkbox,
  ICheckboxGroupProps,
  FormControl,
  WarningOutlineIcon,
} from 'native-base';

interface InputCheckBoxProps extends ICheckboxGroupProps {
  inputOptions: string[];
  isInvalid?: boolean;
  errorMessage?: string;

  selectOption: (value: string) => void;
}

import React from 'react';

export function InputCheckBox({
  inputOptions,
  selectOption,
  isInvalid,
  errorMessage,
  ...props
}: InputCheckBoxProps) {
  const handleChange = () => {
    return (values: any) => {
      selectOption(values || '');
    };
  };

  return (
    <FormControl isInvalid={isInvalid}>
      <Checkbox.Group
        colorScheme="lightBlue"
        accessibilityLabel="choose multiple items"
        onChange={handleChange()}
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
        position="absolute"
        bottom={1}
      >
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}
