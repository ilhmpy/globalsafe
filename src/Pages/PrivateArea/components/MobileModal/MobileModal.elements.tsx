import styled from "styled-components/macro";

export const ModalBox = styled.div`
    position: relative;
    min-height: 250px;
    padding-top: 0px;
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
    padding: 0 34px;
    position: relative;
    min-height: 300px;
    margin-top: 60px;
    margin-bottom: 23px;
`;