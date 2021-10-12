import * as Notifies from "./Notify.styles";
import { FC, useState, useEffect, useContext } from "react";
import Scrollbars from 'react-custom-scrollbars';
import moment from 'moment';
import { AppContext } from '../../../context/HubContext';
import  { InBlockLoading } from "../../UI/V4/InBlockLoading/InBlockLoading";

type NotifyProps = {
   block: boolean; 
   auth?: boolean;
   admin?: boolean; 
   setCheckeds: (bool: boolean) => void;
   setBlock: (bool: boolean) => void;
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

export const Notify: FC<NotifyProps> = ({ block, auth, admin, setCheckeds, setBlock }: NotifyProps) => {
    const [notifies, setNotifies] = useState<NotifyItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const appContext = useContext(AppContext);
    const hubConnection = appContext.hubConnection;   
    
    function cb (notify: NotifyItem) {
        console.log("NotifiesUpdate", notify);
        getNotifies(false);
    };
    
    function getNotifies(loading = true) {
        if (hubConnection) {
            setLoading(loading);
            hubConnection.invoke(
                "GetInAppNotifications",
                [0],
                0,
                100
            )
            .then((res) => {
              console.log("user notifications", res);
              setCheckeds(res.collection.some((item: NotifyItem) => item.readState === 0));
              setNotifies(() => res.collection.sort((x: any, y: any) => {
                const a = new Date(x.sentDate);
                const b = new Date(y.sentDate);
                return a > b ? -1 : a < b ? 1 : 0;
              }));
              setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
        };
    };
    
    useEffect(() => {
        if (hubConnection) {
            hubConnection.on("InAppNotification", cb);
        };
        return () => {
            hubConnection?.off("InAppNotification", cb);
        }; 
    }, [hubConnection]);
    
    useEffect(() => {
        getNotifies();
    }, [hubConnection]);

    function onNotify(id: string) {
        if (hubConnection) {
            hubConnection.invoke("SetStateInAppNotification", id, 1) 
             .then(() => {
                 getNotifies(false);
             })
             .catch(err => console.error(err));
        };
    };

    return (
      <Notifies.NotifiesBlock block={block} admin={admin} empty={!loading && notifies.length === 0} load={loading} onMouseLeave={() => setBlock(false)}>
          {loading ? <InBlockLoading /> : (
            <>
                {notifies && notifies.length ? (
                    <Scrollbars renderThumbVertical={(props) => <Notifies.Scrollbar {...props}></Notifies.Scrollbar>}>
                        {notifies && notifies.map((notify: NotifyItem, idx: number) => (
                            <Notifies.Notify notChecked={notify.readState === 0} key={idx}>
                                <Notifies.NotifyItem grey>
                                    {moment(notify.sentDate).format("DD.MM.YYYY")} в {moment(notify.sentDate).format("HH:MM")}
                                </Notifies.NotifyItem>
                                <Notifies.NotifyItem bold>
                                    {notify.subject}
                                </Notifies.NotifyItem>
                                <Notifies.NotifyItem>{notify.message}</Notifies.NotifyItem>
                                <Notifies.DoneNotify onClick={() => onNotify(notify.safeId)} />
                            </Notifies.Notify>
                        ))}
                   </Scrollbars>
                ) : (
                    <Notifies.Notify empty notChecked={false}>
                        <Notifies.NotifyItem>Непрочитанных уведомлений пока нет</Notifies.NotifyItem>
                    </Notifies.Notify> 
                )}
            </>
          )}
      </Notifies.NotifiesBlock>
    )
};