import React, { useEffect, useState, useContext } from "react";
import { Page } from "../../../../components/UI/Page";
import { H1 } from "../../../../components/UI/MainStyled";
import { Card, Container } from "../../../../globalStyles";
import styled from "styled-components/macro";
import { Button } from "../../../../components/Button/Button";
import { AppContext } from "../../../../context/HubContext";
import { useTranslation } from "react-i18next";
import { RootOperations, Collection } from "../../../../types/operations";
import moment from "moment";

export const Operations = () => {
  const [notifyList, setNotifyList] = useState<Collection[]>([]);
  const [num, setNum] = useState(0);
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;

  useEffect(() => {
    if (hubConnection) {
      hubConnection.on("OperationNotification", (data) => {
        console.log("OperationNotification", data);
        setNotifyList([data, ...notifyList]);
      });
      hubConnection
        .invoke<RootOperations>(
          "GetOperationsNotifications",
          [1, 2, 3, 4, 5, 6, 7, 8],
          num,
          5
        )
        .then((res) => {
          console.log("GetOperationsNotifications", res);
          setNotifyList([...notifyList, ...res.collection]);
        })
        .catch((e) => console.log(e));
    }
  }, [hubConnection, num]);

  const { t } = useTranslation();

  const operation = (id: number) => {
    if (id === 6) {
      return t("operation.open");
    } else if (id === 7) {
      return t("operation.divedents");
    } else if (id === 8) {
      return t("operation.close");
    } else if (id === 2) {
      return t("operation.withdraw");
    } else if (id === 1) {
      return t("operation.add");
    } else if (id === 3) {
      return "Сбой транзакции";
    } else if (id === 4) {
      return "Регулировка баланса промо";
    } else if (id === 5) {
      return "Партнерские сборы";
    }
  };

  const add = () => {
    setNum(num + 5);
  };

  return (
    <Page>
      <Container>
        <H1>Последние операции</H1>
      </Container>
      <TableContainer>
        <TableList>
          <TableItemHead>Дата</TableItemHead>
          <TableItemHead>Тип операции</TableItemHead>
          <TableItemHead>Сумма операции</TableItemHead>
        </TableList>
        {notifyList.length &&
          notifyList.map((item, idx) => (
            <TableList card key={item.date.toString() + idx}>
              <TableItem>{moment(item.date).format("DD.MM.YYYY")}</TableItem>
              <TableItem>
                {item.depositName ? (
                  <Text>
                    {operation(item.operationKind)} по программе &nbsp;
                    <span>{item.depositName}</span>
                  </Text>
                ) : (
                  <Text>{operation(item.operationKind)}</Text>
                )}
              </TableItem>
              <TableItem>
                <Value>
                  {(item.amount / 100000).toLocaleString("ru-RU", {
                    maximumFractionDigits: 2,
                  })}{" "}
                  CWD
                </Value>
              </TableItem>
            </TableList>
          ))}
        <Button dangerOutline onClick={add}>
          Показать еще
        </Button>
      </TableContainer>
    </Page>
  );
};

const TableContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  ${Button} {
    margin: 30px auto;
    width: 160px;
  }
`;

const TableList = styled.ul<{ card?: boolean }>`
  list-style: none;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding: 10px 50px;
  margin-bottom: 18px;
  @media (max-width: 992px) {
    padding: 10px 15px;
  }
  @media (max-width: 768px) {
    padding: 10px 5px;
  }
  ${(props) => {
    if (props.card) {
      return `
            background: rgba(255, 255, 255, .8);
            box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
            border-radius: 20px;
          `;
    }
  }}
`;

const TableItem = styled.li`
  letter-spacing: 0.1px;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  width: 100%;
  color: #515172;
  padding-right: 10px;
  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 16px;
  }
  &:nth-child(1) {
    max-width: 150px;
    @media (max-width: 576px) {
      max-width: 77px;
    }
  }
  &:nth-child(2) {
    max-width: 470px;
  }
  &:nth-child(3) {
    max-width: 240px;
  }
`;

const TableItemHead = styled(TableItem)`
  color: rgba(81, 81, 114, 0.8);
`;

const Value = styled.div`
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  display: flex;
  align-items: center;
  letter-spacing: 0.1px;
  text-transform: uppercase;
  color: #ff416e;
  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 16px;
  }
  @media (max-width: 576px) {
    flex-wrap: wrap;
    text-align: right;
    justify-content: flex-end;
    span {
      display: block;
      width: 100%;
    }
  }
`;

const Text = styled.div`
  font-weight: normal;
  font-size: 20px;
  line-height: 23px;
  letter-spacing: 0.1px;
  color: #515172;
  span {
    color: rgba(255, 65, 110, 1);
  }
  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 16px;
  }
`;
