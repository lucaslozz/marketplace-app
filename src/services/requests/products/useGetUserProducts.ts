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

interface UserProductsResponse {
  id: string;
  name: string;
  description: string;
  is_new: boolean;
  price: number;
  accept_trade: boolean;
  user_id: string;
  is_active: true;
  created_at: Date;
  updated_at: Date;
  product_images: ProductImage[];
  payment_methods: PaymentMethod[];
}

const fetchData = async (): AxiosPromise<UserProductsResponse> => {
  const response = await api.get<UserProductsResponse>('/users/products');
  return response;
};

export function useGetUserProducts() {
  const query = useQuery(['userProducts'], () => fetchData());

  return {
    ...query,
    data: query.data,
  };
}
