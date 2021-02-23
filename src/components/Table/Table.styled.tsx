import styled from "styled-components/macro";
import { ReactComponent as Filter } from "../../assets/svg/filter.svg";

export const Name = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  @media (max-width: 992px) {
    font-weight: 400;
  }
`;

export const NameData = styled.div<{ green?: boolean }>`
  font-weight: normal;
  font-size: 12px;
  letter-spacing: 0.1px;
  color: ${(props) => (props.green ? "#c9da99" : "#515172")};
  display: flex;
  align-items: center;
  @media (max-width: 992px) {
    font-size: 10px;
  }
`;

export const TH = styled.th`
  text-align: left;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.1px;
  color: rgba(81, 81, 114, 0.6);
  padding: 10px 0;
  &:nth-child(1) {
    width: 188px;
  }
  &:nth-child(2) {
    width: 250px;
  }
  &:nth-child(3) {
    width: 130px;
    padding-left: 10px;
  }
  &:nth-child(4) {
    width: 123px;
  }
  p {
    display: inline-block;
  }
  span {
    display: none;
  }
  @media (max-width: 500px) {
    p {
      display: none;
    }
    span {
      width: 65px;
      text-align: left;
      display: inline-block;
    }
  }
`;

export const TD = styled.td`
  padding: 9px 0 10px 0;
  &:nth-child(1) {
    width: 188px;
  }
  &:nth-child(2) {
    width: 250px;
  }
  &:nth-child(3) {
    width: 130px;
    padding-left: 10px;
  }
  &:nth-child(4) {
    width: 123px;
  }
`;

export const Text = styled.div`
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.1px;
  color: #515172;
`;

export const TableWrap = styled.div`
  width: 100%;
  padding: 34px 90px;
  @media (max-width: 992px) {
    padding: 15px 10px;
  }
`;

export const TR = styled.tr<{ disactive?: boolean }>`
  border-bottom: 1px solid rgba(81, 81, 114, 0.2);
  cursor: pointer;
  transition: 0.3s;
  opacity: ${(props) => (props.disactive ? "0.4" : "1")};
  &:not(thead tr):hover {
    background: rgba(0, 0, 0, 0.05);
  }
  @media (max-width: 992px) {
    ${TH}:last-child,
    ${TD}:last-child {
      text-align: right;
    }
    ${TH}:last-child {
      display: flex;
      justify-content: flex-end;
    }
    ${TH}:nth-child(2),
    ${TH}:nth-child(3),
    ${TH}:nth-child(4),
    ${TD}:nth-child(2),
    ${TD}:nth-child(3),
    ${TD}:nth-child(4) {
      display: none;
    }
  }
`;

export const Table = styled.table`
  width: 100%;
  display: table;
  border-collapse: collapse;
  table-layout: fixed;
`;

export const StyledFilter = styled(Filter)`
  margin-left: 20px;
  flex: none;
  &:hover {
    fill: #333;
  }
`;
