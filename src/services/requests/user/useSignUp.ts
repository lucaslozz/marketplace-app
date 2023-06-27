import { PhotoProps } from '../../../hooks/usePhoto/types';
import { api } from '../../api';
import { useMutation, useQuery } from '@tanstack/react-query';

interface SignUpBody {
  photo: PhotoProps;
  name: string;
  email: string;
  phone: string;
  password: string;
}

const fetchData = async (body: SignUpBody) => {
  const formData = new FormData();
  if (body.photo) {
    formData.append('avatar', String(body.photo));
  }

  formData.append('name', body.name);
  formData.append('email', body.email);
  formData.append('phone', body.phone);
  formData.append('password', body.password);

  await api.post('/users', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  console.log(formData);
};

export function useSignUp() {
  const mutate = useMutation({
    mutationFn: fetchData,
  });

  return mutate;
}
