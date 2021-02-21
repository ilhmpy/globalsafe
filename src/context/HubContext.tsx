import React, { FC, useCallback, useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

type Nulable<T> = T | null;
//"https://dev.globalsafe.me/api";
const APIURL = "https://dev.globalsafe.me/api/accounts";

export const AppContext = React.createContext<any>({
  hubConnection: null,
});

export const HubProvider: FC = ({ children }) => {
  const [hubConnection, setHubConnection] = useState<
    Nulable<signalR.HubConnection>
  >(null);

  useEffect(() => {
    const hubConnection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Debug)
      .withUrl(APIURL, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
        accessTokenFactory: () => localStorage.getItem("token") || "",
      })
      .withAutomaticReconnect()
      .build();

    hubConnection
      .start()
      .then(() => {
        setHubConnection(hubConnection);
      })
      .catch();
  }, []);

  console.log("hubConnection", hubConnection);

  return (
    <AppContext.Provider value={{ hubConnection }}>
      {children}
    </AppContext.Provider>
  );
};
