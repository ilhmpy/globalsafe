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
import { CSSTransition } from "react-transition-group";
import useWindowSize from "../../hooks/useWindowSize";
import { Collection, RootList } from "../../types/info";
import { Modal } from "../../components/Modal/Modal";
import moment from "moment";
import "moment/locale/ru";
import { ModalRangeInput } from "../../components/UI/DayPicker";
import { Input } from "../../components/UI/Input";
import { OpenDate } from "../../types/dates";
import { RootDeposits, DepositsCollection } from "../../types/info";
import ReactNotification, { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { DepositListModal } from "./Modals";
import { Loading } from "../../components/UI/Loading";
import { Scrollbars } from "react-custom-scrollbars";
import InfiniteScroll from "react-infinite-scroller";
moment.locale("ru");

type Obj = {
  id: string;
  operationKind: number;
  balance: number;
};

type Deposit = {
  [elemName: string]: Obj[];
};

export const InfoDeposits = () => {
  const [active, setActive] = useState(0);
  const [activeDeposite, setActiveDeposite] = useState(0);
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
  const [count, setCount] = useState(true);
  const [num, setNum] = useState(20);
  const [loadDeposit, setLoadDeposit] = useState(false);
  const [totalList, setTotalList] = useState(0);
  const [loading, setLoading] = useState(true);
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
          console.log("res", res);
          if (res.collection.length) {
            setDepositsList(res.collection);
          }
        })
        .catch((err: Error) => console.log(err));
    }
  }, [hubConnection]);

  // console.log("list", list);

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke<RootList>("GetUserDeposits", [1, 2, 3, 4, 5, 6], 0, 20)
        .then((res) => {
          // console.log("GetUserDeposits", res);
          setLoading(false);
          setList(res.collection);
          setTotalList(res.totalRecords);
        })
        .catch((err: Error) => {
          setLoading(false);
          console.log(err);
        });
    }
  }, [hubConnection]);

  const myLoad = () => {
    setCount(false);
    if (hubConnection && list.length < totalList) {
      hubConnection
        .invoke<RootList>("GetUserDeposits", [1, 2, 3, 4, 5, 6], num, 20)
        .then((res) => {
          // console.log("GetUserDeposits", res);
          if (res.collection.length) {
            setList([...list, ...res.collection]);
            setCount(true);
            setNum(num + 20);
          }
        })
        .catch((err: Error) => console.log(err));
    }
  };

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

  const minOffset = 0;
  const maxOffset = 10;
  const thisYear = new Date().getFullYear();
  const thisMonth = moment.months();
  const options = [];

  for (let i = minOffset; i <= maxOffset; i++) {
    const year = thisYear - i;
    options.push(<option value={year}>{year}</option>);
  }

  // console.log("withdrawValue", withdrawValue);

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
              <Scrollbars style={{ height: "500px" }}>
                <InfiniteScroll
                  pageStart={10}
                  loadMore={myLoad}
                  hasMore={count}
                  useWindow={false}
                  loader={
                    <div className="loader" key={0}>
                      Loading ...
                    </div>
                  }
                >
                  <Tables list={list} />
                </InfiniteScroll>
              </Scrollbars>
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
                  step="any"
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
