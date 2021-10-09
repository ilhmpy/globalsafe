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
};

export const Notify: FC<NotifyProps> = ({ block, auth, admin }: NotifyProps) => {
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
    const [loading, setLoading] = useState<boolean>(true);
    const appContext = useContext(AppContext);
    const hubConnection = appContext.hubConnection;
    useEffect(() => {
        if (hubConnection) {
            
        };
    }, [hubConnection])
    function onNotify() {
        return;
    };
    return (
      <Notifies.NotifiesBlock block={block} admin={admin} empty={!loading && notifies.length === 0} load={loading}>
          {loading ? (
            <>
              <InBlockLoading />
            </>
          ) : (
            <>
                <Scrollbars style={{ width: "100%", height: "100%" }} className="scrollbars">
                    {notifies && notifies.length ? (
                        <>
                            {notifies && notifies.map((notify: any, idx: number) => (
                                <Notifies.Notify checked={notify.view} key={idx} onClick={onNotify}>
                                    <Notifies.NotifyItem grey>
                                        {moment(notify.date).format("DD.MM.YYYY")} в {moment(notify.date).format("HH:MM")}
                                    </Notifies.NotifyItem>
                                    <Notifies.NotifyItem bold>
                                        {(notify.value).toLocaleString("ru-RU", { maximumFractionDigits: 2 })} {Balance[notify.balanceKind]}
                                    </Notifies.NotifyItem>
                                    <Notifies.NotifyItem>{notify.desc}</Notifies.NotifyItem>
                                </Notifies.Notify>
                            ))}
                        </>
                    ) : (
                        <Notifies.Notify empty checked={true}>
                        <Notifies.NotifyItem>Непрочитанных уведомлений пока нет</Notifies.NotifyItem>
                        </Notifies.Notify> 
                    )}
                </Scrollbars>
            </>
          )}
      </Notifies.NotifiesBlock>
    )
};