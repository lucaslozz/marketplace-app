import { api } from '../../api';
import { useMutation, useQuery } from '@tanstack/react-query';

interface AvatarProps {
  name: string;
  uri: string;
  type: string;
}

interface SignUpBody {
  avatar?: AvatarProps;
  name: string;
  email: string;
  phone: string;
  password: string;
}

const fetchData = async (body: SignUpBody) => {
  const formData = new FormData();
  if (body.avatar) {
    formData.append('avatar', body.avatar?.uri);
  }

  console.log(body.avatar?.uri);
  formData.append('name', body.name);
  formData.append('email', body.email);
  formData.append('phone', body.phone);
  formData.append('password', body.password);

  await api.post('/users/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export function useSignUp() {
  const mutate = useMutation({
    mutationFn: fetchData,
  });

  return mutate;
}
