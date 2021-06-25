import { useState } from "react";

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // get previous storedValue from local storage by key
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    }
    catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      // save state
      setStoredValue(value);
      // save localstorage
      localStorage.setItem(key, JSON.stringify(value))
    }
    catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}