import styled from "styled-components/macro";

export const Input = styled.input`
    width: 100%;
    max-width: 340px;
    height: 40px;
    border: 1px solid #EDF0F6;
    border-radius: 4px;
    outline: none;
    padding: 12px;
    background: #F9FAFB;
    color: #000;
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;

    &:placeholder {
        color: #EDF0F6;
        font-size: 14px;
        font-weight: 400;
        line-height: 16px;
    }
`;