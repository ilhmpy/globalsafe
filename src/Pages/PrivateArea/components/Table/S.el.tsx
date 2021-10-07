import styled, { css } from 'styled-components/macro';

export const Wrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 40px 40px -40px rgba(220, 220, 232, 0.5);
  border-radius: 4px;
  overflow: hidden;
`;

export const Table = styled.div`
  width: 100%;
`;

export const Cell = styled.div`
  padding: 10px 0 9px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #000000;
  width: 100%;
  span {
    font-size: 12px;
    font-weight: 400;
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  margin: 0px 20px;
  border-bottom: 1px solid #ebebf2;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }
  ${Cell} {
    &:nth-child(1) {
      max-width: 270px;
    }
    &:nth-child(2) {
      max-width: 230px;
    }
    &:nth-child(3) {
      max-width: 271px;
    }
    &:nth-child(4) {
      max-width: 200px;
    }
  }
`;

export const RowHistory = styled(Row)`
  ${Cell} {
    padding: 20px 0;
    &:nth-child(1) {
      max-width: 69%;
    }
    &:nth-child(2) {
      max-width: 31%;
    }
  }
`;

const header = css`
  color: #000000;
  padding: 10px 20px;
  background: #ebebf2;
  border-bottom: none;
  margin: 0;
  ${Cell} {
    font-weight: 300;
    font-size: 14px;
    line-height: 16px;
  }
`;

export const Header = styled(Row)`
  cursor: auto;
  ${header};
`;

export const RowHeader = styled(RowHistory)`
  ${header};
  ${Cell} {
    padding: 10px 0 9px;
  }
`;
