import { useEffect, useState } from 'react';

import { MaterialIcons } from '@expo/vector-icons';

import { Text, VStack, Pressable, Icon, ScrollView, Box } from 'native-base';
import LogoSvg from '../../assets/LogoSvg.svg';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useForm, Controller } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useLogin, { Body } from '../../services/requests/user/useLogin';
import { err } from 'react-native-svg/lib/typescript/xml';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRoutesProps } from '../../routes/auth.routes';
import { UserPhoto } from '../../components/UserPhoto';

import avatarDefault from '../../assets/avatarDefault.png';

import { EvilIcons } from '@expo/vector-icons';

type SignUpFormData = {
  name: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirmation: string;
};

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

  const { navigate } = useNavigation<AuthNavigatorRoutesProps>();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpSchema),
  });

  function handleSignUp({ email, password }: SignUpFormData) {
    console.log(email, password);
  }

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
          <UserPhoto
            source={avatarDefault}
            size={88}
            alt="Imagem de perfil do usuário"
          />

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
            onPress={() => {}}
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