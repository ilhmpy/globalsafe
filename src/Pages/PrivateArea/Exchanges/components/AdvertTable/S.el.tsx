import styled, { css } from 'styled-components/macro';

export const Table = styled.div`
  width: 100%;
`;

const table = css`
  display: flex;
  align-items: flex-start;
`;

export const Header = styled.div`
  ${table};
  background: #ebebf2;
  border-radius: 4px 4px 0 0;
  span {
    font-weight: 300;
    font-size: 14px;
    line-height: 16px;
    color: #000;
    padding: 20px;
  }
`;

export const Cell = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #000;
  width: 100%;
  padding: 20px;
`;

export const BodyItem = styled.div`
  ${table};
  ${Cell} {
    &:nth-child(1) {
      max-width: 140px;
    }
    &:nth-child(2) {
      max-width: 100px;
    }
    &:nth-child(3) {
      max-width: 140px;
    }
    &:nth-child(4) {
      max-width: 170px;
    }
    &:nth-child(5) {
      max-width: 180px;
    }
    &:nth-child(6) {
      max-width: 80px;
    }
    &:nth-child(7) {
      max-width: 100px;
    }
  }
`;

export const BankList = styled.div`
  display: flex;
`;

export const BankItem = styled.div`
  border: 1px solid #ebebf2;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-right: 10px;
  &:last-child {
    margin-right: 0;
  }
`;
