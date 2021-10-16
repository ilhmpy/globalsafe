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
  isFailed: boolean | null;
  chosenMethod: any;
  setChosenMethod: (state: any) => void;
  loan: any[] | null;
  chosenDepositView: any;
  selectedDeposit: any;
  setChosenDepositView: (object: any) => void;
  setSelectedDeposit: (object: any) => void;
  userSafeId?: string | undefined;
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
  isFailed: null,
  chosenMethod: {},
  setChosenMethod: () => undefined,
  loan: null,
  setChosenDepositView: () => undefined,
  setSelectedDeposit: () => undefined,
  selectedDeposit: {},
  chosenDepositView: {},
  userSafeId: undefined,
});

export const HubProvider: FC = ({ children }: any) => {
  const history = useHistory();
  const [hubConnection, setHubConnection] = useState<Nulable<signalR.HubConnection>>(null);
  const [user, setUser] = useState<null | string | false>(null);
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState<null | number>(null);
  const [isAdmin, setIsAdmin] = useState<null | boolean>(null);
  const [myToken, setMyToken] = useLocalStorage('token');
  const [balanceList, setBalanceList] = useState<BalanceList[] | null>(null);
  const [isFailed, setIsFailed] = useState<boolean | null>(null);
  const [chosenMethod, setChosenMethod] = useState<any>({});
  const [loan, setLoan] = useState<any[] | null>(null);
  const { i18n } = useTranslation();
  const [chosenDepositView, setChosenDepositView] = useState({});
  const [selectedDeposit, setSelectedDeposit] = useState({});
  const [userSafeId, setUserSafeId] = useState<string | undefined>(undefined);

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
        if (window.location.pathname == '/tech') {
          setIsFailed(false);
        }
      })
      .catch((e: Error) => {
        console.error(e);
        setMyToken('');
        console.log(e);
        setIsFailed(true);
        setUser(false);
        setUserSafeId(undefined);
      });

    return () => {
      if (hubConnection !== null) {
        hubConnection.stop();
      }
    };
  }, [myToken]);

  useEffect(() => {
    const cb = (data: any) => {
      if (balanceList) {
        const idx = balanceList.findIndex((item: any) => item.safeId === data.safeId);
        if (idx !== -1) {
          setBalanceList([...balanceList.slice(0, idx), data, ...balanceList.slice(idx + 1)]);
        } else {
          setBalanceList([...balanceList, data]);
        }
      }
      if (data.balanceKind === 1) {
        setBalance(data.volume);
      }
    };

    if (hubConnection) {
      hubConnection.on('BalanceUpdate', cb);
    }
    return () => {
      hubConnection?.off('BalanceUpdate', cb);
    };
  }, [hubConnection, balanceList]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke('GetSigned')
        .then((res) => {
          console.log('GetSigned', res);
          setUser(res.name);
          setUserSafeId(res.safeId);
          setLoading(false);
          if (res.balances.length) {
            const newArr = res.balances.filter((item: any) => item.balanceKind === 1);
            setBalance(newArr[0].volume);
            setLoan(res.loanBalances);

            if (!localStorage.getItem('i18nextLng')) {
              i18n.changeLanguage(res.languageCode === 1 ? 'ru' : 'en');
            }
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
          setUserSafeId(undefined);
          setIsAdmin(false);
          setLoading(false);
        });
    }
    return () => {
      if (hubConnection !== null) {
        hubConnection.stop();
      }
    };
  }, [hubConnection, myToken]);

  const logOut = () => {
    setMyToken(null);
    setUser(null);
    setUserSafeId(undefined);
    setIsAdmin(false);
    // history.push('/');
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
        isFailed,
        chosenMethod,
        setChosenMethod,
        loan,
        chosenDepositView,
        setChosenDepositView,
        setSelectedDeposit,
        selectedDeposit,
        userSafeId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
