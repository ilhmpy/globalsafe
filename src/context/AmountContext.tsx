import React, { FC, useEffect, useState, useContext } from "react";
import { AppContext } from "./HubContext";

type Context = {
  totalPayed: number;
  depositTotal: number;
};

export const AmountContext = React.createContext<Context>({
  totalPayed: 0,
  depositTotal: 0,
});

export const AmountProvider: FC = ({ children }) => {
  const [totalPayed, setTotalPayed] = useState(0);
  const [depositTotal, setDepositTotal] = useState(0);
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke("GetTotalPayedAmount")
        .then((res) => {
          setTotalPayed(res);
        })
        .catch((err: Error) => console.log(err));
    }
  }, [hubConnection]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke("GetTotalDepositsAmount")
        .then((res) => {
          setDepositTotal(res);
        })
        .catch((err: Error) => console.log(err));
    }
  }, [hubConnection]);

  return (
    <AmountContext.Provider value={{ totalPayed, depositTotal }}>
      {children}
    </AmountContext.Provider>
  );
};
