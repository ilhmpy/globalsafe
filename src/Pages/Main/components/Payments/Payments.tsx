import moment from 'moment';
import React, { FC, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled, { keyframes } from 'styled-components/macro';
import SwiperCore, { A11y, Navigation, Pagination, Scrollbar } from 'swiper';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import { H2 } from '../../../../components/UI/Heading';
import { AppContext } from '../../../../context/HubContext';
import { Card } from '../../../../globalStyles';
import { Container } from '../../../../components/UI/Container';
import { Pokedex, RootPayDeposit } from '../../../../types/payouts';
import { ReactComponent as Reload } from '../../../../assets/svg/reload.svg';
import useWindowSize from '../../../../hooks/useWindowSize';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export const Payments: FC = () => {
  const testArray = [
    [
      { deposit: { name: 'TEST' }, date: new Date(), procent: 85 },
      { deposit: { name: 'TEST' }, date: new Date(), procent: 85 },
      { deposit: { name: 'TEST' }, date: new Date(), procent: 85 },
      { deposit: { name: 'TEST' }, date: new Date(), procent: 85 },
      { deposit: { name: 'TEST' }, date: new Date(), procent: 85 },
      { deposit: { name: 'TEST' }, date: new Date(), procent: 85 },
    ],
    [
      { deposit: { name: 'TEST' }, date: new Date(), procent: 85 },
      { deposit: { name: 'TEST' }, date: new Date(), procent: 85 },
      { deposit: { name: 'TEST' }, date: new Date(), procent: 85 },
      { deposit: { name: 'TEST' }, date: new Date(), procent: 85 },
      { deposit: { name: 'TEST' }, date: new Date(), procent: 85 },
      { deposit: { name: 'TEST' }, date: new Date(), procent: 85 },
    ],
    [
      { deposit: { name: 'TEST' }, date: new Date(), procent: 85 },
      { deposit: { name: 'TEST' }, date: new Date(), procent: 85 },
      { deposit: { name: 'TEST' }, date: new Date(), procent: 85 },
      { deposit: { name: 'TEST' }, date: new Date(), procent: 85 },
      { deposit: { name: 'TEST' }, date: new Date(), procent: 85 },
      { deposit: { name: 'TEST' }, date: new Date(), procent: 85 },
    ],
  ];
  const [statsDeposit, setStatsDeposit] = useState<RootPayDeposit[]>([]);
  const [bigArr, setBigArr] = useState<any>(testArray);
  const screen = useWindowSize();

  const [smallArr, setSmallArr] = useState<any>([]);
  const [loadReset, setLoadReset] = useState(false);
  const arrSizeBig = 10;
  const arrSizeMob = 6;
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const [isMobile, setIsMobile] = useState<boolean | undefined>();
  const { t } = useTranslation();

  useEffect(() => setIsMobile(screen <= 480), []);

  const lang = localStorage.getItem('i18nextLng') || 'ru';
  const languale = lang === 'ru' ? 1 : 0;

  const stats = useCallback(() => {
    localStorage.removeItem('last');
    const newStats = statsDeposit.map((i) => {
      const color =
        '#' +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, '0');
      return {
        depositName: i.deposit.name,
        date: i.depositCreationDate,
        procent: i.profit,
        colors: color,
        deposit: i.deposit,
      };
    });

    const newArrayBig: any[] = [];
    for (let i = 0; i < Math.ceil(newStats.length / arrSizeBig); i++) {
      newArrayBig[i] = newStats.slice(i * arrSizeBig, i * arrSizeBig + arrSizeBig);
    }
    setBigArr(newArrayBig);
    const newArrayMob: any[] = [];
    for (let i = 0; i < Math.ceil(newStats.length / arrSizeMob); i++) {
      newArrayMob[i] = newStats.slice(i * arrSizeMob, i * arrSizeMob + arrSizeMob);
    }
    setSmallArr(newArrayMob);
  }, [statsDeposit]);

  useEffect(() => {
    stats();
  }, [stats]);

  useEffect(() => {
    reset();
  }, [hubConnection, languale]);

  const reset = () => {
    if (hubConnection) {
      setLoadReset(true);
      hubConnection
        .invoke<RootPayDeposit[]>('GetDayPayouts', languale)
        .then((res) => {
          setStatsDeposit(res);
          setLoadReset(false);
          console.log(res);
        })
        .catch((e) => {
          setLoadReset(false);
          console.log(e);
        });
    }
  };

  const [last, setLast] = useState(localStorage.getItem('last') || '');
  const [lastTime, setLastTime] = useState<string | null>(null);
  const [timeInterval, setTimeInterval] = useState<any>();
  const [actualDate, setActualDate] = useState(new Date());

  function lastUpdate() {
    stats();
    clearInterval(timeInterval);
    setTimeInterval(setInterval(() => update(), 60000));
    const date = new Date();
    const newDate = {
      time: { hours: date.getHours(), minutes: date.getMinutes() },
      date: { day: date.getDate(), month: date.getMonth(), year: date.getFullYear() },
    };
    localStorage.setItem('last', JSON.stringify(newDate));
    getLastUpdate(newDate);
    const update = () => {
      getLastUpdate(newDate);
    };
  }

  function getLastUpdate(last: any) {
    const updateTime = last;
    const now = new Date();
    const result: any = {
      date: { year: null, month: null, day: null },
      time: { hours: null, minutes: null },
    };
    result.date.year = now.getFullYear() - updateTime.date.year;
    result.date.month = now.getMonth() - updateTime.date.month;
    result.date.day = now.getDate() - updateTime.date.day;
    result.time.hours = now.getHours() - updateTime.time.hours;
    result.time.minutes = now.getMinutes() - updateTime.time.minutes;
    if (result.date.year != 0) {
      setLastTime(result.date.year + ' лет');
    } else if (result.date.month != 0) {
      setLastTime(result.date.month + ' месяцев');
    } else if (result.date.day != 0) {
      setLastTime(result.date.day + ' дней');
    } else if (result.time.hours != 0) {
      setLastTime(result.time.hours + ' часов');
    } else if (result.time.minutes != 0) {
      setLastTime(result.time.minutes + ' минут');
    } else {
      setLastTime('несколько секунд');
    }
  }

  console.log(statsDeposit);

  return (
    <>
      {statsDeposit.length || bigArr.length || smallArr.length ? (
        <>
          <Container page pNone mtNone>
            <H2 center>{t('payments.currPay')}</H2>
            <WhiteBox>
              <WhiteIntf>
                <Title>
                  {t('payments2.actual')} {moment(actualDate).format('DD.MM.YYYY')}
                </Title>
                <Title right>
                  {t('payments2.last')}{' '}
                  {lastTime != null ? (
                    <>
                      {' '}
                      {lastTime} {t('payments2.ago')}{' '}
                    </>
                  ) : (
                    t('payments2.now')
                  )}{' '}
                  <Reload style={{ cursor: 'pointer' }} onClick={() => lastUpdate()} />
                </Title>
              </WhiteIntf>
              <WhiteMap>
                {isMobile ? (
                  <>
                    <Swiper
                      slidesPerView={'auto'}
                      pagination={{ clickable: true, dynamicBullets: true }}
                    >
                      {smallArr.map((i: any, idx: number) => (
                        <SwiperSlide key={idx}>
                          <>
                            {i.map((item: any, idx: any) => (
                              <WhiteItem key={idx} lastMargin={smallArr && smallArr[0].length}>
                                <WhiteItemText>{item.deposit.name}</WhiteItemText>
                                <WhiteItemText bold>{item.procent.toFixed(0)} %</WhiteItemText>
                                <WhiteItemText>
                                  {moment(item.date).format('DD.MM.YYYY')}
                                </WhiteItemText>
                                <WhiteItemLine procent={item.procent.toFixed(0)} />
                              </WhiteItem>
                            ))}
                          </>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </>
                ) : (
                  <>
                    {bigArr.length ? (
                      <>
                        {bigArr.map((i: any, idx: any) => {
                          return (
                            <>
                              {i.map((item: any, idx: any) => (
                                <WhiteItem key={idx}>
                                  <WhiteItemText>{item.deposit.name}</WhiteItemText>
                                  <WhiteItemText bold>{item.procent.toFixed(0)} %</WhiteItemText>
                                  <WhiteItemText>
                                    {moment(item.date).format('DD.MM.YYYY')}
                                  </WhiteItemText>
                                  <WhiteItemLine procent={item.procent.toFixed(0)} />
                                </WhiteItem>
                              ))}
                            </>
                          );
                        })}
                      </>
                    ) : (
                      ''
                    )}
                  </>
                )}
              </WhiteMap>
            </WhiteBox>
          </Container>
        </>
      ) : (
        ''
      )}
    </>
  );
};

const WhiteBox = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.payments2.background};
  border-radius: 4px;
  box-shadow: ${({ theme }) => theme.depositsProgramsCards.boxShadow};
  padding: 30px;
  padding-top: 40px;
  padding-bottom: 0px;

  @media only screen and (min-width: 481px) and (max-width: 1024px) {
    padding: 20px;
    padding-top: 25px;
    padding-bottom: 0px;
  }

  @media only screen and (max-width: 767px) {
    width: 100%;
    max-width: 100%;
    padding: 20px;
    padding-right: 0px;
    -webkit-box-shadow: 0;
    -moz-box-shadow: 0;
    box-shadow: 0;
  }
`;

const Title = styled.div<{ right?: boolean }>`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.titles};
  align-items: center;
  display: flex;
  margin-bottom: 10px;

  ${({ right }) => {
    if (right) {
      return `
        margin-right: 20px;
      `;
    }
  }}

  & > svg {
    margin-left: 8px;
  }

  @media only screen and (max-width: 767px) {
    &:last-child {
      margin-bottom: 10px;
    }
  }
`;

const WhiteIntf = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0px;

  @media only screen and (max-width: 767px) {
    flex-direction: column;
  }
`;

const WhiteMap = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  .swiper-container {
    width: 100%;
  }

  .swiper-slide {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 0px;
  }

  .swiper-pagination-bullets > .swiper-pagination-bullet-active {
    width: 20px;
    height: 6px;
    border-radius: 6px;
  }

  .swiper-pagination {
    bottom: -3px;
    z-index: 99999999;
  }
`;

const WhiteItem = styled.div<{ lastMargin?: number }>`
  width: 180px;
  height: 108px;
  min-width: 180px;
  min-height: 108px;
  margin-right: 20px;
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-items: center;
  background: ${({ theme }) => theme.payments2.itemBackground};

  @media only screen and (min-width: 481px) and (max-width: 1024px) {
    width: 150px;
    min-width: 150px;
  }

  @media only screen and (max-width: 767px) {
    width: 135px;
    min-width: 135px;
    margin-right: 10px;
    margin-bottom: 10px;

    &:last-child {
      ${({ lastMargin }) => {
        if (lastMargin) {
          if (lastMargin > 1) {
            return `
              margin-bottom: 35px;
            `;
          } else {
            return `
              margin-bottom: 0px;
            `;
          }
        }
      }}
    }
  }

  @media only screen and (min-width: 360px) and (max-width: 409px) {
    max-width: 180px;
    width: 45%;
  }

  @media only screen and (min-width: 410px) and (max-width: 480px) {
    max-width: 200px;
    width: 45%;
  }
`;

const WhiteItemText = styled.div<{ bold?: boolean }>`
  color: ${({ theme }) => theme.main.bodyColor};
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;

  ${({ bold, theme }) => {
    if (bold) {
      return `
          font-weight: 700;
          color: ${theme.payments2.color};
          font-size: 18px;
          line-height: 24px;
        `;
    }
  }}
`;

const WhiteItemLine = styled.div<{ procent: number | string }>`
  width: 100%;
  background: #dcdce8;
  height: 2px;
  margin-top: 13px;
  position: relative;

  &::after {
    display: inline;
    content: '';
    background: #0094ff;
    position: absolute;
    width: ${({ procent }) => procent}%;
    height: inherit;
  }
`;
