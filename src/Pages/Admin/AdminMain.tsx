import React, { useState, useContext, useEffect } from "react";
import * as Styled from "./Styled.elements";
import styled, { css } from "styled-components/macro";
import { SideNavbar } from "../../components/SideNav";
import { Card } from "../../globalStyles";
import {
  ColumnChart,
  ColumnChartThree,
  ColumnChartTwo,
  ColumnChartCwd,
} from "../../components/Charts/Test";
import { UpTitle } from "../../components/UI/UpTitle";
import "react-day-picker/lib/style.css";
import { ReactComponent as Exit } from "../../assets/svg/exit.svg";
import { Calendar, MainAdminInput } from "../../components/UI/DayPicker";
import { Header } from "../../components/Header/Header";
import useWindowSize from "../../hooks/useWindowSize";
import { OpenDate } from "../../types/dates";
import { AppContext } from "../../context/HubContext";
import moment from "moment";
import { CSSTransition } from "react-transition-group";
import { PaymentsStat } from "../../types/main";
import { Redirect } from "react-router-dom";

export const AdminMain = () => {
  let currentMonth = moment().format("MMYYYY");
  let year = moment().format("YYYY");
  let prevMonth = moment().subtract(1, "months").date(1).format("MMYYYY");
  let currentMonthStart: any = moment(currentMonth, "M.YYYY").startOf("month");
  let currentMonthEnd: any = moment(currentMonth, "M.YYYY").endOf("month");

  let prevMonthStart: any = moment(prevMonth, "M.YYYY").startOf("month");
  let prevMonthEnd: any = moment(prevMonth, "M.YYYY").endOf("month");

  let yearStart: any = moment(year, "YYYY").startOf("month");
  let yearEnd: any = moment(year, "YYYY").endOf("year");

  const backDays: any = moment().subtract(30, "days");

  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const logOut = appContext.logOut;
  const user = appContext.user;
  const admin = appContext.isAdmin;

  const [openDate, setOpenDate] = useState<OpenDate>({
    from: backDays._d,
    to: new Date(),
  });

  const [depositsDate, setDepositsDate] = useState<OpenDate>({
    from: backDays._d,
    to: new Date(),
  });

  const [statDate, setStatDate] = useState<OpenDate>({
    from: backDays._d,
    to: new Date(),
  });
  const [revenueStat, setRevenueStat] = useState<PaymentsStat>({});
  const [paymentsStat, setPaymentsStat] = useState<PaymentsStat>({});
  const [depositsCreationStat, setDepositsCreationStat] = useState<any>({});
  const [selectedDay, setSelectedDay] = useState<any>(new Date());
  const [depositsCount, setDepositsCount] = useState(0);
  const [depositsAmount, setDepositsAmount] = useState(0);
  const [card, setCard] = useState(0);
  const sizes = useWindowSize();
  const size = sizes < 992;

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke<PaymentsStat>(
          "GetDepositsCreationStat",
          depositsDate.from,
          depositsDate.to
        )
        .then((res) => {
          setDepositsCreationStat(res);
        })
        .catch((e) => console.log(e));
    }
  }, [hubConnection, depositsDate]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke<PaymentsStat>("GetPaymentsStat", openDate.from, openDate.to)
        .then((res) => {
          setPaymentsStat(res);
        })
        .catch((e) => console.log(e));
    }
  }, [hubConnection, openDate]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke<PaymentsStat>("GetRevenueStat", statDate.from, statDate.to)
        .then((res) => {
          setRevenueStat(res);
        })
        .catch((e) => console.log(e));
    }
  }, [hubConnection, statDate]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke<number>("GetUserDepositsAmount", selectedDay)
        .then((res) => {
          console.log("GetUserDepositsAmount", res);
          setDepositsAmount(res / 100000);
        })
        .catch((e) => console.log(e));
    }
  }, [hubConnection, selectedDay]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke("GetUserDepositsCount", selectedDay)
        .then((res) => {
          setDepositsCount(res);
        })
        .catch((e) => console.log(e));
    }
  }, [hubConnection, selectedDay]);

  // if (admin === false) {
  //   return <Redirect to="/" />;
  // }

  const sumFormat = (value: number) => {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + "M";
    } else if (value >= 1000 && value < 1000000) {
      return (value / 1000).toFixed(1) + "k";
    } else {
      return value;
    }
  };

  return (
    <>
      {size && <Header admPanel />}
      <Styled.Wrapper>
        <SideNavbar />
        <Styled.Content>
          <Styled.HeadBlock>
            <UpTitle small>Главный экран</UpTitle>
            <Styled.UserName>
              <span>{user}</span>
              <Exit onClick={logOut} />
            </Styled.UserName>
          </Styled.HeadBlock>
          <CardAdmin>
            <MainChartsContainer>
              <ChartItem>
                <ChartItemHead>
                  <ChartItemTitle small>Новые депозиты</ChartItemTitle>

                  <MainAdminInput
                    setOpenDate={setDepositsDate}
                    openDate={depositsDate}
                    label={"30 дней"}
                  />
                </ChartItemHead>
                <TabsChart>
                  <TabsItem active={card === 0} onClick={() => setCard(0)}>
                    CNT
                  </TabsItem>
                  <TabsItem>/</TabsItem>
                  <TabsItem active={card === 1} onClick={() => setCard(1)}>
                    CWD
                  </TabsItem>
                </TabsChart>
                <TabsContent active={card === 0}>
                  <CSSTransition
                    in={card === 0}
                    timeout={300}
                    classNames="chart"
                    unmountOnExit
                  >
                    <ColumnChart
                      date={
                        Object.keys(depositsCreationStat).length
                          ? Object.keys(depositsCreationStat)
                          : [""]
                      }
                      value={
                        Object.values(depositsCreationStat).length
                          ? Object.values(depositsCreationStat).map(
                              (i: any) => i[0]
                            )
                          : [""]
                      }
                    />
                  </CSSTransition>
                </TabsContent>
                <TabsContent active={card === 1}>
                  <CSSTransition
                    in={card === 1}
                    timeout={300}
                    classNames="chart"
                    unmountOnExit
                  >
                    <ColumnChartCwd
                      date={
                        Object.keys(depositsCreationStat).length
                          ? Object.keys(depositsCreationStat)
                          : [""]
                      }
                      value={
                        Object.values(depositsCreationStat).length
                          ? Object.values(depositsCreationStat).map(
                              (i: any) => i[1] / 100000
                            )
                          : [""]
                      }
                    />
                  </CSSTransition>
                </TabsContent>
              </ChartItem>
              <ChartItem>
                <ChartItemHead>
                  <ChartItemTitle small>Выплаты</ChartItemTitle>
                  <MainAdminInput
                    setOpenDate={setOpenDate}
                    openDate={openDate}
                    label={"30 дней"}
                  />
                </ChartItemHead>
                <ColumnChartTwo
                  date={
                    Object.keys(paymentsStat).length
                      ? Object.keys(paymentsStat)
                      : [""]
                  }
                  value={
                    Object.values(paymentsStat).length
                      ? Object.values(paymentsStat).map((i) => i / 100000)
                      : [""]
                  }
                />
              </ChartItem>
              <ChartItem>
                <ChartItemHead>
                  <ChartItemTitleLast small>
                    Доходность фонда
                  </ChartItemTitleLast>
                  <MainAdminInput
                    setOpenDate={setStatDate}
                    openDate={statDate}
                    label={"30 дней"}
                  />
                </ChartItemHead>
                <ColumnChartThree
                  date={
                    Object.keys(revenueStat).length
                      ? Object.keys(revenueStat)
                      : [""]
                  }
                  value={
                    Object.values(revenueStat).length
                      ? Object.values(revenueStat).map((i) => i / 100000)
                      : [""]
                  }
                />
              </ChartItem>
            </MainChartsContainer>
          </CardAdmin>
          <CardDeposites>
            <Calendar
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
            />
            <Deposites>
              <DepositItem>
                <DepositTitle>Количество депозитов</DepositTitle>
                <DepositValue>{depositsCount}</DepositValue>
              </DepositItem>
              <DepositItem>
                <DepositTitle>Размер депозитов</DepositTitle>
                <DepositValue>
                  {depositsAmount.toLocaleString("ru-RU", {
                    maximumFractionDigits: 1,
                  })}
                </DepositValue>
              </DepositItem>
            </Deposites>
          </CardDeposites>
        </Styled.Content>
      </Styled.Wrapper>
    </>
  );
};

const TabsChart = styled.div`
  display: flex;
  align-items: center;
  padding-left: 30px;
  .chart-enter {
    opacity: 0;
  }
  .chart-enter-active {
    opacity: 1;
    transition: 300ms;
  }
  .chart-exit {
    opacity: 0;
  }
  .chart-exit-active {
    opacity: 0;
  }
`;

const TabsContent = styled.div<{ active?: boolean }>`
  ${(props) => (props.active ? "" : "display:none")};
`;

const TabsItem = styled.div<{ active?: boolean }>`
  font-weight: 500;
  font-size: 20px;
  text-transform: uppercase;
  line-height: 14px;
  cursor: pointer;
  color: ${(props) => (props.active ? "#0e0d3d" : "rgba(14,13,61,.2)")};
`;

const CardAdmin = styled(Card)`
  @media (max-width: 768px) {
    flex-wrap: wrap;
    background: transparent;
    box-shadow: none;
  }
`;

const MainChartsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
  @media (max-width: 1330px) {
    justify-content: center;
  }
`;

const ChartItem = styled.div`
  max-width: 335px;
  width: 100%;
  flex: 1;
  padding-right: 30px;
  &:last-child {
  }
  @media (max-width: 768px) {
    max-width: 100%;
    flex: none;
    background: #fff;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    margin-bottom: 20px;
    padding-right: 0;
  }
  @media (max-width: 340px) {
    max-width: 280px;
  }
`;

const ChartItemHead = styled.div`
  display: flex;
  align-items: center;
  padding-top: 23px;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const ChartItemTitle = styled(UpTitle)`
  margin-bottom: 0;
  white-space: nowrap;
  &:before {
    width: 30%;
  }
  @media (max-width: 1200px) {
    &:before {
      width: 12%;
    }
  }
  @media (max-width: 768px) {
    margin: 0 auto 12px;
    text-align: center;
    width: 100%;
    &:before {
      width: 0;
      margin: 0;
    }
  }
`;

const ChartItemTitleLast = styled(ChartItemTitle)`
  text-align: right;
  white-space: initial;
  &:before {
    width: 12%;
  }
  @media (max-width: 768px) {
    margin: 0 auto 12px;
    text-align: center;
    width: 100%;
    &:before {
      width: 0;
      margin: 0;
    }
  }
`;

const icon = css`
  position: absolute;
  top: 28px;
  cursor: pointer;
`;

const Deposites = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 10px;
  @media (max-width: 992px) {
    flex: none;
    width: 100%;
  }
  @media (max-width: 768px) {
    flex-direction: row;
  }
`;

const DepositItem = styled.div`
  @media (max-width: 768px) {
    width: 50%;
    text-align: left;
    padding-right: 15px;
  }
`;

const DepositTitle = styled.div`
  font-weight: 500;
  font-size: 36px;
  line-height: 42px;
  text-align: center;
  color: #0e0d3d;
  @media (max-width: 1150px) {
    font-size: 32px;
    line-height: 38px;
  }
  @media (max-width: 768px) {
    margin: 0 auto;
    width: 100%;
    font-size: 14px;
    line-height: 16px;
    padding-bottom: 6px;
    text-align: left;
  }
`;

const DepositValue = styled.div`
  font-weight: 500;
  font-size: 72px;
  line-height: 84px;
  text-align: center;
  color: #ff416e;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 490px;
  margin: 0 auto;
  @media (max-width: 1150px) {
    font-size: 60px;
    line-height: 72px;
  }
  @media (max-width: 768px) {
    font-size: 18px;
    line-height: 21px;
    text-align: left;
  }
`;

const CardDeposites = styled(Card)`
  display: flex;
  min-height: 480px;
  justify-content: space-between;
  @media (max-width: 992px) {
    flex-wrap: wrap;
    background: transparent;
    box-shadow: none;
    min-height: auto;
  }
`;
