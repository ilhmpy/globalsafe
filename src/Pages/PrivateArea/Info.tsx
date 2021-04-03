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
import { AmountContext } from "../../context/AmountContext";
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
import { DepositListModal } from "./Modals";
import InfiniteScroll from "react-infinite-scroller";
import { Scrollbars } from "react-custom-scrollbars";
import { Loading } from "../../components/UI/Loading";
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
  const [selectedYear, setSelectedYear] = useState<any>("2021");
  const [selectedMonth, setSelectedMonth] = useState<any>("3");
  const [depositSelect, setDepositSelect] = useState<null | DepositsCollection>(
    null
  );
  const [depositsList, setDepositsList] = useState<DepositsCollection[] | null>(
    null
  );
  const [openDate, setOpenDate] = useState<OpenDate>({
    from: new Date("2019-01-01T00:47:45"),
    to: new Date(),
  });
  const [selected, setSelected] = useState("За все время");
  const sizes = useWindowSize();
  const size = sizes < 992;
  const appContext = useContext(AppContext);
  const user = appContext.user;
  const balance = appContext.balance;
  const amountContext = useContext(AmountContext);
  const { totalPayed, depositTotal } = amountContext;
  const [count, setCount] = useState(true);
  const [num, setNum] = useState(20);
  const [loading, setLoading] = useState(true);
  const [loadDeposit, setLoadDeposit] = useState(false);
  const inputRef = useRef<any>(null);

  const yearSelected = () => {
    let year = moment().format("YYYY");
    let yearStart: any = moment(year, "YYYY").startOf("month");
    let yearEnd: any = moment(year, "YYYY").endOf("year");
    setOpenDate({
      from: yearStart._d,
      to: yearEnd._d,
    });
    setSelected(`За ${moment().format("YYYY")}`);
    onClose();
  };

  const monthSelected = () => {
    let currentMonth = moment().format("MMYYYY");
    let currentMonthStart: any = moment(currentMonth, "M.YYYY").startOf(
      "month"
    );
    let currentMonthEnd: any = moment(currentMonth, "M.YYYY").endOf("month");
    setOpenDate({
      from: currentMonthStart._d,
      to: currentMonthEnd._d,
    });
    setSelected(`За ${moment().format("MMMM YYYY")}`);
    onClose();
  };

  const rangeDate = (from: Date, to: Date) => {
    setOpenDate({
      from: from,
      to: to,
    });
    setSelected(
      `${moment(from).format("DD.MM.YY")} - ${moment(to).format("DD.MM.YY")}`
    );
    onClose();
  };

  const allDate = () => {
    setOpenDate({
      from: new Date("2019-01-01T00:47:45"),
      to: new Date(),
    });
    setSelected("За все время");
    onClose();
  };

  useEffect(() => {
    if (withdrawValue || addDepositValue) {
      inputRef.current.focus();
    }
  }, [withdrawValue, addDepositValue]);

  const hubConnection = appContext.hubConnection;

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke<RootDeposits>("GetDeposits", 1, 0, 10)
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
        .invoke<RootList>("GetUserDeposits", [1, 2, 3, 4, 5, 6], 0, 20)
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
          openDate.from || new Date("2021-02-09T00:47:45"),
          openDate.to || new Date(),
          0,
          30
        )
        .then((res: any) => {
          setLoading(false);
          setNum(20);
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
        .catch((err: Error) => {
          setLoading(false);
          console.log(err);
        });
    }
  }, [hubConnection, openDate, balanceLogs]);

  const myLoad = () => {
    if (hubConnection) {
      setCount(false);
      hubConnection
        .invoke(
          "GetBalanceLog",
          1,
          balanceLogs,
          openDate.from,
          openDate.to,
          num,
          30
        )
        .then((res) => {
          setLoading(false);
          if (res.collection.length) {
            // console.log("loadMoreItems", res);

            if (res.collection.length) {
              let result: any = {};
              res.collection.forEach((item: any) => {
                const d = moment(item.operationDate).format("DD MMMM YYYY");
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
              setBalanceLog(Object.assign(balanceLog, result));
            } else {
              setBalanceLog(null);
            }

            setCount(true);
            setNum(num + 20);
          }
        })
        .catch((err: Error) => {
          setLoading(false);
          console.log(err);
        });
    }
  };

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
          // console.log("GetBalanceOperationSum", res);
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
        .invoke("Withdraw", 1, +withdrawValue * 100000)
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

  const handleBackModal = () => {
    setAddDeposit(true);
    setDepositListModal(false);
  };

  const selectDeposit = (item: DepositsCollection) => {
    handleBackModal();
    setDepositSelect(item);
    setAddDepositValue((item.minAmount / 100000).toString());
  };

  const openNewDeposit = () => {
    setAddDeposit(false);
    if (hubConnection && depositSelect !== null) {
      setLoadDeposit(true);
      hubConnection
        .invoke(
          "CreateUserDeposit",
          +addDepositValue * 100000,
          depositSelect.safeId
        )
        .then((res) => {
          console.log("CreateUserDeposit", res);
          setLoadDeposit(false);
          setWithdraw(false);
          setWithdrawValue("");
          if (res === true) {
            alert("Успешно", "Депозит успешно создан", "success");
          } else {
            alert("Ошибка", "Депозит не создан", "danger");
          }
        })
        .catch((err: Error) => {
          console.log(err);
          setLoadDeposit(false);
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

  const handleDepositModal = () => {
    setAddDeposit(false);
    setDepositListModal(true);
  };

  const onHandleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
    let start: any = moment(
      `${selectedMonth}.${e.target.value}`,
      "M.YYYY"
    ).startOf("month");

    let end: any = moment(`${selectedMonth}.${e.target.value}`, "M.YYYY").endOf(
      "month"
    );
    setOpenDate({ from: start._d, to: end._d });
    onClose();
  };

  const minOffset = 0;
  const maxOffset = 10;
  const thisYear = new Date().getFullYear();
  const thisMonth = moment.months();
  const options = [];

  for (let i = minOffset; i <= maxOffset; i++) {
    const year = thisYear - i;
    options.push(<option value={year}>{year}</option>);
  }

  const onHandleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.target.value);
    let start: any = moment(
      `${e.target.value}.${selectedYear}`,
      "M.YYYY"
    ).startOf("month");
    let end: any = moment(`${e.target.value}.${selectedYear}`, "M.YYYY").endOf(
      "month"
    );

    setOpenDate({ from: start._d, to: end._d });
    onClose();
  };

  const allTime = () => {
    setOpenDate({ from: new Date("2021-02-09T00:47:45"), to: new Date() });
    onClose();
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
                  Вывести средства
                </Button>
              </Styled.InfoButtons>
            </Styled.InfoWrap>
            <Tabs>
              <Styled.NavTabs to="/info">
                <div>Информация</div>{" "}
              </Styled.NavTabs>
              <Styled.NavTabs to="/deposits">
                <div>Депозиты</div>{" "}
              </Styled.NavTabs>
              <Styled.NavTabs to="/balance">
                <div>Баланс</div>{" "}
              </Styled.NavTabs>
            </Tabs>
          </Card>
        </Container>

        <>
          {loadDeposit && (
            <Styled.Loader>
              <Loading />
            </Styled.Loader>
          )}
          <Container>
            <Card>
              <Styled.Deposit>
                <Styled.DepositItem>
                  <Styled.DepositName>Открытые депозиты</Styled.DepositName>
                  <Styled.DepositValue>
                    {activeDeposite ? activeDeposite : "-"}
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
                      labels={
                        list.length
                          ? list.map((i: any) => i.deposit.name)
                          : [""]
                      }
                      series={
                        list.length
                          ? list.map((i: any) => i.payedAmountView)
                          : [""]
                      }
                    />
                  </CSSTransition>
                  <Styled.NextPay>
                    Следующая выплата:{" "}
                    <Styled.Date>
                      {nextDate ? moment(nextDate).format("DD MMMM YYYY") : "-"}
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
                      labels={
                        list.length
                          ? list.map((i: any) => i.deposit.name)
                          : [""]
                      }
                      series={
                        list.length
                          ? list.map((i: any) => i.payedAmountView)
                          : [""]
                      }
                    />
                  </CSSTransition>
                  <Styled.NextPay>
                    Следующая выплата:{" "}
                    <Styled.Date>
                      {nextDate ? moment(nextDate).format("DD MMMM YYYY") : "-"}
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
                      labels={
                        list.length
                          ? list.map((i: any) => i.deposit.name)
                          : [""]
                      }
                      series={
                        list.length
                          ? list.map((i: any) => i.baseAmountView)
                          : [""]
                      }
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
                      labels={
                        list.length
                          ? list.map((i: any) => i.deposit.name)
                          : [""]
                      }
                      series={
                        list.length
                          ? list.map((i: any) => i.baseAmountView)
                          : [""]
                      }
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
                            mobHeight={list.length ? 150 : 0}
                            labels={
                              list.length
                                ? list.map((i: any) => i.deposit.name)
                                : [""]
                            }
                            series={
                              list.length
                                ? list.map((i: any) => i.payedAmountView)
                                : [""]
                            }
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
                            mobHeight={list.length ? 150 : 0}
                            labels={
                              list.length
                                ? list.map((i: any) => i.deposit.name)
                                : [""]
                            }
                            series={
                              list.length
                                ? list.map((i: any) => i.payedAmountView)
                                : [""]
                            }
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
                            mobHeight={list.length ? 150 : 0}
                            labels={
                              list.length
                                ? list.map((i: any) => i.deposit.name)
                                : [""]
                            }
                            series={
                              list.length
                                ? list.map((i: any) => i.baseAmountView)
                                : [""]
                            }
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
                            mobHeight={list.length ? 150 : 0}
                            labels={
                              list.length
                                ? list.map((i: any) => i.deposit.name)
                                : [""]
                            }
                            series={
                              list.length
                                ? list.map((i: any) => i.baseAmountView)
                                : [""]
                            }
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

          <CSSTransition
            in={open}
            timeout={300}
            classNames="modal"
            unmountOnExit
          >
            <Styled.ModalWrap>
              <Modal onClose={onClose}>
                <Styled.ModalContent>
                  {/* <Arrow onClick={onClose} /> */}
                  <Styled.ModalTitle>Выберите период</Styled.ModalTitle>
                  <Styled.ModalItem>
                    <Styled.DateTitle>Этот месяц</Styled.DateTitle>
                    <Styled.DateText onClick={monthSelected}>
                      {moment().format("MMMM YYYY")}
                    </Styled.DateText>
                  </Styled.ModalItem>
                  <Styled.ModalItem>
                    <Styled.DateTitle>Этот год</Styled.DateTitle>
                    <Styled.DateText onClick={yearSelected}>
                      {moment().format("YYYY")}
                    </Styled.DateText>
                  </Styled.ModalItem>
                  <Styled.ModalItem>
                    <Styled.DateTitle></Styled.DateTitle>
                    <Styled.DateText onClick={allDate}>
                      За все время
                    </Styled.DateText>
                  </Styled.ModalItem>
                </Styled.ModalContent>
                <ModalRangeInput
                  onClose={onClose}
                  openDate={openDate}
                  setOpenDate={rangeDate}
                />
              </Modal>
            </Styled.ModalWrap>
          </CSSTransition>
          {withdraw && (
            <Modal onClose={() => setWithdraw(false)}>
              <Styled.ModalBlock>
                <Styled.ModalTitle>Вывести средства</Styled.ModalTitle>
                <Input
                  onChange={(e) => setWithdrawValue(e.target.value)}
                  placeholder="Введите сумму"
                  step="any"
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
                  Вывести средства
                </Styled.ModalButton>
              </Styled.ModalBlock>
            </Modal>
          )}
          <CSSTransition
            in={addDeposit && !depositListModal}
            timeout={300}
            classNames="modal"
            unmountOnExit
          >
            <Styled.ModalDepositsWrap>
              <Modal width={540} onClose={() => setAddDeposit(false)}>
                <Styled.ModalTitle mt>Добавить депозит</Styled.ModalTitle>
                <Styled.ModalDeposits>
                  <div>
                    <Styled.ModalButton
                      mb
                      as="button"
                      onClick={handleDepositModal}
                      dangerOutline
                    >
                      {depositSelect ? depositSelect.name : "Выберите депозит"}{" "}
                      <Styled.IconRotate rights>
                        <Styled.ModalBack />
                      </Styled.IconRotate>
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
          </CSSTransition>
          <DepositListModal
            depositListModal={depositListModal}
            setDepositListModal={setDepositListModal}
            handleBackModal={handleBackModal}
            depositsList={depositsList}
            selectDeposit={selectDeposit}
          />
        </>
      </Styled.Page>
    </>
  );
};
