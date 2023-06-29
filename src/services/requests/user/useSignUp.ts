import { PhotoProps } from '../../../hooks/usePhoto/types';
import { api } from '../../api';
import { useMutation } from '@tanstack/react-query';

interface SignUpBody {
  photo: PhotoProps[];
  name: string;
  email: string;
  phone: string;
  password: string;
}

const fetchData = async (body: SignUpBody) => {
  const formData = new FormData();

  formData.append('name', body.name);
  formData.append('email', body.email);
  formData.append('tel', body.phone);
  formData.append('password', body.password);

  if (body.photo) {
    formData.append('avatar', body.photo[0]);
  }

  await api.post('/users', formData, {
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
