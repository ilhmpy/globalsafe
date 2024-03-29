import moment from 'moment';
import React, { FC, useContext, useEffect, useState, useCallback } from 'react';
import Chart from 'react-apexcharts';
import { CSSTransition } from 'react-transition-group';
import styled, { css, keyframes } from 'styled-components/macro';
import { AppContext } from '../../context/HubContext';
import { Card, Container } from '../../globalStyles';
import useWindowSize from '../../hooks/useWindowSize';
import { Collection, RootChange } from '../../types/currency';

export const CurrencyValues = () => {
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const [active, setActive] = useState(0);
  const [listDIAMOND, setListDIAMOND] = useState<Collection[]>([]);
  const [listMGCWD, setListMGCWD] = useState<Collection[]>([]);
  const [listGCWD, setListGCWD] = useState<Collection[]>([]);
  const [numDIAMOND, setNumDIAMOND] = useState<number>(0);
  const [numMGCWD, setNumMGCWD] = useState(0);
  const [numGCWD, setNumGCWD] = useState(0);
  const size = useWindowSize();
  const mob = size <= 768;

  const fetchDIAMOND = useCallback(
    async (date: string) => {
      let arrList: Collection[] = [];
      let isFetching = true;
      let totalNum = 0;
      if (hubConnection) {
        while (isFetching) {
          try {
            const res = await hubConnection.invoke<RootChange>(
              'GetMarket',
              4,
              date,
              new Date(),
              totalNum,
              100
            );
            if (res) {
              if (arrList.length < res.totalRecords) {
                totalNum += 100;
                arrList = [...arrList, ...res.collection];
              } else {
                isFetching = false;
                break;
              }
            }
          } catch (e) {
            console.log(e);
          }
        }
        setListDIAMOND(arrList);
      }
    },
    [hubConnection]
  );

  useEffect(() => {
    const dateFrom = moment().subtract(7, 'days').format();
    if (hubConnection) {
      fetchDIAMOND(dateFrom);
    }
  }, [hubConnection]);

  const fetchMGCWD = useCallback(
    async (date: string) => {
      let arrList: Collection[] = [];
      let isFetching = true;
      let totalNum = 0;
      if (hubConnection) {
        while (isFetching) {
          try {
            const res = await hubConnection.invoke<RootChange>(
              'GetMarket',
              2,
              date,
              new Date(),
              totalNum,
              100
            );
            if (res) {
              if (arrList.length < res.totalRecords) {
                totalNum += 100;
                arrList = [...arrList, ...res.collection];
              } else {
                isFetching = false;
                break;
              }
            }
          } catch (e) {
            console.log(e);
          }
        }
        setListMGCWD(arrList);
      }
    },
    [hubConnection]
  );

  useEffect(() => {
    const dateFrom = moment().subtract(7, 'days').format();
    if (hubConnection) {
      fetchMGCWD(dateFrom);
    }
  }, [hubConnection]);

  const fetchGCWD = useCallback(
    async (date: string) => {
      let arrList: Collection[] = [];
      let isFetching = true;
      let totalNum = 0;
      if (hubConnection) {
        while (isFetching) {
          try {
            const res = await hubConnection.invoke<RootChange>(
              'GetMarket',
              3,
              date,
              new Date(),
              totalNum,
              100
            );
            if (res) {
              if (arrList.length < res.totalRecords) {
                totalNum += 100;
                arrList = [...arrList, ...res.collection];
              } else {
                isFetching = false;
                break;
              }
            }
          } catch (e) {
            console.log(e);
          }
        }
        setListGCWD(arrList);
      }
    },
    [hubConnection]
  );

  useEffect(() => {
    const dateFrom = moment().subtract(7, 'days').format();
    if (hubConnection) {
      fetchGCWD(dateFrom);
    }
  }, [hubConnection]);

  useEffect(() => {
    const cb = (data: Collection) => {
      console.log('MarketNotification', data);
      if (data.assetKind === 3) {
        setListGCWD((listGCWD) => [...listGCWD, data]);
      } else if (data.assetKind === 2) {
        setListMGCWD((listMGCWD) => [...listMGCWD, data]);
      } else {
        setListDIAMOND((listDIAMOND) => [...listDIAMOND, data]);
      }
    };
    if (hubConnection) {
      hubConnection.on('MarketNotification', cb);
    }
    return () => {
      hubConnection?.off('MarketNotification', cb);
    };
  }, [hubConnection]);

  const changeValue = (data: Collection[]) => {
    const currValue = data[data.length - 1].latestBid;
    const prevValue = data[1].latestBid;
    const filterPrevValues = data.filter((item) => item.latestBid !== currValue);
    const value =
      ((currValue - filterPrevValues[filterPrevValues.length - 1].latestBid) / currValue) * 100;
    if (value > 0) {
      return <ChartItemChange>{value.toFixed(2)} &nbsp;%</ChartItemChange>;
    } else {
      return <ChartItemChange red>{value.toFixed(2)}&nbsp;%</ChartItemChange>;
    }
  };

  const redOrGreen = (data: Collection[]) => {
    const currValue = data[data.length - 1].latestBid;
    const filterPrevValues = data.filter((item) => item.latestBid !== currValue);
    const value = currValue > filterPrevValues[filterPrevValues.length - 1].latestBid;
    if (value) {
      return ['#BCD476', 'rgba(188, 212, 118, 0.4)'];
    } else {
      return ['#FF416E', 'rgba(255, 255, 255, 0.4)'];
    }
  };

  const disabled = listGCWD.length && listMGCWD.length && listDIAMOND.length;

  return (
    <div>
      <Container>
        <Wrapper>
          <ChartItems>
            <ChartItem
              plchldr={!disabled}
              red={
                !!listGCWD.length &&
                listGCWD[listGCWD.length - 1].latestBid < listGCWD[listGCWD.length - 2].latestBid
              }
              alfa
              onClick={() => setActive(0)}
              active={active === 0}
            >
              {!!disabled && (
                <>
                  <ChartItemInner>
                    <ChartItemHead>
                      <ChartItemName>GCWD</ChartItemName>
                      {!!disabled && changeValue(listGCWD)}
                    </ChartItemHead>
                    <ChartItemValue
                      green={
                        listGCWD[listGCWD.length - 1].latestBid >
                        listGCWD[listGCWD.length - 2].latestBid
                      }
                      fontLength={
                        (listGCWD[listGCWD.length - 1].latestBid / 100000).toLocaleString('ru-RU', {
                          maximumFractionDigits: 2,
                        }).length < 8
                      }
                    >
                      {(listGCWD[listGCWD.length - 1].latestBid / 100000).toLocaleString('ru-RU', {
                        maximumFractionDigits: 2,
                      })}{' '}
                      CWD
                    </ChartItemValue>
                  </ChartItemInner>
                  <ChartBg>
                    <ApexChart
                      height={75}
                      values={listGCWD.slice(-20).map((i) => i.latestBid / 100)}
                      gradientColor={redOrGreen(listGCWD)}
                    />
                  </ChartBg>
                </>
              )}
            </ChartItem>
            <ChartItem
              plchldr={!disabled}
              alfa
              onClick={() => setActive(1)}
              active={active === 1}
              red={
                !!listMGCWD.length &&
                listMGCWD[listMGCWD.length - 1].latestBid <
                  listMGCWD[listMGCWD.length - 2].latestBid
              }
            >
              {!!disabled && (
                <>
                  <ChartItemInner>
                    <ChartItemHead>
                      <ChartItemName>MGCWD</ChartItemName>
                      {!!disabled && changeValue(listMGCWD)}
                    </ChartItemHead>
                    {listMGCWD.length && (
                      <ChartItemValue
                        green={
                          listMGCWD[listMGCWD.length - 1].latestBid >
                          listMGCWD[listMGCWD.length - 2].latestBid
                        }
                        fontLength={
                          (listMGCWD[listMGCWD.length - 1].latestBid / 100000).toLocaleString(
                            'ru-RU',
                            {
                              maximumFractionDigits: 2,
                            }
                          ).length < 8
                        }
                      >
                        {(listMGCWD[listMGCWD.length - 1].latestBid / 100000).toLocaleString(
                          'ru-RU',
                          {
                            maximumFractionDigits: 2,
                          }
                        )}{' '}
                        CWD
                      </ChartItemValue>
                    )}
                  </ChartItemInner>
                  <ChartBg>
                    <ApexChart
                      height={75}
                      values={listMGCWD.slice(-20).map((i) => i.latestBid / 100)}
                      gradientColor={redOrGreen(listMGCWD)}
                    />
                  </ChartBg>
                </>
              )}
            </ChartItem>
            <ChartItem
              plchldr={!disabled}
              alfa
              red={
                !!listDIAMOND.length &&
                listDIAMOND[listDIAMOND.length - 1].latestBid <
                  listDIAMOND[listDIAMOND.length - 2].latestBid
              }
              onClick={() => setActive(2)}
              active={active === 2}
            >
              {!!disabled && (
                <>
                  <ChartItemInner>
                    <ChartItemHead>
                      <ChartItemName>DIAMOND</ChartItemName>
                      {listDIAMOND.length && changeValue(listDIAMOND)}
                    </ChartItemHead>
                    {listDIAMOND.length && (
                      <ChartItemValue
                        green={
                          listDIAMOND[listDIAMOND.length - 1].latestBid >
                          listDIAMOND[listDIAMOND.length - 2].latestBid
                        }
                        fontLength={
                          (listDIAMOND[listDIAMOND.length - 1].latestBid / 100).toLocaleString(
                            'ru-RU',
                            {
                              maximumFractionDigits: 2,
                            }
                          ).length < 8
                        }
                      >
                        {(listDIAMOND[listDIAMOND.length - 1].latestBid / 100).toLocaleString(
                          'ru-RU',
                          {
                            maximumFractionDigits: 2,
                          }
                        )}{' '}
                        CWD
                      </ChartItemValue>
                    )}
                  </ChartItemInner>
                  <ChartBg>
                    <ApexChart
                      height={75}
                      values={listDIAMOND.slice(-20).map((i) => i.latestBid / 100)}
                      gradientColor={redOrGreen(listDIAMOND)}
                    />
                  </ChartBg>
                </>
              )}
            </ChartItem>
          </ChartItems>
          <Charts alfa plchldr={!disabled}>
            <CSSTransition in={active === 0} timeout={0} classNames="modal" unmountOnExit>
              <ChartsWrapper>
                {disabled ? (
                  <>
                    <NameCWD>GCWD</NameCWD>
                    <ApexChart
                      height={mob ? 170 : 280}
                      values={listGCWD.map((i) => i.latestBid / 100)}
                      gradientColor={redOrGreen(listGCWD)}
                    />
                  </>
                ) : (
                  ''
                )}
              </ChartsWrapper>
            </CSSTransition>
            <CSSTransition in={active === 1} timeout={0} classNames="modal" unmountOnExit>
              <ChartsWrapper>
                {disabled ? (
                  <>
                    <NameCWD>MGCWD</NameCWD>
                    <ApexChart
                      height={mob ? 170 : 280}
                      values={listMGCWD.map((i) => i.latestBid / 100)}
                      gradientColor={redOrGreen(listMGCWD)}
                    />
                  </>
                ) : (
                  ''
                )}
              </ChartsWrapper>
            </CSSTransition>
            <CSSTransition in={active === 2} timeout={0} classNames="modal" unmountOnExit>
              <ChartsWrapper>
                {disabled ? (
                  <>
                    <NameCWD>DIAMOND</NameCWD>
                    <ApexChart
                      height={mob ? 170 : 280}
                      values={listDIAMOND.map((i) => i.latestBid / 100)}
                      gradientColor={redOrGreen(listDIAMOND)}
                    />
                  </>
                ) : (
                  ''
                )}
              </ChartsWrapper>
            </CSSTransition>
          </Charts>
        </Wrapper>
      </Container>
    </div>
  );
};

type ChartProps = {
  values: number[];
  gradientColor: string[];
  height?: number;
};

const ApexChart: FC<ChartProps> = ({ values, gradientColor, height = 280 }: ChartProps) => {
  const data = {
    series: [
      {
        data: values,
      },
    ],
    options: {
      chart: {
        type: 'area',
        animations: {
          enabled: true,
          easing: 'linear',
          speed: 150,
          animateGradually: {
            enabled: true,
            delay: 100,
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350,
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
        noData: {
          text: 'Loading...',
        },
      },
      colors: [gradientColor[0]],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      labels: [''],
      xaxis: {
        tooltip: {
          enabled: false,
        },
        labels: {
          show: false,
        },
        type: 'category',
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
        crosshairs: {
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
            <div >${w.globals.stackedSeriesTotals[dataPointIndex].toLocaleString()} CWD</div>
          </div>
          `;
        },
      },
      fill: {
        colors: gradientColor,
        type: 'gradient',
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
        options={data.options as any}
        series={data.series as any}
        type="area"
        height={height}
      />
    </div>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  @media (max-width: 768px) {
    flex-wrap: wrap;
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
  color: ${(props) => (props.red ? ' #FF416E' : '#BCD476')};
  &:before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    left: -20px;
    top: 50%;
    margin-top: -4px;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    border-top: 6px solid ${(props) => (props.red ? ' #FF416E' : '#BCD476')};
    transform: ${(props) => (props.red ? 'rotate(0)' : 'rotate(180deg)')};
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

const ChartBg = styled.div`
  position: absolute;
  top: 15px;
  right: 0;
  z-index: 0;
  width: 100px;
`;

const Move = keyframes`
0%{
  opacity: 1;
  }
50% {
  opacity: .6;
  }
100% {
  opacity: 1;
  }
`;

const Stay = keyframes`
100% {opacity: 1;};
`;

const MyCss = css`
  position: relative;
  width: 100%;
  border-radius: 5px;
  opacity: 1;
  visibility: hidden;
  overflow: hidden;
  content: '&nbsp;';
  color: transparent;
  height: 87px;
  &:after {
    position: absolute;
    content: '';
    height: 100%;
    width: 100%;
    visibility: visible;
    left: 0;
    background-color: rgba(0, 0, 0, 0.075);
    animation: ${Move} 1.5s infinite;
  }
`;

const MyChartCss = css`
  position: relative;
  border-radius: 5px;
  opacity: 1;
  visibility: hidden;
  overflow: hidden;
  content: '&nbsp;';
  color: transparent;
  /* height: 300px; */
  &:after {
    position: absolute;
    content: '';
    height: 100%;
    width: 100%;
    visibility: visible;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.075);
    animation: ${Move} 1.5s infinite;
  }
`;

const Charts = styled(Card)<{ plchldr?: boolean }>`
  padding: 10px 20px;
  height: 300px;
  max-width: 700px;
  position: relative;
  width: 100%;
  border: 1px solid ${(props) => props.theme.card.background};
  @media (max-width: 768px) {
    max-width: 100%;
    height: 180px;
    padding: 6px 0px;
    order: -1;
  }
  ${(props) => {
    if (props.plchldr) {
      return MyChartCss;
    }
  }}
`;

const ChartsWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const NameCWD = styled.div`
  position: absolute;
  left: 20px;
  top: 15px;
  font-size: 16px;
  text-transform: uppercase;
`;

const ChartItem = styled(Card)<{
  red?: boolean;
  active?: boolean;
  plchldr?: boolean;
}>`
  text-align: left;
  margin: 0 auto;
  padding: 6px 18px;
  position: relative;
  margin-bottom: 20px;
  display: flex;
  border: 1px solid ${(props) => (props.active ? '#FF416E' : props.theme.card.background)};
  justify-content: space-between;
  align-items: center;
  background-repeat: no-repeat;
  background-origin: content-box;
  cursor: pointer;
  transition: border 0.2s;
  @media (max-width: 992px) {
    cursor: initial;
  }
  ${(props) => {
    if (props.plchldr) {
      return MyCss;
    }
  }}
`;

const ChartItemName = styled.div`
  font-weight: 500;
  font-size: 18px;
  margin-bottom: 10px;
  line-height: 21px;
  color: ${(props) => props.theme.text2};
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

const ChartItemValue = styled.div<{ green?: boolean; fontLength?: boolean }>`
  font-weight: 500;
  font-size: ${(props) => (props.fontLength ? '36px' : '28px')};

  line-height: 42px;
  color: ${(props) => props.theme.text2};
  animation: ${(props) => (props.green ? BgGreen : BgRed)} 0.5s linear;
  display: inline-block;
  opacity: 1;
  transition: opacity 0.5s ease-in;
  @media (max-width: 768px) {
    font-size: 24px;
    line-height: 28px;
  }
`;
