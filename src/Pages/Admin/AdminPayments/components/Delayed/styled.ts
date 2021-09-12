import styled from 'styled-components';
import { Button } from '../../../../../components/Button/Button';

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
  gap: 7px;
  /* position: relative; */
`;

export const TableHeadItem = styled.li`
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.1px;
  color: ${(props) => props.theme.thHead};
  width: 100%;
  &:nth-child(1) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 30px;
    @media (max-width: 768px) {
      max-width: 30px;
    }
    @media (max-width: 576px) {
      max-width: 20px;
    }
  }
  &:nth-child(2) {
    max-width: 100px;
    @media (max-width: 768px) {
      padding-right: 10px;
      display: none;
    }
  }
  &:nth-child(3) {
    max-width: 140px;
    white-space: pre-wrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-right: 10px;

    @media (max-width: 768px) {
      /* display: none; */
    }
  }
  &:nth-child(4) {
    max-width: 130px;
    @media (max-width: 576px) {
      display: none;
    }
  }
  &:nth-child(5) {
    max-width: 140px;
    @media (max-width: 992px) {
      max-width: 120px;
      display: none;
    }
  }

  &:nth-child(6) {
    max-width: 140px;
    @media (max-width: 992px) {
      max-width: 120px;
      display: none;
    }
  }
  &:nth-child(7) {
    max-width: 140px;
    @media (max-width: 576px) {
      max-width: 120px;
    }
  }
  &:last-child {
    max-width: 150px;
    text-align: right;
    position: relative;
    @media (max-width: 992px) {
      max-width: 80px;
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
  color: ${(props) => (props.dis ? '#C4C4C4' : props.theme.text2)};
`;

export const NotFound = styled.div`
  font-weight: normal;
  font-size: 12px;
  line-height: 21px;
  padding: 30px;
  letter-spacing: 0.1px;
  min-height: 250px;
`;

export const Buttons = styled.div`
  display: flex;
  @media (max-width: 576px) {
    flex-wrap: wrap;
    margin-top: 20px;
  }
  ${Button} {
    padding-left: 10px;
    padding-right: 10px;
    min-width: 134px;
    &:first-child {
      margin-right: 15px;
      @media (max-width: 576px) {
        margin: 0 auto 20px;
      }
    }
    &:last-child {
      min-width: 117px;
    }
  }
`;
