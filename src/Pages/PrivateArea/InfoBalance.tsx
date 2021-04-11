import React, { useState, useContext, useEffect, useRef, FC } from "react";
import * as Styled from "./Styles.elements";
import { Card, Container } from "../../globalStyles";
import { AppContext } from "../../context/HubContext";
import { AmountContext } from "../../context/AmountContext";
import { CSSTransition } from "react-transition-group";
import { Modal } from "../../components/Modal/Modal";
import moment from "moment";
import { ModalRangeInput } from "../../components/UI/DayPicker";
import { Input } from "../../components/UI/Input";
import { OpenDate } from "../../types/dates";
import { ModalDividends } from "./Modals";
import InfiniteScroll from "react-infinite-scroller";
import { Scrollbars } from "react-custom-scrollbars";
import { Loading } from "../../components/UI/Loading";
import { useTranslation } from "react-i18next";
import { StackedColumn } from "../../components/Charts/StackedColumn";

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
  const [openDate, setOpenDate] = useState<OpenDate>({
    from: new Date("2019-01-01T00:47:45"),
    to: new Date(),
  });
  const { t } = useTranslation();
  const [selected, setSelected] = useState<string | never>(
    t("privateArea.allTime")
  );
  const appContext = useContext(AppContext);
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
  const [chartList, setChartList] = useState<any>({});
  const inputRef = useRef<any>(null);

  const lang = localStorage.getItem("i18nextLng") || "ru";
  const languale = lang === "ru" ? 1 : 0;

  const yearSelected = () => {
    let year = moment().format("YYYY");
    let yearStart: any = moment(year, "YYYY").startOf("month");
    let yearEnd: any = moment(year, "YYYY").endOf("year");
    setOpenDate({
      from: yearStart._d,
      to: yearEnd._d,
    });
    setSelected(`${t("privateArea.at")} ${moment().format("YYYY")}`);
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
    setSelected(`${t("privateArea.at")} ${moment().format("MMMM YYYY")}`);
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
    setSelected(t("privateArea.allTime"));
    onClose();
  };

  useEffect(() => {
    if (selected === t("privateArea.allTime")) {
      setSelected(t("privateArea.allTime"));
    } else {
      monthSelected();
    }
  }, [languale]);

  useEffect(() => {
    if (balanceValue) {
      inputRef.current.focus();
    }
  }, [balanceValue]);

  const hubConnection = appContext.hubConnection;

  useEffect(() => {
    setBalanceLog(null);
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
  }, [hubConnection, openDate, balanceLogs, languale]);

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
  // console.log("balance", balanceLog);
  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke("GetBalanceStats", openDate.from, openDate.to, balanceLogs, [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
        ])
        .then((res) => {
          // console.log("responce", res);
          let result: any = {};
          for (let key in res) {
            if (res[key].length > 0) {
              const newArr = res[key].map((i: any) => ({
                operationKind: i[0],
                type: i[1],
                balance: i[2],
                date: key,
              }));
              const d = moment(key).format("DD MMMM YYYY");
              if (result[d]) {
                result[d].push(...newArr);
              } else {
                result[d] = [...newArr];
              }
            }
          }
          setChartList(result);
        })
        .catch((err: Error) => {
          console.log(err);
        });
    }
  }, [hubConnection, openDate, balanceLogs]);

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

  const onClose = () => {
    setOpen(false);
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

  const linkOpen = (res: any) => {
    window.location.assign(res);
  };

  const getTopUp = () => {
    if (hubConnection) {
      hubConnection
        .invoke("GetTopUpUrl", +balanceValue * 100000)
        .then((res: any) => {
          linkOpen(res);
        })
        .catch((err: Error) => console.log(err));
    }
  };

  return (
    <>
      {loadDeposit && (
        <Styled.Loader>
          <Loading />
        </Styled.Loader>
      )}
      <Container>
        <Styled.BalanceWrap>
          <Styled.TopUpButton blue onClick={() => setAddBalance(true)}>
            {t("privateArea.topUpBalance")}
          </Styled.TopUpButton>
          <Styled.BalanceList>
            <Styled.BalanceItem>
              <Styled.BalanceItemName>
                {t("privateArea.balance")}
              </Styled.BalanceItemName>
              <Styled.BalanceItemValue pink>
                {balance ? (balance / 100000).toLocaleString() : "0"}
              </Styled.BalanceItemValue>
            </Styled.BalanceItem>

            <Styled.BalanceItem>
              <Styled.BalanceItemName>
                {t("privateArea.take")}
              </Styled.BalanceItemName>
              <Styled.BalanceItemValue pink>
                {(depositTotal / 100000).toLocaleString()}
              </Styled.BalanceItemValue>
            </Styled.BalanceItem>

            <Styled.BalanceItem>
              <Styled.BalanceItemName>
                {t("privateArea.findings")}
              </Styled.BalanceItemName>
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
              {t("privateArea.allOperation")}
            </Styled.BalanceTabItem>
            <Styled.BalanceTabItem
              onClick={() => handleBalance(1)}
              active={depositTabs === 1}
            >
              {t("privateArea.take")}
            </Styled.BalanceTabItem>
            <Styled.BalanceTabItem
              onClick={() => handleBalance(2)}
              active={depositTabs === 2}
            >
              {t("privateArea.findings")}
            </Styled.BalanceTabItem>
          </Styled.BalanceTabHead>
        </Card>
      </Container>
      <Styled.ContainerChart>
        <Styled.InnerChart>
          {chartList && <StackedColumn values={chartList} />}
        </Styled.InnerChart>
      </Styled.ContainerChart>
      <Container>
        <Styled.InnerTable>
          <Styled.DataListWrap>
            <Styled.DataList>
              <Styled.DataListHead>
                <Styled.DataListItem>
                  <Styled.DataListName>
                    {t("privateArea.name")}
                  </Styled.DataListName>
                  <Styled.DataListName>
                    {t("privateArea.sum")}
                  </Styled.DataListName>
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
                <Styled.NotFound>{t("notFound")}</Styled.NotFound>
              )}
            </Styled.DataList>
          </Styled.DataListWrap>
        </Styled.InnerTable>
      </Container>

      <CSSTransition in={open} timeout={300} classNames="modal" unmountOnExit>
        <Styled.ModalWrap>
          <Modal onClose={onClose}>
            <Styled.ModalContent>
              <Styled.ModalTitle>
                {t("privateArea.selectPeriod")}
              </Styled.ModalTitle>
              <Styled.ModalItem>
                <Styled.DateTitle>
                  {t("privateArea.thisMonth")}
                </Styled.DateTitle>
                <Styled.DateText onClick={monthSelected}>
                  {moment().format("MMMM YYYY")}
                </Styled.DateText>
              </Styled.ModalItem>
              <Styled.ModalItem>
                <Styled.DateTitle>{t("privateArea.thisYear")}</Styled.DateTitle>
                <Styled.DateText onClick={yearSelected}>
                  {moment().format("YYYY")}
                </Styled.DateText>
              </Styled.ModalItem>
              <Styled.ModalItem>
                <Styled.DateTitle></Styled.DateTitle>
                <Styled.DateText onClick={allDate}>
                  {t("privateArea.allTime")}
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

      <CSSTransition
        in={addBalance}
        timeout={300}
        classNames="modal"
        unmountOnExit
      >
        <Modal onClose={() => setAddBalance(false)}>
          <Styled.ModalBlock>
            <Styled.ModalTitle>
              {t("privateArea.topUpBalance")}
            </Styled.ModalTitle>
            <Input
              onChange={(e) => setBalanceValue(e.target.value)}
              placeholder={t("privateArea.amountEnter")}
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
              {t("privateArea.topUp")}
            </Styled.ModalButton>
          </Styled.ModalBlock>
        </Modal>
      </CSSTransition>
    </>
  );
};
