import { useState, useEffect } from "react";

export default function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.error(error);
        return initialValue;
      }
    });
  
    useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    }, [storedValue, key]);
  
    return [storedValue, setStoredValue];
  }
  