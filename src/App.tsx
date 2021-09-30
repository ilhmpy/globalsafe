import { FC, useCallback, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { APP_ID, APP_SAFARI_ID } from './constantes/onesignal';
import { AppContext } from './context/HubContext';
import GlobalStyle from './globalStyles';
import { Admin } from './Pages/Admin';
import { Authentication, Register } from './Pages/Auth';
import { Main } from './Pages/Main/Main';
import { InfoMain } from './Pages/PrivateArea';
import PageNotFound from './Pages/Tech/PageNotFound';
import TechWorks from './Pages/Tech/TechWorks';
import { HistoryOperations } from "./Pages/PrivateArea/HistoryOperations"; 
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
  const [isSubscribed, setIsSubscribed] = useState(false);
  const isFailed = appContext.isFailed;
  const [online, setOnline] = useState<boolean | null>(null);
  const { t } = useTranslation();
  useEffect(() => {
    setOnline(navigator.onLine);
  }, []);

  window.addEventListener('online', onlineState);
  window.addEventListener('offline', onlineState);

  function onlineState() {
    setOnline(window.navigator.onLine);
    console.log('online update state event working, and set online/offline status');
  }

  useEffect(() => {
    if (isFailed != null) {
      if (online && window.location.pathname != '/tech') {
        console.log('user online but server not working');
        window.location.href = '/tech';
      }

      if (!online && window.location.pathname == '/tech') {
        console.log('user offline');
        window.location.href = '/';
      }

      if (isFailed == false && window.location.pathname == '/tech') {
        window.location.href = '/';
      }
    }
  }, [isFailed, navigator.onLine]);

  const subscribe = useCallback(
    (id: string) => {
      if (hubConnection) {
        hubConnection
          .invoke('RegisterDevice', id)
          .then(() => setIsSubscribed(true))
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
          .then(() => setIsSubscribed(false))
          .catch((err) => console.log(err));
      }
    },
    [hubConnection]
  );

  const activateBellPush = () => {
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
  };

  useEffect(() => {
    if (token && user) {
      activateBellPush();
    }
  }, [token, user]);

  // useEffect(() => {
  //   if (token && user) {
  //     if (!isSubscribed) {
  //       document.getElementsByClassName('onesignal-bell-launcher-message-body')[0].innerHTML = t(
  //         'text.tip_state_unsubscribed'
  //       );
  //       document.getElementsByClassName(
  //         'onesignal-bell-launcher-dialog-body'
  //       )[0].children[0].innerHTML = t('text.dialog_main_title');
  //       document.getElementsByClassName('action')[0].innerHTML = t(
  //         'text.dialog_main_button_subscribe'
  //       );
  //     } else {
  //       document.getElementsByClassName('onesignal-bell-launcher-message-body')[0].innerHTML = t(
  //         'text.tip_state_subscribed'
  //       );
  //       document.getElementsByClassName(
  //         'onesignal-bell-launcher-dialog-body'
  //       )[0].children[0].innerHTML = t('text.dialog_main_title');
  //       document.getElementsByClassName('action')[0].innerHTML = t(
  //         'text.dialog_main_button_unsubscribe'
  //       );
  //     }
  //   }
  // }, [localStorage.getItem('i18nextLng')]);

  return (
    <div style={{ position: 'relative' }}>
      <Router>
        <div className="App">
          <GlobalStyle /> 
 
          <Switch>
            <Route path="/" component={Main} exact />
            <Route path="/admin" component={Admin} />
            <Route path="/info" component={InfoMain} />
            <Route path="/login" component={Authentication} />
            <Route path="/register" component={Register} />
            <Route path="/tech" component={TechWorks} />
            <Route path="/404" component={PageNotFound} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
