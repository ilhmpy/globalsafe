import React, { useEffect, useState, useContext, FC } from "react";
import { Page } from "../../../../components/UI/Page";
import { H2 } from "../../../../components/UI/MainStyled";
import { Card, Container } from "../../../../globalStyles";
import styled from "styled-components/macro";
import { Button } from "../../../../components/Button/Button";
import { AppContext } from "../../../../context/HubContext";
import { useTranslation } from "react-i18next";
import { RootOperations, Collection } from "../../../../types/operations";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import moment from "moment";
import {
  CollectionLottery,
  RootLottery,
  ArrList,
} from "../../../../types/lottery";
import { UpTitle } from "../../../../components/UI/UpTitle";
import { Balance } from "../../../../types/balance";
import { Timer } from "../Lottery/Timer";
import { Item } from "../../../../components/FilterMenu/Styled.elements";
import { isTemplateHead } from "typescript";

type Props = {
  setShowModal: (val: boolean) => void;
};

export const DrawHistory: FC<Props> = ({ setShowModal }) => {
  const [notifyList, setNotifyList] = useState<ArrList[]>([]);
  const [num, setNum] = useState(0);
  const [show, setShow] = useState(true);
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;

  useEffect(() => {
    let clean = false;

    if (hubConnection) {
      hubConnection.on("DrawResult", (data) => {
        console.log("DrawResult", data);
        const arrList = {
          name: data[3].name,
          kind: data[1].kind,
          date: data[4],
          volume: data[1].kind,
          balanceKind: data[1].balanceKind,
        };
        console.log("arrList", arrList);
        !clean && setNotifyList([arrList, ...notifyList]);
      });
      hubConnection
        .invoke<RootLottery>("GetPrizes", 0, 5)
        .then((res) => {
          console.log("GetPrizes", res);
          const arrList = res.collection.map((item) => ({
            name: item.userName,
            kind: item.definition.kind,
            date: item.drawLog.drawDate,
            volume: item.definition.volume,
            balanceKind: item.definition.balanceKind,
          }));
          !clean && setNotifyList(arrList);
        })
        .catch((e) => console.log(e));
    }
    return () => {
      clean = true;
    };
  }, [hubConnection]);

  const { t } = useTranslation();

  const typeWin = (id: number) => {
    if (id === 0) {
      return t("win.one");
    } else if (id === 1) {
      return t("win.two");
    } else if (id === 2) {
      return t("win.three");
    }
  };

  const add = () => {
    if (hubConnection) {
      hubConnection
        .invoke<RootLottery>("GetPrizes", 5, 5)
        .then((res) => {
          const arrList = res.collection.map((item) => ({
            name: item.userName,
            kind: item.definition.kind,
            date: item.drawLog.drawDate,
            volume: item.definition.volume,
            balanceKind: item.definition.balanceKind,
          }));
          setNotifyList([...notifyList, ...arrList]);
        })
        .catch((e) => console.log(e));
    }
    setShow(false);
  };

  return (
    <Page>
      <Container>
        <UpTitle small>{t("draws")}</UpTitle>
      </Container>
      <Container>
        <H2>{t("historyLottery")}</H2>
      </Container>

      <Container>
        <TimerHistoryContainer alfa onClick={() => setShowModal(true)}>
          <Timer icon={false} timerHistory />
          <Button danger>{t("goDraw")}</Button>
        </TimerHistoryContainer>
      </Container>

      <TableContainer>
        <TableList dn>
          <TableItemHead>{t("lotteryTable.date")}</TableItemHead>
          <TableItemHead>{t("lotteryTable.typeWin")}</TableItemHead>
          <TableItemHead>{t("lotteryTable.sumWin")}</TableItemHead>
          <TableItemHead>{t("lotteryTable.winners")}</TableItemHead>
        </TableList>
        <TransitionGroup>
          {notifyList.length &&
            notifyList.map((item, idx) => (
              <CSSTransition key={idx} timeout={500} classNames="item">
                <TableList card>
                  <TableItem>
                    {moment(item.date).format("DD.MM.YYYY")}
                  </TableItem>
                  <TableItem>{typeWin(item.kind)}</TableItem>
                  <TableItem>
                    {item.kind === 0
                      ? (item.volume / 100000).toLocaleString("ru-RU", {
                          maximumFractionDigits: 5,
                        })
                      : Item.kind === 1
                      ? t("win.two")
                      : item.volume}
                    &nbsp;
                    {item.volume ? Balance[item.balanceKind] : "-"}
                  </TableItem>
                  <TableItem>
                    <Value>{item.name}</Value>
                  </TableItem>
                </TableList>
              </CSSTransition>
            ))}
        </TransitionGroup>
        {show && (
          <Button dangerOutline onClick={add}>
            {t("operation.showMore")}
          </Button>
        )}
      </TableContainer>
    </Page>
  );
};

const TimerHistoryContainer = styled(Card)`
  width: 100%;
  padding: 20px 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${Button} {
    @media (max-width: 768px) {
      display: none;
    }
  }
  @media (max-width: 768px) {
    justify-content: center;
    padding: 20px;
  }
`;

const TableContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  ${Button} {
    margin: 30px auto;
    width: 160px;
  }
`;

const TableList = styled.ul<{ card?: boolean; dn?: boolean }>`
  list-style: none;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding: 10px 50px;
  margin-bottom: 18px;
  background: ${(props) =>
    props.card ? props.theme.card.backgroundAlfa : "transparent"};
  box-shadow: ${(props) =>
    props.card ? "0px 1px 3px rgba(0, 0, 0, 0.25)" : "none"};
  border-radius: 20px;
  border: ${(props) => (props.card ? props.theme.card.border : "none")};
  @media (max-width: 992px) {
    padding: 10px 15px;
  }
  @media (max-width: 768px) {
    padding: 10px 5px;
  }
  @media (max-width: 576px) {
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 10px 15px;
    display: ${(props) => (props.dn ? "none" : "flex")};
  }
  ${(props) => {
    if (props.card) {
      return `
            background: ${({ theme }: any) => theme.card.backgroundAlfa};
            box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
            border-radius: 20px;
            border: ${({ theme }: any) => theme.card.border};
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
  color: ${(props) => props.theme.text2};
  padding-right: 10px;
  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 16px;
  }
  @media (max-width: 576px) {
    padding-bottom: 5px;
  }
  @media (max-width: 576px) {
    text-align: left;
  }
  &:nth-child(1) {
    max-width: 150px;
    @media (max-width: 576px) {
      max-width: 100%;
    }
  }
  &:nth-child(2) {
    max-width: 200px;
    @media (max-width: 576px) {
      max-width: 100%;
      display: none;
    }
  }
  &:nth-child(3) {
    max-width: 200px;
    @media (max-width: 576px) {
      max-width: 100%;
    }
  }
  &:nth-child(4) {
    max-width: 200px;
    @media (max-width: 576px) {
      max-width: 100%;
    }
  }
`;

const TableItemHead = styled(TableItem)`
  color: ${(props) => props.theme.text2};
  @media (max-width: 576px) {
    display: none;
  }
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
    justify-content: flex-start;
    span {
      display: block;
      width: 100%;
    }
  }
`;
