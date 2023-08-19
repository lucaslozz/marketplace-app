import { AxiosPromise } from 'axios';
import { api } from '../../api';
import { useMutation } from '@tanstack/react-query';

interface SignUpBody {
  email: string;
  password: string;
}

type User = {
  id: string;
  avatar: string;
  name: string;
  email: string;
  tel: string;
  created_at: Date;
  updated_at: Date;
};

interface UserData {
  token: string;
  user: User;
  'refresh-token': string;
}

const fetchData = async (body: SignUpBody): AxiosPromise<UserData> => {
  const response = await api.post<UserData>('/sessions/', body);
  return response;
};

export function useLogin() {
  const mutate = useMutation({
    mutationFn: fetchData,
  });

  return mutate;
}
