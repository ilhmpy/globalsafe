import React, { useState, useContext, useEffect } from "react";
import * as Styled from "./Styled.elements";
import styled, { css } from "styled-components/macro";
import { SideNavbar } from "../../components/SideNav";
import { Card } from "../../globalStyles";
import { UpTitle } from "../../components/UI/UpTitle";
import { ReactComponent as Exit } from "../../assets/svg/exit.svg";
import { ReactComponent as Filter } from "../../assets/svg/filter.svg";
import { Tab, Content } from "../../components/UI/Tabs";
import { AppContext } from "../../context/HubContext";
import { ThemeContext } from "../../context/ThemeContext";
import { AmountContext } from "../../context/AmountContext";
import { Select } from "../../components/Select/Select2";
import { TestInput } from "../../components/UI/DayPicker";
import { Button } from "../../components/Button/Button";
import useWindowSize from "../../hooks/useWindowSize";
import {
  RootPayments,
  PaymentsCollection,
  RootCharges,
  CollectionCharges,
} from "../../types/payments";
import {
  DepositStats,
  ListDeposits,
  CollectionListDeposits,
} from "../../types/deposits";
import ReactNotification, { store } from "react-notifications-component";
import InfiniteScroll from "react-infinite-scroller";
import "react-notifications-component/dist/theme.css";
import { CSSTransition } from "react-transition-group";
import { ModalPay } from "./AdminPay/Payments";
import { Scrollbars } from "react-custom-scrollbars";
import { Loading } from "../../components/UI/Loading";
import {
  DepositList,
  PaymentsList,
  PaymentsListPay,
} from "./AdminPay/DepositList";
import { OpenDate } from "../../types/dates";
import moment from "moment";
import { useTranslation } from "react-i18next";

export const AdminPay = () => {
  const [active, setActive] = useState(0);
  const sizes = useWindowSize();
  const [show, setShow] = useState(false);
  const [sum, setSum] = useState<number[] | null>(null);
  const [depositList, setDepositList] = useState<any>([]);
  const appContext = useContext(AppContext);
  const themeContext = useContext(ThemeContext);
  const theme = themeContext.theme;
  const hubConnection = appContext.hubConnection;
  const logOut = appContext.logOut;
  const user = appContext.user;
  const amountContext = useContext(AmountContext);
  const [totalDeposits, setTotalDeposits] = useState(0);
  const [totalPayDeposits, setTotalPayDeposits] = useState(0);
  const [depositPayList, setDepositPayList] = useState<any>([]);
  const [paymentsList, setPaymentsList] = useState<any>([]);
  const [totalPayments, setTotalPayments] = useState(0);
  const [count, setCount] = useState(true);
  const [countPayments, setCountPayments] = useState(30);
  const [countPay, setPayCount] = useState(true);
  const [numPayments, setNumPayments] = useState(20);
  const [num, setNum] = useState(20);
  const [numPay, setPayNum] = useState(20);
  const [next, setNext] = useState(true);
  const { totalPayed, depositTotal } = amountContext;
  const [open, setOpen] = useState<boolean>(false);
  const [dataModal, setDataModal] = useState<PaymentsCollection | any>({});
  const [loading, setLoading] = useState(true);
  const [openDate, setOpenDate] = useState<OpenDate>({
    from: undefined,
    to: undefined,
  });
  const [checkList, setCheckList] = useState<any>([]);
  const [name, setName] = useState("");
  const [listDeposits, setListDeposits] = useState<CollectionListDeposits[]>(
    []
  );
  const { t } = useTranslation();

  const getPaymentsOverview = () => {
    if (hubConnection) {
      hubConnection
        .invoke("GetPaymentsOverview")
        .then((res) => {
          setSum(res);
        })
        .catch((err: Error) => console.log(err));
    }
  };

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke<ListDeposits>("GetAllPublicDeposits", 1, false, 0, 40)
        .then((res) => {
          // console.log("GetDeposits", res);
          setListDeposits(res.collection);
        })
        .catch((err: Error) => console.log(err));
    }
  }, [hubConnection]);

  const namesProgram = checkList.map((i: any) => i.label);
  const idProgram = listDeposits.filter((i) => namesProgram.includes(i.name));
  const searchSafeID = idProgram.map((i) => i.safeId);
  const backDays: any = moment().subtract(30, "days");
  const myLoad = () => {
    setNext(false);
    if (hubConnection && depositPayList.length < totalPayDeposits) {
      hubConnection
        .invoke<RootCharges>(
          "GetDepositsCharges",
          name ? name : null,
          openDate.from ? openDate.from : backDays._d,
          openDate.to ? openDate.to : new Date(),
          searchSafeID.length ? searchSafeID : null,
          null,
          [7, 8],
          numPay,
          20
        )
        .then((res) => {
          if (res.collection.length) {
            // console.log("myLoad", res);
            setDepositPayList([...depositPayList, ...res.collection]);
            setPayNum(numPay + 20);
            setNext(true);
          }
        })
        .catch((err: Error) => console.log(err));
    }
  };

  const handleClick = (id: number) => {
    if (id !== active) {
      setActive(id);
    }
  };

  const confirmPay = (id: string) => {
    if (hubConnection) {
      hubConnection
        .invoke("ConfirmDepositPayment", id)
        .then((res) => {
          console.log("ConfirmDepositPayment", res);
          getPaymentsOverview();
        })
        .catch((err: Error) => {
          console.log(err);
        });
    }
  };

  const unConfirmPay = (id: string) => {
    if (hubConnection) {
      hubConnection
        .invoke("UnconfirmDepositPayment", id)
        .then((res) => {
          console.log("UnconfirmDepositPayment", res);
          getPaymentsOverview();
        })
        .catch((err: Error) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (hubConnection) {
      setPaymentsList([]);
      hubConnection
        .invoke<RootPayments>(
          "GetUsersDeposits",
          [5],
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          0,
          20
        )
        .then((res) => {
          setLoading(false);
          setTotalPayments(res.totalRecords);
          setPaymentsList(res.collection);
          setNumPayments(20);
        })
        .catch((err: Error) => {
          setLoading(false);
          console.log(err);
        });
    }
  }, [hubConnection, active]);

  useEffect(() => {
    if (hubConnection) {
      setDepositList([]);
      hubConnection
        .invoke<RootPayments>(
          "GetUsersDeposits",
          [5, 6],
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          0,
          20
        )
        .then((res) => {
          console.log("GetUsersDeposits", res);
          setLoading(false);
          setTotalDeposits(res.totalRecords);
          setDepositList(res.collection);
          setNum(20);
        })
        .catch((err: Error) => {
          setLoading(false);
          console.log(err);
        });
    }
  }, [hubConnection, active]);

  useEffect(() => {
    if (hubConnection) {
      setDepositPayList([]);
      hubConnection
        .invoke<RootCharges>(
          "GetDepositsCharges",
          name ? name : null,
          openDate.from ? openDate.from : backDays._d,
          openDate.to ? openDate.to : new Date(),
          searchSafeID.length ? searchSafeID : null,
          null,
          [7, 8],
          0,
          20
        )
        .then((res) => {
          // console.log("GetDepositsCharges", res);
          setLoading(false);
          if (res.collection.length) {
            setTotalPayDeposits(res.totalRecords);
            setDepositPayList(res.collection);
            setPayNum(20);
          }
        })
        .catch((err: Error) => {
          setLoading(false);
          console.log(err);
        });
    }
  }, [hubConnection, active]);

  useEffect(() => {
    getPaymentsOverview();
  }, [hubConnection]);

  const loadMorePayments = () => {
    setPayCount(false);
    if (hubConnection && paymentsList.length < totalPayments) {
      hubConnection
        .invoke<RootPayments>(
          "GetUsersDeposits",
          [5],
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          numPayments,
          20
        )
        .then((res) => {
          if (res.collection.length) {
            setPaymentsList([...paymentsList, ...res.collection]);
            setNumPayments(numPayments + 20);
            setPayCount(true);
          }
        })
        .catch((err: Error) => console.log(err));
    }
  };

  const loadMoreItems = () => {
    setCount(false);
    if (hubConnection && depositList.length < totalDeposits) {
      hubConnection
        .invoke<RootPayments>(
          "GetUsersDeposits",
          [5, 6],
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          num,
          20
        )
        .then((res) => {
          if (res.collection.length) {
            setDepositList([...depositList, ...res.collection]);
            setCount(true);
            setNum(num + 20);
          }
        })
        .catch((err: Error) => console.log(err));
    }
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

  const adjustPay = (id: string, amount: number) => {
    if (hubConnection) {
      hubConnection
        .invoke("AdjustDepositPayment", id, amount)
        .then((res) => {
          getPaymentsOverview();
          alert("Успешно", "Подтверждено", "success");
        })
        .catch((err: Error) => {
          alert("Ошибка", "Произошла ошибка", "danger");
        });
    }
  };

  const paymentsConfirm = () => {
    if (hubConnection) {
      hubConnection
        .invoke("ConfirmAllDepositsPayment")
        .then((res) => {
          alert("Успешно", "", "success");
          getPaymentsOverview();
        })
        .catch((err: Error) => {
          alert("Ошибка", "Произошла ошибка", "danger");
        });
    }
  };

  const submit = () => {
    if (hubConnection) {
      setDepositPayList([]);
      hubConnection
        .invoke<RootCharges>(
          "GetDepositsCharges",
          name ? name : null,
          openDate.from ? openDate.from : backDays._d,
          openDate.to ? openDate.to : new Date(),
          searchSafeID.length ? searchSafeID : null,
          null,
          [7, 8],
          0,
          20
        )
        .then((res) => {
          // console.log("res", res);
          setLoading(false);
          if (res.collection.length) {
            setTotalPayDeposits(res.totalRecords);
            setDepositPayList(res.collection);
            setPayNum(20);
          }
        })
        .catch((err: Error) => {
          setLoading(false);
          console.log(err);
        });
    }
  };

  return (
    <>
      <ReactNotification />
      <Styled.HeadBlock>
        <SelfUpTitle small>{t("adminPay.uptitle")}</SelfUpTitle>
        <Styled.UserName>
          <span>{user}</span>
          <Exit onClick={logOut} />
        </Styled.UserName>
      </Styled.HeadBlock>

      <Card>
        <Styled.PayList>
          <Styled.PayItem>
            <Styled.PayItemHead mb>
              <SelfUpTitle small>{t("adminPay.title1")}</SelfUpTitle>
            </Styled.PayItemHead>
            <Styled.Radial
              bg={
                theme === "light"
                  ? "rgba(255, 65, 110, 0.2)"
                  : "rgba(255, 65, 110, 1)"
              }
            >
              <span>
                {sum ? (sum[2] / 100000).toLocaleString("ru-RU") : "-"}
              </span>
              <span>CWD</span>
            </Styled.Radial>
          </Styled.PayItem>
          <Styled.PayItem>
            <Styled.PayItemHead mb>
              <SelfUpTitle small>{t("adminPay.title2")}</SelfUpTitle>
            </Styled.PayItemHead>

            <Styled.Radial
              bg={
                theme === "light"
                  ? "rgba(188, 212, 118, 0.2)"
                  : "rgba(188, 212, 118, 1)"
              }
            >
              <span>
                {sum
                  ? (sum[0] / 100000).toLocaleString("ru-RU", {
                      maximumFractionDigits: 0,
                    })
                  : "-"}
              </span>
              <span>CWD</span>
            </Styled.Radial>
          </Styled.PayItem>
          <Styled.PayItem>
            <Styled.PayItemHead mb>
              <SelfUpTitle small>{t("adminPay.title3")}</SelfUpTitle>
            </Styled.PayItemHead>
            <Styled.Radial
              bg={
                theme === "light"
                  ? "rgba(109, 185, 255, 0.2)"
                  : "rgba(109, 185, 255, 1)"
              }
            >
              <span>
                {sum
                  ? (sum[1] / 100000).toLocaleString("ru-RU", {
                      maximumFractionDigits: 0,
                    })
                  : "-"}
              </span>
              <span>CWD</span>
            </Styled.Radial>
          </Styled.PayItem>
          <Styled.PayItem></Styled.PayItem>
        </Styled.PayList>
      </Card>
      <Card>
        <Tabs>
          <PayTab onClick={() => handleClick(0)} active={active === 0}>
            {t("adminPay.title3")}
          </PayTab>
          <Tab onClick={() => handleClick(1)} active={active === 1}>
            {t("adminPay.title2")}
          </Tab>
          <Tab onClick={() => handleClick(2)} active={active === 2}>
            {t("adminPay.title1")}
          </Tab>
        </Tabs>
      </Card>

      {active === 0 && (
        <ButtonWrap>
          <Button dangerOutline mb onClick={paymentsConfirm}>
            {t("adminPay.confirmButton")}
          </Button>
        </ButtonWrap>
      )}

      <Content active={active === 0}>
        <Card>
          <PaymentsTable>
            <TableHead>
              <TableHeadItem>№</TableHeadItem>
              <TableHeadItem>{t("adminPay.table.user")}</TableHeadItem>
              <TableHeadItem>{t("adminPay.table.name")}</TableHeadItem>
              <TableHeadItem>{t("adminPay.table.procent")}</TableHeadItem>
              <TableHeadItem>{t("adminPay.table.datePay")}</TableHeadItem>
              <TableHeadItem>{t("adminPay.table.profit")}</TableHeadItem>
              <TableHeadItem>{t("adminPay.table.openDate")}</TableHeadItem>
              <TableHeadItem>{t("adminPay.table.contribution")}</TableHeadItem>
              <TableHeadItem>{t("adminPay.table.payments")}</TableHeadItem>
              <TableHeadItem>{/* <Filter /> */}</TableHeadItem>
            </TableHead>
            {depositList.length ? (
              <Scrollbars style={{ height: "500px" }}>
                <InfiniteScroll
                  pageStart={10}
                  loadMore={loadMoreItems}
                  hasMore={count}
                  useWindow={false}
                  loader={
                    <div className="loader" key={0}>
                      Loading ...
                    </div>
                  }
                >
                  {depositList.map((item: PaymentsCollection, idx: number) => (
                    <DepositList
                      idx={idx}
                      key={item.safeId}
                      data={item}
                      adjustPay={adjustPay}
                      confirmPay={confirmPay}
                      unConfirmPay={unConfirmPay}
                    />
                  ))}
                </InfiniteScroll>
              </Scrollbars>
            ) : loading ? (
              <Loading />
            ) : (
              <NotFound>{t("notFound")}</NotFound>
            )}
          </PaymentsTable>
        </Card>
      </Content>

      <Content active={active === 1}>
        <Styled.FilterBlock>
          <FilterName>{t("adminDeposit.filter")}</FilterName>
          <Styled.SelectContainer>
            <Styled.SelectWrap>
              <Styled.Label>{t("adminPay.filter.user")}</Styled.Label>
              <Styled.Input
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Styled.SelectWrap>
            <Styled.InputsCalendarWrap>
              <TestInput
                setOpenDate={setOpenDate}
                openDate={openDate}
                label={t("adminPay.filter.date")}
              />
            </Styled.InputsCalendarWrap>
            <Styled.SelectWrap>
              <Styled.Label>{t("adminPay.filter.deposit")}</Styled.Label>
              <Select
                checkList={checkList}
                setCheckList={setCheckList}
                values={listDeposits}
              />
            </Styled.SelectWrap>

            <Button danger onClick={submit}>
              {t("adminUsers.apply")}
            </Button>
          </Styled.SelectContainer>
        </Styled.FilterBlock>
        <Card>
          <PaymentsTable>
            <TableHead>
              <TableHeadItemPaid>{t("adminPay.table.user")}</TableHeadItemPaid>
              <TableHeadItemPaid>{t("adminPay.table.name")}</TableHeadItemPaid>
              <TableHeadItemPaid>
                {t("adminPay.table.datePay")}
              </TableHeadItemPaid>
              <TableHeadItemPaid>
                {t("adminPay.table.category")}
              </TableHeadItemPaid>
              <TableHeadItemPaid>
                {t("adminPay.table.contribution")}
              </TableHeadItemPaid>
              <TableHeadItemPaid>
                {t("adminPay.table.payments")}
              </TableHeadItemPaid>
              <TableHeadItemPaid>{/* <Filter /> */}</TableHeadItemPaid>
            </TableHead>
            {depositPayList.length ? (
              <Scrollbars style={{ height: "500px" }}>
                <InfiniteScroll
                  pageStart={10}
                  loadMore={myLoad}
                  hasMore={next}
                  useWindow={false}
                  loader={
                    <div className="loader" key={0}>
                      Loading ...
                    </div>
                  }
                >
                  {depositPayList.map((item: CollectionCharges) => (
                    <PaymentsListPay key={item.safeId} data={item} />
                  ))}
                </InfiniteScroll>
              </Scrollbars>
            ) : loading ? (
              <Loading />
            ) : (
              <NotFound>{t("notFound")}</NotFound>
            )}
          </PaymentsTable>
        </Card>
      </Content>

      <Content active={active === 2}>
        <Card>
          <PaymentsTable>
            <TableHead>
              <TableHeadItemPaid>{t("adminPay.table.user")}</TableHeadItemPaid>
              <TableHeadItemPaid>{t("adminPay.table.name")}</TableHeadItemPaid>
              <TableHeadItemPaid>
                {t("adminPay.table.datePay")}
              </TableHeadItemPaid>
              <TableHeadItemPaid>
                {t("adminPay.table.category")}
              </TableHeadItemPaid>
              <TableHeadItemPaid>
                {t("adminPay.table.contribution")}
              </TableHeadItemPaid>
              <TableHeadItemPaid>
                {t("adminPay.table.payments")}
              </TableHeadItemPaid>
              <TableHeadItemPaid>{/* <Filter /> */}</TableHeadItemPaid>
            </TableHead>
            {paymentsList.length ? (
              <Scrollbars style={{ height: "500px" }}>
                <InfiniteScroll
                  pageStart={10}
                  loadMore={loadMorePayments}
                  hasMore={countPay}
                  useWindow={false}
                  loader={
                    <div className="loader" key={0}>
                      Loading ...
                    </div>
                  }
                >
                  {paymentsList.map((item: PaymentsCollection) => (
                    <PaymentsList key={item.safeId} data={item} />
                  ))}
                </InfiniteScroll>
              </Scrollbars>
            ) : loading ? (
              <Loading />
            ) : (
              <NotFound>{t("notFound")}</NotFound>
            )}
          </PaymentsTable>
        </Card>
      </Content>
    </>
  );
};

const FilterName = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  letter-spacing: 0.1px;
  margin-left: 10px;
  @media (max-width: 576px) {
    margin-left: 0px;
  }
`;

const SelfUpTitle = styled(UpTitle)`
  @media (max-width: 768px) {
    &:before {
      width: 13px;
    }
  }
`;

const NotFound = styled.div`
  font-weight: normal;
  font-size: 12px;
  line-height: 21px;
  padding: 30px;
  letter-spacing: 0.1px;
  min-height: 250px;
`;

const PayTab = styled(Tab)`
  width: 135px;
  @media (max-width: 992px) {
    width: 100px !important;
  }
  @media (max-width: 768px) {
    width: 110px !important;
  }
  @media (max-width: 576px) {
    width: 100px !important;
  }
`;

const PaymentsTable = styled.div`
  padding: 30px;
  height: 600px;
`;

const TableHead = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 6px;
  border-bottom: 1px solid rgba(81, 81, 114, 0.2);
`;

const TableHeadItem = styled.li`
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.1px;
  color: ${(props) => props.theme.thHead};
  width: 100%;
  &:nth-child(1) {
    max-width: 30px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &:nth-child(2) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 97px;
    @media (max-width: 768px) {
      display: none;
    }
  }
  &:nth-child(3) {
    max-width: 94px;
  }
  &:nth-child(4) {
    max-width: 110px;
    @media (max-width: 992px) {
      display: none;
    }
  }
  &:nth-child(5) {
    max-width: 90px;
    @media (max-width: 1100px) {
      display: none;
    }
  }
  &:nth-child(6) {
    max-width: 85px;
    @media (max-width: 992px) {
      display: none;
    }
  }
  &:nth-child(7) {
    max-width: 100px;
    @media (max-width: 1100px) {
      display: none;
    }
  }
  &:nth-child(8) {
    max-width: 84px;
    @media (max-width: 576px) {
      display: none;
    }
  }
  &:nth-child(9) {
    max-width: 110px;
    @media (max-width: 576px) {
      max-width: 80px;
    }
  }
  &:nth-child(10) {
    max-width: 120px;
    text-align: right;
    @media (max-width: 992px) {
      max-width: 60px;
    }
    @media (max-width: 576px) {
      max-width: 30px;
    }
  }
`;

const TableHeadItemPaid = styled(TableHeadItem)`
  &:nth-child(1) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 97px;
    @media (max-width: 768px) {
      display: none;
    }
  }
  &:nth-child(2) {
    max-width: 170px;
    @media (max-width: 576px) {
      padding-right: 10px;
    }
  }
  &:nth-child(4) {
    max-width: 170px;
  }
  &:nth-child(5) {
    max-width: 112px;
  }
  &:nth-child(6) {
    max-width: 100px;
    text-align: left;
    @media (max-width: 576px) {
      display: block;
      text-align: center;
    }
  }
  &:nth-child(7) {
    max-width: 50px;
    text-align: right;
  }
`;

const TableBody = styled(TableHead)`
  padding: 10px 10px 10px 0;
`;

const TableBodyItemCss = css`
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: ${(props) => props.theme.text2};
`;

const TableBodyItemPaid = styled(TableHeadItemPaid)`
  ${TableBodyItemCss}
`;

const Tabs = styled.div`
  display: flex;
  padding: 12px 20px 0;
  ${Tab} {
    &:nth-child(2) {
      width: 90px;
      @media (max-width: 768px) {
        width: 80px;
      }
    }
  }
  @media (max-width: 992px) {
    align-items: flex-end;
    padding-top: 0;
    ${Tab} {
      width: 90px;
    }
  }
  @media (max-width: 768px) {
    padding: 0px 10px 0;
    ${Tab} {
      width: 80px;
      &:first-child {
        text-align: left;
        width: 100px;
      }
      &:last-child {
        text-align: right;
        &:before {
          left: 10px;
        }
      }
    }
  }
`;

const ButtonWrap = styled.div`
  @media (max-width: 768px) {
    ${Button} {
      margin-left: auto;
      margin-right: auto;
    }
  }
`;
