import React, {
  useState,
  MouseEvent,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { Header } from "../../components/Header/Header";
import styled, { css } from "styled-components/macro";
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
import { ReactComponent as Left } from "../../assets/svg/arrowLeftModal.svg";
import moment from "moment";
import "moment/locale/ru";
import { ModalRangeInput } from "../../components/UI/DayPicker";
import { Input } from "../../components/UI/Input";
import { OpenDate } from "../../types/dates";
import { RootDeposits, DepositsCollection } from "../../types/info";
import ReactNotification, { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
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
  const [balanceLogs, setBalanceLogs] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  const [open, setOpen] = useState(false);
  const [withdraw, setWithdraw] = useState(false);
  const [addDeposit, setAddDeposit] = useState(false);
  const [withdrawValue, setWithdrawValue] = useState("");
  const [addDepositValue, setAddDepositValue] = useState("");
  const [depositListModal, setDepositListModal] = useState(false);
  const [depositSelect, setDepositSelect] = useState<null | DepositsCollection>(
    null
  );
  const [depositsList, setDepositsList] = useState<DepositsCollection[] | null>(
    null
  );
  const [openDate, setOpenDate] = useState<OpenDate>({
    from: undefined,
    to: undefined,
  });
  const sizes = useWindowSize();
  const size = sizes < 992;
  const appContext = useContext(AppContext);
  const user = appContext.user;
  const balance = appContext.balance;
  const inputRef = useRef<any>(null);

  useEffect(() => {
    if (withdrawValue) {
      inputRef.current.focus();
    }
  }, [withdrawValue]);

  const hubConnection = appContext.hubConnection;
  const loading = appContext.loading;

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke<RootDeposits>("GetDeposits", 0, 10)
        .then((res) => {
          if (res.collection.length) {
            setDepositsList(res.collection);
          }
        })
        .catch((err: Error) => console.log(err));
    }
  }, [hubConnection]);

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
        .invoke(
          "GetBalanceLog",
          1,
          balanceLogs,
          openDate.from && new Date("2021-02-09T00:47:45"),
          openDate.to && new Date(),
          0,
          30
        )
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
                id: item.referenceSafeId,
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
  }, [hubConnection, openDate, balanceLogs]);

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
        setBalanceLogs([1, 7, 8]);
      } else if (id === 2) {
        setBalanceLogs([2]);
      }
    }
  };

  const filterData = () => {};

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

  const alert = (
    title: string,
    message: string,
    type: "success" | "default" | "warning" | "info" | "danger"
  ) => {
    store.addNotification({
      title: title,
      message: message,
      type: type,
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
      },
    });
  };

  const withdrawBalance = () => {
    if (hubConnection) {
      hubConnection
        .invoke("Withdraw", 1, +withdrawValue)
        .then((res) => {
          // console.log("Withdraw", res);
          if (res === 1) {
            setWithdraw(false);
            setWithdrawValue("");
            alert("Успешно", "Средства успешно переведены", "success");
          } else {
            setWithdraw(false);
            setWithdrawValue("");
            alert("Ошибка", "Ошибка вывода", "danger");
          }
        })
        .catch((err: Error) => {
          setWithdraw(false);
          setWithdrawValue("");
          alert("Ошибка", "Ошибка вывода", "danger");
        });
    }
  };

  const selectDeposit = (item: DepositsCollection) => {
    console.log("item", item);
    setDepositSelect(item);
    setDepositListModal(false);
    setAddDepositValue((item.minAmount / 100000).toString());
    setAddDeposit(true);
  };

  const openNewDeposit = () => {
    setAddDeposit(false);
    if (hubConnection && depositSelect !== null) {
      hubConnection
        .invoke("CreateUserDeposit", addDepositValue, depositSelect.id)
        .then((res) => {
          // console.log("CreateUserDeposit", res);
          if (res === 1) {
            setWithdraw(false);
            setWithdrawValue("");
            alert("Успешно", "Депозит успешно создан", "success");
          } else {
            setWithdraw(false);
            setWithdrawValue("");
            alert("Ошибка", "Депозит не создан", "danger");
          }
        })
        .catch((err: Error) => {
          setWithdraw(false);
          setWithdrawValue("");
          alert("Ошибка", "Депозит не создан", "danger");
        })
        .finally(() => {
          setDepositSelect(null);
          setAddDepositValue("");
        });
    }
  };

  return (
    <>
      <Header />
      <Styled.Page>
        <Container>
          <UpTitle>Личный кабинет</UpTitle>
        </Container>
        <ReactNotification />
        <Container>
          <Card>
            <Styled.InfoWrap>
              <Styled.UserBlock>
                <Styled.InfoTitle>{user}</Styled.InfoTitle>
                <Styled.BalanceItem>
                  <Styled.BalanceItemName>Баланс</Styled.BalanceItemName>
                  <Styled.BalanceItemValue pink>
                    {balance ? (balance / 100000).toLocaleString() : "0"}
                  </Styled.BalanceItemValue>
                </Styled.BalanceItem>
              </Styled.UserBlock>
              <Styled.InfoButtons>
                <Button dangerOutline onClick={() => setAddDeposit(true)}>
                  Новый депозит
                </Button>
                <Button danger onClick={() => setWithdraw(true)}>
                  Вывести деньги
                </Button>
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
                      {activeDeposite
                        ? (activeDeposite / 100000).toLocaleString()
                        : "-"}
                    </Styled.DepositValue>
                  </Styled.DepositItem>
                  <Styled.DepositItem>
                    <Styled.DepositName>Сумма в депозитах</Styled.DepositName>
                    <Styled.DepositValue>
                      {(depositTotal / 100000).toLocaleString()}
                    </Styled.DepositValue>
                  </Styled.DepositItem>
                  <Styled.DepositItem>
                    <Styled.DepositName>Всего выплачено</Styled.DepositName>
                    <Styled.DepositValue>
                      {(totalPayed / 100000).toLocaleString()}
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
                      {balance ? (balance / 100000).toLocaleString() : "0"}
                    </Styled.BalanceItemValue>
                  </Styled.BalanceItem>

                  <Styled.BalanceItem>
                    <Styled.BalanceItemName>Поступления</Styled.BalanceItemName>
                    <Styled.BalanceItemValue pink>
                      {(depositTotal / 100000).toLocaleString()}
                    </Styled.BalanceItemValue>
                  </Styled.BalanceItem>

                  <Styled.BalanceItem>
                    <Styled.BalanceItemName>Выводы</Styled.BalanceItemName>
                    <Styled.BalanceItemValue>
                      {(totalPayed / 100000).toLocaleString()}
                    </Styled.BalanceItemValue>
                  </Styled.BalanceItem>
                </Styled.BalanceList>
                <Button onClick={() => setOpen(true)}>
                  {openDate.from ? (
                    <span>
                      {moment(openDate.from).format("DD.MM.YYYY") +
                        "-" +
                        moment(openDate.to).format("DD.MM.YYYY")}
                    </span>
                  ) : (
                    "За все время"
                  )}
                </Button>
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
                              <Styled.DataListSum plus={item.balance >= 0}>
                                {item.balance < 0
                                  ? ""
                                  : item.operationKind !== 6
                                  ? "+"
                                  : "-"}{" "}
                                {(item.balance / 100000)
                                  .toFixed(5)
                                  .toLocaleString()}
                              </Styled.DataListSum>
                            </Styled.DataListItem>
                          ))}
                        </div>
                      ))
                    ) : (
                      <Styled.NotFound>
                        Данные не обнаружены. Попробуйте изменить параметры
                        поиска.
                      </Styled.NotFound>
                    )}
                  </Styled.DataList>
                </Styled.DataListWrap>
              </Card>
            </Container>
          </Styled.Content>
          {open && (
            <Styled.ModalWrap>
              <Modal onClose={onClose}>
                <Styled.ModalContent>
                  {/* <Arrow onClick={onClose} /> */}
                  <Styled.ModalTitle>Выберите период</Styled.ModalTitle>
                  <Styled.ModalItem>
                    <Styled.DateTitle>Этот месяц</Styled.DateTitle>
                    <Styled.DateText>
                      {moment().format("MMMM YYYY")}
                    </Styled.DateText>
                  </Styled.ModalItem>
                  <Styled.ModalItem>
                    <Styled.DateTitle>Этот год</Styled.DateTitle>
                    <Styled.DateText>{moment().format("YYYY")}</Styled.DateText>
                  </Styled.ModalItem>
                  <Styled.ModalItem>
                    <Styled.DateTitle></Styled.DateTitle>
                    <Styled.DateText red>За все время</Styled.DateText>
                  </Styled.ModalItem>
                  <Styled.DateTitle>Свободный</Styled.DateTitle>
                </Styled.ModalContent>
                <ModalRangeInput
                  onClose={onClose}
                  openDate={openDate}
                  setOpenDate={setOpenDate}
                />
              </Modal>
            </Styled.ModalWrap>
          )}
          {withdraw && (
            <Modal onClose={() => setWithdraw(false)}>
              <Styled.ModalBlock>
                <Styled.ModalTitle>Вывести деньги</Styled.ModalTitle>
                <Input
                  onChange={(e) => setWithdrawValue(e.target.value)}
                  placeholder="Введите сумму"
                  type="number"
                  ref={inputRef}
                  value={withdrawValue}
                />
                <Styled.ModalButton
                  as="button"
                  disabled={!withdrawValue}
                  onClick={withdrawBalance}
                  danger
                >
                  Вывести деньги
                </Styled.ModalButton>
              </Styled.ModalBlock>
            </Modal>
          )}
          {addDeposit && (
            <Styled.ModalDepositsWrap>
              <Modal width={540} onClose={() => setAddDeposit(false)}>
                <Styled.ModalTitle mt>Добавить депозит</Styled.ModalTitle>
                <Styled.ModalDeposits>
                  <div>
                    <Styled.ModalButton
                      mb
                      as="button"
                      onClick={() => setDepositListModal(true)}
                      dangerOutline
                    >
                      {depositSelect ? depositSelect.name : "Выберите депозит"}{" "}
                      <Styled.ModalBack right />
                    </Styled.ModalButton>
                    <Input
                      onChange={(e) => setAddDepositValue(e.target.value)}
                      placeholder="Введите сумму"
                      type="number"
                      ref={inputRef}
                      value={addDepositValue}
                    />
                    <Styled.ModalButton
                      as="button"
                      disabled={!addDepositValue}
                      onClick={openNewDeposit}
                      danger
                    >
                      Добавить
                    </Styled.ModalButton>
                  </div>
                  {depositSelect ? (
                    <Styled.Conditions>
                      {depositSelect.description}
                    </Styled.Conditions>
                  ) : (
                    ""
                  )}
                </Styled.ModalDeposits>
              </Modal>
            </Styled.ModalDepositsWrap>
          )}
          {depositListModal && (
            <Modal onClose={() => setDepositListModal(false)}>
              <Styled.ModalBack onClick={() => setDepositListModal(false)} />
              <Styled.ModalTitle>Добавить депозит</Styled.ModalTitle>
              <Styled.ModalList>
                <Styled.ModalListItem>
                  <Styled.ModalListText head>Название</Styled.ModalListText>
                  <Styled.ModalListText head>Мин. платеж</Styled.ModalListText>
                  <Styled.ModalListText head>Срок вклада</Styled.ModalListText>
                </Styled.ModalListItem>
                {depositsList
                  ? depositsList.map((item) => (
                      <Styled.ModalListItem
                        key={item.id}
                        onClick={() => selectDeposit(item)}
                      >
                        <Styled.ModalListText>{item.name}</Styled.ModalListText>
                        <Styled.ModalListText>
                          {(item.minAmount / 100000).toLocaleString()}
                        </Styled.ModalListText>
                        <Styled.ModalListText>
                          {item.duration} дн
                        </Styled.ModalListText>
                      </Styled.ModalListItem>
                    ))
                  : ""}
              </Styled.ModalList>
            </Modal>
          )}
        </>
      </Styled.Page>
    </>
  );
};
