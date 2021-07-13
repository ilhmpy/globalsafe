import React, { useEffect, useState, useContext } from "react";
import GlobalStyle from "./globalStyles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Authentication, Register } from "./Pages/Auth";
import { Main } from "./Pages/Main/Main";
import { HubProvider } from "./context/HubContext";
import { Admin } from "./Pages/Admin";
import { ThemesProvider } from "./context/ThemeContext";
import { InfoMain } from "./Pages/PrivateArea";
import { Scrollbars } from "react-custom-scrollbars";
import { Id } from "./types/Id";
import { AppContext } from './context/HubContext';
import { APP_ID, APP_SAFARI_ID } from "./constantes/onesignal";

function App() {
  const [ token, setToken ] = useState(localStorage.getItem("token"));
  (window as any).OneSignal = (window as any).OneSignal || [];
  const OneSignal = (window as any).OneSignal;

  console.log(APP_ID, APP_SAFARI_ID)

  useEffect(() => {
    if (token) {
      OneSignal.push(() => OneSignal.init({
        appId: APP_ID,
        safari_web_id: APP_SAFARI_ID,
        notifyButton: {
          enable: true,
        },
      }));
    };
  }, []);

  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;

  interface OneSignalId {
    name: string;
    id: string;
  };

  const subscribe = (id: any) => {
    if (hubConnection) {
      hubConnection.invoke<OneSignalId>(
        "RegisterDevice",
        id
      ).then((res: any) => console.log(res))
       .catch((err) => console.log(err));
    };
  };

  const unSubscribe = (id: any) => {
    if (hubConnection) {
      hubConnection.invoke<OneSignalId>(
        "UnregisterDevice",
        id
      ).then((res: any) => console.log(res))
       .catch((err) => console.log(err));
    };
  };

  OneSignal.push(() => {
    OneSignal.on('subscriptionChange', (permissionChange: any) => {
        const currentPermission = permissionChange.to;
        if (currentPermission == "granted") OneSignal.getUserId((userId: any) => subscribe(userId));
        else OneSignal.getUserId((userId: any) => unSubscribe(userId));
      });
   });

  return (
    <Router>
      <HubProvider>
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
      </HubProvider>
    </Router>
  );
}

export default App;
