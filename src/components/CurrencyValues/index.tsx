import React, { useEffect, useState, useContext, FC } from "react";
import Chart from "react-apexcharts";
import styled, { keyframes } from "styled-components/macro";
import moment from "moment";
import { Container, Card } from "../../globalStyles";
import greenBg from "../../assets/svg/greenBack.svg";
import redBg from "../../assets/svg/redBack.svg";
import { AppContext } from "../../context/HubContext";
import { RootChange, Collection } from "../../types/currency";
import { CSSTransition } from "react-transition-group";

export const CurrencyValues = () => {
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const [active, setActive] = useState(0);
  const [listDIAMOND, setListDIAMOND] = useState<Collection[]>([]);
  const [listMGCWD, setListMGCWD] = useState<Collection[]>([]);
  const [listGCWD, setListGCWD] = useState<Collection[]>([]);

  useEffect(() => {
    const dateFrom: any = moment().subtract(7, "days");
    if (hubConnection) {
      hubConnection
        .invoke<RootChange>("GetMarket", 4, dateFrom._d, new Date(), 0, 40)
        .then((res) => {
          setListDIAMOND(res.collection);
        })
        .catch((e) => console.log(e));
    }
  }, [hubConnection]);

  useEffect(() => {
    const dateFrom: any = moment().subtract(7, "days");
    if (hubConnection) {
      hubConnection
        .invoke<RootChange>("GetMarket", 3, dateFrom._d, new Date(), 0, 40)
        .then((res) => {
          setListMGCWD(res.collection);
          console.log("GetMarket", res);
        })
        .catch((e) => console.log(e));
    }
  }, [hubConnection]);

  useEffect(() => {
    const dateFrom: any = moment().subtract(7, "days");
    if (hubConnection) {
      hubConnection
        .invoke<RootChange>("GetMarket", 2, dateFrom._d, new Date(), 0, 40)
        .then((res) => {
          setListGCWD(res.collection);
          console.log("GetMarket", res);
        })
        .catch((e) => console.log(e));
    }
  }, [hubConnection]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection.on("MarketNotification", (data) => {
        console.log("MarketNotification", data);
        if (data.assetKind === 2) {
          setListGCWD([data, ...listGCWD]);
        } else if (data.assetKind === 3) {
          setListMGCWD([data, ...listMGCWD]);
        } else {
          setListDIAMOND([data, ...listDIAMOND]);
        }
      });
    }
  }, [hubConnection]);

  const changeValue = (data: Collection[]) => {
    const currValue = data[0].latestBid;
    const prevValue = data[1].latestBid;

    const value = ((currValue - prevValue) / currValue) * 100;
    if (value > 0) {
      return <ChartItemChange>{value.toFixed(2)} &nbsp;%</ChartItemChange>;
    } else {
      return <ChartItemChange red>{value.toFixed(2)}&nbsp;%</ChartItemChange>;
    }
  };

  return (
    <div>
      <Container>
        <Wrapper>
          <ChartItems>
            {listGCWD.length && (
              <ChartItem
                red={listGCWD[0].latestBid < listGCWD[1].latestBid}
                alfa
                onClick={() => setActive(0)}
                active={active === 0}
              >
                <ChartItemInner>
                  <ChartItemHead>
                    <ChartItemName>GCWD</ChartItemName>
                    {listGCWD.length && changeValue(listGCWD)}
                  </ChartItemHead>
                  <ChartItemValue
                    green={listGCWD[0].latestBid > listGCWD[1].latestBid}
                  >
                    {(listGCWD[0].latestBid / 100000).toLocaleString("ru-RU", {
                      maximumFractionDigits: 2,
                    })}{" "}
                    CWD
                  </ChartItemValue>
                </ChartItemInner>
              </ChartItem>
            )}
            {listGCWD.length && (
              <ChartItem
                alfa
                onClick={() => setActive(1)}
                active={active === 1}
                red={listMGCWD[0].latestBid < listMGCWD[1].latestBid}
              >
                <ChartItemInner>
                  <ChartItemHead>
                    <ChartItemName>MGCWD</ChartItemName>
                    {listMGCWD.length && changeValue(listMGCWD)}
                  </ChartItemHead>
                  {listMGCWD.length && (
                    <ChartItemValue
                      green={listMGCWD[0].latestBid > listMGCWD[1].latestBid}
                    >
                      {(listMGCWD[0].latestBid / 100000).toLocaleString(
                        "ru-RU",
                        {
                          maximumFractionDigits: 2,
                        }
                      )}{" "}
                      CWD
                    </ChartItemValue>
                  )}
                </ChartItemInner>
              </ChartItem>
            )}
            {listGCWD.length && (
              <ChartItem
                alfa
                red={listDIAMOND[0].latestBid < listDIAMOND[1].latestBid}
                onClick={() => setActive(2)}
                active={active === 2}
              >
                <ChartItemInner>
                  <ChartItemHead>
                    <ChartItemName>DIAMOND</ChartItemName>
                    {listDIAMOND.length && changeValue(listDIAMOND)}
                  </ChartItemHead>
                  {listDIAMOND.length && (
                    <ChartItemValue
                      green={
                        listDIAMOND[0].latestBid > listDIAMOND[1].latestBid
                      }
                    >
                      {(listDIAMOND[0].latestBid / 100).toLocaleString(
                        "ru-RU",
                        {
                          maximumFractionDigits: 2,
                        }
                      )}{" "}
                      CWD
                    </ChartItemValue>
                  )}
                </ChartItemInner>
              </ChartItem>
            )}
          </ChartItems>
          <Charts alfa>
            <CSSTransition
              in={active === 0}
              timeout={0}
              classNames="modal"
              unmountOnExit
            >
              <>
                <ApexChart values={listGCWD.map((i) => i.latestBid / 100)} />
                <DescChart>
                  <span>Сегодня</span>
                  <span>
                    {listGCWD.length &&
                      moment(listGCWD[listGCWD.length - 1].date).format(
                        "MMMM `DD"
                      )}
                  </span>
                </DescChart>
              </>
            </CSSTransition>
            <CSSTransition
              in={active === 1}
              timeout={0}
              classNames="modal"
              unmountOnExit
            >
              <>
                <ApexChart values={listMGCWD.map((i) => i.latestBid / 100)} />
                <DescChart>
                  <span>Сегодня</span>
                  <span>
                    {listMGCWD.length &&
                      moment(listMGCWD[listMGCWD.length - 1].date).format(
                        "MMMM `DD"
                      )}
                  </span>
                </DescChart>
              </>
            </CSSTransition>
            <CSSTransition
              in={active === 2}
              timeout={0}
              classNames="modal"
              unmountOnExit
            >
              <>
                <ApexChart values={listDIAMOND.map((i) => i.latestBid / 100)} />
                <DescChart>
                  <span>Сегодня</span>
                  <span>
                    {listDIAMOND.length &&
                      moment(listDIAMOND[listDIAMOND.length - 1].date).format(
                        "MMMM `DD"
                      )}
                  </span>
                </DescChart>
              </>
            </CSSTransition>
          </Charts>
        </Wrapper>
      </Container>
    </div>
  );
};

type ChartProps = {
  values: number[];
};

const ApexChart: FC<ChartProps> = ({ values }) => {
  const data = {
    series: [
      {
        data: values,
      },
    ],
    options: {
      chart: {
        type: "area",
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 350,
          animateGradually: {
            enabled: true,
            delay: 500,
          },
          dynamicAnimation: {
            enabled: true,
            speed: 850,
          },
        },
        labels: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ["#FF416E"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      labels: [""],
      xaxis: {
        tooltip: {
          enabled: false,
        },
        labels: {
          show: false,
        },
        type: "category",
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: false,
        tooltip: {
          enabled: false,
        },
        labels: {
          show: false,
        },
      },
      grid: {
        show: false,
      },
      legend: {
        show: false,
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
          return `
          <div class="currency-toltip">
            <div >${w.globals.stackedSeriesTotals[
              dataPointIndex
            ].toLocaleString()} CWD</div>
          </div>
          `;
        },
      },
      fill: {
        colors: ["#FF416E", "rgba(255, 255, 255, 0.4)"],
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.5,
          opacityTo: 0.6,
          stops: [0, 90, 100],
        },
      },
    },
  };

  return (
    <div id="chart">
      <Chart
        options={data.options}
        series={data.series}
        type="area"
        height={280}
      />
    </div>
  );
};

const DescChart = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom: 20px;
  left: 65px;
  right: 12px;
  span {
    color: rgba(81, 81, 114, 0.6);
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const Charts = styled(Card)`
  padding: 10px 20px;
  height: 300px;
  max-width: 700px;
  position: relative;
  width: 100%;
  border: 1px solid #ffffff;
  @media (max-width: 768px) {
    max-width: 100%;
    height: auto;
    padding: 6px 0px;
  }
`;

const ChartItemHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChartItemChange = styled.div<{ red?: boolean }>`
  position: relative;
  margin-left: 40px;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: ${(props) => (props.red ? " #FF416E" : "#BCD476")};
  &:before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    left: -20px;
    top: 50%;
    margin-top: -4px;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    border-top: 6px solid ${(props) => (props.red ? " #FF416E" : "#BCD476")};
    transform: ${(props) => (props.red ? "rotate(0)" : "rotate(180deg)")};
  }
`;

const ChartItems = styled.div`
  width: 340px;
  margin-right: 20px;
  flex: none;
  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0px;
  }
`;

const ChartItemInner = styled.div`
  width: 100%;
`;

const ChartItem = styled(Card)<{ red?: boolean; active?: boolean }>`
  text-align: left;
  margin: 0 auto;
  padding: 6px 18px;
  margin-bottom: 20px;
  display: flex;
  border: 1px solid ${(props) => (props.active ? "#FF416E" : "#ffffff")};
  justify-content: space-between;
  align-items: center;
  background: ${(props) => (props.red ? `url(${redBg})` : `url(${greenBg})`)};
  background-repeat: no-repeat;
  /* background-size: cover; */
  background-origin: content-box;
  cursor: pointer;
  transition: border 0.2s;
`;

const ChartItemName = styled.div`
  font-weight: 500;
  font-size: 18px;
  margin-bottom: 10px;
  line-height: 21px;
  color: #515172;
  z-index: 99;
`;

const BgGreen = keyframes`
  0% { background: #c2f2c2; }
  50% { background: #c2f2c2 }
  100% { background: transparent }
`;

const BgRed = keyframes`
  0% { background: #fcdede; }
  50% { background: #fcdede }
  100% { background: transparent }
`;

const ChartItemValue = styled.div<{ green?: boolean }>`
  font-weight: 500;
  font-size: 36px;
  line-height: 42px;
  color: #515172;
  animation: ${(props) => (props.green ? BgGreen : BgRed)} 0.5s linear;
  display: inline-block;
  padding: 0 5px;
  opacity: 1;
  transition: opacity 0.5s ease-in;
  @media (max-width: 768px) {
    font-size: 24px;
    line-height: 28px;
  }
`;
