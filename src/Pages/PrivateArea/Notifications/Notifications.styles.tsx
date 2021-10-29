import styled from "styled-components/macro";
import { ReactComponent as Done } from "../../../assets/svg/done.svg";

export const NotificationsBlock = styled.div`
    width: 100%;
`;

export const NotificationsMap = styled.div`
    min-height: 530px;
`;

export const NotificationItem = styled.div<{ newItem: boolean; }>`
    width: 100%;
    border-radius: 4px;
    background: #fff;
    box-shadow: 0px 40px 40px -40px rgba(220, 220, 232, 0.5);
    display: flex; 
    // align-items: center;
    position: relative;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
    // min-height: 60px;
    margin-bottom: 2px;
    opacity: 100%;
    ${({ newItem }) => {
        if (newItem) {
            return `
                  opacity: 10%;
            `;
        };
    }}
`;

export const DoneNotification = styled(Done)<{ disabled?: boolean; }>`
    position: absolute;
    right: 20px;
    display: block;
    top: 20px;
    bottom: 0;
    cursor: pointer;
    ${({ disabled }) => {
        if (!disabled) {
            return `
                opacity: 30%;  
                pointer-events: none;
                cursor: not-allowed;
            `;
        };
    }}
`;