import { AxiosPromise } from 'axios';
import { api } from '../../api';
import { useQuery } from '@tanstack/react-query';

interface PaymentMethod {
  key: string;
  name: string;
}

interface User {
  avatar: string;
}

interface ProductImage {
  path: string;
  id: string;
}

interface ProductsResponse {
  id: string;
  name: string;
  price: number;
  is_new: boolean;
  accept_trade: boolean;
  product_images: ProductImage[];
  payment_methods: PaymentMethod[];
  user: User;
}

interface ProductsRequest {
  is_new: string;
  accept_trade: string;
  payment_methods: string[];
  query: string;
}

const fetchData = async (): AxiosPromise<ProductsResponse> => {
  const response = await api.get<ProductsResponse>('/products/');
  return response;
};

export function useGetProducts() {
  const query = useQuery({
    queryFn: fetchData,
    queryKey: ['products'],
  });

  return {
    ...query,
    data: query.data?.data,
  };
}
