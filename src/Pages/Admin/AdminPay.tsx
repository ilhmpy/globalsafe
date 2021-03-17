import React, { useState, useRef, useContext, useEffect, FC } from "react";
import * as Styled from "./Styled.elements";
import styled, { css } from "styled-components/macro";
import { SideNavbar } from "../../components/SideNav";
import { Card } from "../../globalStyles";
import { UpTitle } from "../../components/UI/UpTitle";
import { ReactComponent as Exit } from "../../assets/svg/exit.svg";
import { ReactComponent as Filter } from "../../assets/svg/filter.svg";
import { ReactComponent as Pen } from "../../assets/svg/pen.svg";
import { Tab, Content } from "../../components/UI/Tabs";
import { AppContext } from "../../context/HubContext";
import { AmountContext } from "../../context/AmountContext";
// import { InfiniteLoader, AutoSizer, List } from "react-virtualized";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import InfiniteLoader from "react-window-infinite-loader";
import "react-virtualized/styles.css"; // only needs to be imported once
import { Button } from "../../components/Button/Button";
import useWindowSize from "../../hooks/useWindowSize";
import { Checkbox } from "../../components/UI/Checkbox";
import { RootPayments, PaymentsCollection } from "../../types/payments";
import ReactNotification, { store } from "react-notifications-component";
import InfiniteScroll from "react-infinite-scroller";
import "react-notifications-component/dist/theme.css";
import { Scrollbars } from "react-custom-scrollbars";
import moment from "moment";

const InputWrap: FC<{
  val: any;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ val, onChange, placeholder }: any) => {
  // const [value, setValue] = useState(val);
  const inputRef = useRef<HTMLInputElement>(null);
  const focusField = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  };
  // const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setValue(e.target.value);
  // };
  return (
    <InputIcon>
      <Input
        onChange={onChange}
        ref={inputRef}
        value={val}
        placeholder={placeholder}
        type="number"
      />
      <Pen onClick={focusField} />
    </InputIcon>
  );
};

const PaymentsPay = () => {
  return (
    <PayCard>
      <PayCardBlock>
        <PayName>Депозит №1</PayName>
      </PayCardBlock>
      <PayCardBlock>
        <PayText small>Пользователь</PayText>
        <PayText>Account 1</PayText>
      </PayCardBlock>
      <PayCardBlock>
        <PayText small>% доходности</PayText>
        <PayText>100</PayText>
      </PayCardBlock>
      <PayCardBlock>
        <PayText small>Дата выплаты</PayText>
        <PayText>01/03/2021</PayText>
      </PayCardBlock>
      <PayCardBlock>
        <PayText small>Категория</PayText>
        <PayText>Начисление дивидендов</PayText>
      </PayCardBlock>
      <PayCardBlock>
        <PayText small>Сумма вклада</PayText>
        <PayText>400 000</PayText>
      </PayCardBlock>
      <PayCardBlock>
        <PayText small>Сумма выплаты</PayText>
        <PayInput type="number" placeholder="20 000" />
      </PayCardBlock>
      <PayCardBlock>
        <Button dangerOutline>Подтвердить</Button>
      </PayCardBlock>
    </PayCard>
  );
};

const PayCard = styled(Card)`
  padding: 20px;
`;

const PayCardBlock = styled.div`
  margin-bottom: 20px;
  &:focus,
  &:active {
    outline: none;
    border-radius: 24px;
    background: transparent;
  }
  ${Button} {
    margin-left: auto;
    margin-right: auto;
  }
`;

const PayName = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.1px;
  color: #515172;
`;

const PayInput = styled.input`
  border: none;
  font-size: 14px;
  width: 100%;
  line-height: 16px;
  letter-spacing: 0.1px;
  color: #515172;
  padding-right: 10px;
  border-bottom: 1px solid rgba(81, 81, 114, 0.2);
  &:focus {
    outline: none;
    border-bottom: 1px solid rgba(81, 81, 114, 0.8);
  }
`;

const PayText = styled.p<{ small?: boolean }>`
  font-weight: normal;
  font-size: ${(props) => (props.small ? "12px" : "14px")};
  line-height: ${(props) => (props.small ? "21px" : "16px")};
  letter-spacing: 0.1px;
  color: ${(props) => (props.small ? "rgba(81, 81, 114, 0.6)" : "#515172")};
`;

type ListProps = {
  data: PaymentsCollection;
  adjustPay: (id: string, val: number) => void;
  confirmPay: (id: string) => void;
};

const DepositList: FC<ListProps> = ({
  data,
  adjustPay,
  confirmPay,
}: ListProps) => {
  const [value, setValue] = useState("");
  const sizes = useWindowSize();
  const size = sizes < 992;
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const payments = (id: string) => {
    if (value !== "") {
      adjustPay(id, +value * 100000);
    } else {
      confirmPay(id);
    }
  };

  return (
    <TableBody>
      <TableBodyItem title={data.userName}>{data.userName}</TableBodyItem>
      <TableBodyItem>{data.deposit.name}</TableBodyItem>
      <TableBodyItem>
        {value
          ? ((+value / data.baseAmountView) * 100).toFixed(1)
          : ((data.payAmount / data.baseAmount) * 100).toFixed(1)}
      </TableBodyItem>
      <TableBodyItem>
        {data.paymentDate ? moment(data.paymentDate).format("DD/MM/YYYY") : "-"}
      </TableBodyItem>
      <TableBodyItem>Начисление дивидендов</TableBodyItem>
      <TableBodyItem>{data.baseAmountView.toLocaleString()}</TableBodyItem>
      <TableBodyItem>
        <InputWrap
          val={value}
          placeholder={(data.payAmount / 100000).toFixed(2).toString()}
          onChange={onChange}
        />
      </TableBodyItem>
      <TableBodyItem>
        {size ? (
          <Checkbox
            checked={data.state === 5}
            onChange={() => payments(data.safeId)}
          />
        ) : data.state === 5 ? (
          <Button greenOutline>Подтверждено</Button>
        ) : (
          <Button dangerOutline onClick={() => payments(data.safeId)}>
            Подтвердить
          </Button>
        )}
      </TableBodyItem>
    </TableBody>
  );
};

export const AdminPay = () => {
  const [active, setActive] = useState(0);
  const sizes = useWindowSize();
  const size = sizes < 992;
  const [show, setShow] = useState(false);
  const [sum, setSum] = useState<number[] | null>(null);
  const [depositList, setDepositList] = useState<any>([]);
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
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

  const myLoad = (...arg: any) => {
    console.log("arguments", arg);
    if (hubConnection) {
      setNext(false);
      hubConnection
        .invoke<RootPayments>(
          "GetUsersDeposits",
          [1, 2, 3, 4, 5, 6],
          null,
          null,
          null,
          null,
          null,
          null,
          true,
          numPay,
          20
        )
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
          console.log("res Payments", res);
          setTotalPayments(res.totalRecords);
          setPaymentsList(res.collection);
          setNumPayments(20);
        })
        .catch((err: Error) => console.log(err));
    }
  }, [hubConnection]);

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
          console.log("res 6", res);
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
        .invoke<RootPayments>(
          "GetUsersDeposits",
          [1, 2, 3, 4, 5, 6],
          null,
          null,
          null,
          null,
          null,
          null,
          true,
          0,
          20
        )
        .then((res) => {
          console.log("res true", res);
          setTotalPayDeposits(res.totalRecords);
          setDepositPayList(res.collection);
          setPayNum(20);
        })
        .catch((err: Error) => console.log(err));
    }
  }, [hubConnection]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke("GetPaymentsOverview")
        .then((res) => {
          setSum(res);
        })
        .catch((err: Error) => console.log(err));
    }
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
          setPaymentsList([...paymentsList, ...res.collection]);
          setNumPayments(numPayments + 20);
          setPayCount(true);
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
          [6],
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
          setDepositList([...depositList, ...res.collection]);
          setCount(true);
          setNum(num + 20);
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

  const confirmPay = (id: string) => {
    if (hubConnection) {
      hubConnection
        .invoke("ConfirmDepositPayment", id)
        .then((res) => {
          alert("Успешно", "Выполнено", "success");
          console.log("ConfirmDepositPayment", res);
        })
        .catch((err: Error) => {
          alert("Ошибка", "Произошла ошибка", "danger");
        });
    }
  };

  const adjustPay = (id: string, amount: number) => {
    if (hubConnection) {
      hubConnection
        .invoke("AdjustDepositPayment", id, amount)
        .then((res) => {
          console.log("AdjustDepositPayment", res);
          alert("Успешно", "Выполнено", "success");
          confirmPay(id);
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
        })
        .catch((err: Error) => {
          alert("Ошибка", "Произошла ошибка", "danger");
        });
    }
  };

  return (
    <Styled.Wrapper>
      <SideNavbar />
      <Styled.Content>
        <Styled.HeadBlock>
          <UpTitle small>Выплаты</UpTitle>
          <Styled.UserName>
            <span>Admin</span>
            <Exit />
          </Styled.UserName>
        </Styled.HeadBlock>

        <Card>
          <PayList>
            <PayItem>
              <Styled.PayItemHead mb>
                <UpTitle small>К выплате</UpTitle>
              </Styled.PayItemHead>
              <Styled.Radial bg={"rgba(255, 65, 110, 0.2)"}>
                <span>
                  {sum ? (sum[2] / 100000).toFixed(0).toLocaleString() : "-"}
                </span>
                <span>CWD</span>
              </Styled.Radial>
            </PayItem>
            <PayItem>
              <Styled.PayItemHead mb>
                <UpTitle small>Выплачено</UpTitle>
              </Styled.PayItemHead>

              <Styled.Radial bg={"rgba(188, 212, 118, 0.2)"}>
                <span>
                  {sum ? (sum[0] / 100000).toFixed(0).toLocaleString() : "-"}
                </span>
                <span>CWD</span>
              </Styled.Radial>
            </PayItem>
            <PayItem>
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
            </PayItem>
            <PayItem></PayItem>
          </PayList>
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
        <ReactNotification />
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
                <TableHeadItem>Категория</TableHeadItem>
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
                    {depositPayList.map((item: PaymentsCollection) => (
                      <TableBody key={item.safeId}>
                        <TableBodyItemPaid>{item.userName}</TableBodyItemPaid>
                        <TableBodyItemPaid>
                          {item.deposit.name}
                        </TableBodyItemPaid>
                        <TableBodyItemPaid>
                          {moment(item.prevPayment).format("DD/MM/YYYY")}
                        </TableBodyItemPaid>
                        <TableBodyItemPaid>
                          Начисление дивидендов
                        </TableBodyItemPaid>
                        <TableBodyItemPaid>
                          {item.baseAmountView.toLocaleString()}
                        </TableBodyItemPaid>
                        <TableBodyItemPaid>
                          {item.payedAmountView}
                        </TableBodyItemPaid>
                        <TableBodyItemPaid></TableBodyItemPaid>
                      </TableBody>
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
                      <TableBody key={item.safeId}>
                        <TableBodyItemPaid>{item.userName}</TableBodyItemPaid>
                        <TableBodyItemPaid>
                          {item.deposit.name}
                        </TableBodyItemPaid>
                        <TableBodyItemPaid>
                          {moment(item.paymentDate).format("DD/MM/YYYY")}
                        </TableBodyItemPaid>
                        <TableBodyItemPaid>
                          Начисление дивидендов
                        </TableBodyItemPaid>
                        <TableBodyItemPaid>
                          {item.baseAmountView.toLocaleString()}
                        </TableBodyItemPaid>
                        <TableBodyItemPaid>
                          {item.payedAmountView}
                        </TableBodyItemPaid>
                        <TableBodyItemPaid></TableBodyItemPaid>
                      </TableBody>
                    ))}
                  </InfiniteScroll>
                </Scrollbars>
              ) : (
                <NotFound>Данные не обнаружены.</NotFound>
              )}

              {/* <TableBody>
                <TableBodyItemPaid>Account 1</TableBodyItemPaid>
                <TableBodyItemPaid>Название Депозита №1</TableBodyItemPaid>
                <TableBodyItemPaid>01/03/2021</TableBodyItemPaid>
                <TableBodyItemPaid>Начисление дивидендов</TableBodyItemPaid>
                <TableBodyItemPaid>140 000</TableBodyItemPaid>
                <TableBodyItemPaid>40 000</TableBodyItemPaid>
                <TableBodyItemPaid></TableBodyItemPaid>
              </TableBody> */}
            </PaymentsTable>
          </Card>
        </Content>
      </Styled.Content>
    </Styled.Wrapper>
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
  @media (max-width: 768px) {
    width: 100px !important;
  }
`;

const CalendarWrap = styled.div`
  position: absolute;
  bottom: -249px;
  left: -138px;
  z-index: 999;
`;

const InputIcon = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 576px) {
    justify-content: center;
  }
  svg {
    cursor: pointer;
    path {
      transition: 0.3s;
    }
    &:hover path {
      fill: #000;
    }
    @media (max-width: 576px) {
      display: none;
    }
  }
`;

const Input = styled.input`
  border: none;
  outline: none;
  width: 75px;
`;

const PaymentsTable = styled.div`
  padding: 30px;
  height: 600px;
  @media (max-width: 768px) {
    height: 300px;
  }
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
    max-width: 90px;
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
    max-width: 100px;
  }
  &:nth-child(6) {
    max-width: 100px;
    @media (max-width: 576px) {
      display: block;
      text-align: center;
    }
  }
  &:nth-child(7) {
    max-width: 40px;
    text-align: right;
  }
`;

const TableBody = styled(TableHead)`
  padding: 10px 0;
`;

const TableBodyItemCss = css`
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: #515172;
`;

const TableBodyItem = styled(TableHeadItem)`
  ${TableBodyItemCss}
`;

const TableBodyItemPaid = styled(TableHeadItemPaid)`
  ${TableBodyItemCss}
`;

const Tabs = styled.div`
  display: flex;
  padding: 12px 20px 0;
  @media (max-width: 768px) {
    padding: 12px 10px 0;
    ${Tab} {
      width: 80px;
      &:first-child {
        text-align: left;
      }
      &:last-child {
        text-align: right;
        &:before {
          left: 23px;
        }
      }
    }
  }
`;

const PayList = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  @media (max-width: 992px) {
    flex-wrap: wrap;
  }
`;

const PayItem = styled.div`
  position: relative;
  display: flex;
  width: 33.3333%;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  ${UpTitle} {
    margin-bottom: 0;
    margin-right: 10px;
  }
  &:last-child {
    display: none;
  }
  @media (max-width: 768px) {
    width: 50%;
    margin-bottom: 20px;
    ${Styled.ChartItemDate} {
      display: none;
    }
    &:last-child {
      display: flex;
      margin-bottom: 0px;
      ${Styled.ChartItemDate} {
        display: inline-block;
        max-width: 180px;
        margin-left: auto;
        margin-right: auto;
        padding: 6px 12px;
      }
    }
  }
  @media (max-width: 576px) {
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
