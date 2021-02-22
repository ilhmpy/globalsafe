import { useState, useEffect } from "react";
export default (key: string, initialValue: any = "") => {
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

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyODUyODExMzgxMTU2MDg1NzYiLCJ1bmlxdWVfbmFtZSI6InN0ZWxsYTEiLCJlbWFpbCI6IiIsIm5iZiI6MTYxMzkzMzkxMywiZXhwIjoxNjIxNjIzNTEzLCJpYXQiOjE2MTM5MzM5MTN9.yr9i-GiMELpdz0_kIRZLGu6SEjy6jn2ExqDaAQ6BJKI
