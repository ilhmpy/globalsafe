import React, { FC, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from '../theme/theme';

type Context = {
  theme: string;
  toggleTheme: () => void;
};

export const ThemeContext = React.createContext<Context>({
  theme: 'light',
  toggleTheme: () => undefined,
});

export const ThemesProvider: FC = ({ children }) => {
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

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
    </ThemeProvider>
  );
};
