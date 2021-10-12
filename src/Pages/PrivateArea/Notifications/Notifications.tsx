import { useState, useEffect, FC, useContext } from "react";
import * as Notifies from "./Notifications.styles";
import { Heading } from '../components/Heading';
import { Container } from "../../../components/UI/Container";
import { AppContext } from '../../../context/HubContext';
import { Filter } from "../components/Filter/index";
import { NotifyItem } from "../../../constantes/notifies";
import * as Table from '../../../components/UI/V4/TableItems';
import moment from "moment";

export const Notifications = () => {
    const [buttons, setButtons] = useState<any[]>([
        { text: "Не прочитанные", active: "active" }, 
        { text: "В архиве", active: "archived" }
    ]);
    const [activeFilter, setActiveFilter] = useState<'active' | 'archived' | 'hold'>('active');
    const appContext = useContext(AppContext);
    const hubConnection = appContext.hubConnection;
    const [notifies, setNotifies] = useState<NotifyItem[]>([]);

    useEffect(() => {
        console.log(activeFilter);
        if (hubConnection) {
            hubConnection.invoke(
                "GetInAppNotifications",
                [activeFilter === "active" ? 0 : 1],
                0,
                10
            )
              .then((res) => {
                console.log("all notifies on page", res.collection);
                setNotifies(res.collection);
              })    
              .catch((err) => console.log(err));
        }
    }, [hubConnection, activeFilter]);

    function onNotify() {
        return;
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
                    {notifies.map((notify: NotifyItem, idx: number) => (
                        <Notifies.NotificationItem key={idx}>
                            <Table.Item item>
                                {moment(notify.sentDate).format("DD.MM.YYYY")} в {moment(notify.sentDate).format("HH:MM")}
                            </Table.Item>
                            <Table.Item item>
                                {notify.message}
                            </Table.Item>
                            <Notifies.DoneNotification style={{ display: activeFilter == "active" ? "block" : "none"}} onClick={onNotify} />
                            {/* <Table.LinkButton>Перейти к обмену</Table.LinkButton> */}
                        </Notifies.NotificationItem>
                    ))}
                </Table.Table>
            </Notifies.NotificationsMap>
        </Container>
    );
};