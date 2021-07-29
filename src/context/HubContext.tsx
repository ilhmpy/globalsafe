import * as signalR from '@microsoft/signalr';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { API_URL } from '../constantes/api';
import useLocalStorage from '../hooks/useLocalStorage';
import { BalanceList } from '../types/balance';
type Nulable<T> = T | null;

type Context = {
  user: null | string | false;
  hubConnection: Nulable<signalR.HubConnection>;
  logOut: () => void;
  login: (token: string) => void;
  loading: boolean;
  balance: null | number;
  isAdmin: boolean | null;
  balanceList: BalanceList[] | null;
};

export const AppContext = React.createContext<Context>({
  hubConnection: null,
  user: null,
  logOut: () => undefined,
  login: () => undefined,
  loading: true,
  balance: null,
  isAdmin: null,
  balanceList: null,
});

export const HubProvider: FC = ({ children }: any) => {
  const [hubConnection, setHubConnection] = useState<Nulable<signalR.HubConnection>>(null);
  const [user, setUser] = useState<null | string | false>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [balance, setBalance] = useState<null | number>(null);
  const [isAdmin, setIsAdmin] = useState<null | boolean>(null);
  const [myToken, setMyToken] = useLocalStorage('token');
  const [balanceList, setBalanceList] = useState<BalanceList[] | null>(null);
  const history = useHistory();
  const { i18n } = useTranslation();

  useEffect(() => {
    const hubConnection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Debug)
      .withUrl(`${API_URL}/accounts`, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
        accessTokenFactory: () => myToken,
      })
      .withAutomaticReconnect()
      .build();

    hubConnection
      .start()
      .then(() => {
        setHubConnection(hubConnection);
      })
      .catch((e) => {
        setMyToken('');
        console.log(e);
      });
  }, [myToken]);
  console.log('balanceList', balanceList);
  useEffect(() => {
    if (hubConnection) {
      hubConnection.on('BalanceUpdate', (data) => {
        console.log('BalanceUpdate', data);
        if (balanceList) {
          const idx = balanceList.findIndex((item) => item.balanceKind === data.balanceKind);
          setBalanceList([...balanceList.slice(0, idx), data, ...balanceList.slice(idx + 1)]);
        }
        if (data.balanceKind === 1) {
          setBalance(data.volume);
        }
      });
      hubConnection
        .invoke('GetSigned')
        .then((res) => {
          console.log('GetSigned', res);
          setUser(res.name);
          setLoading(false);
          if (res.balances.length) {
            const newArr = res.balances.filter((item: any) => item.balanceKind === 1);
            setBalance(newArr[0].volume);

            i18n.changeLanguage(res.languageCode === 1 ? 'ru' : 'en');
            const balanceList = res.balances.map((item: any) => ({
              balanceKind: item.balanceKind,
              volume: item.volume,
            }));
            setBalanceList(res.balances);
          }
          if (res.roles.length && res.roles[0].name === 'administrator') {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setUser(false);
          setIsAdmin(false);
          setLoading(false);
        });
    }
    return function cleanup() {
      if (hubConnection !== null) {
        hubConnection.stop();
      }
    };
  }, [hubConnection, myToken]);

  const logOut = () => {
    setMyToken(null);
    setUser(null);
    setIsAdmin(false);
    // history.replace('/');
  };

  const login = (token: string) => {
    setMyToken(token);
  };

  return (
    <AppContext.Provider
      value={{
        hubConnection,
        user,
        logOut,
        loading,
        login,
        balance,
        isAdmin,
        balanceList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
