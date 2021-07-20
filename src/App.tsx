import React, { useEffect, useState, useContext, useCallback } from "react";
import GlobalStyle from "./globalStyles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Authentication, Register } from "./Pages/Auth";
import { Main } from "./Pages/Main/Main";
import { Admin } from "./Pages/Admin";
import { ThemesProvider } from "./context/ThemeContext";
import { InfoMain } from "./Pages/PrivateArea";
import { Scrollbars } from "react-custom-scrollbars";
import { Id } from "./types/Id";
import { AppContext } from './context/HubContext';
import { Loader } from "./components/Loader/Loader";
import useLocalStorage  from "./hooks/useLocalStorage";
import { APP_ID, APP_SAFARI_ID } from "./constantes/onesignal";

function App() {
  const [ token, setToken ] = useLocalStorage("token");
  (window as any).OneSignal = (window as any).OneSignal || [];
  const OneSignal = (window as any).OneSignal;

  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const user = appContext.user;

  const subscribe = useCallback((id: string) => {
     if (hubConnection) {
      hubConnection.invoke(
          "RegisterDevice",
           id
         ).then(() => {})
          .catch((err) => console.log(err));
      };
   }, [hubConnection]);

   const unSubscribe = useCallback((id: string) => {
      if (hubConnection) {
        hubConnection.invoke(
            "UnregisterDevice",
            id
        ).then(() => {})
         .catch((err) => console.log(err));
      };
    }, [hubConnection]);

  useEffect(() => {
    console.log(hubConnection)
    console.log(token);
    if (token && hubConnection) {
      console.log(token);
      try {
        OneSignal.push(() => {
          OneSignal.SERVICE_WORKER_PARAM = { scope: "/push/onesignal/" };
          OneSignal.SERVICE_WORKER_PATH = "push/onesignal/OneSignalSDKWorker.js";
          OneSignal.SERVICE_WORKER_UPDATER_PATH = "push/onesignal/OneSignalSDKUpdaterWorker.js";
          OneSignal.init({
            appId: APP_ID,
            safari_web_id: APP_SAFARI_ID,
            notifyButton: {
              enable: true,
            },
          });
          try {
            OneSignal.on('subscriptionChange', (isSubscribed: boolean) => {
              if (isSubscribed) {
                OneSignal.getUserId((id: string) => subscribe(id));
              } else {
                OneSignal.getUserId((id: string) => unSubscribe(id));
              };
            });
          } catch(e) {
            console.error("onesignal event loop error", e);
          };
        });
      } catch(e) {
        console.error(e)
      };
    };
  }, [token, hubConnection]);

  if (user != null) {
    return (
      <Router>
        <ThemesProvider>
            {/* <div style={{ height: "100vh" }}>
                <Scrollbars style={{ height: "100%", width: "100%" }}> */}
            <div className="App">
              <GlobalStyle />
              <Switch>
                <Route path="/" component={Main} push={OneSignal.push} on={OneSignal.on} getUserId={OneSignal.getUserId} exact />
                <Route path="/admin" component={Admin} />
                <Route path="/info" component={InfoMain} />
                <Route path="/login" component={Authentication} />
                <Route path="/register" component={Register} />
                <Route component={Main} />
              </Switch>
              {/* </div>
                </Scrollbars> */}
            </div>
         </ThemesProvider>
      </Router>
    );
  } else return <Loader />
}

export default App;
