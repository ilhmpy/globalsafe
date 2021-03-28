import React, {
  useState,
  MouseEvent,
  useContext,
  useEffect,
  useMemo,
  useRef,
  FC,
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
import { DepositListModal, ModalDividends } from "./Modals";
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

type BalanceTableProps = {
  balanceLog: any;
};

const BalanceTable: FC<BalanceTableProps> = ({ balanceLog }) => {
  const [divModal, setDivModal] = useState(false);
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

  const dividentModal = (id: number) => {
    if (id === 7) {
      setDivModal(true);
    }
  };

  const onClose = () => {
    setDivModal(false);
  };

  return (
    <>
      <div>
        {divModal && (
          <ModalDividends open={divModal} data={balanceLog} onClose={onClose} />
        )}
        <Styled.DataListItem
          divident={balanceLog.operationKind === 7}
          onClick={() => dividentModal(balanceLog.operationKind)}
        >
          <Styled.DataListName>
            {operation(balanceLog.operationKind)}
          </Styled.DataListName>
          <Styled.DataListSum plus={balanceLog.balance >= 0}>
            {balanceLog.balance < 0
              ? ""
              : balanceLog.operationKind !== 6
              ? "+"
              : "-"}{" "}
            {(balanceLog.balance / 100000).toLocaleString("ru-RU", {
              maximumFractionDigits: 5,
            })}
          </Styled.DataListSum>
        </Styled.DataListItem>
      </div>
    </>
  );
};

export const InfoBalance = () => {
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
  const appContext = useContext(AppContext);
  const user = appContext.user;
  const balance = appContext.balance;
  const amountContext = useContext(AmountContext);
  const { totalPayed, depositTotal } = amountContext;
  const [count, setCount] = useState(true);
  const [num, setNum] = useState(20);
  const [loading, setLoading] = useState(true);
  const [addBalance, setAddBalance] = useState(false);
  const [balanceValue, setBalanceValue] = useState("");
  const [loadDeposit, setLoadDeposit] = useState(false);
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [depositList, setDepositList] = useState<any>([]);
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

  // console.log("balanceLog", balanceLog);

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
    if (withdrawValue || balanceValue || addDepositValue) {
      inputRef.current.focus();
    }
  }, [withdrawValue, balanceValue, addDepositValue]);

  const hubConnection = appContext.hubConnection;

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke<RootDeposits>("GetDeposits", 0, 10)
        .then((res) => {
          // console.log("GetDeposits 11", res);
          if (res.collection.length) {
            // console.log("GetDeposits 111", res);
            setDepositsList(res.collection);
          }
        })
        .catch((err: Error) => console.log(err));
    }
  }, [hubConnection]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke(
          "GetUserDepositsCharges",
          balanceLogs,
          openDate.from || new Date("2021-02-09T00:47:45"),
          openDate.to || new Date(),
          0,
          20
        )
        .then((res: any) => {
          setTotalDeposit(res.totalRecords);
          // console.log("res", res);
          setNum(20);
          setLoading(false);
          function getFormatedDate(dateStr: Date) {
            let date = moment(dateStr).format("DD MMMM YYYY");
            return date;
          }
          if (res.collection.length) {
            setDepositList(res.collection);
            let result: any = {};
            res.collection.forEach((item: any) => {
              const d = getFormatedDate(item.operationDate);

              const obj = {
                id: item.safeId,
                operationKind: item.operationKind,
                balance: item.amount,
                date: item.operationDate,
                userDeposit: item.userDeposit,
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
    setCount(false);
    if (hubConnection && depositList.length < totalDeposit) {
      hubConnection
        .invoke(
          "GetUserDepositsCharges",
          balanceLogs,
          openDate.from,
          openDate.to,
          num,
          20
        )
        .then((res) => {
          setLoading(false);
          if (res.collection.length) {
            if (res.collection.length) {
              setDepositList([...depositList, res.collection]);
              let result: any = {};
              res.collection.forEach((item: any) => {
                const d = moment(item.operationDate).format("DD MMMM YYYY");
                const obj = {
                  id: item.safeId,
                  operationKind: item.operationKind,
                  balance: item.amount,
                  date: item.operationDate,
                  userDeposit: item.userDeposit,
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
        .invoke(
          "GetBalanceLog",
          1,
          balanceLogs,
          openDate.from || new Date("2021-02-09T00:47:45"),
          openDate.to || new Date(),
          num,
          30
        )
        .then((res: any) => {
          // console.log("GetBalanceLog", res);
        })
        .catch((err: Error) => console.log(err));
    }
  }, [hubConnection, balanceLogs, openDate]);

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

  // const handleClick = (id: number) => {
  //   if (id !== active) {
  //     setActive(id);
  //   }
  // };

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
          // console.log("CreateUserDeposit", res);
          setLoadDeposit(false);
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

  const minOffset = 0;
  const maxOffset = 10;
  const thisYear = new Date().getFullYear();
  const thisMonth = moment.months();
  const options = [];

  for (let i = minOffset; i <= maxOffset; i++) {
    const year = thisYear - i;
    options.push(<option value={year}>{year}</option>);
  }

  const getTopUp = () => {
    if (hubConnection) {
      hubConnection
        .invoke("GetTopUpUrl", +balanceValue * 100000)
        .then((res: any) => {
          // console.log("GetTopUpUrl", res);
          window.open(res);
        })
        .catch((err: Error) => console.log(err));
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
            <Styled.BalanceWrap>
              <Styled.TopUpButton blue onClick={() => setAddBalance(true)}>
                Пополнить баланс
              </Styled.TopUpButton>
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

              <Styled.DateButton onClick={() => setOpen(true)}>
                <span>{selected}</span>
              </Styled.DateButton>
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
                    <Scrollbars style={{ height: "500px" }}>
                      <InfiniteScroll
                        pageStart={0}
                        loadMore={myLoad}
                        hasMore={count}
                        useWindow={false}
                        loader={
                          <div className="loader" key={0}>
                            Loading ...
                          </div>
                        }
                      >
                        {/* <BalanceTable balanceLog={balanceLog} /> */}
                        {Object.keys(balanceLog).map((key) => (
                          <div key={key}>
                            <Styled.DataListDate>{key}</Styled.DataListDate>

                            {balanceLog[key].map((item, idx) => (
                              <BalanceTable key={item.id} balanceLog={item} />
                            ))}
                          </div>
                        ))}
                      </InfiniteScroll>
                    </Scrollbars>
                  ) : loading ? (
                    <Loading />
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
            in={addBalance}
            timeout={300}
            classNames="modal"
            unmountOnExit
          >
            <Modal onClose={() => setAddBalance(false)}>
              <Styled.ModalBlock>
                <Styled.ModalTitle>Пополнить баланс</Styled.ModalTitle>
                <Input
                  onChange={(e) => setBalanceValue(e.target.value)}
                  placeholder="Введите сумму"
                  type="number"
                  ref={inputRef}
                  value={balanceValue}
                />
                <Styled.ModalButton
                  as="button"
                  disabled={!balanceValue}
                  onClick={getTopUp}
                  danger
                >
                  Пополнить
                </Styled.ModalButton>
              </Styled.ModalBlock>
            </Modal>
          </CSSTransition>
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
