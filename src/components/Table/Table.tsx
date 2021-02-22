import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../context/HubContext";
import styled from "styled-components/macro";
import { ReactComponent as Filter } from "../../assets/svg/filter.svg";
import { Name, NameData, Text } from "./Table.styled";
import moment from "moment";
import "moment/locale/ru";
import { Balance } from "../../types/balance";
import { useHistory } from "react-router-dom";

import { TableModal } from "./TableModal";
moment.locale("ru");

const Row = ({ data }: any) => {
  const [open, setOpen] = useState<boolean | string>(false);
  const history = useHistory();
  const onClose = () => {
    console.log("close");
    setOpen(false);
  };

  const onClick = (id: string) => {
    if (window.innerWidth < 992) {
      history.push(`info/${id}`);
    } else {
      setOpen(data.safeId);
    }
  };

  return (
    <>
      <TR key={data.safeId} onClick={() => onClick(data.safeId)}>
        <TD>
          <Name>{data.deposit.name}</Name>
          <NameData>
            <NameData>
              {moment(data.creationDate).format("DD/MM/YYYY")}
            </NameData>{" "}
            <NameData>&nbsp; - &nbsp;</NameData>
            <NameData
              green={
                moment.utc().valueOf() > moment.utc(data.endDate).valueOf()
              }
            >
              {moment(data.endDate).format("DD/MM/YYYY")}
            </NameData>
          </NameData>
        </TD>
        <TD>
          <Text>{data.deposit.description}</Text>
        </TD>
        <TD>
          <Text>{data.amountView}</Text>
          <Text>{Balance[data.deposit.depositKind]}</Text>
        </TD>
        <TD>
          <Text>
            {data.paymentAmount.toString().length > 15
              ? data.paymentAmount.toFixed(7)
              : data.paymentAmount}
          </Text>
          <Text>{Balance[data.deposit.depositKind]}</Text>
        </TD>
        <TD>
          <Text>{moment(data.paymentDate).format("DD MMMM YYYY")}</Text>
        </TD>
      </TR>
      <TableModal onClose={onClose} open={open} data={data} />
    </>
  );
};

export const Tables = ({ list }: any) => {
  const [num, setNum] = useState(5);

  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;

  console.log("list", list);

  return (
    <TableWrap>
      <Table>
        <thead>
          <TR>
            <TH>Название</TH>
            <TH>Описание</TH>
            <TH>Депозит</TH>
            <TH>Пл. выплата</TH>
            <TH>
              <p>Дата следующей выплаты</p>
              <span>Дата след. выплаты</span> <StyledFilter />
            </TH>
          </TR>
        </thead>
        <tbody>
          {list.length ? (
            list.map((item: any) => <Row key={item.safeId} data={item} />)
          ) : (
            <TR></TR>
          )}
        </tbody>
      </Table>
    </TableWrap>
  );
};

const TableWrap = styled.div`
  width: 100%;
  padding: 34px 90px;
  @media (max-width: 992px) {
    padding: 15px 10px;
  }
`;

const Table = styled.table`
  width: 100%;
  display: table;
  border-collapse: collapse;
  table-layout: fixed;
`;

const TH = styled.th`
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

const TD = styled.td`
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

const TR = styled.tr`
  border-bottom: 1px solid rgba(81, 81, 114, 0.2);
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
  &:last-child {
    opacity: 0.4;
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

const StyledFilter = styled(Filter)`
  margin-left: 20px;
  flex: none;
  &:hover {
    fill: #333;
  }
`;
