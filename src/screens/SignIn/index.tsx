import { useState } from 'react';

import { MaterialIcons } from '@expo/vector-icons';

import { Text, VStack, Pressable, Icon, ScrollView } from 'native-base';
import LogoSvg from '../../assets/LogoSvg.svg';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import sizes from 'native-base/lib/typescript/theme/base/sizes';

export function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
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
        <Input placeholder="E-mail" mb="4" />
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
          mb={8}
        />
        <Button title="Entrar" mb="16" />
      </VStack>
      <VStack alignItems="center" px="12">
        <Text mt="55" mb={4} fontFamily="body" fontSize="sm" color="gray.200">
          Ainda não tem acesso?
        </Text>
        <Button title="Criar uma conta" mb="16" variant="terciary" />
      </VStack>
    </ScrollView>
  );
}
