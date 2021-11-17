import styled, { css } from 'styled-components/macro';

export const Wrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  background: #ffffff;
  box-shadow: ${(props) => props.theme.lkMain.boxShadow};
  border-radius: 4px;
  overflow: hidden;
`;

export const Table = styled.div`
  width: 100%;
  background: ${(props) => props.theme.lkMain.balanceBlock};
`;

export const Cell = styled.div`
  padding: 9px 0 9px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #000000;
  color: ${(props) => props.theme.lkMain.navLink};

  width: 100%;
  span {
    font-size: 12px;
    font-weight: 400;
  }
  @media (max-width: 1024px) {
    &:nth-child(2) {
      /* display: flex;
      justify-content: flex-end; */
    }
    &:nth-child(4) {
      display: none;
    }
  }

  @media (max-width: 768px) {
    font-size: 12px !important;
    line-height: 14px !important;
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  margin: 0px 35px;
  border-bottom: 1px solid #ebebf2;
  border-bottom: ${(props) => props.theme.lkMain.borderBottom};

  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }
  @media (max-width: 768px) {
    margin: 0px 20px;
  }
  ${Cell} {
    &:nth-child(1) {
      @media (max-width: 1024px) {
        margin-right: 90px;
      }
      @media (max-width: 768px) {
        margin-right: 0px;
      }
      max-width: 270px;
    }
    &:nth-child(2) {
      @media (max-width: 1024px) {
        margin-right: 80px;
      }
      @media (max-width: 768px) {
        margin-right: 0px;
        max-width: fit-content !important;
      }
      max-width: 230px;
    }
    &:nth-child(3) {
      max-width: 270px;
    }
    &:nth-child(4) {
      max-width: 200px;
    }
  }
`;

export const RowHistory = styled(Row)`
  ${Cell} {
    padding: 20px 0;
    @media (max-width: 768px) {
      padding: 15px 0;
    }
    &:nth-child(1) {
      max-width: 69%;
    }
    &:nth-child(2) {
      @media (max-width: 1024px) {
        max-width: 17%;
      }
      max-width: 31%;
    }
  }
`;

const header = css`
  color: #000000;
  padding: 10px 35px;
  background: #ebebf2;
  border-bottom: none;
  margin: 0;
  ${Cell} {
    font-weight: 300;
    font-size: 14px;
    line-height: 16px;
  }
  @media (max-width: 768px) {
    padding: 10px 20px;
  }
`;

export const Header = styled(Row)`
  cursor: auto;
  background: ${(props) => props.theme.lkMain.depositHeader} !important;

  ${header};
`;

export const RowHeader = styled(RowHistory)`
  ${header};
  ${Cell} {
    padding: 10px 0 9px;
    @media (max-width: 768px) {
      padding: 3px 0 3px;
    }
  }
`;
