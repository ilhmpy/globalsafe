import moment from 'moment';
import { FC, useContext, useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { NotifyItem } from '../../../constantes/notifies';
import { AppContext } from '../../../context/HubContext';
import { InBlockLoading } from '../../UI/V4/InBlockLoading/InBlockLoading';
import * as Table from '../../UI/V4/TableItems';
import * as Notifies from './Notify.styles';

type NotifyProps = {
  block: boolean;
  auth?: boolean;
  admin?: boolean;
  setCheckeds: (bool: boolean) => void;
  setBlock: (bool: boolean) => void;
};

export const Notify: FC<NotifyProps> = ({
  block,
  auth,
  admin,
  setCheckeds,
  setBlock,
}: NotifyProps) => {
  const [notifies, setNotifies] = useState<NotifyItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;

  function cb(notify: NotifyItem) {
    getNotifies(false);
  }

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
    if (hubConnection) {
      hubConnection.on('InAppNotification', cb);
    }
    return () => {
      hubConnection?.off('InAppNotification', cb);
    };
  }, [hubConnection]);

  useEffect(() => {
    getNotifies();
  }, [hubConnection, block]);

  function changeHide(bool: boolean, id: string) {
    notifies.forEach((notify: any) => {
      if (notify.safeId === id) {
        notify.click = bool;
        setNotifies((items) => items.map((i) => i));
      }
    });
  }

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
  }

  function getLinkAddress(link: string, kind: number) {
    if (kind === 20 || kind === 21 || kind === 22) {
      return `/info/p2p-changes/${link}`;
    }
  }

  function link(kind: number) {
    return kind === 20 || kind === 21 || kind === 22;
  }

  return (
    <Notifies.NotifiesBlock
      block={block}
      admin={admin}
      empty={!loading && notifies.length === 0}
      inPA={window.location.pathname.indexOf('info') === 1}
      load={loading}
      onMouseLeave={() => setBlock(false)}
    >
      {loading ? (
        <InBlockLoading />
      ) : (
        <>
          {notifies && notifies.length ? (
            <Scrollbars
              style={{ width: '100%', height: '100%' }}
              renderThumbVertical={(props) => <Notifies.Scrollbar {...props}></Notifies.Scrollbar>}
            >
              {notifies &&
                notifies.map((notify: any, idx: number) => (
                  <Notifies.Notify
                    click={notify.click}
                    notChecked={notify.readState === 0}
                    key={idx}
                  >
                    <Notifies.NotifyItem grey>
                      {moment(notify.sentDate).format('DD.MM.YYYY')} в{' '}
                      {moment(notify.sentDate).format('HH:MM')}
                    </Notifies.NotifyItem>
                    <Notifies.NotifyItem bold>{notify.subject}</Notifies.NotifyItem>
                    <Notifies.NotifyItem>{notify.message}</Notifies.NotifyItem>
                    {link(notify.notificationKind) && notify.link != '' && notify.link != '0' && (
                      <Table.LinkButton
                        style={{ marginTop: '10px' }}
                        href={getLinkAddress(notify.link, notify.notificationKind)}
                      >
                        Перейти к обмену
                      </Table.LinkButton>
                    )}
                    <Notifies.DoneNotify onClick={() => onNotify(notify.safeId)} />
                  </Notifies.Notify>
                ))}
            </Scrollbars>
          ) : (
            <Notifies.Notify empty notChecked={false} notclb>
              <Notifies.NotifyItem notclb>Непрочитанных уведомлений пока нет</Notifies.NotifyItem>
            </Notifies.Notify>
          )}
        </>
      )}
    </Notifies.NotifiesBlock>
  );
};
