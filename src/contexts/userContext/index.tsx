import { createContext, useState } from 'react';

import * as T from './types';

export function UserContextProvider({ children }: T.UserContextProviderProps) {
  const [user, setUser] = useState<T.UserData | null>(null);

  function saveUser(user: T.UserData) {
    setUser(user);
  }

  return (
    <T.UserContext.Provider value={{ user, saveUser }}>
      {children}
    </T.UserContext.Provider>
  );
}
