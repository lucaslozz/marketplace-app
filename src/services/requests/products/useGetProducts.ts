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

const fetchData = async (
  query: string,
  accept_trade?: string,
): AxiosPromise<ProductsResponse[]> => {
  const response = await api.get<ProductsResponse[]>(
    `/products?query=${query}&accept_trade${accept_trade}`,
  );
  return response;
};

export function useGetProducts(query: string, accept_trade?: string) {
  const { data } = useQuery(['products', query, accept_trade], () =>
    fetchData(query, accept_trade),
  );

  return {
    ...data,
    data: data?.data,
  };
}
