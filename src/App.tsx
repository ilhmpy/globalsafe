import React, { useEffect, useState, useContext, useCallback } from 'react';
import GlobalStyle from './globalStyles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Authentication, Register } from './Pages/Auth';
import { Main } from './Pages/Main/Main';
import { Admin } from './Pages/Admin';
import { ThemesProvider } from './context/ThemeContext';
import { InfoMain } from './Pages/PrivateArea';
import { Scrollbars } from 'react-custom-scrollbars';
import { Id } from './types/Id';
import { AppContext } from './context/HubContext';
import { Loader } from './components/Loader/Loader';
import useLocalStorage from './hooks/useLocalStorage';
import { useTranslation } from 'react-i18next';
import { APP_ID, APP_SAFARI_ID } from './constantes/onesignal';
import PageNotFound  from "./Pages/Tech/PageNotFound";
import TechWorks from "./Pages/Tech/TechWorks";

function App() {
  const token = localStorage.getItem('token');
  (window as any).OneSignal = (window as any).OneSignal || [];
  const OneSignal = (window as any).OneSignal;

  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const user = appContext.user;
  const { t } = useTranslation();

  const subscribe = useCallback(
    (id: string) => {
      if (hubConnection) {
        hubConnection
          .invoke('RegisterDevice', id)
          .then(() => undefined)
          .catch((err) => console.log(err));
      }
    },
    [hubConnection]
  );

  const unSubscribe = useCallback(
    (id: string) => {
      if (hubConnection) {
        hubConnection
          .invoke('UnregisterDevice', id)
          .then(() => undefined)
          .catch((err) => console.log(err));
      }
    },
    [hubConnection]
  );

  useEffect(() => {
    console.log("initialize", t("text.tip_state_unsubscribed"))
    if (token && user) {
      console.log('token', token);
      try {
        OneSignal.push(() => {
          OneSignal.SERVICE_WORKER_PARAM = { scope: '/push/onesignal/' };
          OneSignal.SERVICE_WORKER_PATH = 'push/onesignal/OneSignalSDKWorker.js';
          OneSignal.SERVICE_WORKER_UPDATER_PATH = 'push/onesignal/OneSignalSDKUpdaterWorker.js';
          OneSignal.init({
            appId: APP_ID,
            safari_web_id: APP_SAFARI_ID,
            notifyButton: {
              enable: true,
              text: {
                "tip.state.unsubscribed": t("text.tip_state_unsubscribed"),
                "tip.state.subscribed": t("text.tip_state_subscribed"),
                "tip.state.blocked": t("text.tip_state_blocked"),
                "message.prenotify": t("text.message_prenotify"),
                "message.action.subscribed": t("text.message_action_subscribed"),
                "message.action.resubscribed": t("text.message_action_resubscribed"),
                "message.action.unsubscribed": t("message_action_unsubscribed"),
                "dialog.main.title": t("text.dialog_main_title"),
                "dialog.main.button.subscribe": t("text.dialog_main_button_subscribe"),
                "dialog.main.button.unsubscribe": t("text.dialog_main_button_unsubscribe"),
                "dialog.blocked.title": t("text.dialog_blocked_title"),
                "dialog.blocked.message": t("text.dialog_blocked_message")
              }
            },
          });
          try {
            OneSignal.on('subscriptionChange', (isSubscribed: boolean) => {
              if (isSubscribed) {
                OneSignal.getUserId((id: string) => subscribe(id));
              } else {
                OneSignal.getUserId((id: string) => unSubscribe(id));
              }
            });
          } catch (e) {
            console.error('onesignal event loop error', e);
          }
        });
      } catch (e) {
        console.error(e);
      }
    }
  }, [token, t]);

  if (user != null) {
    return (
      <Router>
        <ThemesProvider>
          {/* <div style={{ height: "100vh" }}>
                <Scrollbars style={{ height: "100%", width: "100%" }}> */}
          <div className="App">
            <GlobalStyle />
            <Switch>
              <Route
                path="/"
                component={Main}
                push={OneSignal.push}
                on={OneSignal.on}
                getUserId={OneSignal.getUserId}
                exact
              />
              <Route path="/admin" component={Admin} />
              <Route path="/info" component={InfoMain} />
              <Route path="/login" component={Authentication} />
              <Route path="/register" component={Register} />
              {/* tech works route for testing */}
              <Route path="/tech" component={TechWorks} />
              <Route component={PageNotFound} />
            </Switch>
            {/* </div>
                </Scrollbars> */}
          </div>
        </ThemesProvider>
      </Router>
    );
  } else return <Loader />;
}

export default App;
