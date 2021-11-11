import * as signalR from '@microsoft/signalr';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { API_URL } from '../constantes/api';
import useLocalStorage from '../hooks/useLocalStorage';
import useWindowSize from '../hooks/useWindowSize';
import { getMyRating } from '../Pages/PrivateArea/utils';
import { BalanceList } from '../types/balance';
import { ViewExchangeModel } from '../types/exchange';
import { NotifyItem } from '../constantes/notifies';

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
  account: any;
  userSafeId: string | null;
  setDepositsFilter: (depositsFilter: 'active' | 'archived' | 'hold') => void;
  depositsFilter: string;
  userRating: string;
  screen: number;
  addDrawModalOpen: boolean;
  setAddDrawModalOpen: (addDrawModal: boolean) => void;
  notifies: NotifyItem[];
  setNotifies: (val: any) => void; 
  checkeds: boolean;
  setCheckeds: (val: boolean) => any;
  onNotify: (id: string) => void;
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
  account: {},
  userSafeId: null,
  setDepositsFilter: () => undefined,
  depositsFilter: '',
  userRating: '0.0',
  screen: 1600,
  addDrawModalOpen: false,
  setAddDrawModalOpen: () => undefined,
  notifies: [],
  setNotifies: (val: NotifyItem[]) => undefined,
  checkeds: false,
  setCheckeds: (val: boolean) => undefined,
  onNotify: (id: string) => undefined,
});

export const HubProvider: FC = ({ children }: any) => {
  const history = useHistory();
  const [hubConnection, setHubConnection] = useState<Nulable<signalR.HubConnection>>(null);
  const [user, setUser] = useState<null | string | false>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [balance, setBalance] = useState<null | number>(null);
  const [isAdmin, setIsAdmin] = useState<null | boolean>(null);
  const [myToken, setMyToken] = useLocalStorage('token');
  const [balanceList, setBalanceList] = useState<BalanceList[] | null>(null);
  const [userSafeId, setUserSafeId] = useState<null | string>(null);
  const [isFailed, setIsFailed] = useState<boolean | null>(null);
  const [chosenMethod, setChosenMethod] = useState<any>({});
  const [loan, setLoan] = useState<any[] | null>(null);
  const { i18n } = useTranslation();
  const [chosenDepositView, setChosenDepositView] = useState({});
  const [selectedDeposit, setSelectedDeposit] = useState({});
  const [account, setAccount] = useState<any>({});
  const [depositsFilter, setDepositsFilter] = useState<'active' | 'archived' | 'hold'>('active');
  const [userRating, setUserRating] = useState('0.0');
  const screen = useWindowSize();
  const [addDrawModalOpen, setAddDrawModalOpen] = useState<boolean>(false);
  const [notifies, setNotifies] = useState<NotifyItem[]>([]);
  const [checkeds, setCheckeds] = useState<boolean>(false);

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
        setUser('');
      });

    // return function cleanup() {
    //   if (hubConnection !== null) {
    //     hubConnection.stop();
    //   }
    // };
  }, [myToken]);

  useEffect(() => {
    const cb = (data: any) => {
      console.log('BalanceUpdate', data);
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
    const cbUserRated = (rating: string, mark: string) => {
      console.log('SOKET_UserRated__rating', rating);
      setUserRating(Number(rating).toFixed(1));
    };

    if (hubConnection) {
      hubConnection.on('UserRated', cbUserRated);
    }

    return () => {
      hubConnection?.off('UserRated', cbUserRated);
    };
  }, [hubConnection, userRating]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke('GetSigned')
        .then((res) => {
          console.log('GetSigned', res);
          if (res.roles.length && res.roles[0].name === 'administrator') {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
          setUser(res.name);
          setAccount(res);
          setUserSafeId(res.safeId);
          setLoading(false);
          const rating = getMyRating(res);
          setUserRating(rating);
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
    // history.push('/');
  };

  const login = (token: string) => {
    setMyToken(token);
  };

  function getNotifies(loading = true) {
    if (hubConnection) {
      setLoading(loading);
      hubConnection
        .invoke('GetInAppNotifications', [0], 0, 100)
        .then((res) => {
          setCheckeds(res.collection.some((item: NotifyItem) => item.readState === 0));
          setNotifies(() =>
            res.collection
              .map((item: any) => {
                return { ...item, click: undefined };
              })
              .sort((x: any, y: any) => {
                const a = new Date(x.sentDate);
                const b = new Date(y.sentDate);
                return a > b ? -1 : a < b ? 1 : 0;
              })
          );
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }

  useEffect(() => {
    getNotifies();
  }, [hubConnection]);

  useEffect(() => {
    let cancel = false;
    if (hubConnection && !cancel) {
      hubConnection.on('InAppNotification', cb);
    }
    return () => {
      cancel = true;
      hubConnection?.off('InAppNotification', cb);
    };
  }, [hubConnection, notifies]);

  function cb(notify: NotifyItem) {
    setNotifies([notify, ...notifies]);
  };

  function changeHide(bool: boolean, id: string) {
    notifies.forEach((notify: any) => {
      if (notify.safeId === id) {
        notify.click = bool;
        setNotifies((items: any) => items.map((i: any) => i));
      };
    });
  };

  function onNotify(id: string) {
    changeHide(true, id);
    setTimeout(() => {
      changeHide(false, id);
      if (hubConnection) {
        hubConnection
          .invoke('SetStateInAppNotification', id, 1)
          .then(() => {
            getNotifies(false);
          })
          .catch((err) => console.error(err));
      }
    }, 500);
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
        account,
        userSafeId,
        setDepositsFilter,
        depositsFilter,
        userRating,
        screen,
        addDrawModalOpen,
        setAddDrawModalOpen,
        notifies,
        setNotifies,
        checkeds,
        setCheckeds,
        onNotify
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
