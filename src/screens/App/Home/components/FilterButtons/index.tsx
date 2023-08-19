import { HStack } from 'native-base';
import { Button } from '../../../../../components/Button';

interface FilterButtonsProps {
  cleanFilters: () => void;
  searchWithFilters: () => void;
}

export function FilterButtons({
  cleanFilters,
  searchWithFilters,
}: FilterButtonsProps) {
  return (
    <HStack mb={8}>
      <Button
        title="Resetar filtros"
        variant="terciary"
        mr="3"
        onPress={cleanFilters}
      />
      <Button
        title="Aplicar filtros"
        variant="secondary"
        onPress={searchWithFilters}
      />
    </HStack>
  );
}
