import styled, { keyframes } from 'styled-components/macro';

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
    margin-bottom: 20px;
`;

export const Table = styled.div<{ none?: boolean; }>`
  width: 100%;
  margin-bottom: 40px;
  box-shadow: 0px 40px 40px -40px rgba(220, 220, 232, 0.5);
  border-radius: 4px;
`;

export const TableMap = styled.div`
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
    background: #fff;
`;

type TableProps = {
   head?: boolean; 
   item?: boolean;
   income?: boolean;
   newItem?: boolean;
}

export const TableItem = styled.div<TableProps>`
    width: 100%;
    display: flex;
    align-items: center;
    height: 56px;
    position: relative;
    ${({ head, item }) => {
        if (head) {
            return `
                background: #EBEBF2;
                border-top-right-radius: 4px;
                border-top-left-radius: 4px;
                padding-left: 20px;
                padding-right: 20px;
            `;
        };
        if (item) {
            return `
                border-bottom: 1px solid #EBEBF2;
                &:last-child {
                    border-bottom: 0px;
                }
          `; 
        };
    }}

    ${({ newItem }) => {
        if (newItem) {
            return `
                opacity: 10%;
            `;
        };
    }}
`; 

export const TableInnerItem = styled.div<TableProps>`
    color: #000;
    font-size: 14px;
    &:nth-child(3) {
        position: absolute;
        right: 20px;
    }
    ${({ head, item }) => {
        if (head) {
            return `
                font-weight: 300;
                line-height: 16px;
                &:nth-child(1) {
                    margin-right: 166px;
                }
            `;
        };
        if (item) {
            return `
                font-weight: 500;
                line-height: 20px;
                &:nth-child(1) {
                    margin-right: 131px;
                }
                &:nth-child(3) {
                    right: 0px;
                }
            `;
        };
    }}

    ${({ income }) => {
        if (income) {
            return `
                color: #61AD00;
            `;
        }
    }}
`;

export const Button = styled.button<{ newItems: boolean; }>`
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