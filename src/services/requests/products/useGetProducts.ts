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

interface SearchParamsProps {
  query: string;
  is_new: string;
  accept_trade: string;
  payment_methods: string[];
}

const fetchData = async (
  query: string,
  accept_trade: string,
  is_new: string,
  payment_methods: string[],
): AxiosPromise<ProductsResponse[]> => {
  const paymentMethodQuery = payment_methods?.reduce(
    (query, method) => query + `&payment_method=${method}`,
    '',
  );

  if (payment_methods.length > 0) {
    const response = await api.get<ProductsResponse[]>(
      `/products?query=${query}${
        accept_trade ? `&accept_trade=${accept_trade}` : ''
      }${is_new ? `&is_new=${is_new}` : ''}${
        payment_methods?.length > 0 && paymentMethodQuery
      }`,
    );
    return response;
  } else {
    const response = await api.get<ProductsResponse[]>(
      `/products?query=${query}${
        accept_trade ? `&accept_trade=${accept_trade}` : ''
      }${is_new ? `&is_new=${is_new}` : ''}`,
    );
    return response;
  }
};

export function useGetProducts({
  query,
  accept_trade,
  is_new,
  payment_methods,
}: SearchParamsProps) {
  const result = useQuery(
    ['products', query, accept_trade, is_new, payment_methods],
    () => fetchData(query, accept_trade, is_new, payment_methods),
  );

  return {
    ...result,
  };
}
