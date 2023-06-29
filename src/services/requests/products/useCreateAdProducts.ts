import { PhotoProps } from '../../../hooks/usePhoto/types';
import { api } from '../../api';
import { useMutation } from '@tanstack/react-query';

export interface BodyProducts {
  name: string;

  description: string;
  is_new: boolean;
  price: number;
  accept_trade: boolean;
  payment_methods: string[];
}

const fetchData = async (body: BodyProducts) => {
  await api.post('/products', body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export function useCreateAdProducts() {
  const mutate = useMutation({
    mutationFn: fetchData,
  });

  return mutate;
}
