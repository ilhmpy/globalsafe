import * as Notifies from './Notify.styles';
import { FC, useState, useEffect, useContext } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import moment from 'moment';
import { AppContext } from '../../../context/HubContext';
import { InBlockLoading } from '../../UI/V4/InBlockLoading/InBlockLoading';
import { NotifyItem } from '../../../constantes/notifies';
import * as Table from '../../UI/V4/TableItems';

type NotifyProps = {
  block: boolean;
  auth?: boolean;
  admin?: boolean;
  setBlock: (bool: boolean) => void;
  id?: string;
  none: boolean;
};

export const Notify: FC<NotifyProps> = ({
  block,
  admin,
  none,
}: NotifyProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const appContext = useContext(AppContext);
  const { notifies, onNotify } = appContext;

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
      none={none}
      block={block}
      admin={admin}
      empty={!loading && notifies.length === 0}
      inPA={window.location.pathname.indexOf('info') === 1}
      load={loading}
      length={notifies.length}
    >
      {loading ? (
        <InBlockLoading />
      ) : (
        <>
          {notifies && notifies.length ? (
            <Scrollbars
              renderThumbVertical={(props) => 
              <Notifies.Scrollbar lengthMoreThenFour={notifies.length > 4} {...props} />}
            > 
              {notifies &&
                notifies.map((notify: any, idx: number) => (
                  <Notifies.Notify
                    click={notify.click}
                    notChecked={notify.readState === 0}
                    key={idx}
                  >
                    <Notifies.NotifyItem grey>
                      {moment(notify.sentDate).local().format('DD.MM.YYYY')} в{' '}
                      {moment(notify.sentDate).local().format('HH:MM')}
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
