import styled, { css } from 'styled-components/macro';

export const Table = styled.div`
  width: 100%;
  margin-bottom: 40px;
`;

const table = css`
  display: flex;
  align-items: center;
`;

export const Cell = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #000;
  width: 100%;
  padding: 0 10px;
  &:nth-child(1) {
    max-width: 146px;
  }
  &:nth-child(2) {
    max-width: 93px;
  }
  &:nth-child(3) {
    max-width: 156px;
  }
  &:nth-child(4) {
    max-width: 189px;
  }
  &:nth-child(5) {
    max-width: 228px;
  }
  &:nth-child(6) {
    max-width: 139px;
  }
  &:nth-child(7) {
    max-width: 90px;
  }
`;

export const BodyItem = styled.div`
  ${table};
  ${Cell} {
  }
  padding: 18px 10px 18px;
  background: #ffffff;
  box-shadow: 0px 40px 40px -40px rgba(220, 220, 232, 0.5);
  border-radius: 4px;
  margin-bottom: 2px;
`;

export const Header = styled.div`
  ${table};
  background: #ebebf2;
  border-radius: 4px;
  padding: 20px 10px 17px;
  span {
    font-weight: 300;
    font-size: 14px;
    line-height: 16px;
    color: #000;
  }
`;

export const BankList = styled.div`
  display: flex;
  flex-wrap: wrap;
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

export const TypeCrypto = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #000;
  padding: 4px 6px;
  border: 1px solid #ebebf2;
  border-radius: 2px;
  margin-right: 10px;
  &:last-child {
    margin-right: 0;
  }
`;
