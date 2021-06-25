import { useState } from "react";

export const useLocalStorage = (key, initialValue, isReset) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // 通过key拿之前存的数据
      const item = localStorage.getItem(key);
      // 有数据
      if(item && !isReset) {
        return JSON.parse(item);
      }
      else {
        if(isReset) {
          // isReset是用来清楚localstorage上的数据
          localStorage.removeItem(key);
        }
        // 初始值有可能是函数
        return typeof initialValue === "function" ? initialValue() : initialValue
      }
    }
    catch (error) {
      console.log(error);
      return typeof initialValue === "function" ? initialValue() : initialValue;
    }
  });
  // 存数据
  const setValue = (value) => {
    try {
      // 改state
      setStoredValue(value);
      // 数据存到localStorage
      localStorage.setItem(key, JSON.stringify(value))
    }
    catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}