import styled from "styled-components/macro";

export const PaymentsTable = styled.div`
  padding: 30px;
  height: 600px;
`;

export const TableHead = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 6px;
  border-bottom: 1px solid rgba(81, 81, 114, 0.2);
`;

export const TableHeadItem = styled.li`
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.1px;
  color: ${(props) => props.theme.thHead};
  width: 100%;
  &:nth-child(1) {
    max-width: 30px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &:nth-child(2) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 97px;
    @media (max-width: 768px) {
      display: none;
    }
  }
  &:nth-child(3) {
    max-width: 94px;
  }
  &:nth-child(4) {
    max-width: 110px;
    @media (max-width: 992px) {
      display: none;
    }
  }
  &:nth-child(5) {
    max-width: 90px;
    @media (max-width: 1100px) {
      display: none;
    }
  }
  &:nth-child(6) {
    max-width: 85px;
    @media (max-width: 992px) {
      display: none;
    }
  }
  &:nth-child(7) {
    max-width: 100px;
    @media (max-width: 1100px) {
      display: none;
    }
  }
  &:nth-child(8) {
    max-width: 84px;
    @media (max-width: 576px) {
      display: none;
    }
  }
  &:nth-child(9) {
    max-width: 110px;
    @media (max-width: 576px) {
      max-width: 80px;
    }
  }
  &:nth-child(10) {
    max-width: 120px;
    text-align: right;
    @media (max-width: 992px) {
      max-width: 60px;
    }
    @media (max-width: 576px) {
      max-width: 30px;
    }
  }
`;

export const TableHeadItemPaid = styled(TableHeadItem)`
  &:nth-child(1) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 97px;
    @media (max-width: 768px) {
      display: none;
    }
  }
  &:nth-child(2) {
    max-width: 170px;
    @media (max-width: 576px) {
      padding-right: 10px;
    }
  }
  &:nth-child(4) {
    max-width: 170px;
  }
  &:nth-child(5) {
    max-width: 112px;
  }
  &:nth-child(6) {
    max-width: 100px;
    text-align: left;
    @media (max-width: 992px) {
      display: block;
      text-align: center;
    }
  }
  &:nth-child(7) {
    max-width: 50px;
    text-align: right;
  }
`;

export const NotFound = styled.div`
  font-weight: normal;
  font-size: 12px;
  line-height: 21px;
  padding: 30px;
  letter-spacing: 0.1px;
  min-height: 250px;
`;

export const ButtonWrap = styled.div`
  display: flex;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;
