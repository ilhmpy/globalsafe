import React, {
  useState,
  MouseEvent,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { Header } from "../../components/Header/Header";
import styled from "styled-components/macro";
import * as Styled from "./Styles.elements";
import { Tabs, Tab } from "../../components/UI/Tabs";
import { Card, Container } from "../../globalStyles";
import { UpTitle } from "../../components/UI/UpTitle";
import { Redirect } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { AppContext } from "../../context/HubContext";
import { Tables } from "../../components/Table/Table";
import { TestChart } from "../../components/Charts/Test";
import { CSSTransition } from "react-transition-group";
import useWindowSize from "../../hooks/useWindowSize";
import { Collection, RootList } from "../../types/info";
import { Modal } from "../../components/Modal/Modal";
import moment from "moment";
import "moment/locale/ru";
import { ModalCalendarInput } from "../../components/UI/DayPicker";
moment.locale("ru");

type Obj = {
  id: string;
  operationKind: number;
  balance: number;
};

type Deposit = {
  [elemName: string]: Obj[];
};

export const Info = () => {
  const [active, setActive] = useState(0);
  const [activeDeposite, setActiveDeposite] = useState(0);
  const [card, setCard] = useState(0);
  const [card2, setCard2] = useState(0);
  const [activMob, setActiveMob] = useState(0);
  const [list, setList] = useState<Collection[]>([]);
  const [depositTotal, setDepositTotal] = useState(0);
  const [totalPayed, setTotalPayed] = useState(0);
  const [nextDate, setNextDate] = useState<null | Date>(null);
  const [balanceLog, setBalanceLog] = useState<Deposit | null>(null);
  const [depositTabs, setDepositTabs] = useState(0);
  const [dateFrom, setDateFrom] = useState(new Date("2021-02-09T00:47:45"));
  const [dateTo, setDateTo] = useState(new Date());
  const [balanceLogs, setBalanceLogs] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  const [open, setOpen] = useState(false);
  const sizes = useWindowSize();
  const size = sizes < 992;
  const appContext = useContext(AppContext);
  const user = appContext.user;
  const balance = appContext.balance;

  const hubConnection = appContext.hubConnection;
  const loading = appContext.loading;

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke("GetTotalDepositsAmount")
        .then((res) => {
          setDepositTotal(res);
        })
        .catch((err: Error) => console.log(err));
    }
  }, [hubConnection]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke("GetTotalPayedAmount")
        .then((res) => {
          setTotalPayed(res);
        })
        .catch((err: Error) => console.log(err));
    }
  }, [hubConnection]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke<RootList>("GetUserDeposits", [1, 2, 3, 4], 0, 30)
        .then((res) => {
          setList(res.collection);
        })
        .catch((err: Error) => console.log(err));
    }
  }, [hubConnection]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke("GetUserNextPaymentDate")
        .then((res) => {
          setNextDate(res);
        })
        .catch((err: Error) => console.log(err));
    }
  }, [hubConnection]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke("GetBalanceLog", 1, balanceLogs, dateFrom, dateTo, 0, 30)
        .then((res: any) => {
          console.log("res", res);
          function getFormatedDate(dateStr: Date) {
            let date = moment(dateStr).format("DD MMMM YYYY");
            return date;
          }
          if (res.collection.length) {
            let result: any = {};
            res.collection.forEach((item: any) => {
              const d = getFormatedDate(item.operationDate);

              const obj = {
                id: item.balanceSafeId,
                operationKind: item.operationKind,
                balance: item.balanceDelta,
              };

              if (result[d]) {
                result[d].push(obj);
              } else {
                result[d] = [obj];
              }
            });
            setBalanceLog(result);
          } else {
            setBalanceLog(null);
          }
        })
        .catch((err: Error) => console.log(err));
    }
  }, [hubConnection, dateTo, dateFrom, balanceLogs]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke("GetActiveDepositsCount")
        .then((res: any) => {
          setActiveDeposite(res);
        })
        .catch((err: Error) => console.log(err));
    }
  }, [hubConnection]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke("GetBalanceOperationSum", 1, [0, 1, 2, 3, 4, 5, 6, 7, 8])
        .then((res: any) => {
          console.log("GetBalanceOperationSum", res);
        })
        .catch((err: Error) => console.log(err));
    }
  }, [hubConnection]);

  const handleClick = (id: number) => {
    if (id !== active) {
      setActive(id);
    }
  };

  const handleBalance = (id: number) => {
    if (id !== depositTabs) {
      setDepositTabs(id);
      if (id === 0) {
        setBalanceLogs([0, 1, 2, 3, 4, 5, 6, 7, 8]);
      } else if (id === 1) {
        setBalanceLogs([1]);
      } else if (id === 2) {
        setBalanceLogs([2]);
      }
    }
  };

  const filterData = () => {};

  console.log("list", list);

  if (user === null) {
    return null;
  }

  if (user === false) {
    return <Redirect to="/" />;
  }

  const operation = (id: number) => {
    if (id === 6) {
      return "Открытие депозита";
    } else if (id === 7) {
      return "Начисление дивидендов";
    } else if (id === 8) {
      return "Закрытие депозита";
    } else if (id === 2) {
      return "Вывод баланса";
    } else if (id === 1) {
      return "Пополнение баланса";
    }
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Header />
      <Styled.Page>
        <Container>
          <UpTitle>Личный кабинет</UpTitle>
        </Container>
        <Container>
          <Card>
            <Styled.InfoWrap>
              <Styled.UserBlock>
                <Styled.InfoTitle>{user}</Styled.InfoTitle>
                <Styled.BalanceItem>
                  <Styled.BalanceItemName>Баланс</Styled.BalanceItemName>
                  <Styled.BalanceItemValue pink>
                    {balance
                      ? (balance / 100000).toFixed(4).toLocaleString()
                      : "0"}
                  </Styled.BalanceItemValue>
                </Styled.BalanceItem>
              </Styled.UserBlock>
              <Styled.InfoButtons>
                <Button dangerOutline>Новый депозит</Button>
                <Button danger>Вывести деньги</Button>
              </Styled.InfoButtons>
            </Styled.InfoWrap>
            <Tabs>
              <Tab onClick={() => handleClick(0)} active={active === 0}>
                Информация
              </Tab>
              <Tab onClick={() => handleClick(1)} active={active === 1}>
                Депозиты
              </Tab>
              <Tab onClick={() => handleClick(2)} active={active === 2}>
                Баланс
              </Tab>
            </Tabs>
          </Card>
        </Container>

        <>
          <Styled.Content active={active === 0}>
            <Container>
              <Card>
                <Styled.Deposit>
                  <Styled.DepositItem>
                    <Styled.DepositName>Открытые депозиты</Styled.DepositName>
                    <Styled.DepositValue>
                      {activeDeposite ? activeDeposite.toLocaleString() : "-"}
                    </Styled.DepositValue>
                  </Styled.DepositItem>
                  <Styled.DepositItem>
                    <Styled.DepositName>Сумма в депозитах</Styled.DepositName>
                    <Styled.DepositValue>
                      {(depositTotal / 100000).toFixed(4).toLocaleString()}
                    </Styled.DepositValue>
                  </Styled.DepositItem>
                  <Styled.DepositItem>
                    <Styled.DepositName>Всего выплачено</Styled.DepositName>
                    <Styled.DepositValue>
                      {(totalPayed / 100000).toFixed(4).toLocaleString()}
                    </Styled.DepositValue>
                  </Styled.DepositItem>
                </Styled.Deposit>
              </Card>
            </Container>
            {!size && (
              <Styled.ContainerRow>
                <Styled.Half>
                  <Styled.HalfHead>
                    <Styled.HalfTitle>Выплаты</Styled.HalfTitle>
                    <Styled.HalfTabs>
                      <Styled.HalfTab
                        onClick={() => setCard(0)}
                        card={card === 0}
                      >
                        %
                      </Styled.HalfTab>
                      <Styled.HalfTab>/</Styled.HalfTab>
                      <Styled.HalfTab
                        onClick={() => setCard(1)}
                        card={card === 1}
                      >
                        CWD
                      </Styled.HalfTab>
                    </Styled.HalfTabs>
                  </Styled.HalfHead>
                  <Styled.HalfContent card={card === 0}>
                    <CSSTransition
                      in={card === 0}
                      timeout={300}
                      classNames="chart"
                      unmountOnExit
                    >
                      <TestChart
                        percent
                        labels={list.map((i: any) => i.deposit.name)}
                        series={list.map((i: any) => i.payedAmountView)}
                      />
                    </CSSTransition>
                    <Styled.NextPay>
                      Следующая выплата:{" "}
                      <Styled.Date>
                        {nextDate
                          ? moment(nextDate).format("DD MMMM YYYY")
                          : "-"}
                      </Styled.Date>
                    </Styled.NextPay>
                  </Styled.HalfContent>
                  <Styled.HalfContent card={card === 1}>
                    <CSSTransition
                      in={card === 1}
                      timeout={300}
                      classNames="chart"
                      unmountOnExit
                    >
                      <TestChart
                        labels={list.map((i: any) => i.deposit.name)}
                        series={list.map((i: any) => i.payedAmountView)}
                      />
                    </CSSTransition>
                    <Styled.NextPay>
                      Следующая выплата:{" "}
                      <Styled.Date>
                        {nextDate
                          ? moment(nextDate).format("DD MMMM YYYY")
                          : "-"}
                      </Styled.Date>
                    </Styled.NextPay>
                  </Styled.HalfContent>
                </Styled.Half>

                <Styled.Half>
                  <Styled.HalfHead>
                    <Styled.HalfTitle>Поступления</Styled.HalfTitle>
                    <Styled.HalfTabs>
                      <Styled.HalfTab
                        onClick={() => setCard2(0)}
                        card={card2 === 0}
                      >
                        %
                      </Styled.HalfTab>
                      <Styled.HalfTab>/</Styled.HalfTab>
                      <Styled.HalfTab
                        onClick={() => setCard2(1)}
                        card={card2 === 1}
                      >
                        CWD
                      </Styled.HalfTab>
                    </Styled.HalfTabs>
                  </Styled.HalfHead>
                  <Styled.HalfContent card={card2 === 0}>
                    <CSSTransition
                      in={card2 === 0}
                      timeout={300}
                      classNames="chart"
                      unmountOnExit
                    >
                      <TestChart
                        percent
                        labels={list.map((i: any) => i.deposit.name)}
                        series={list.map((i: any) => i.baseAmountView)}
                      />
                    </CSSTransition>
                  </Styled.HalfContent>
                  <Styled.HalfContent card={card2 === 1}>
                    <CSSTransition
                      in={card2 === 1}
                      timeout={300}
                      classNames="chart"
                      unmountOnExit
                    >
                      <TestChart
                        labels={list.map((i: any) => i.deposit.name)}
                        series={list.map((i: any) => i.baseAmountView)}
                      />
                    </CSSTransition>
                  </Styled.HalfContent>
                </Styled.Half>
              </Styled.ContainerRow>
            )}

            {size && (
              <Container>
                <Card>
                  <Styled.HalfTabs>
                    <Styled.MobHalfTab
                      onClick={() => setActiveMob(0)}
                      card={activMob === 0}
                    >
                      Выплаты
                    </Styled.MobHalfTab>
                    <Styled.MobHalfTab
                      onClick={() => setActiveMob(1)}
                      card={activMob === 1}
                    >
                      Поступления
                    </Styled.MobHalfTab>
                  </Styled.HalfTabs>
                  <Styled.Content active={activMob === 0}>
                    <CSSTransition
                      in={activMob === 0}
                      timeout={300}
                      classNames="chart"
                      unmountOnExit
                    >
                      <>
                        <Styled.HalfTabs>
                          <Styled.HalfTab
                            onClick={() => setCard(0)}
                            card={card === 0}
                          >
                            %
                          </Styled.HalfTab>
                          <Styled.HalfTab>/</Styled.HalfTab>
                          <Styled.HalfTab
                            onClick={() => setCard(1)}
                            card={card === 1}
                          >
                            CWD
                          </Styled.HalfTab>
                        </Styled.HalfTabs>
                        <Styled.HalfContent card={card === 0}>
                          <CSSTransition
                            in={card === 0}
                            timeout={300}
                            classNames="chart"
                            unmountOnExit
                          >
                            <TestChart
                              percent
                              mobHeight={150}
                              labels={list.map((i: any) => i.deposit.name)}
                              series={list.map((i: any) => i.payedAmountView)}
                            />
                          </CSSTransition>
                          <Styled.NextPay>
                            <Styled.Date></Styled.Date>
                          </Styled.NextPay>
                        </Styled.HalfContent>

                        <Styled.HalfContent card={card === 1}>
                          <CSSTransition
                            in={card === 1}
                            timeout={300}
                            classNames="chart"
                            unmountOnExit
                          >
                            <TestChart
                              mobHeight={150}
                              labels={list.map((i: any) => i.deposit.name)}
                              series={list.map((i: any) => i.payedAmountView)}
                            />
                          </CSSTransition>
                        </Styled.HalfContent>
                        <Styled.NextPay>
                          Следующая выплата:{" "}
                          <Styled.Date>
                            {nextDate
                              ? moment(nextDate).format("DD MMMM YYYY")
                              : "-"}
                          </Styled.Date>
                        </Styled.NextPay>
                      </>
                    </CSSTransition>
                  </Styled.Content>
                  <Styled.Content active={activMob === 1}>
                    <CSSTransition
                      in={activMob === 1}
                      timeout={300}
                      classNames="chart"
                      unmountOnExit
                    >
                      <>
                        <Styled.HalfTabs>
                          <Styled.HalfTab
                            onClick={() => setCard2(0)}
                            card={card2 === 0}
                          >
                            %
                          </Styled.HalfTab>
                          <Styled.HalfTab>/</Styled.HalfTab>
                          <Styled.HalfTab
                            onClick={() => setCard2(1)}
                            card={card2 === 1}
                          >
                            CWD
                          </Styled.HalfTab>
                        </Styled.HalfTabs>

                        <Styled.HalfContent card={card2 === 0}>
                          <CSSTransition
                            in={card2 === 0}
                            timeout={300}
                            classNames="chart"
                            unmountOnExit
                          >
                            <TestChart
                              percent
                              mobHeight={150}
                              labels={list.map((i: any) => i.deposit.name)}
                              series={list.map((i: any) => i.baseAmountView)}
                            />
                          </CSSTransition>
                          <Styled.NextPay>
                            <Styled.Date></Styled.Date>
                          </Styled.NextPay>
                        </Styled.HalfContent>

                        <Styled.HalfContent card={card2 === 1}>
                          <CSSTransition
                            in={card2 === 1}
                            timeout={300}
                            classNames="chart"
                            unmountOnExit
                          >
                            <TestChart
                              mobHeight={150}
                              labels={list.map((i: any) => i.deposit.name)}
                              series={list.map((i: any) => i.baseAmountView)}
                            />
                          </CSSTransition>
                          <Styled.NextPay>
                            <Styled.Date></Styled.Date>
                          </Styled.NextPay>
                        </Styled.HalfContent>
                      </>
                    </CSSTransition>
                  </Styled.Content>
                </Card>
              </Container>
            )}
          </Styled.Content>

          <Styled.Content active={active === 1}>
            <Container>
              <Card>
                <Tables list={list} />
              </Card>
            </Container>
          </Styled.Content>

          <Styled.Content active={active === 2}>
            <Container>
              <Styled.BalanceWrap>
                <Styled.BalanceList>
                  <Styled.BalanceItem>
                    <Styled.BalanceItemName>Баланс</Styled.BalanceItemName>
                    <Styled.BalanceItemValue pink>
                      {balance
                        ? (balance / 100000).toFixed(4).toLocaleString()
                        : "0"}
                    </Styled.BalanceItemValue>
                  </Styled.BalanceItem>

                  <Styled.BalanceItem>
                    <Styled.BalanceItemName>Поступления</Styled.BalanceItemName>
                    <Styled.BalanceItemValue pink>
                      {(depositTotal / 100000).toFixed(4).toLocaleString()}
                    </Styled.BalanceItemValue>
                  </Styled.BalanceItem>

                  <Styled.BalanceItem>
                    <Styled.BalanceItemName>Выводы</Styled.BalanceItemName>
                    <Styled.BalanceItemValue>
                      {(totalPayed / 100000).toFixed(4).toLocaleString()}
                    </Styled.BalanceItemValue>
                  </Styled.BalanceItem>
                </Styled.BalanceList>
                <Button onClick={() => setOpen(true)}>За все время</Button>
              </Styled.BalanceWrap>
            </Container>

            <Container>
              <Card>
                <Styled.BalanceTabHead>
                  <Styled.BalanceTabItem
                    onClick={() => handleBalance(0)}
                    active={depositTabs === 0}
                  >
                    Все операции
                  </Styled.BalanceTabItem>
                  <Styled.BalanceTabItem
                    onClick={() => handleBalance(1)}
                    active={depositTabs === 1}
                  >
                    Поступления
                  </Styled.BalanceTabItem>
                  <Styled.BalanceTabItem
                    onClick={() => handleBalance(2)}
                    active={depositTabs === 2}
                  >
                    Выводы
                  </Styled.BalanceTabItem>
                </Styled.BalanceTabHead>
              </Card>
            </Container>

            <Container>
              <Card>
                <Styled.DataListWrap>
                  <Styled.DataList>
                    <Styled.DataListHead>
                      <Styled.DataListItem>
                        <Styled.DataListName>Название</Styled.DataListName>
                        <Styled.DataListName>Сумма</Styled.DataListName>
                      </Styled.DataListItem>
                    </Styled.DataListHead>
                    {balanceLog ? (
                      Object.keys(balanceLog).map((key) => (
                        <div key={key}>
                          <Styled.DataListDate>{key}</Styled.DataListDate>

                          {balanceLog[key].map((item, idx) => (
                            <Styled.DataListItem key={item.id + idx}>
                              <Styled.DataListName>
                                {operation(item.operationKind)}
                              </Styled.DataListName>
                              <Styled.DataListSum
                                plus={item.operationKind !== 6}
                              >
                                {item.operationKind !== 6 ? "+" : "-"}{" "}
                                {item.balance}
                              </Styled.DataListSum>
                            </Styled.DataListItem>
                          ))}
                        </div>
                      ))
                    ) : (
                      <div>нет данных</div>
                    )}
                  </Styled.DataList>
                </Styled.DataListWrap>
              </Card>
            </Container>
          </Styled.Content>
          {open && (
            <Modal onClose={onClose}>
              <ModalContent>
                <ModalTitle>Выберите период</ModalTitle>
                <ModalItem>
                  <DateTitle>Этот месяц</DateTitle>
                  <DateText>Февраль 2021</DateText>
                </ModalItem>
                <ModalItem>
                  <DateTitle>Этот год</DateTitle>
                  <DateText>2021</DateText>
                </ModalItem>
                <ModalItem>
                  <DateTitle></DateTitle>
                  <DateText red>За все время</DateText>
                </ModalItem>
                <DateTitle>Свободный</DateTitle>
              </ModalContent>
              <ModalCalendarInput />
            </Modal>
          )}
        </>
      </Styled.Page>
    </>
  );
};

const ChartBlock = styled.div`
  width: 100%;
`;

const ModalContent = styled.div`
  padding-top: 10px;
`;

const ModalTitle = styled.h3`
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
  color: #0e0d3d;
  padding-bottom: 15px;
`;

const ModalItem = styled.div`
  border-bottom: 1px solid rgba(66, 139, 202, 0.2);
  padding: 10px 0;
`;

const DateTitle = styled.p`
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: #515172;
  opacity: 0.4;
  text-align: center;
  padding-bottom: 5px;
`;

const DateText = styled.p<{ red?: boolean }>`
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  color: ${(props) => (props.red ? "#FF416E" : "#515172")};
  text-align: center;
`;
