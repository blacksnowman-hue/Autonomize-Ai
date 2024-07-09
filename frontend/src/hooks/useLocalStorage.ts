import { useState, useEffect, useCallback } from 'react';

export const useLocalStorage = <T>(key: string, initialValue: T): [T, (value: T) => void] => {

  const [storedValue, setStoredValue] = useState<T>(
    () => {
      try {
        const item = window.localStorage.getItem(key);

        return item ? JSON.parse(item) : initialValue;

      } catch (error) {
        console.error(error);
        return initialValue;
      }
    }
  );

  useEffect(() => {
    const item = window.localStorage.getItem(key);

    if (item !== JSON.stringify(storedValue)) {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    }

  }, [key, storedValue]);

  // const setValue = (value: T) => {
  //   try {
  //     setStoredValue(value);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const setValue = useCallback((value: T) => {
    setStoredValue(value);
  }, []);

  return [storedValue, setValue];
};