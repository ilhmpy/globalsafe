import React, { useState, useEffect, useContext, FC, useCallback } from 'react';
import * as Styled from '../Styled.elements';
import styled, { css } from 'styled-components/macro';
import { Card } from '../../../globalStyles';
import { UpTitle } from '../../../components/UI/UpTitle';
// import { ReactComponent as Exit } from "../../assets/svg/exit.svg";
// import { ReactComponent as Filter } from "../../assets/svg/filter.svg";
import { HalfRoundBorder } from '../../../components/UI/HalfRound';
import useWindowSize from '../../../hooks/useWindowSize';
import { RootPayments, PaymentsCollection } from '../../../types/payments';
import { DepositStats, ListDeposits, CollectionListDeposits } from '../../../types/deposits';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import { Swiper, SwiperSlide } from 'swiper/react'; 
import { ModalDeposit } from './Payments';
import { Loading } from '../../../components/UI/Loading';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../../../context/HubContext';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
type PayProps = {
  data: PaymentsCollection;
};

type Pokedex = {
  depositName: string;
  count: number;
  amount: number;
  colors: string;
};

export const Rounds = () => {
  const [statsDeposit, setStatsDeposit] = useState<DepositStats[]>([]);
  const sizes = useWindowSize();
  const size = sizes < 768;
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const [bigArr, setBigArr] = useState<Pokedex[]>([]);
  const [smallArr, setSmallArr] = useState<Pokedex[]>([]);
  const arrSizeBig = 10;
  const arrSizeMob = 4;

  const stats = useCallback(() => {
    const newStats = statsDeposit.map((i) => {
      const color =
        '#' +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, '0');
      return {
        depositName: i.depositName,
        count: i.count,
        amount: i.amount,
        colors: color,
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
    if (hubConnection) {
      hubConnection
        .invoke<DepositStats[]>('GetUsersDepositsStats')
        .then((res) => {
          setStatsDeposit(res);
        })
        .catch((err: Error) => console.log(err));
    }
  }, [hubConnection]);

  return (
    <div>
      <DepositWrap>
        {!size && (
          <DepositInner>
            <Swiper spaceBetween={10} slidesPerView={1} pagination={{ clickable: true }}>
              {bigArr.map((i: any, idx: number) => (
                <SwiperSlide key={idx} style={{ maxWidth: 1130 }}>
                  <SwiperInner>
                    {!size &&
                      i.map((item: any, idx: number) => {
                        return (
                          <DepositItem key={idx}>
                            <Styled.PayItemHead mb>
                              <UpTitle small>{item.depositName}</UpTitle>
                            </Styled.PayItemHead>
                            <RadialWrap>
                              <HalfRound>
                                <span>{item.count}</span>
                                <HalfRoundBorder
                                  width={size ? '47' : '90'}
                                  height={size ? '63' : '123'}
                                  color={item.colors}
                                />
                              </HalfRound>
                              <Styled.Radial bg={item.colors}>
                                <span>{(item.amount / 100000).toFixed(1).toLocaleString()}</span>
                                <span>CWD</span>
                              </Styled.Radial>
                            </RadialWrap>
                          </DepositItem>
                        );
                      })}
                  </SwiperInner>
                </SwiperSlide>
              ))}
            </Swiper>
          </DepositInner>
        )}
        {size && (
          <MySwiperContainer>
            <Swiper spaceBetween={50} slidesPerView={1} pagination={{ clickable: true }}>
              {smallArr.map((i: any, idx: number) => {
                return (
                  <SwiperSlide key={idx}>
                    <DepositItemWrap>
                      {i.map((item: any, idx: number) => {
                        return (
                          <DepositItemInner key={idx}>
                            <DepositItem>
                              <Styled.PayItemHead mb>
                                <UpTitle small>{item.depositName}</UpTitle>
                              </Styled.PayItemHead>
                              <RadialWrap>
                                <HalfRound>
                                  <span>{item.count}</span>
                                  <HalfRoundBorder width={'47'} height={'63'} color={item.colors} />
                                </HalfRound>
                                <Styled.Radial bg={item.colors}>
                                  <span>{(item.amount / 100000).toFixed(1).toLocaleString()}</span>
                                  <span>CWD</span>
                                </Styled.Radial>
                              </RadialWrap>
                            </DepositItem>
                          </DepositItemInner>
                        );
                      })}
                    </DepositItemWrap>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </MySwiperContainer>
        )}
      </DepositWrap>
    </div>
  );
};

const DepositInner = styled.div`
  margin: 0 auto;
  min-width: 0;
  max-width: 1100px;
  @media (max-width: 1470px) {
    max-width: 930px;
  }
  @media (max-width: 1270px) {
    max-width: 800px;
  }
  @media (max-width: 910px) {
    max-width: 700px;
  }
  @media (max-width: 800px) {
    max-width: 640px;
  }
  .swiper-pagination-fraction,
  .swiper-pagination-custom,
  .swiper-container-horizontal > .swiper-pagination-bullets {
    bottom: 0px;
    left: 0;
    width: 100%;
  }
`;

const SwiperInner = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
`;

const PaymentsTable = styled.div`
  padding: 30px;
  min-height: 556px;
`;

const TableHead = styled.ul`
  position: relative;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:nth-child(1) {
    max-width: 97px;
    @media (max-width: 768px) {
      display: none;
    }
  }
  &:nth-child(2) {
    max-width: 182px;
  }
  &:nth-child(3) {
    max-width: 110px;
    @media (max-width: 992px) {
      display: none;
    }
  }
  &:nth-child(4) {
    max-width: 110px;
    @media (max-width: 768px) {
      display: none;
    }
  }
  &:nth-child(5) {
    max-width: 110px;
    @media (max-width: 992px) {
      display: none;
    }
  }
  &:nth-child(6) {
    max-width: 120px;
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
    max-width: 40px;
    text-align: right;
    @media (max-width: 992px) {
      max-width: 60px;
    }
    @media (max-width: 576px) {
      max-width: 30px;
    }
  }
`;

const TableBody = styled(TableHead)`
  padding: 10px 0;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
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

const DateLabel = styled.div`
  position: relative;
  border: 1px solid rgba(86, 101, 127, 0.3);
  box-sizing: border-box;
  border-radius: 2px;
`;

const DepositWrap = styled(Card)`
  padding: 30px 5px;
  display: flex;
  justify-content: center;
  width: 100%;
  flex-wrap: wrap;
  margin-bottom: 30px;
  @media (max-width: 576px) {
    padding: 20px 0px;
    margin-bottom: 20px;
  }
`;

const HalfRound = styled.div`
  width: 122px;
  height: 122px;
  position: relative;
  @media (max-width: 768px) {
    width: 63px;
    height: 63px;
  }
  span {
    position: absolute;
    top: 33%;
    left: 9px;
    font-weight: normal;
    font-size: 26px;
    line-height: 42px;
    text-align: center;
    display: block;
    width: 63px;
    color: ${(props) => props.theme.text};
    @media (max-width: 768px) {
      font-size: 10px;
      line-height: 16px;
      top: 36%;
      left: 3px;
      width: 39px;
      font-weight: bold;
    }
  }
`;

const RadialWrap = styled.div`
  display: flex;
  width: 100%;
  height: 122px;
  position: relative;
  @media (max-width: 768px) {
    height: auto;
  }
`;

const DepositItem = styled.div`
  width: 192px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 12px 20px;
  min-height: 170px;
  @media (max-width: 768px) {
    width: 99px;
    min-height: 112px;
  }
  &:nth-child(6)  {
    ${UpTitle}::before {
      width: 48px;
    }
  }
  ${UpTitle} {
    margin-bottom: 0;
    margin-right: 10px;
    @media (max-width: 768px) {
      margin-right: 0px;
      &:before {
        margin-right: 4px;
      }
    }
  }
  ${Styled.Radial} {
    position: relative;
    width: 122px;
    height: 122px;
    flex: none;
    margin: 0;
    @media (max-width: 768px) {
      width: 63px;
      height: 63px;
      border-width: 3px;
    }
    span {
      font-size: 16px;
      line-height: 20px;
      text-align: right;
      color: ${(props) => props.theme.text};
      @media (max-width: 768px) {
        font-size: 9px;
        line-height: 14px;
      }
    }

    &:nth-child(1) {
      left: 0;
      bottom: 0;
      display: none;
      z-index: 5;
      align-items: flex-start;
    }
    &:nth-child(2) {
      right: 0;
      bottom: 0;
      position: absolute;
      z-index: 50;
    }
  }
`;

const DepositItemWrap = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
`;

const DepositItemInner = styled.div`
  width: 50%;
`;

const MySwiperContainer = styled.div`
  display: block;
  width: 100%;
  margin: 0 auto;
  max-width: 1000px;
  @media (max-width: 768px) {
    max-width: 500px;
  }
  @media (max-width: 576px) {
    max-width: 280px;
  }
  ${DepositItem} {
    margin: 0 auto 20px;
  }
  .swiper-pagination-bullet {
    display: inline-block;
    width: 10px;
    height: 10px;
    font-size: 14px;
    line-height: 10px;
    background-color: rgba(81, 81, 114, 0.3);
    border-radius: 50%;
    margin-right: 10px;
    margin-top: 20px !important;
  }
  .swiper-pagination-bullet-active {
    background-color: #ff416e;
  }
  .swiper-container-horizontal > .swiper-pagination-bullets {
    bottom: -4px;
  }
`;
