import { useState, useEffect, FC, useContext } from "react";
import * as Notifies from "./Notifications.styles";
import { Heading } from '../components/Heading';
import { Container } from "../../../components/UI/Container";
import { AppContext } from '../../../context/HubContext';
import { Filter } from "../components/Filter/index";
import { NotifyItem } from "../../../constantes/notifies";
import * as Table from '../../../components/UI/V4/TableItems';
import moment from "moment";
import { NotItems, Loading } from "../../../Pages/PrivateArea/components/Loading/Loading";

export const Notifications = () => {
    const [buttons, setButtons] = useState<any[]>([
        { text: "Не прочитанные", active: "active" }, 
        { text: "В архиве", active: "archived" }
    ]);
    const [activeFilter, setActiveFilter] = useState<'active' | 'archived' | 'hold'>('active');
    const appContext = useContext(AppContext);
    const hubConnection = appContext.hubConnection;
    const [notifies, setNotifies] = useState<NotifyItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [newItems, setNewItems] = useState<boolean>(false);
    const [statusNew, setStatusNew] = useState<any>();
    const [allNotifies, setAllNotifies] = useState<NotifyItem[]>([]);

    function length(res: NotifyItem[]) {
        if (res.length === 0) {
            setNewItems(false);
        } else {
            setNewItems(true);
        };
    };

    function fieldNew(res: NotifyItem[], setState: (value: NotifyItem[]) => void, field = false) {
        const items = res.map((item) => {
            return { ...item, new: field }
        });
        setState(items);
    };

    function cb () {
        getNotifies(false);
    };

    useEffect(() => {
        let cancel = false;
        if (hubConnection && !cancel) {
            hubConnection.on("InAppNotification", cb);
        };
        return () => {
            cancel = true;
            hubConnection?.off("InAppNotification", cb);
        }; 
    }, [hubConnection, notifies]);

    function getFirstElements(collection: NotifyItem[], elms: number) {
        return collection.filter((i, idx) => {
            if (idx < elms) {
                return i;
            };
        });
    };

    function getNotifies(load = true) {
        if (hubConnection) {
            setLoading(load);
            hubConnection.invoke(
                "GetInAppNotifications",
                [activeFilter === "active" ? 0 : 1],
                0,
                100
            )
              .then((res) => {
                console.log("all notifies on page", res.collection);
                const items = getFirstElements(res.collection, 10);
                setNotifies(items.map((item) => ({ ...item, new: false })));
                setAllNotifies(res.collection.map((item: any) => ({ ...item, new: false })));
                length(res.collection);
              })    
              .catch((err) => console.log(err))
              .finally(() => setLoading(false));
        };
    };

    useEffect(() => {
        getNotifies()
    }, [hubConnection, activeFilter]);

    function onNotify(id: string) {
        if (hubConnection) {
            hubConnection.invoke("SetStateInAppNotification", id, 1)
             .then(() => {
                 getNotifies();
             })
             .catch(err => console.error(err));
        };
    };

    function changeNew() {
        setNotifies(items => items.map(item => {
            return { ...item, new: false };
        }));
    };

    function onMore() {
        if (notifies && notifies.length <= allNotifies.length) {
            changeNew();
            let items: any[] = [];
            for (let i = 0; i < 5; i++) {
                if (allNotifies[notifies.length + i]) {
                    items = [...items, { ...allNotifies[notifies.length + i], new: true }];
                };
            };            
            if (items.length) {
                setNotifies([...notifies, ...items].sort((x: any, y: any) => {
                    const a = new Date(x.operationDate);
                    const b = new Date(y.operationDate);
                    return a > b ? -1 : a < b ? 1 : 0;
                }));
                setStatusNew(setTimeout(() => changeNew(), 2000));
            };
        };
    };

    function link(kind: number) {
        return kind === 20 || kind === 21 || kind === 22;
    };

    function createLink(link: string) {
        return `p2p-changes/${link}`;
    };

    return (
        <Container>
            <Notifies.NotificationsBlock>
                <Heading title="Уведомления" withoutBtn />
            </Notifies.NotificationsBlock>
            <Filter 
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
                withoutViewType
                withCustomButtons 
                withoutContainer
                buttons={buttons}
            /> 
            <Notifies.NotificationsMap>
                <Table.Table>
                    <Table.Header>
                        <Table.Item>Дата и время</Table.Item>
                        <Table.Item>Уведомление</Table.Item>
                    </Table.Header>
                    {loading ? <Loading /> : (
                        <>
                            {notifies.length === 0 ? <NotItems text="Не имеется уведомлений" /> : (
                                <>
                                    {notifies.map((notify: any, idx: number) => (
                                        <Notifies.NotificationItem key={idx} newItem={notify.new}>
                                            <Table.Item item>
                                                {moment(notify.sentDate).format("DD.MM.YYYY")} в {moment(notify.sentDate).format("HH:MM")}
                                            </Table.Item>
                                            <Table.Item item>
                                                {notify.message}
                                                {link(notify.notificationKind) && notify.link != "" && notify.link != "0" && 
                                                    <Table.LinkButton href={createLink(notify.link)}>Перейти к обмену</Table.LinkButton>}
                                            </Table.Item>
                                            <Notifies.DoneNotification disabled={activeFilter === "active"} onClick={() => onNotify(notify.safeId)} />
                                        </Notifies.NotificationItem>
                                    ))}
                                </>
                            )}
                        </>
                    )}
                </Table.Table>
            </Notifies.NotificationsMap>
            <Table.MoreButton onMore={onMore} newItems={newItems} 
                loadingNewItems={notifies.some((item: any) => item.new === true)} 
                text="Показать ещё" 
            />
        </Container>
    );
};