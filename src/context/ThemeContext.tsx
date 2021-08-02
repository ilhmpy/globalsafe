import React, { FC, ReactNode, useCallback, useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../theme/theme';

type Context = {
  theme: string;
  toggleTheme: () => void;
};

export const ThemeContext = React.createContext<Context>({
  theme: 'light',
  toggleTheme: () => undefined,
});

export const ThemesProvider: FC = ({ children }: any) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      localStorage.setItem('theme', 'light');
    }
  };

  useEffect(() => {
    if (theme == "light") {
      setTheme("light");
    } else {
      setTheme("dark");
    };
  });

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
    </ThemeProvider>
  );
};
