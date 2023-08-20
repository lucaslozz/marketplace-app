import { useContext, useEffect, useState } from 'react';

import { MaterialIcons } from '@expo/vector-icons';

import {
  Text,
  VStack,
  Pressable,
  Icon,
  ScrollView,
  useToast,
} from 'native-base';
import LogoSvg from '../../../assets/LogoSvg.svg';
import { useForm, Controller } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRoutesProps } from '../../../routes/auth.routes';
import { useLogin } from '../../../services/requests/user/useLogin';
import { UserContext } from '../../../contexts/userContext/types';
import { AppError } from '../../../utils/AppError';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

import { useAppDispatch } from '../../../store';
import { save } from '../../../store/slices/user';

type SignInFormData = {
  email: string;
  password: string;
};

const signInSchema = yup.object({
  email: yup
    .string()
    .required('Digite seu e-mail')
    .email('Digite um e-mail válido'),
  password: yup.string().required('Digite sua senha'),
});

export function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  const { navigate } = useNavigation<AuthNavigatorRoutesProps>();

  const { mutate, data, error, isLoading, isSuccess } = useLogin();

  const { show } = useToast();

  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: yupResolver(signInSchema),
  });

  function handleSignIn({ email, password }: SignInFormData) {
    mutate({ email, password });
  }

  useEffect(() => {
    if (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError ? error.message : 'Por favor, tente mais tarde';

      show({
        title: title,
        placement: 'top',
        bgColor: 'red.500',
      });
    }
  }, [error]);

  useEffect(() => {
    if (data?.data) {
      dispatch(save({ ...data.data, isLoading: false }));
    }
  }, [isSuccess]);

  return (
    <ScrollView>
      <VStack
        flex={1}
        alignItems={'center'}
        pt="24"
        px="12"
        bg="gray.600"
        borderBottomRadius="24"
      >
        <LogoSvg />
        <Text color="gray.100" fontFamily="heading" fontSize="4xl" mt={'5'}>
          marketplace
        </Text>
        <Text fontSize={'sm'} color="gray.300" fontFamily="body">
          Seu espaço de compra e venda
        </Text>

        <Text mt="76" mb="4" fontSize="sm" color="gray.200" fontFamily="body">
          Acesse sua conta
        </Text>

        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="E-mail"
              type="email"
              keyboardType="email-address"
              autoCapitalize="none"
              mb="6"
              onChangeText={onChange}
              value={value}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              type={showPassword ? 'text' : 'password'}
              InputRightElement={
                <Pressable onPress={() => setShowPassword(!showPassword)}>
                  <Icon
                    as={
                      <MaterialIcons
                        name={showPassword ? 'visibility' : 'visibility-off'}
                      />
                    }
                    size={5}
                    mr="2"
                    color="muted.400"
                  />
                </Pressable>
              }
              placeholder="Password"
              autoCapitalize="none"
              mb={8}
              onChangeText={onChange}
              value={value}
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
            />
          )}
        />

        <Button
          title="Entrar"
          mb="16"
          onPress={handleSubmit(handleSignIn)}
          isLoading={isLoading}
        />
      </VStack>
      <VStack alignItems="center" px="12">
        <Text mt="55" mb={4} fontFamily="body" fontSize="sm" color="gray.200">
          Ainda não tem acesso?
        </Text>
        <Button
          title="Criar uma conta"
          mb="16"
          variant="terciary"
          onPress={() => navigate('signUp')}
        />
      </VStack>
    </ScrollView>
  );
}
