import React, { useEffect, useContext, useState, useCallback } from "react";
import { H1 } from "../../../../components/UI/MainStyled";
import { Card, Container } from "../../../../globalStyles";
import styled from "styled-components/macro";
import { RadialBar } from "../../../../components/Charts/Test";
import { AppContext } from "../../../../context/HubContext";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { RootPayDeposit, PayDeposit, Pokedex } from "../../../../types/payouts";
import { ReactComponent as Refresh } from "../../../../assets/svg/refresh.svg";
import moment from "moment";
import { Page } from "../../../../components/UI/Page";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export const Payments = () => {
  const [statsDeposit, setStatsDeposit] = useState<RootPayDeposit[]>([]);
  const [bigArr, setBigArr] = useState<any>([]);
  const [smallArr, setSmallArr] = useState<any>([]);
  const arrSizeBig = 10;
  const arrSizeMob = 4;
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;

  const stats = useCallback(() => {
    const newStats = statsDeposit.map((i) => {
      const color =
        "#" +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0");
      return {
        depositName: i.deposit.name,
        date: i.depositCreationDate,
        procent: i.deposit.paymentRatio,
        colors: color,
      };
    });

    const newArrayBig: any[] = [];
    for (let i = 0; i < Math.ceil(newStats.length / arrSizeBig); i++) {
      newArrayBig[i] = newStats.slice(
        i * arrSizeBig,
        i * arrSizeBig + arrSizeBig
      );
    }

    setBigArr(newArrayBig);
    const newArrayMob: any[] = [];
    for (let i = 0; i < Math.ceil(newStats.length / arrSizeMob); i++) {
      newArrayMob[i] = newStats.slice(
        i * arrSizeMob,
        i * arrSizeMob + arrSizeMob
      );
    }
    setSmallArr(newArrayMob);
  }, [statsDeposit]);

  useEffect(() => {
    stats();
  }, [stats]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke<RootPayDeposit[]>("GetDayPayouts")
        .then((res) => {
          setStatsDeposit(res);
          console.log("res", res);
        })
        .catch((e) => console.log(e));
    }
  }, [hubConnection]);
  return (
    <Page>
      <Container>
        <H1>Текущие выплаты</H1>
      </Container>
      <Container>
        <SwiperContainer>
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            pagination={{ clickable: true }}
          >
            {bigArr.map((i: any, idx: number) => (
              <SwiperSlide key={idx} style={{ maxWidth: 1130 }}>
                <RadialWrap>
                  {i.map((item: Pokedex, idx: number) => (
                    <RadialItem key={idx}>
                      <RadialBar
                        values={item.procent * 100}
                        color={item.colors}
                      />
                      <RoundInside>
                        <RoundInsideName>{item.depositName}</RoundInsideName>
                        <RoundInsideDate>
                          {moment(item.date).format("DD.MM.YYYY")}
                        </RoundInsideDate>
                        <RoundInsideProcent>
                          {item.procent * 100}
                          <span>%</span>
                        </RoundInsideProcent>
                      </RoundInside>
                    </RadialItem>
                  ))}
                </RadialWrap>
              </SwiperSlide>
            ))}
          </Swiper>
          <OnDate>
            на 16.04.2021 <Refresh />
          </OnDate>
        </SwiperContainer>
        <SwiperContainerMob>
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            pagination={{ clickable: true }}
          >
            {smallArr.map((i: any, idx: number) => (
              <SwiperSlide key={idx}>
                <RadialWrap>
                  {i.map((item: Pokedex, idx: number) => (
                    <RadialItem key={idx}>
                      <RadialBar
                        height={170}
                        values={item.procent * 100}
                        color={item.colors}
                      />
                      <RoundInside>
                        <RoundInsideName>{item.depositName}</RoundInsideName>
                        <RoundInsideDate>
                          {moment(item.date).format("DD.MM.YYYY")}
                        </RoundInsideDate>
                        <RoundInsideProcent>
                          {item.procent * 100}
                          <span>%</span>
                        </RoundInsideProcent>
                      </RoundInside>
                    </RadialItem>
                  ))}
                </RadialWrap>
              </SwiperSlide>
            ))}
          </Swiper>
        </SwiperContainerMob>
        {/* <SwiperContainerMob>
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            pagination={{ clickable: true }}
          >
            <SwiperSlide>
              <RadialWrap>
                {[1, 2, 3, 4].map((item, idx: number) => (
                  <RadialItem key={idx}>
                    <RadialBar height={170} values={78} color="#333" />
                    <RoundInside>
                      <RoundInsideName>start</RoundInsideName>
                      <RoundInsideDate>12.04.2021</RoundInsideDate>
                      <RoundInsideProcent>
                        54
                        <span>%</span>
                      </RoundInsideProcent>
                    </RoundInside>
                  </RadialItem>
                ))}
              </RadialWrap>
            </SwiperSlide>
          </Swiper>
        </SwiperContainerMob> */}
      </Container>
    </Page>
  );
};

const SwiperContainer = styled(Card)`
  position: relative;
  @media (max-width: 768px) {
    display: none;
  }
`;

const SwiperContainerMob = styled(Card)`
  display: none;
  @media (max-width: 768px) {
    display: block;
    padding-bottom: 30px;
    .swiper-container {
      padding-bottom: 20px;
    }
  }
`;

const OnDate = styled.div`
  position: absolute;
  bottom: 25px;
  right: 25px;
  text-align: right;
  font-size: 14px;
  line-height: 116.69%;
  color: rgba(86, 101, 127, 0.6);
  cursor: pointer;
  z-index: 99999;
  @media (max-width: 768px) {
    display: none;
  }
`;

const RadialWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 992px) {
    flex-wrap: wrap;
  }
`;

const RadialItem = styled.div`
  position: relative;
  width: 150px;
  height: 188px;
  margin: 30px 40px;
  @media (max-width: 992px) {
    margin: 15px;
  }
  @media (max-width: 768px) {
    margin: 12px 8px;
    width: 120px;
    height: 120px;
  }
`;

const RoundInside = styled.div`
  position: absolute;
  top: 31px;
  left: 14px;
  border-radius: 50%;
  width: 125px;
  height: 125px;
  @media (max-width: 768px) {
    top: 26px;
    left: 14px;
    width: 95px;
    height: 95px;
  }
`;

const RoundInsideName = styled.div`
  text-align: center;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  text-transform: uppercase;
  color: #0e0d3d;
  padding-top: 26px;
  padding-bottom: 4px;
  @media (max-width: 768px) {
    font-size: 14px;
    max-width: 85px;
    line-height: 1;
    padding-top: 10px;
  }
`;

const RoundInsideDate = styled.div`
  font-weight: normal;
  font-size: 14px;
  line-height: 116.69%;
  text-align: center;
  text-transform: uppercase;
  color: rgba(86, 101, 127, 0.6);
  padding-bottom: 10px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const RoundInsideProcent = styled.div`
  text-align: center;
  font-weight: 900;
  font-size: 38px;
  line-height: 21px;
  color: #ff416e;
  span {
    font-size: 16px;
  }
  @media (max-width: 768px) {
    font-size: 32px;
  }
`;
