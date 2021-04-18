import React, { useEffect, useContext, useState, useCallback, FC } from "react";
import { H2 } from "../../../../components/UI/MainStyled";
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
import { Modal } from "../../../../components/Modal/Modal";
import { CSSTransition } from "react-transition-group";
import { Button } from "../../../../components/Button/Button";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const RadialComponent: FC<{ data: Pokedex }> = ({ data }) => {
  const [show, setShow] = useState(false);
  const onClose = () => {
    setShow(false);
  };

  return (
    <div>
      {show && (
        <Modal width={1060} onClose={onClose}>
          <ModalContainer>
            <ProgramCard>
              <BlockTitle>{data.deposit.name}</BlockTitle>
              <div className="item__subtitle">
                <Text
                  dangerouslySetInnerHTML={{ __html: data.deposit.description }}
                />
              </div>
              <ModalButton blue>{data.deposit.name}</ModalButton>
            </ProgramCard>
            <RadialModalItem>
              <RadialBar
                height={230}
                values={60}
                color={data.colors}
                size="60%"
              />
              <RoundInside>
                <RoundInsideName>{data.deposit.name}</RoundInsideName>
                <RoundInsideDate>
                  {moment(data.date).format("DD.MM.YYYY")}
                </RoundInsideDate>
                <RoundInsideProcent>
                  {(data.procent * 100).toFixed(0)}
                  <Proc>%</Proc>
                </RoundInsideProcent>
              </RoundInside>
            </RadialModalItem>
          </ModalContainer>
        </Modal>
      )}
      <RadialItem onClick={() => setShow(true)}>
        <RadialBar values={data.procent * 100} color={data.colors} />
        <RoundInside>
          <RoundInsideName>{data.depositName}</RoundInsideName>
          <RoundInsideDate>
            {moment(data.date).format("DD.MM.YYYY")}
          </RoundInsideDate>
          <RoundInsideProcent>
            {(data.procent * 100).toFixed(0)}
            <Proc>%</Proc>
          </RoundInsideProcent>
        </RoundInside>
      </RadialItem>
    </div>
  );
};

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
        procent: i.profit,
        colors: color,
        deposit: i.deposit,
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
    reset();
  }, [hubConnection]);

  const reset = () => {
    if (hubConnection) {
      hubConnection
        .invoke<RootPayDeposit[]>("GetDayPayouts")
        .then((res) => {
          console.log("GetDayPayouts", res);
          setStatsDeposit(res);
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <Page>
      <Container>
        <H2>Текущие выплаты</H2>
      </Container>

      <Container>
        {statsDeposit.length && (
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
                      <RadialComponent key={idx} data={item} />
                    ))}
                  </RadialWrap>
                </SwiperSlide>
              ))}
            </Swiper>
            <OnDate>
              на {moment(statsDeposit[0].payoutDate).format("DD.MM.YYYY")}{" "}
              <Refresh onClick={reset} />
            </OnDate>
          </SwiperContainer>
        )}
        <SwiperContainerMob>
          {statsDeposit.length && (
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
                            {(item.procent * 100).toFixed(0)}
                            <Proc>%</Proc>
                          </RoundInsideProcent>
                        </RoundInside>
                      </RadialItem>
                    ))}
                  </RadialWrap>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
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
                        <Proc>%</Proc>
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

const Text = styled.div`
  color: #0e0d3d;
  font-size: 14px;
  font-weight: 400;
  font-style: normal;
  text-align: center;
  letter-spacing: normal;
  line-height: normal;
  margin-bottom: 15px;
  p {
    padding-bottom: 10px;
  }
`;

const ModalButton = styled(Button)`
  min-width: 100%;
`;

const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding: 40px 120px;
  @media (max-width: 992px) {
    padding: 40px 60px;
  }
  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
    padding: 40px 20px;
  }
`;

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
  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const RadialModalItem = styled.div`
  width: 220px;
  flex: none;
  position: relative;
  ${RoundInside} {
    top: 39px;
    left: 43px;
    @media (max-width: 768px) {
      top: 59px;
      left: 55px;
      width: 95px;
      height: 95px;
    }
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

export const BlockTitle = styled.div`
  color: #0e0d3d;
  font-size: 18px;
  font-weight: 900;
  font-style: normal;
  letter-spacing: normal;
  line-height: normal;
  text-align: center;
  margin-bottom: 20px;
`;

const Proc = styled.div`
  display: inline-block;
  font-size: 16px;
`;

const ProgramCard = styled.div`
  border: 1px solid #6db9ff;
  box-sizing: border-box;
  max-width: 340px;
  width: 100%;
  backdrop-filter: blur(4px);
  border-radius: 20px;
  padding: 40px 20px;
`;
