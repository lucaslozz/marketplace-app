import { useEffect, useState } from 'react';

import { MaterialIcons } from '@expo/vector-icons';

import {
  Text,
  VStack,
  Pressable,
  Icon,
  ScrollView,
  Box,
  useToast,
  Skeleton,
} from 'native-base';
import LogoSvg from '../../../assets/LogoSvg.svg';

import { useForm, Controller } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useNavigation } from '@react-navigation/native';

import avatarDefault from '../../../assets/avatarDefault.png';

import { EvilIcons } from '@expo/vector-icons';

import { useSignUp } from '../../../services/requests/user/useSignUp';
import { AuthNavigatorRoutesProps } from '../../../routes/auth.routes';
import { UserPhoto } from '../../../components/UserPhoto';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { usePhoto } from '../../../hooks/usePhoto';
import { PhotoProps } from '../../../hooks/usePhoto/types';
import { AppError } from '../../../utils/AppError';

type SignUpFormData = {
  name: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirmation: string;
};

interface UserBody {
  photo: PhotoProps[];
  name: string;
  email: string;
  phone: string;
  password: string;
}

const signUpSchema = yup.object({
  name: yup.string().required('Digite seu nome'),
  email: yup
    .string()
    .required('Digite seu e-mail')
    .email('Digite um e-mail válido'),
  phone: yup.string().required('Digite seu telefone'),
  password: yup.string().required('Digite sua senha'),
  passwordConfirmation: yup
    .string()
    .required('Digite sua confirmação de senha')
    .oneOf([yup.ref('password')], 'As senhas devem ser iguais'),
});

export function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const { photo, photoIsLoading, photoError, savePhoto } = usePhoto({});

  const { mutate, isLoading, error, isSuccess } = useSignUp();

  const { show } = useToast();

  const { navigate } = useNavigation<AuthNavigatorRoutesProps>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpSchema),
  });

  function updateAvatar() {
    savePhoto();
  }

  function handleSignUp({ name, email, phone, password }: SignUpFormData) {
    const body: UserBody = {
      photo,
      name,
      email,
      phone,
      password,
    };

    mutate(body);
  }

  useEffect(() => {
    const isAppError = error instanceof AppError;
    if (error) {
      show({
        title: isAppError
          ? error.message
          : 'Erro ao criar o usuário. Tente mais tarde.',
        placement: 'top',
        bgColor: 'red.500',
      });
    }
  }, [error]);

  useEffect(() => {
    if (photoError) {
      show({
        title: photoError,
        placement: 'top',
        bgColor: 'red.500',
      });
    }
  }, [photoError]);

  useEffect(() => {
    if (isSuccess) {
      show({
        title: 'Usuario criado com sucesso!',
        placement: 'top',
        bgColor: 'green.500',
      });
      navigate('signIn');
    }
  }, [isSuccess]);

  return (
    <ScrollView>
      <VStack flex={1} alignItems={'center'} pt="16" px="12" bg="gray.600">
        <LogoSvg width={60} height={40} />
        <Text color="gray.100" fontFamily="heading" fontSize="lg" mt={'5'}>
          Boas vindas!
        </Text>
        <Text
          fontSize={'sm'}
          color="gray.300"
          fontFamily="body"
          textAlign="center"
        >
          Crie sua conta e use o espaço para comprar itens variados e vender
          seus produtos
        </Text>

        <Box mt="8" mb="4" position="relative">
          {photoIsLoading ? (
            <Skeleton
              size={88}
              rounded="full"
              startColor="gray.500"
              endColor="gray.400"
            />
          ) : (
            <UserPhoto
              source={photo.length > 0 ? { uri: photo[0].uri } : avatarDefault}
              size={88}
              alt="Imagem de perfil do usuário"
            />
          )}

          <Pressable
            padding={2}
            rounded="full"
            bgColor="lightBlue.100"
            position="absolute"
            top="12"
            right="-10"
            _pressed={{
              bgColor: 'darkBlue.800',
            }}
            onPress={updateAvatar}
          >
            <Icon as={EvilIcons} name="pencil" color="gray.600" size="6" />
          </Pressable>
        </Box>

        <Controller
          name="name"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Nome"
              mb="6"
              onChangeText={onChange}
              value={value}
              isInvalid={!!errors.name}
              errorMessage={errors.name?.message}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="E-mail"
              keyboardType="email-address"
              mb="6"
              onChangeText={onChange}
              value={value}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
            />
          )}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Telefone"
              keyboardType="number-pad"
              mb="6"
              onChangeText={onChange}
              value={value}
              isInvalid={!!errors.phone}
              errorMessage={errors.phone?.message}
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
              placeholder="Senha"
              mb={6}
              onChangeText={onChange}
              value={value}
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
            />
          )}
        />

        <Controller
          name="passwordConfirmation"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              type={showPassword ? 'text' : 'password'}
              InputRightElement={
                <Pressable
                  onPress={() =>
                    setShowPasswordConfirmation(!showPasswordConfirmation)
                  }
                >
                  <Icon
                    as={
                      <MaterialIcons
                        name={
                          showPasswordConfirmation
                            ? 'visibility'
                            : 'visibility-off'
                        }
                      />
                    }
                    size={5}
                    mr="2"
                    color="muted.400"
                  />
                </Pressable>
              }
              placeholder="Confirmação de senha"
              mb={8}
              onChangeText={onChange}
              value={value}
              isInvalid={!!errors.passwordConfirmation}
              errorMessage={errors.passwordConfirmation?.message}
            />
          )}
        />

        <Button
          title="Criar"
          variant="secondary"
          onPress={handleSubmit(handleSignUp)}
          isLoading={isLoading}
        />
      </VStack>
      <VStack alignItems="center" px="12">
        <Text mt="12" mb={4} fontFamily="body" fontSize="sm" color="gray.200">
          Já tem uma conta?
        </Text>
        <Button
          title="Ir para o login"
          mb="16"
          variant="terciary"
          onPress={() => navigate('signIn')}
        />
      </VStack>
    </ScrollView>
  );
}
