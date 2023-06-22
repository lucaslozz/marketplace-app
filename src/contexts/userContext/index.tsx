import { createContext, useEffect, useState } from 'react';

import * as T from './types';
import { getStorage } from '../../storage/storage';
import { user_storage } from '../../storage/storageConfig';

export function UserContextProvider({ children }: T.UserContextProviderProps) {
  const [user, setUser] = useState<T.UserData | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);

  function saveUser(user: T.UserData) {
    setUser(user);
  }

  useEffect(() => {
    async function fetchStoredUser() {
      try {
        setLoadingUser(true);
        const storedUser = await getStorage(user_storage);
        if (storedUser) {
          setUser(storedUser);
        }
      } catch (error) {
        throw error;
      } finally {
        setLoadingUser(false);
      }
    }

    fetchStoredUser();
  }, []);

  return (
    <T.UserContext.Provider value={{ user, loadingUser, saveUser }}>
      {children}
    </T.UserContext.Provider>
  );
}
