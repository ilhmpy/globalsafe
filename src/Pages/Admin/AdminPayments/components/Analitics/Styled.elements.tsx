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
  position: relative;
  &:nth-child(1) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 97px;
    @media (max-width: 768px) {
      max-width: 60px;
    }
    @media (max-width: 576px) {
      max-width: 20px;
    }
  }
  &:nth-child(2) {
    max-width: 170px;
    @media (max-width: 576px) {
      padding-right: 10px;
    }
  }
  &:nth-child(3) {
    max-width: 100px;
    @media (max-width: 768px) {
      display: none;
    }
  }
  &:nth-child(4) {
    max-width: 180px;
    @media (max-width: 576px) {
      display: none;
    }
  }
  &:nth-child(5) {
    max-width: 182px;
  }

  &:nth-child(6) {
    max-width: 50px;
    text-align: right;
    @media (max-width: 768px) {
      max-width: 20px;
    }
  }
`;

export const TableHeadItemPaid = styled(TableHeadItem)``;

export const TableBody = styled(TableHead)`
  padding: 15px 0px 15px 0;
  transition: background 0.3s;
  &:hover {
    background: rgba(66, 139, 202, 0.109);
  }
`;

export const TableBodyItem = styled(TableHeadItem)<{ dis?: boolean }>`
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: ${(props) => (props.dis ? "#C4C4C4" : props.theme.text2)};
`;

export const NotFound = styled.div`
  font-weight: normal;
  font-size: 12px;
  line-height: 21px;
  padding: 30px;
  letter-spacing: 0.1px;
  min-height: 250px;
`;
