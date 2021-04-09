import React, { useContext, useState, FC, useEffect } from "react";

type Context = {
  lang: string;
  setLang: (str: string) => void;
};

export const LangualeContext = React.createContext<Context>({
  lang: localStorage.getItem("i18nextLng") || "ru",
  setLang: () => {},
});

export const LangualeProvider: FC = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem("i18nextLng") || "ru");

  console.log("gcfdgfhhfg", localStorage.getItem("i18nextLng"));
  return (
    <LangualeContext.Provider value={{ lang, setLang }}>
      {children}
    </LangualeContext.Provider>
  );
};