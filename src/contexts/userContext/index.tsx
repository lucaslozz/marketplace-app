import { createContext, useEffect, useState } from 'react';

import * as T from './types';
import { getStorage, removeStorage, saveStorage } from '../../storage/storage';
import { user_storage } from '../../storage/storageConfig';

export function UserContextProvider({ children }: T.UserContextProviderProps) {
  const [user, setUser] = useState<T.UserData | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);

  function saveUser(user: T.UserData) {
    try {
      setLoadingUser(true);

      setUser(user);
      saveStorage(user_storage, user);
    } catch (error) {
    } finally {
      setLoadingUser(false);
    }
  }

  async function removeUser() {
    try {
      setLoadingUser(true);
      setUser(null);
      await removeStorage(user_storage);
    } catch (error) {
      throw error;
    } finally {
      setLoadingUser(false);
    }
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
    <T.UserContext.Provider value={{ user, loadingUser, saveUser, removeUser }}>
      {children}
    </T.UserContext.Provider>
  );
}
