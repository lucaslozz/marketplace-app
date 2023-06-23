import { ReactNode, createContext } from 'react';

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

interface UserContextProviderProps {
  children: ReactNode;
}

interface UserContextDataProps {
  user: UserData | null;
  loadingUser: boolean;
  saveUser: (data: UserData) => void;
  removeUser: () => void;
}

const UserContext = createContext<UserContextDataProps>(
  {} as UserContextDataProps,
);
export { User, UserData, UserContextProviderProps, UserContext };
