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

    function getNotifies() {
        if (hubConnection) {
            setLoading(true);
            hubConnection.invoke(
                "GetInAppNotifications",
                [activeFilter === "active" ? 0 : 1],
                0,
                10
            )
              .then((res) => {
                console.log("all notifies on page", res.collection);
                fieldNew(res.collection, setNotifies);
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

    function onMore() {
        if (hubConnection) {
            hubConnection.invoke(
                "GetInAppNotifications",
                [activeFilter === "active" ? 0 : 1],
                notifies.length,
                5
            )
              .then((res) => {
                setNotifies(data => [...res.collection.map((item: NotifyItem) => {
                    return { ...item, new: true }
                }), ...data.map((item: NotifyItem) => {
                    return { ...item, new: false }
                })]);
                length(res.collection);
                setTimeout(() => {
                    fieldNew(res.collection, setNotifies, true);
                }, 1000);
              })    
              .catch((err) => console.log(err));
        };
    };

    return (
        <Container>
            <Notifies.NotificationsBlock>
                <Heading title="История операций" withoutBtn />
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
                            {notifies.length === 0 ? <NotItems text="Не имеется уведомлений по этому фильтру" /> : (
                                <>
                                    {notifies.map((notify: NotifyItem, idx: number) => (
                                        <Notifies.NotificationItem key={idx}> 
                                            <Table.Item item>
                                                {moment(notify.sentDate).format("DD.MM.YYYY")} в {moment(notify.sentDate).format("HH:MM")}
                                            </Table.Item>
                                            <Table.Item item>
                                                {notify.message}
                                            </Table.Item>
                                            <Notifies.DoneNotification disabled={activeFilter === "active"} onClick={() => onNotify(notify.safeId)} />
                                            {/* <Table.LinkButton>Перейти к обмену</Table.LinkButton> */}
                                        </Notifies.NotificationItem>
                                    ))}
                                </>
                            )}
                        </>
                    )}
                </Table.Table>
            </Notifies.NotificationsMap>
            <Table.MoreButton onMore={onMore} newItems={newItems} 
                loadingNewItems={notifies.some((item: any) => item.new === true)} text="Показать ещё" 
            />
        </Container>
    );
};