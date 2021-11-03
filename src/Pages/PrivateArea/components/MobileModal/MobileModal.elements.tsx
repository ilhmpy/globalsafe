import styled from "styled-components/macro";

export const ModalBox = styled.div`
    position: relative;
    padding-top: 80px;
    margin-top: 94px;
    @media (max-width: 767px) {
     margin-top: 87px;
    }
    @media (max-width: 576px) {
     margin-top: 0px;
    }
`;

export const ModalContainer = styled.div`
    width: 100%;
    padding-top: 20px;
    position: relative;
    margin-bottom: 62px;
`;

export const ModalTitle = styled.h3`
    font-weight: 900;
    font-size: 18px;
    line-height: 21px;
    color: #3F3E4E;
    margin-bottom: 20px;
    margin-left: 20px;
`;

export const ModalWhiteBox = styled.div`
    width: 100%;
    min-height: 180px;
    background: #fff;
    padding: 20px;
    margin-bottom: 40px;
`;

export const ModalLine = styled.div`
    width: 100%;
    display: flex;
    margin-bottom: 10px;
    justify-content: space-between;
    &:last-child {
        margin-bottom: 20px;
    }
`;

export const ModalContent = styled.h3<{ main?: boolean; text?: boolean; }>`
    font-size: 14px;
    line-height: 20px;
    color: #000;
    ${({ main, text }) => {
        if (main) {
            return `
                font-weight: 400;    
            `;
        };
        if (text) {
            return `  
                font-weight: 700;
            `;
        };
    }}
`;

export const ModalButton = styled.button`
    background: #0094FF;
    width: 100%;
    height: 40px;
    border-radius: 4px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
`;