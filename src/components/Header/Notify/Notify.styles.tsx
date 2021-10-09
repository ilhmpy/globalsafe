import styled from "styled-components/macro";

export const BallContainer = styled.div<{ notChecked: boolean; }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 95px;
    position: relative;
    & > svg {
        cursor: pointer;
    }
    &::before {
        content: "";
        display: ${({ notChecked }) => notChecked ? "block" : "none"};
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: #FF4A31;
        position: absolute;
        margin-left: 17px;
        margin-top: -15px;
    }
    @media only screen and (max-device-width: 767px) {
        width: 50px;
    }
    @media only screen and (max-device-width: 330px) {
        width: 35px;
    }
`;

export const NotifiesBlock = styled.div<{ block: boolean; auth?: boolean; admin?: boolean; empty: boolean; load: boolean; }>`
    width: 80%;
    max-width: 420px;
    height: ${({ empty }) => empty ? "80px" : "584px"};
    ${({ load }) => {
        if (load) {
            return `
                height: 230px;  
            `;
        };
    }}
    background: #fff;
    border-radius: 4px;
    position: absolute;
    transition: .3s;
    ${({ admin, block }) => {
        if (admin) {
            return `
               right: 140px;
               @media only screen and (max-device-width: 767px) {
                right: 0px;
               }
            `;
        };
        if (!admin) {
            return `
               right: 48px;
               @media only screen and (max-device-width: 767px) {
                right: 0px;
               }
            `;
        };
    }}
    top: ${({ block }) => block ? "50px" : "1200px"};
    border: 1px solid #DCDCE8;
    z-index: 0;
    background: #fff;
    box-shadow: 0px 40px 40px -40px rgba(220, 220, 232, 0.5);
    padding: 20px 8px 1px 0px;
    &::before {
        content: "";
        width: 14px;
        height: 14px;
        background: #fff;
        display: block;
        border-radius: 3px;
        border-bottom-left-radius: 0px;
        border-top-right-radius: 0px;
        transform: rotate(45deg);
        position: absolute;
        right: 0;
        left: 0;
        top: -8px;
        border-top: 1px solid #DCDCE8;
        border-left: 1px solid #DCDCE8;
        margin: auto;
    }
    & > .scrollbars > div {
        right: -1px !important;
    }
`;

export const Notify = styled.div<{ notChecked: boolean; empty?: boolean; }>`
    width: 100%;
    background: #F9FAFB;
    margin-bottom: 10px;
    padding: 10px;
    padding-left: 29px;
    position: relative;
    cursor: pointer;
    &::before {
        content: "";
        display: ${({ notChecked }) => notChecked ? "block" : "none"};
        background: #FF4A31;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        left: 12px;
        top: 17px;
        position: absolute;
    }
    ${({ empty }) => { 
        if (empty) {
            return `
                height: 40px;
                margin-bottom: 10px;
                display: flex;
                align-items: center;
            `;
        };
    }}
`;

export const NotifyItem = styled.h3<{ grey?: boolean; bold?: boolean; }>`
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    color: #3F3E4E;
    margin-bottom: 4px;
    max-width: 360px;
    word-wrap: break-word;
    &:last-child {
        margin-bottom: 0px;
    }
    ${({ grey, bold }) => {
        if (grey) {
            return `
               opacity: 60%;
            `;
        };
        if (bold) {
            return `
                font-weight: 700;
            `;
        }
    }}
`;