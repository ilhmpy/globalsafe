import * as Notifies from "./Notify.styles";
import { FC, useState, useEffect, useContext } from "react";
import Scrollbars from 'react-custom-scrollbars';
import moment from 'moment';
import { Balance } from "../../../types/balance";
import { AppContext } from '../../../context/HubContext';
import  { InBlockLoading } from "../../UI/V4/InBlockLoading/InBlockLoading";

type NotifyProps = {
   block: boolean; 
   auth?: boolean;
   admin?: boolean; 
   setCheckeds: (bool: boolean) => void;
};

interface NotifyItem {
  id: number;
  message: string;
  readState: number;
  safeId: string;
  sentDate: any;
  state: number;
  subject: string;
  userId: number;
  userSafeId: string;
};

export const Notify: FC<NotifyProps> = ({ block, auth, admin, setCheckeds }: NotifyProps) => {
    const [notifies, setNotifies] = useState<any[]>([
        /*
        { date: new Date(), view: true, value: 10000, balanceKind: 1, desc: "Баланс личного кабинета успешно пополнен через cwd.global" },
        { date: new Date(), view: false, value: -1000, balanceKind: 59, desc: "Средства заморожены в рамках обмена по вашему ордеру на продажу № 47996468. Для завершения обмена подтвердите получение средств в течении 20 минут" },
        { date: new Date(), view: false, value: 10000, balanceKind: 14, desc: "Адрес кошелька: 377JKD792HcVkP5qZoF7Pv31MbUwke5iMX" },
        { date: new Date(), view: false, value: 10000, balanceKind: 1, desc: "Баланс личного кабинета успешно пополнен через cwd.global" },
        { date: new Date(), view: true, value: 10000, balanceKind: 59, desc: "Баланс личного кабинета успешно пополнен через cwd.global" },
        { date: new Date(), view: false, value: 2800000, balanceKind: 14, desc: "Выплата по депозиту Expres" },
        { date: new Date(), view: true, value: 10000, balanceKind: 1, desc: "Баланс личного кабинета успешно пополнен через cwd.global" },
        { date: new Date(), view: false, value: -1000, balanceKind: 59, desc: "Средства заморожены в рамках обмена по вашему ордеру на продажу № 47996468. Для завершения обмена подтвердите получение средств в течении 20 минут" },
        { date: new Date(), view: true, value: 10000, balanceKind: 14, desc: "Адрес кошелька: 377JKD792HcVkP5qZoF7Pv31MbUwke5iMX" },
        { date: new Date(), view: false, value: 10000, balanceKind: 1, desc: "Баланс личного кабинета успешно пополнен через cwd.global" },
        { date: new Date(), view: false, value: 10000, balanceKind: 59, desc: "Баланс личного кабинета успешно пополнен через cwd.global" },
        { date: new Date(), view: true, value: 2800000, balanceKind: 14, desc: "Выплата по депозиту Expres" },
        { date: new Date(), view: false, value: 10000, balanceKind: 1, desc: "Баланс личного кабинета успешно пополнен через cwd.global" },
        { date: new Date(), view: false, value: -1000, balanceKind: 59, desc: "Средства заморожены в рамках обмена по вашему ордеру на продажу № 47996468. Для завершения обмена подтвердите получение средств в течении 20 минут" },
        { date: new Date(), view: false, value: 10000, balanceKind: 14, desc: "Адрес кошелька: 377JKD792HcVkP5qZoF7Pv31MbUwke5iMX" },
        { date: new Date(), view: true, value: 10000, balanceKind: 1, desc: "Баланс личного кабинета успешно пополнен через cwd.global" },
        { date: new Date(), view: false, value: 10000, balanceKind: 59, desc: "Баланс личного кабинета успешно пополнен через cwd.global" },
        { date: new Date(), view: true, value: 2800000, balanceKind: 14, desc: "Выплата по депозиту Expres" },
        */
    ]);
    const [loading, setLoading] = useState<boolean>(false);
    const appContext = useContext(AppContext);
    const hubConnection = appContext.hubConnection;   
    useEffect(() => {
        function cb (notify: any) {
            console.log(notify);
        };
        if (hubConnection) {
            hubConnection.on("InAppNotification", cb);
        };
        return () => {
            hubConnection?.off("InAppNotification", cb);
        };
    }, [hubConnection]);
    useEffect(() => {
        if (hubConnection) {
            setLoading(true);
            hubConnection.invoke(
                "GetInAppNotifications",
                [],
                0,
                100
            )
            .then((res) => {
              console.log("user notifications", res);
              setCheckeds(res.collection.some((item: any) => item.readState === 0));
              setNotifies(res.collection);
              setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
        };
    }, [hubConnection]);
    function onNotify(id: string) {
        if (hubConnection) {
            hubConnection.invoke("SetStateInAppNotification", id, 0)
             .then(res => {
                 console.log(res);
             })
             .catch(err => console.error(err));
        };
    };
    return (
      <Notifies.NotifiesBlock block={block} admin={admin} empty={!loading && notifies.length === 0} load={loading}>
          {loading ? (
            <>
              <InBlockLoading />
            </>
          ) : (
            <>
                <Scrollbars style={{ width: "100%" }} className="scrollbars">
                    {notifies && notifies.length ? (
                        <>
                            {notifies && notifies.map((notify: NotifyItem, idx: number) => (
                                <Notifies.Notify notChecked={notify.readState === 0} key={idx} onClick={() => onNotify(notify.safeId)}>
                                    <Notifies.NotifyItem grey>
                                        {moment(notify.sentDate).format("DD.MM.YYYY")} в {moment(notify.sentDate).format("HH:MM")}
                                    </Notifies.NotifyItem>
                                    <Notifies.NotifyItem bold>
                                        {notify.message}
                                    </Notifies.NotifyItem>
                                    <Notifies.NotifyItem>{notify.subject}</Notifies.NotifyItem>
                                </Notifies.Notify>
                            ))}
                        </>
                    ) : (
                        <Notifies.Notify empty notChecked={false}>
                        <Notifies.NotifyItem>Непрочитанных уведомлений пока нет</Notifies.NotifyItem>
                        </Notifies.Notify> 
                    )}
                </Scrollbars>
            </>
          )}
      </Notifies.NotifiesBlock>
    )
};