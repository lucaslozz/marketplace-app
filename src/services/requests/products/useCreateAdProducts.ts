import { AxiosPromise } from 'axios';
import { api } from '../../api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PhotoProps } from '../../../hooks/usePhoto/types';

export interface BodyProducts {
  photo: PhotoProps[];
  name: string;
  description: string;
  is_new: boolean;
  price: number;
  accept_trade: boolean;
  payment_methods: string[];
}

interface BodyResponse {
  id: string;
  name: string;
  description: string;
  is_new: boolean;
  price: number;
  accept_trade: boolean;
  user_id: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

const fetchData = async ({
  ...props
}: BodyProducts): AxiosPromise<BodyResponse> => {
  const response = await api.post('/products', {
    ...props,
  });

  const dataResponse: BodyResponse = response.data;

  const body = new FormData();

  body.append('product_id', dataResponse.id);

  props.photo.forEach((photo) => {
    body.append('images', photo as any);
  });

  await api.post('/products/images', body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response;
};

export function useCreateAdProducts() {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries(['products']);
  const mutate = useMutation({
    mutationFn: fetchData,
  });

  return mutate;
}
