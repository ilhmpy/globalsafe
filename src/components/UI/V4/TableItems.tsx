import styled from "styled-components/macro";
import React, { FC } from "react";
import { Spinner } from "../../../Pages/PrivateArea/components/Loading/Loading";

export const Table = styled.div<{ none?: boolean; }>`
  width: 100%;
  margin-bottom: 40px;
  box-shadow: 0px 40px 40px -40px rgba(220, 220, 232, 0.5);
  border-radius: 4px;
  margin-top: 20px;
`;

export const Item = styled.h3<{ item?: boolean; }>`
    color: #000;
    font-size: 14px;
    font-weight: 300;
    margin-right: 75px;
    ${({ item }) => {
        if (item) {
            return `
                font-weight: 500;
            `;
        };
    }}
`;

export const Header = styled.header`
    width: 100%;
    display: flex;
    align-items: center;
    height: 56px;
    position: relative;
    background: #EBEBF2; 
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    padding-left: 20px;
    padding-right: 20px;
    & > h3 {
        margin-right: 109px;
    }
`;

export const More = styled.button<{ newItems: boolean; }>`
    width: 134px;
    height: 38px;
    background: #515172;
    border-radius: 4px;
    color: #fff;
    font-size: 14px;
    line-height: 16px;
    margin: 0 auto;
    margin-bottom: 40px;
    display: block;
    cursor: pointer;
    font-weight: 500;
    display: ${({ newItems }) => newItems ? "block" : "none"};
`;

export const LinkButton = styled.a`
    width: 122px;
    height: 30px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
\   margin-bottom: 22px;
    background: #0094FF;
    border-radius: 4px;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    cursor: pointer;
`;

export const Spin = styled(Spinner)`
    width: 25;
    height: 25; 
    borderTop: 2px solid #fff;
    margin: 0 auto;
`;

type MoreButtonType = {
    newItems: boolean;
    text: string;
    onMore: () => void;
}

export const MoreButton: FC<MoreButtonType> = ({ newItems, onMore, text }: MoreButtonType) => {
    return (
        <More newItems={newItems} onClick={onMore}>
            {newItems ? <Spin /> : text}
        </More>
    );
};