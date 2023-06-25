import { HStack, Radio } from 'native-base';

interface InputRadioProps {
  option1: string;
  option2: string;
}

export function InputRadio({ option1, option2 }: InputRadioProps) {
  return (
    <Radio.Group name="exampleGroup">
      <HStack space={5}>
        <Radio colorScheme="lightBlue" value="1" my={1}>
          {option1}
        </Radio>
        <Radio colorScheme="lightBlue" value="2" my={1}>
          {option2}
        </Radio>
      </HStack>
    </Radio.Group>
  );
}
