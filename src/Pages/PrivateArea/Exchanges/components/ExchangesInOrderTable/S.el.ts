import styled, { css } from 'styled-components/macro';
import { Device } from '../../../consts';

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
  color: ${props => props.theme.v2.blackText};
  width: 100%;
  padding: 0 10px;
  &:nth-child(1) {
    max-width: 173px;
    @media (max-width: 992px) {
      max-width: 100%;
    }
  }
  &:nth-child(2) {
    max-width: 143px;
    @media (max-width: 992px) {
      max-width: 100%;
    }
  }
  &:nth-child(3) {
    max-width: 150px;
    @media (max-width: 992px) {
      max-width: 100%;
    }
  }
  &:nth-child(4) {
    max-width: 154px;
    @media (max-width: 992px) {
      max-width: 100%;
    }
  }
  &:nth-child(5) {
    max-width: 168px;
    @media (max-width: 992px) {
      max-width: 100%;
    }
  }
  &:nth-child(6) {
    max-width: 300px;
    @media (max-width: 992px) {
      max-width: 100%;
    }
  }
  @media (max-width: 992px) {
    max-width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 6px 10px;
    margin-bottom: 2px;
    background: #ffffff;
    &:before {
      content: attr(data-label);
      text-transform: uppercase;
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      color: #000;
    }
  }
`;

export const BodyItem = styled.div<{ active?: boolean }>`
  ${table};
  ${Cell} {
  }
  padding: 5px 10px 5px;
  min-height: 60px;
  background: ${(props) => (props.active ? props.theme.v2.neutralBlue : props.theme.v2.bg)};
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
    background: ${(props) => (props.active ? props.theme.v2.activeBlue : 'transparent')};
    box-shadow: 0px 40px 40px -40px rgba(220, 220, 232, 0.5);
    border-radius: 4px 0 0 4px;
  }
  @media ${Device.tablet} {
    flex-wrap: wrap;
    background: transparent;
    padding: 0;
    margin-bottom: 10px;
  }
`;

export const Header = styled.div`
  ${table};
  background: ${props => props.theme.v2.neutral};
  border-radius: 4px;
  padding: 20px 10px 17px;
  span {
    font-weight: 300;
    font-size: 14px;
    line-height: 16px;
    color: ${props => props.theme.v2.blackText};
  }
  @media (max-width: 992px) {
    display: none;
  }
`;

export const BankList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 6px;
`;

export const BankItem = styled.div`
  border: 1px solid ${props => props.theme.v2.btnNeutral};
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-right: 10px;
  margin-bottom: 6px;
  background: ${props => props.theme.v2.cover};
  color: ${props => props.theme.v2.blackText};
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
  margin-bottom: 6px;
  &:last-child {
    margin-right: 0;
  }
`;


export const MobileBodyItem = styled.div<{ active?: boolean }>`
  ${table};
  
  flex-direction: column;
  width: 100%;
  padding: 20px;

  background: ${(props) => (props.active ? props.theme.v2.neutralBlue : props.theme.v2.bg)};
  box-shadow: 0px 40px 40px -40px rgba(220, 220, 232, 0.5);
  margin-bottom: 10px;
  position: relative;
  cursor: pointer;
`;

export const MobileRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-height: 24px;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const MobileCell = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: ${props => props.theme.v2.blackText};
`;