import { useState, useEffect } from "react";

export default function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error reading from localStorage for key "${key}":`, error);
            return initialValue;
        }
    });
  
    useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    }, [storedValue, key]);
  
    return [storedValue, setStoredValue];
  }
  