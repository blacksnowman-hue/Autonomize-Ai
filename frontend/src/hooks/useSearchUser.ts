
import { useEffect } from 'react';

import { useLocalStorage } from './useLocalStorage';
import { useGetUserQuery } from '../features/userAPI';

export const useSearchUser = (username?: string) => {

  const [storedUsername, setStoredUsername] = useLocalStorage('username', 'mralexgray');


  const { data: user, isLoading, isError } =
    useGetUserQuery(
      username || storedUsername,
      { skip: !username && !storedUsername, }
    );

  useEffect(() => {

    if (user) {
      setStoredUsername(user.login);
    }

  }, [user, setStoredUsername]);

  const handleSearch = (newUsername: string) => {
    setStoredUsername(newUsername);
  };

  return { user, isLoading, isError, handleSearch };
};