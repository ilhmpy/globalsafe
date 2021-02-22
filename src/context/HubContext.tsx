import React, { FC, useCallback, useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { API_URL } from "../constantes/api";
import useLocalStorage from "../hooks/useLocalStorage";
import { useHistory } from "react-router-dom";

type Nulable<T> = T | null;

export const AppContext = React.createContext<any>({
  hubConnection: null,
  user: null,
  logOut: () => {},
  loading: true,
});

export const HubProvider: FC = ({ children }) => {
  const [hubConnection, setHubConnection] = useState<
    Nulable<signalR.HubConnection>
  >(null);
  const [user, setUser] = useState<null | string | false>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [myToken, setMyToken] = useLocalStorage("token");
  const history = useHistory();

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
      .catch();
  }, [myToken]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke("GetSigned")
        .then((res) => {
          console.log("GetSigned", res.name);
          setUser(res.name);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setUser(false);
        });
    }
    return function cleanup() {
      if (hubConnection !== null) {
        hubConnection.stop();
      }
    };
  }, [hubConnection]);

  const logOut = () => {
    setMyToken(null);
    setUser(null);
    history.replace("/");
    console.log("logout");
  };

  console.log("user", user);

  return (
    <AppContext.Provider value={{ hubConnection, user, logOut, loading }}>
      {children}
    </AppContext.Provider>
  );
};
