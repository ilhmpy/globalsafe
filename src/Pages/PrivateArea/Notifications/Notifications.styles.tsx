import styled from "styled-components/macro";
import { ReactComponent as Done } from "../../../assets/svg/done.svg";

export const NotificationsBlock = styled.div`
    width: 100%;
`;

export const NotificationsMap = styled.div``;

export const NotificationItem = styled.div`
    width: 100%;
    border-radius: 4px;
    background: #fff;
    box-shadow: 0px 40px 40px -40px rgba(220, 220, 232, 0.5);
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 20px;
    padding-right: 20px;
    min-height: 60px;
    margin-bottom: 2px;
`;

export const DoneNotification = styled(Done)`
    position: absolute;
    right: 20px;
    display: block;
    margin-top: auto;
    margin-bottom: auto;
    top: 0;
    bottom: 0;
    cursor: pointer;
`;