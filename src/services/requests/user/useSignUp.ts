import { useFetch } from '../../../hooks/useFetch';
import { UseFetchProps } from '../../../hooks/useFetch/types';

const endpoint = () => '/users/';

type Params = {
  options?: Partial<UseFetchProps>;
};

type User = {
  id: string;
  avatar: string;
  name: string;
  email: string;
  tel: number;
  created_at: Date;
  updated_at: Date;
};

type Response = {
  token: string;
  user: User;
  'refresh-token': string;
};

export type FormData = {
  avatar: File;
  name: string;
  phone: string;
  email: string;
  password: string;
};

const useSignUp = ({ options }: Params) =>
  useFetch<Body, Response>({
    url: endpoint(),
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    method: 'POST',
    ...options,
  });

export default useSignUp;
