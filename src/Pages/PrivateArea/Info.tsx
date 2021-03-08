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

export const Info = () => {
  const [active, setActive] = useState(0);
  const [activeDeposite, setActiveDeposite] = useState(0);
  const [card, setCard] = useState(0);
  const [card2, setCard2] = useState(0);
  const [activMob, setActiveMob] = useState(0);
  const [list, setList] = useState<Collection[]>([]);
  const sizes = useWindowSize();
  const size = sizes < 992;
  const appContext = useContext(AppContext);
  const user = appContext.user;

  const hubConnection = appContext.hubConnection;
  const loading = appContext.loading;

  // const chartData = useMemo(() => list.map(item), [])

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke<RootList>("GetUserDeposits", [1, 2, 3, 4], 0, 30)
        .then((res: any) => {
          setList(res.collection);
        })
        .catch((err: Error) => console.log(err));
    }
  }, [hubConnection]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke(
          "GetBalanceLog",
          1,
          [0, 1, 2, 3, 4, 5, 6, 7, 8],
          new Date("2021-02-09T00:47:45"),
          new Date(),
          0,
          10
        )
        .then((res: any) => {
          console.log("res", res);
        })
        .catch((err: Error) => console.log(err));
    }
  }, [hubConnection]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke("GetActiveDeposits")
        .then((res: any) => {
          console.log("res active", res);
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

  const depositSum = useMemo(
    () =>
      list.reduce((a, b) => {
        return a + b.amountView;
      }, 0),
    [list]
  );

  const allSum = useMemo(
    () =>
      list.reduce((a, b) => {
        return a + b.baseAmountView;
      }, 0),
    [list]
  );

  const handleClick = (id: number) => {
    if (id !== active) {
      setActive(id);
    }
  };

  console.log("list", list);

  if (user === null) {
    return null;
  }

  if (user === false) {
    return <Redirect to="/" />;
  }

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
              <Styled.InfoTitle>{user}</Styled.InfoTitle>
              {/* <InfoButtons>
                <Button dangerOutline>Новый депозит</Button>
                <Button danger>Вывести деньги</Button>
              </InfoButtons> */}
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
                      {activeDeposite ? activeDeposite.toLocaleString() : ""}
                    </Styled.DepositValue>
                  </Styled.DepositItem>
                  <Styled.DepositItem>
                    <Styled.DepositName>Сумма в депозитах</Styled.DepositName>
                    <Styled.DepositValue>
                      {depositSum ? depositSum.toFixed(2).toLocaleString() : ""}
                    </Styled.DepositValue>
                  </Styled.DepositItem>
                  <Styled.DepositItem>
                    <Styled.DepositName>Всего выплачено</Styled.DepositName>
                    <Styled.DepositValue>
                      {allSum ? allSum.toFixed(2).toLocaleString() : ""}
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
                        series={list.map((i: any) => i.amountView)}
                      />
                    </CSSTransition>
                    <Styled.NextPay>
                      Следующая выплата:{" "}
                      <Styled.Date>01 марта 2021</Styled.Date>
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
                        series={list.map((i: any) => i.amountView)}
                      />
                    </CSSTransition>
                    <Styled.NextPay>
                      Следующая выплата:{" "}
                      <Styled.Date>01 марта 2021</Styled.Date>
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
                              labels={list.map((i: any) => i.deposit.name)}
                              series={list.map((i: any) => i.amountView)}
                            />
                          </CSSTransition>
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
                              series={list.map((i: any) => i.amountView)}
                            />
                          </CSSTransition>
                        </Styled.HalfContent>
                        <Styled.NextPay>
                          Следующая выплата:{" "}
                          <Styled.Date>01 марта 2021</Styled.Date>
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
                      110 500
                    </Styled.BalanceItemValue>
                  </Styled.BalanceItem>

                  <Styled.BalanceItem>
                    <Styled.BalanceItemName>Поступления</Styled.BalanceItemName>
                    <Styled.BalanceItemValue pink>
                      80 000
                    </Styled.BalanceItemValue>
                  </Styled.BalanceItem>

                  <Styled.BalanceItem>
                    <Styled.BalanceItemName>Выводы</Styled.BalanceItemName>
                    <Styled.BalanceItemValue>30 500</Styled.BalanceItemValue>
                  </Styled.BalanceItem>
                </Styled.BalanceList>
                <Button>За все время</Button>
              </Styled.BalanceWrap>
            </Container>

            <Container>
              <Card>
                <Styled.BalanceTabHead>
                  <Styled.BalanceTabItem active>
                    Все операции
                  </Styled.BalanceTabItem>
                  <Styled.BalanceTabItem>Поступления</Styled.BalanceTabItem>
                  <Styled.BalanceTabItem>Выводы</Styled.BalanceTabItem>
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
                    <Styled.DataListDate>
                      25 февраля 2021 г.
                    </Styled.DataListDate>
                    <Styled.DataListItem>
                      <Styled.DataListName>
                        Начисление дивидендов
                      </Styled.DataListName>
                      <Styled.DataListSum plus>+ 50 000</Styled.DataListSum>
                    </Styled.DataListItem>
                    <Styled.DataListItem>
                      <Styled.DataListName>
                        Начисление дивидендов
                      </Styled.DataListName>
                      <Styled.DataListSum plus>+ 3 000</Styled.DataListSum>
                    </Styled.DataListItem>
                    <Styled.DataListItem>
                      <Styled.DataListName>
                        Открытие депозита
                      </Styled.DataListName>
                      <Styled.DataListSum>- 20 000</Styled.DataListSum>
                    </Styled.DataListItem>
                    <Styled.DataListDate>
                      25 февраля 2021 г.
                    </Styled.DataListDate>
                    <Styled.DataListItem>
                      <Styled.DataListName>
                        Начисление дивидендов
                      </Styled.DataListName>
                      <Styled.DataListSum plus>+ 36 000</Styled.DataListSum>
                    </Styled.DataListItem>
                    <Styled.DataListItem>
                      <Styled.DataListName>
                        Начисление дивидендов
                      </Styled.DataListName>
                      <Styled.DataListSum plus>+ 30 000</Styled.DataListSum>
                    </Styled.DataListItem>
                    <Styled.DataListItem>
                      <Styled.DataListName>
                        Начисление дивидендов
                      </Styled.DataListName>
                      <Styled.DataListSum>- 10 000</Styled.DataListSum>
                    </Styled.DataListItem>
                  </Styled.DataList>
                </Styled.DataListWrap>
              </Card>
            </Container>
          </Styled.Content>
        </>
      </Styled.Page>
    </>
  );
};

const ChartBlock = styled.div`
  width: 100%;
`;
