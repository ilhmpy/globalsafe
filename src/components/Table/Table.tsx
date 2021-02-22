import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../context/HubContext";
import styled from "styled-components/macro";
import { ReactComponent as Filter } from "../../assets/svg/filter.svg";
import moment from "moment";
import "moment/locale/ru";
moment.locale("ru");

export const Tables = () => {
  const [num, setNum] = useState(5);
  const [list, setList] = useState<any>([]);
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke("GetUserDeposits", [1, 2, 3, 4], 0, 20)
        .then((res: any) => {
          setList(res.collection);
        })
        .catch((err: Error) => console.log(err));
    }
  }, [hubConnection]);

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
            list.map((item: any) => (
              <TR key={item.safeId}>
                <TD>
                  <Name>{item.deposit.name}</Name>
                  <NameData>
                    <NameData>
                      {moment(item.creationDate).format("DD/MM/YYYY")}
                    </NameData>{" "}
                    <NameData>&nbsp; - &nbsp;</NameData>
                    <NameData
                      green={
                        moment.utc().valueOf() >
                        moment.utc(item.endDate).valueOf()
                      }
                    >
                      {moment(item.endDate).format("DD/MM/YYYY")}
                    </NameData>
                  </NameData>
                </TD>
                <TD>
                  <Text>{item.deposit.description}</Text>
                </TD>
                <TD>
                  <Text>{item.amountView}</Text>
                  <Text>CWD</Text>
                </TD>
                <TD>
                  <Text>
                    {item.paymentAmount.toString().length > 15
                      ? item.paymentAmount.toFixed(7)
                      : item.paymentAmount}
                  </Text>
                </TD>
                <TD>
                  <Text>{moment(item.paymentDate).format("DD MMMM YYYY")}</Text>
                </TD>
              </TR>
            ))
          ) : (
            <TR></TR>
          )}

          {/* <TR>
            <TD>
              <Name>Название Депозита №2</Name>
              <NameData>
                <NameData>01/01/2020</NameData>{" "}
                <NameData>&nbsp; - &nbsp;</NameData>
                <NameData green>31/12/2021</NameData>
              </NameData>
            </TD>
            <TD>
              <Text>Описание первого депозита с повышенной доходностью</Text>
            </TD>
            <TD>
              <Text>140 000</Text>
            </TD>
            <TD>
              <Text>04 марта 2021</Text>
            </TD>
          </TR> */}
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

const Name = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  @media (max-width: 992px) {
    font-weight: 400;
  }
`;

const NameData = styled.div<{ green?: boolean }>`
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

const Text = styled.div`
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.1px;
  color: #515172;
`;

const StyledFilter = styled(Filter)`
  margin-left: 20px;
  flex: none;
  &:hover {
    fill: #333;
  }
`;
