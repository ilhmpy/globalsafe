import styled from "styled-components/macro";

export const FilterDivision = styled.div`
    width: 129px;
    height: 26px;
    border-right: 1px solid #EBEBF2;
    display: flex;
    align-items: center;
    justify-content: center;

    &:nth-child(1) {
        justify-content: normal;
        width: 125px;
    }

    &:nth-child(2) {
        margin-right: 20px;
    }
`;

export const FilterAllBlock = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
`;