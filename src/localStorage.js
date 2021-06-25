import { useState } from "react";

export const useLocalStorage = (key, initialValue, isReset) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // get previous storedValue from local storage by key
      const item = localStorage.getItem(key);
      if(item && !isReset) {
        return JSON.parse(item)
      }
      else {
        if(isReset) {
          localStorage.removeItem(key)
        }
        return typeof initialValue === "function" ? initialValue() : initialValue
      }
    }
    catch (error) {
      console.log(error);
      return typeof initialValue === "function" ? initialValue() : initialValue;
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