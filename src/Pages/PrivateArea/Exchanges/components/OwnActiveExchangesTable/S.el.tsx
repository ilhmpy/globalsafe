import styled, { css } from 'styled-components/macro';

export const Table = styled.div`
  width: 100%;
  margin-bottom: 40px;
  min-height: 350px;
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
  @media only screen and (min-device-width: 481px) and (max-device-width: 1024px) {
    &:nth-child(1) {
      max-width: 85px;
    }
    &:nth-child(2) {
      max-width: 110px;
    }
    &:nth-child(3) {
      max-width: 80px;
    }
    &:nth-child(4) {
      max-width: 135px;
    }
    &:nth-child(6) {
      max-width: 90px;
    }
  }
`;

export const BodyItem = styled.div<{ active?: boolean; new?: boolean; }>`
  ${table};
  ${Cell} {
  }
  padding: 5px 10px 5px;
  min-height: 60px;
  background: ${(props) => (props.active ? 'rgba(0, 148, 255, 0.05)' : '#fff')};
  box-shadow: 0px 40px 40px -40px rgba(220, 220, 232, 0.5);
  border-radius: 4px;
  margin-bottom: 2px;
  position: relative;
  cursor: pointer;
  &:before {
    content: '';
    top: 0;
    left: 0;
    height: 100%;
    position: absolute;
    width: 4px;
    background: ${(props) => (props.active ? '#0094ff' : '#fff')};
    box-shadow: 0px 40px 40px -40px rgba(220, 220, 232, 0.5);
    border-radius: 4px 0 0 4px;
  }
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
  margin-top: 6px;
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
  margin-bottom: 6px;
  font-size: 12px;
  font-weight: 500;
  &:last-child {
    margin-right: 0;
  }
  @media only screen and (max-device-width: 480px) {
    margin-bottom: 0;
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
  margin-bottom: 6px;
  &:last-child {
    margin-right: 0;
  }
`;

export const Exchange = styled.div<{ new?: boolean; }>`
  width: 100%;
  background: #fff;
  box-shadow: 0px 40px 40px -40px rgba(220, 220, 232, 0.5);
  margin-bottom: 10px;
  padding: 20px; 
`;

export const ExchangeLine = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  &:nth-child(6) {
    margin-bottom: 0px;
  }
`;

export const ExchangeLineContent = styled.h3<{ main?: boolean; text?: boolean; }>`
  font-size: 14px;
  line-height: right;
  color: #000000;
  ${({ main, text }) => {
    if (main) {
      return `
        font-weight: 300;
      `;
    };
    if (text) {
      return `
        font-weight: 500;
        text-align: right;
      `;
    };
  }}
`; 