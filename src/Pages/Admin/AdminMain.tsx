import React, { useState, useContext, useEffect } from "react";
import * as Styled from "./Styled.elements";
import styled, { css } from "styled-components/macro";
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
import { OpenDate } from "../../types/dates";
import { AppContext } from "../../context/HubContext";
import moment from "moment";
import { CSSTransition } from "react-transition-group";
import { PaymentsStat } from "../../types/main";
import { useTranslation } from "react-i18next";
import { HalfRoundBorder } from "../../components/UI/HalfRound";
import useWindowSize from "../../hooks/useWindowSize";

export const AdminMain = () => {
  let currentMonth = moment().format("MMYYYY");
  let year = moment().format("YYYY");
  let prevMonth = moment().subtract(1, "months").date(1).format("MMYYYY");
  // let currentMonthStart: any = moment(currentMonth, "M.YYYY").startOf("month");
  // let currentMonthEnd: any = moment(currentMonth, "M.YYYY").endOf("month");

  // let prevMonthStart: any = moment(prevMonth, "M.YYYY").startOf("month");
  // let prevMonthEnd: any = moment(prevMonth, "M.YYYY").endOf("month");

  // let yearStart: any = moment(year, "YYYY").startOf("month");
  // let yearEnd: any = moment(year, "YYYY").endOf("year");

  const backDays: any = moment().subtract(30, "days");
  const sizes = useWindowSize();
  const size = sizes < 1240;
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const logOut = appContext.logOut;
  const user = appContext.user;

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

  const [closeDate, setCloseDate] = useState<OpenDate>({
    from: backDays._d,
    to: new Date(),
  });

  const [revenueStat, setRevenueStat] = useState<PaymentsStat>({});
  const [paymentsStat, setPaymentsStat] = useState<PaymentsStat>({});
  const [depositsCreationStat, setDepositsCreationStat] = useState<any>({});
  const [depositsClosedStat, setDepositsClosedStat] = useState<any>({});
  const [selectedDay, setSelectedDay] = useState<any>(new Date());
  const [depositsCount, setDepositsCount] = useState(0);
  const [depositsAmount, setDepositsAmount] = useState(0);
  const [amountClose, setAmountClose] = useState<any>([]);
  const [card, setCard] = useState(0);
  const [cardClosed, setCardClosed] = useState(0);
  const { t } = useTranslation();

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
        .invoke<PaymentsStat>(
          "GetDepositsClosingStat",
          closeDate.from,
          closeDate.to
        )
        .then((res) => {
          setDepositsClosedStat(res);
        })
        .catch((e) => console.log(e));
    }
  }, [hubConnection, closeDate]);

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
          setDepositsAmount(res / 100000);
        })
        .catch((e) => console.log(e));
    }
  }, [hubConnection, selectedDay]);

  const start: any = moment(new Date(selectedDay).setHours(0, 0, 0, 0)).utc();
  const end: any = moment(
    new Date(selectedDay).setHours(23, 59, 59, 999)
  ).utc();

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke<PaymentsStat>("GetDepositsClosingStat", start._d, end._d)
        .then((res) => {
          setAmountClose(Object.values(res));
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

  return (
    <>
      <Styled.HeadBlock>
        <UpTitle small>{t("adminMain.uptitle")}</UpTitle>
        <Styled.UserName>
          <span>{user}</span>
          <Exit onClick={logOut} />
        </Styled.UserName>
      </Styled.HeadBlock>

      <CardDeposites>
        <Calendar selectedDay={selectedDay} setSelectedDay={setSelectedDay} />

        <Deposites>
          {/* <DepositItem>
            <DepositTitle>{t("adminMain.depositsCount")}</DepositTitle>
            <DepositValue>{depositsCount}</DepositValue>
          </DepositItem>
          <DepositItem>
            <DepositTitle>{t("adminMain.depositsAmount")}</DepositTitle>
            <DepositValue>
              {depositsAmount.toLocaleString("ru-RU", {
                maximumFractionDigits: 1,
              })}
            </DepositValue>
          </DepositItem> */}
          <RoundWrapeer>
            <RoundItem>
              <ChartItemTitle>{t("adminMain.openDeposit")}</ChartItemTitle>
              <RoundItemInner>
                <HalfRound>
                  <span>{depositsCount}</span>
                  <HalfRoundBorder
                    width={size ? "180" : "200"}
                    height={size ? "180" : "200"}
                    color={"#FF416E"}
                  />
                </HalfRound>

                <Round bg={"#ff416e"}>
                  <span>
                    {depositsAmount.toLocaleString("ru-RU", {
                      maximumFractionDigits: 0,
                    })}
                  </span>
                  <span>CWD</span>
                </Round>
              </RoundItemInner>
            </RoundItem>
            <RoundItem>
              <ChartItemTitle>{t("adminMain.closeDeposit")}</ChartItemTitle>
              <RoundItemInner>
                <HalfRound>
                  <span>{amountClose.length && amountClose[0][0]}</span>
                  <HalfRoundBorder
                    width={size ? "180" : "200"}
                    height={size ? "180" : "200"}
                    color={"#6DB9FF"}
                  />
                </HalfRound>

                <Round bg={"#6DB9FF"}>
                  <span>
                    {amountClose.length &&
                      (amountClose[0][1] / 100000).toLocaleString("ru-RU", {
                        maximumFractionDigits: 0,
                      })}
                  </span>
                  <span>CWD</span>
                </Round>
              </RoundItemInner>
            </RoundItem>
          </RoundWrapeer>
        </Deposites>
      </CardDeposites>

      <CardAdmin>
        <MainChartsContainer>
          <ChartItem>
            <ChartItemHead>
              <ChartItemTitle small>{t("adminMain.headTitle")}</ChartItemTitle>
              <MainAdminInput
                setOpenDate={setDepositsDate}
                openDate={depositsDate}
                label={t("adminMain.dayLabel")}
              />
            </ChartItemHead>
            <ChartInner>
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
            </ChartInner>
          </ChartItem>
          <LastChartItem>
            <ChartItem>
              <ChartItemHead>
                <ChartItemTitle small>{t("adminMain.depositsToClose")}</ChartItemTitle>
                <MainAdminInput
                  setOpenDate={setCloseDate}
                  openDate={closeDate}
                  label={t("adminMain.dayLabel")}
                />
              </ChartItemHead>
              <ChartInner>
                <TabsChart>
                  <TabsItem
                    active={cardClosed === 0}
                    onClick={() => setCardClosed(0)}
                  >
                    CNT
                  </TabsItem>
                  <TabsItem>/</TabsItem>
                  <TabsItem
                    active={cardClosed === 1}
                    onClick={() => setCardClosed(1)}
                  >
                    CWD
                  </TabsItem>
                </TabsChart>
                <TabsContent active={cardClosed === 0}>
                  <CSSTransition
                    in={cardClosed === 0}
                    timeout={300}
                    classNames="chart"
                    unmountOnExit
                  >
                    <ColumnChart
                      date={
                        Object.keys(depositsClosedStat).length
                          ? Object.keys(depositsClosedStat)
                          : [""]
                      }
                      value={
                        Object.values(depositsClosedStat).length
                          ? Object.values(depositsClosedStat).map(
                              (i: any) => i[0]
                            )
                          : [""]
                      }
                    />
                  </CSSTransition>
                </TabsContent>
                <TabsContent active={cardClosed === 1}>
                  <CSSTransition
                    in={cardClosed === 1}
                    timeout={300}
                    classNames="chart"
                    unmountOnExit
                  >
                    <ColumnChartCwd
                      date={
                        Object.keys(depositsClosedStat).length
                          ? Object.keys(depositsClosedStat)
                          : [""]
                      }
                      value={
                        Object.values(depositsClosedStat).length
                          ? Object.values(depositsClosedStat).map(
                              (i: any) => i[1] / 100000
                            )
                          : [""]
                      }
                    />
                  </CSSTransition>
                </TabsContent>
              </ChartInner>
            </ChartItem>
          </LastChartItem>
        </MainChartsContainer>
      </CardAdmin>

      <CardAdmin>
        <MainChartsContainer>
          <ChartItem>
            <ChartItemHead>
              <ChartItemTitle small>
                {t("adminMain.chartTitle1")}
              </ChartItemTitle>
              <MainAdminInput
                setOpenDate={setOpenDate}
                openDate={openDate}
                label={t("adminMain.dayLabel")}
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
          <LastChartItem>
            <ChartItem>
              <ChartItemHead>
                <ChartItemTitleLast small>
                  {t("adminMain.chartTitle2")}
                </ChartItemTitleLast>
                <MainAdminInput
                  setOpenDate={setStatDate}
                  openDate={statDate}
                  label={t("adminMain.dayLabel")}
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
          </LastChartItem>
        </MainChartsContainer>
      </CardAdmin>
    </>
  );
};

const HalfRound = styled.div`
  width: 200px;
  height: 200px;
  position: relative;
  /* @media (max-width: 768px) {
    width: 63px;
    height: 63px;
  } */
  span {
    position: absolute;
    top: 40%;
    left: 39px;
    font-weight: normal;
    font-size: 36px;
    line-height: 42px;
    text-align: center;
    display: block;
    width: 100px;
    color: ${(props) => props.theme.text};
    @media (max-width: 1240px) {
      font-size: 30px;
      line-height: 35px;
      top: 36%;
      left: 27px;
    }
    /* @media (max-width: 768px) {
      font-size: 10px;
      line-height: 16px;
      top: 36%;
      left: 3px;
      width: 39px;
      font-weight: bold;
    } */
  }
`;

const ChartItemTitle = styled(UpTitle)`
  margin-bottom: 0;
  white-space: normal;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-right: 10px;
  &:before {
    margin: 0 20px 0 0;
    flex: 1 0 20px;
  }
  @media (max-width: 800px) {
    margin: 0 auto 12px;
    text-align: center;
    width: 100%;
    &:before {
      width: 0;
      margin: 0;
      display: none;
    }
  }
`;

const RoundWrapeer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -30px;
  @media (max-width: 1240px) {
    flex-wrap: wrap;
  }
  @media (max-width: 768px) {
    margin-left: -60px;
  }
`;

const RoundItemInner = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
`;

const RoundItem = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  flex-direction: column;
  max-width: 316px;
  width: 100%;
  margin-right: 10px;
  @media (max-width: 1240px) {
    max-width: 275px;
  }
  @media (max-width: 768px) {
    margin-right: 0;
  }
  ${ChartItemTitle} {
    padding-left: 20px;
    margin-bottom: 20px;
    @media (max-width: 1240px) {
      margin-bottom: 10px;
    }
    @media (max-width: 768px) {
      padding-left: 5px;
      margin-bottom: 15px;
      &:before {
        display: inline-block;
        margin-right: 10px;
      }
    }
  }
`;

const Round = styled.div<{ bg: string }>`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-radius: 50%;
  border: 10px solid ${(props) => props.bg};
  position: absolute;
  top: -2px;
  right: -23px;
  @media (max-width: 1240px) {
    width: 180px;
    height: 180px;
  }
  @media (max-width: 768px) {
    right: -38px;
  }
  span {
    font-weight: normal;
    font-size: 32px;
    line-height: 37px;
    text-align: center;
    color: ${(props) => props.theme.text};
    @media (max-width: 1240px) {
      font-size: 24px;
      line-height: 28px;
    }
  }
  /* @media (max-width: 576px) {
    width: 63px;
    height: 63px;
    border-width: 3px;
    span {
      font-size: 12px;
      line-height: 14px;
    }
  } */
`;

const LastChartItem = styled.div`
  width: 60%;
  display: flex;
  justify-content: center;

  ${ChartItem} {
    max-width: 410px;
  }

  @media (max-width: 992px) {
    width: 50%;
  }
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const ChartInner = styled.div`
  width: 100%;
  padding-left: 30px;
  @media (max-width: 992px) {
    padding-left: 0px;
  }
`;

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
  color: ${(props) => (props.active ? props.theme.text : props.theme.nextPay)};
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
  justify-content: flex-start;
  /* flex-wrap: wrap; */
  padding: 0 30px;
  @media (max-width: 992px) {
    justify-content: space-between;
  }
  @media (max-width: 800px) {
    flex-wrap: wrap;
    padding: 0;
  }
`;

const ChartItem = styled.div`
  max-width: 350px;
  width: 100%;
  flex: 1;
  @media (max-width: 992px) {
    max-width: 330px;
  }
  @media (max-width: 800px) {
    max-width: 100%;
    flex: none;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    margin-bottom: 20px;
    padding-right: 0;
    background: ${(props) => props.theme.card.background};
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
  @media (max-width: 800px) {
    flex-wrap: wrap;
    justify-content: center;
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
  @media (max-width: 1240px) {
    padding: 20px 10px;
  }
  @media (max-width: 992px) {
    flex: none;
    width: 100%;
    order: -1;
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
  color: ${(props) => props.theme.text};
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
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    min-height: auto;
  }
`;
