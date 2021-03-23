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
import { AmountContext } from "../../context/AmountContext";
// import { InfiniteLoader, AutoSizer, List } from "react-virtualized";
// import { FixedSizeList as List } from "react-window";
// import AutoSizer from "react-virtualized-auto-sizer";
// import InfiniteLoader from "react-window-infinite-loader";
// import "react-virtualized/styles.css";
import { Button } from "../../components/Button/Button";
import useWindowSize from "../../hooks/useWindowSize";
import {
  RootPayments,
  PaymentsCollection,
  RootCharges,
  CollectionCharges,
} from "../../types/payments";
import ReactNotification, { store } from "react-notifications-component";
import InfiniteScroll from "react-infinite-scroller";
import "react-notifications-component/dist/theme.css";
import { CSSTransition } from "react-transition-group";
import { ModalPay } from "./AdminPay/Payments";
import { Scrollbars } from "react-custom-scrollbars";
import {
  DepositList,
  PaymentsList,
  PaymentsListPay,
} from "./AdminPay/DepositList";
import moment from "moment";
import { Header } from "../../components/Header/Header";
import { Redirect } from "react-router-dom";

export const AdminPay = () => {
  const [active, setActive] = useState(0);
  const sizes = useWindowSize();
  const size = sizes < 992;
  const [show, setShow] = useState(false);
  const [sum, setSum] = useState<number[] | null>(null);
  const [depositList, setDepositList] = useState<any>([]);
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const logOut = appContext.logOut;
  const user = appContext.user;
  const admin = appContext.isAdmin;
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

  const myLoad = (...arg: any) => {
    console.log("arguments", arg);
    if (hubConnection) {
      setNext(false);
      hubConnection
        .invoke<RootCharges>("GetDepositsCharges", [7, 8], numPay, 20)
        .then((res) => {
          if (res.collection.length) {
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
          // alert("Успешно", "Выполнено", "success");
          console.log("ConfirmDepositPayment", res);
          getPaymentsOverview();
        })
        .catch((err: Error) => {
          console.log(err);
          // alert("Ошибка", "Произошла ошибка", "danger");
        });
    }
  };

  useEffect(() => {
    if (hubConnection) {
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
          setTotalPayments(res.totalRecords);
          setPaymentsList(res.collection);
          setNumPayments(20);
        })
        .catch((err: Error) => console.log(err));
    }
  }, [hubConnection, active]);

  useEffect(() => {
    if (hubConnection) {
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
          setTotalDeposits(res.totalRecords);
          setDepositList(res.collection);
          setNum(20);
        })
        .catch((err: Error) => console.log(err));
    }
  }, [hubConnection]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke<RootCharges>("GetDepositsCharges", [7, 8], 0, 20)
        .then((res) => {
          if (res.collection.length) {
            setTotalPayDeposits(res.totalRecords);
            setDepositPayList(res.collection);
            setPayNum(20);
          }
        })
        .catch((err: Error) => console.log(err));
    }
  }, [hubConnection]);

  useEffect(() => {
    getPaymentsOverview();
  }, [hubConnection]);

  const loadMorePayments = () => {
    if (hubConnection) {
      setPayCount(false);
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
    if (hubConnection) {
      setCount(false);
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
          console.log("AdjustDepositPayment", res);
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
          console.log("(res", res);
          alert("Успешно", "", "success");
          getPaymentsOverview();
        })
        .catch((err: Error) => {
          alert("Ошибка", "Произошла ошибка", "danger");
        });
    }
  };

  if (admin === false) {
    return <Redirect to="/" />;
  }

  return (
    <>
      {size && <Header admPanel />}
      <Styled.Wrapper>
        <ReactNotification />
        <SideNavbar />
        <Styled.Content>
          <Styled.HeadBlock>
            <UpTitle small>Выплаты</UpTitle>
            <Styled.UserName>
              <span>{user}</span>
              <Exit onClick={logOut} />
            </Styled.UserName>
          </Styled.HeadBlock>

          <Card>
            <Styled.PayList>
              <Styled.PayItem>
                <Styled.PayItemHead mb>
                  <UpTitle small>К выплате</UpTitle>
                </Styled.PayItemHead>
                <Styled.Radial bg={"rgba(255, 65, 110, 0.2)"}>
                  <span>
                    {sum ? (sum[2] / 100000).toFixed(0).toLocaleString() : "-"}
                  </span>
                  <span>CWD</span>
                </Styled.Radial>
              </Styled.PayItem>
              <Styled.PayItem>
                <Styled.PayItemHead mb>
                  <UpTitle small>Выплачено</UpTitle>
                </Styled.PayItemHead>

                <Styled.Radial bg={"rgba(188, 212, 118, 0.2)"}>
                  <span>
                    {sum ? (sum[0] / 100000).toFixed(0).toLocaleString() : "-"}
                  </span>
                  <span>CWD</span>
                </Styled.Radial>
              </Styled.PayItem>
              <Styled.PayItem>
                <Styled.PayItemHead mb>
                  <UpTitle small>На согласовании</UpTitle>
                  {/* {sizes > 768 && <CalendarInput />} */}
                </Styled.PayItemHead>
                <Styled.Radial bg={"rgba(109, 185, 255, 0.2)"}>
                  <span>
                    {sum ? (sum[1] / 100000).toFixed(0).toLocaleString() : "-"}
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
                На согласовании
              </PayTab>
              <Tab onClick={() => handleClick(1)} active={active === 1}>
                Выплачено
              </Tab>
              <Tab onClick={() => handleClick(2)} active={active === 2}>
                К выплате
              </Tab>
            </Tabs>
          </Card>

          {active === 0 && (
            <ButtonWrap>
              <Button dangerOutline mb onClick={paymentsConfirm}>
                Согласовать все
              </Button>
            </ButtonWrap>
          )}

          <Content active={active === 0}>
            <Card>
              <PaymentsTable>
                <TableHead>
                  <TableHeadItem>Пользователь</TableHeadItem>
                  <TableHeadItem>Название</TableHeadItem>
                  <TableHeadItem>% доходности</TableHeadItem>
                  <TableHeadItem>Дата выплаты</TableHeadItem>
                  <TableHeadItem>Доходность по программе</TableHeadItem>
                  <TableHeadItem>Сумма вклада</TableHeadItem>
                  <TableHeadItem>Сумма выплаты</TableHeadItem>
                  <TableHeadItem>{/* <Filter /> */}</TableHeadItem>
                </TableHead>
                {depositList.length ? (
                  <Scrollbars style={{ height: "500px" }}>
                    <InfiniteScroll
                      pageStart={0}
                      loadMore={loadMoreItems}
                      hasMore={count}
                      useWindow={false}
                      loader={
                        <div className="loader" key={0}>
                          Loading ...
                        </div>
                      }
                    >
                      {depositList.map((item: PaymentsCollection) => (
                        <DepositList
                          key={item.safeId}
                          data={item}
                          adjustPay={adjustPay}
                          confirmPay={confirmPay}
                        />
                      ))}
                    </InfiniteScroll>
                  </Scrollbars>
                ) : (
                  <NotFound>Данные не обнаружены.</NotFound>
                )}
              </PaymentsTable>
            </Card>
          </Content>

          <Content active={active === 1}>
            <Card>
              <PaymentsTable>
                <TableHead>
                  <TableHeadItemPaid>Пользователь</TableHeadItemPaid>
                  <TableHeadItemPaid>Название</TableHeadItemPaid>
                  <TableHeadItemPaid>Дата выплаты</TableHeadItemPaid>
                  <TableHeadItemPaid>Категория</TableHeadItemPaid>
                  <TableHeadItemPaid>Сумма вклада</TableHeadItemPaid>
                  <TableHeadItemPaid>Сумма выплаты</TableHeadItemPaid>
                  <TableHeadItemPaid>{/* <Filter /> */}</TableHeadItemPaid>
                </TableHead>
                {depositList.length ? (
                  <Scrollbars style={{ height: "500px" }}>
                    <InfiniteScroll
                      pageStart={0}
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
                        // <TableBody key={item.safeId}>
                        //   <TableBodyItemPaid>{item.userName}</TableBodyItemPaid>
                        //   <TableBodyItemPaid>
                        //     {item.deposit.name}
                        //   </TableBodyItemPaid>
                        //   <TableBodyItemPaid>
                        //     {moment(item.prevPayment).format("DD/MM/YYYY")}
                        //   </TableBodyItemPaid>
                        //   <TableBodyItemPaid>
                        //     {item.state === 4
                        //       ? "Закрытие вклада"
                        //       : "Начисление дивидендов"}
                        //   </TableBodyItemPaid>
                        //   <TableBodyItemPaid>
                        //     {item.baseAmountView.toLocaleString()}
                        //   </TableBodyItemPaid>
                        //   <TableBodyItemPaid>
                        //     {item.payedAmountView}
                        //   </TableBodyItemPaid>
                        //   <TableBodyItemPaid></TableBodyItemPaid>
                        // </TableBody>
                      ))}
                    </InfiniteScroll>
                  </Scrollbars>
                ) : (
                  <NotFound>Данные не обнаружены.</NotFound>
                )}
              </PaymentsTable>
            </Card>
          </Content>

          <Content active={active === 2}>
            <Card>
              <PaymentsTable>
                <TableHead>
                  <TableHeadItemPaid>Пользователь</TableHeadItemPaid>
                  <TableHeadItemPaid>Название</TableHeadItemPaid>
                  <TableHeadItemPaid>Дата выплаты</TableHeadItemPaid>
                  <TableHeadItemPaid>Категория</TableHeadItemPaid>
                  <TableHeadItemPaid>Сумма вклада</TableHeadItemPaid>
                  <TableHeadItemPaid>Сумма выплаты</TableHeadItemPaid>
                  <TableHeadItemPaid>{/* <Filter /> */}</TableHeadItemPaid>
                </TableHead>
                {paymentsList.length ? (
                  <Scrollbars style={{ height: "500px" }}>
                    <InfiniteScroll
                      pageStart={0}
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
                        // <TableBody>
                        //   <TableBodyItemPaid>{item.userName}</TableBodyItemPaid>
                        //   <TableBodyItemPaid>
                        //     {item.deposit.name}
                        //   </TableBodyItemPaid>
                        //   <TableBodyItemPaid>
                        //     {moment(item.paymentDate).format("DD/MM/YYYY")}
                        //   </TableBodyItemPaid>
                        //   <TableBodyItemPaid>
                        //     {item.state === 4
                        //       ? "Закрытие вклада"
                        //       : "Начисление дивидендов"}
                        //   </TableBodyItemPaid>
                        //   <TableBodyItemPaid>
                        //     {item.baseAmountView.toLocaleString()}
                        //   </TableBodyItemPaid>
                        //   <TableBodyItemPaid>
                        //     {item.paymentAmountView}
                        //   </TableBodyItemPaid>
                        //   <TableBodyItemPaid></TableBodyItemPaid>
                        // </TableBody>
                      ))}
                    </InfiniteScroll>
                  </Scrollbars>
                ) : (
                  <NotFound>Данные не обнаружены.</NotFound>
                )}
              </PaymentsTable>
            </Card>
          </Content>
        </Styled.Content>
      </Styled.Wrapper>
    </>
  );
};

const NotFound = styled.div`
  font-weight: normal;
  font-size: 12px;
  line-height: 21px;
  padding: 30px;
  letter-spacing: 0.1px;
  min-height: 250px;
  color: #0e0d3d;
`;

const PayTab = styled(Tab)`
  width: 135px;
  @media (max-width: 992px) {
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
  color: rgba(81, 81, 114, 0.6);
  width: 100%;

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
    max-width: 110px;
  }
  &:nth-child(3) {
    max-width: 110px;
    @media (max-width: 992px) {
      display: none;
    }
  }
  &:nth-child(4) {
    max-width: 95px;
    @media (max-width: 768px) {
      display: none;
    }
  }
  &:nth-child(5) {
    max-width: 170px;
    @media (max-width: 992px) {
      display: none;
    }
  }
  &:nth-child(6) {
    max-width: 100px;
    @media (max-width: 576px) {
      display: none;
    }
  }
  &:nth-child(7) {
    max-width: 110px;
    @media (max-width: 576px) {
      max-width: 80px;
    }
  }
  &:nth-child(8) {
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
  color: #515172;
`;

const TableBodyItemPaid = styled(TableHeadItemPaid)`
  ${TableBodyItemCss}
`;

const Tabs = styled.div`
  display: flex;
  padding: 12px 20px 0;
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
