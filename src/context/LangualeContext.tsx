import React, { FC, useState } from 'react';

type Context = {
  lang: string;
  setLang: (str: string) => void;
};

export const LangualeContext = React.createContext<Context>({
  lang: localStorage.getItem('i18nextLng') || 'ru',
  setLang: () => undefined,
});

export const LangualeProvider: FC = ({ children }: any) => {
  const [lang, setLang] = useState(localStorage.getItem('i18nextLng') || 'ru');

  return <LangualeContext.Provider value={{ lang, setLang }}>{children}</LangualeContext.Provider>;
};
