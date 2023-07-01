import { AxiosPromise } from 'axios';
import { api } from '../../api';
import { useQuery } from '@tanstack/react-query';

interface PaymentMethod {
  key: string;
  name: string;
}

interface User {
  name: string;
  tel: string;
  avatar: string;
}

interface ProductImage {
  path: string;
  id: string;
}

interface ProductResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  is_new: boolean;
  accept_trade: boolean;
  product_images: ProductImage[];
  payment_methods: PaymentMethod[];
  user: User;
}

const fetchData = async (id: string): AxiosPromise<ProductResponse> => {
  const response = await api.get<ProductResponse>(`/products/${id}`);
  return response;
};

export function useGetInfoProduct(id: string) {
  const query = useQuery(['product', id], () => fetchData(id));

  return {
    ...query,
    data: query.data,
  };
}
