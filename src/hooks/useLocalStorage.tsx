import { useState, useEffect } from 'react';

export default (key: string, initialValue: any = ''): any[] => {
  const [value, setValue] = useState(() => {
    return localStorage.getItem(key) || initialValue;
  });

  useEffect(() => {
    if (key && value) {
      localStorage.setItem(key, value);
    } else {
      localStorage.removeItem(key);
    }
  }, [value, key]);

  return [value, setValue];
};
