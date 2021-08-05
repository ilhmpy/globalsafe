import React, { FC, useCallback, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Loader } from './components/Loader/Loader';
import { APP_ID, APP_SAFARI_ID } from './constantes/onesignal';
import { AppContext } from './context/HubContext';
import GlobalStyle from './globalStyles';
import { Admin } from './Pages/Admin';
import { Authentication, Register } from './Pages/Auth';
import { Main } from './Pages/Main/Main';
import { InfoMain } from './Pages/PrivateArea';
import PageNotFound from './Pages/Tech/PageNotFound';
import TechWorks from './Pages/Tech/TechWorks';
declare global {
  interface Window {
    OneSignal: any;
  }
}
const App: FC = () => {
  const token = localStorage.getItem('token');
  window.OneSignal = window.OneSignal || [];

  const OneSignal = window.OneSignal;

  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const user = appContext.user;
  const isFailed = appContext.isFailed;
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
    if (token && user) {
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
                'tip.state.unsubscribed': t('text.tip_state_unsubscribed'),
                'tip.state.subscribed': t('text.tip_state_subscribed'),
                'tip.state.blocked': t('text.tip_state_blocked'),
                'message.prenotify': t('text.message_prenotify'),
                'message.action.subscribed': t('text.message_action_subscribed'),
                'message.action.resubscribed': t('text.message_action_resubscribed'),
                'message.action.unsubscribed': t('text.message_action_unsubscribed'),
                'dialog.main.title': t('text.dialog_main_title'),
                'dialog.main.button.subscribe': t('text.dialog_main_button_subscribe'),
                'dialog.main.button.unsubscribe': t('text.dialog_main_button_unsubscribe'),
                'dialog.blocked.title': t('text.dialog_blocked_title'),
                'dialog.blocked.message': t('text.dialog_blocked_message'),
              },
            },
          });
          try {
            OneSignal.on('subscriptionChange', (isSubscribed: boolean) => {
              console.log('OneSignal.on ~ isSubscribed', isSubscribed);
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
  }, [user]);
  
  useEffect(() => {
    if (isFailed != null) {
      if (isFailed && window.location.pathname != "/tech") {
        window.location.href = "/tech";
      };

      if (isFailed == false) {
        window.location.href = "/";
      }
    };
  }, [isFailed]);

  if (user != null) { 
    return (
      <Router>
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
              <Route path="/tech" component={TechWorks} />
              <Route component={PageNotFound} />
           </Switch>
        </div>
      </Router>
    );
  } else return <Loader /> 
};

export default App;
