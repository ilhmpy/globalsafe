import React, {
  useEffect,
  useContext,
  useState,
  useCallback,
  FC,
  useRef,
} from "react";
import { H2 } from "../../../../components/UI/MainStyled";
import { Card, Container } from "../../../../globalStyles";
import styled, { keyframes } from "styled-components/macro";
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
import {
  DescContainer,
  BlockContainers,
  BlockItem,
  ModalBlock,
  ModalTitle,
} from "../Tariffs/Tariffs.elements";
import { useTranslation } from "react-i18next";
import { Input } from "../../../../components/UI/Input";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const RadialComponent: FC<{ data: Pokedex; height: number }> = ({
  data,
  height,
}) => {
  const [show, setShow] = useState(false);
  const [isNormalOpen, setIsNormalOpen] = useState(false);
  const [oldLink, setOldLink] = useState("");
  const [link, setLink] = useState("");
  const [min, setMin] = useState(500);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();
  const onClose = () => {
    setShow(false);
  };

  const handleClick = (str: string, num: number) => {
    setIsNormalOpen(true);
    onClose();
    setValue("");
    const newLink = `https://cwd.global/shopping/payment?to_name=${str}&amount=${
      num / 100000
    }`;
    setLink(newLink);
    setOldLink(`https://cwd.global/shopping/payment?to_name=${str}&amount=`);
    const val: any = /\d{3,}/g.exec(str);
    setMin(num / 100000);
    setValue((num / 100000).toString());
  };

  useEffect(() => {
    if (inputRef && inputRef.current && value) {
      inputRef.current.focus();
    }
  }, [value, inputRef]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.value;
    setValue(id);
    const newLink = oldLink.replace(/\d{3,}/g, "");
    if (id === "") {
      setLink(newLink + min);
    } else {
      setLink(newLink + id);
    }
  };

  const toLink = () => {
    window.open(link);
  };

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [show]);

  return (
    <div>
      {isNormalOpen && (
        <Modal zIndex="999999" onClose={() => setIsNormalOpen(false)}>
          <ModalBlock>
            <ModalTitle>{t("tariffs.depositSize")}</ModalTitle>
            <Input
              onChange={onChange}
              // placeholder={min.toString()}
              type="number"
              ref={inputRef}
              value={value}
            />
            <ModalButton
              as="button"
              onClick={toLink}
              danger
              disabled={+value < min}
            >
              {t("tariffs.ok")}
            </ModalButton>
          </ModalBlock>
        </Modal>
      )}
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
              <ModalButton
                as="button"
                disabled={!data.deposit.isActive}
                blue
                onClick={() =>
                  handleClick(data.deposit.account, data.deposit.minAmount)
                }
              >
                {t("payments.open")}
              </ModalButton>
            </ProgramCard>
            <RadialModalItem
              small={
                data.deposit.name.split(" ")[0].length > 6 &&
                data.deposit.name.split(" ").length > 1
              }
              flex={true}
            >
              <RadialBar
                height={300}
                values={Number((data.procent * 100).toFixed(0))}
                color={data.deposit.isActive ? data.colors : "#666"}
                size="60%"
              />
              <RoundInside>
                <RoundInsideName>{data.deposit.name}</RoundInsideName>
                <RoundInsideProcent>
                  <RoundInsideItem>{(data.procent * 100).toFixed(2)}</RoundInsideItem>
                  <Proc>%</Proc>
                </RoundInsideProcent>
              </RoundInside>
            </RadialModalItem>
          </ModalContainer>
        </Modal>
      )}
      <RadialItem onClick={() => setShow(true)}>
        <RadialBar
          height={height}
          values={data.procent * 100}
          color={data.deposit.isActive ? data.colors : "#666"}
        />
        <RoundInside>
          <RoundInsideName
            small={
              data.deposit.name.split(" ")[0].length > 6 &&
              data.deposit.name.split(" ").length > 1
            }
          >
            {data.depositName}
          </RoundInsideName>
          <RoundInsideDate>
            {moment(data.date).format("DD.MM.YYYY")}
          </RoundInsideDate>
          <RoundInsideProcent>
            {(data.procent * 100).toFixed(2)}
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
  const [loadReset, setLoadReset] = useState(false);
  const arrSizeBig = 10;
  const arrSizeMob = 4;
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const { t } = useTranslation();

  const lang = localStorage.getItem("i18nextLng") || "ru";
  const languale = lang === "ru" ? 1 : 0;

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
  }, [hubConnection, languale]);

  const reset = () => {
    if (hubConnection) {
      setLoadReset(true);
      hubConnection
        .invoke<RootPayDeposit[]>("GetDayPayouts", languale)
        .then((res) => {
          console.log("res", res);
          setStatsDeposit(res);
          setLoadReset(false);
        })
        .catch((e) => {
          setLoadReset(false);
          console.log(e);
        });
    }
  };

  return (
    <Page>
      {statsDeposit.length ? (
        <Container>
          <H2>{t("payments.currPay")}</H2>
        </Container>
      ) : (
        ""
      )}

      <Container>
        {statsDeposit.length ? (
          <>
            <SwiperContainer alfa>
              <Swiper
                spaceBetween={10}
                slidesPerView={1}
                pagination={{ clickable: true }}
              >
                {bigArr.map((i: any, idx: number) => (
                  <SwiperSlide key={idx} style={{ maxWidth: 1130 }}>
                    <RadialWrap>
                      {i.map((item: Pokedex, idx: number) => (
                        <RadialComponent height={210} key={idx} data={item} />
                      ))}
                    </RadialWrap>
                  </SwiperSlide>
                ))}
              </Swiper>
              <OnDate rtt={loadReset}>
                {t("payments.on")}{" "}
                {moment(statsDeposit[0].payoutDate).format("DD.MM.YYYY")}{" "}
                <Refresh onClick={reset} />
              </OnDate>
            </SwiperContainer>

            <SwiperContainerMob alfa>
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
                          <RadialComponent height={170} key={idx} data={item} />
                        ))}
                      </RadialWrap>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
              <OnDate rtt={loadReset}>
                {t("payments.on")}{" "}
                {moment(statsDeposit[0].payoutDate).format("DD.MM.YYYY")}{" "}
                <Refresh onClick={reset} />
              </OnDate>
            </SwiperContainerMob>
          </>
        ) : (
          ""
        )}
      </Container>
    </Page>
  );
};

const ModalButton = styled(Button)`
  &:disabled {
    background: ${(props) => props.theme.bbdis};
    border-color: ${(props) => props.theme.bbdis};
    box-shadow: none;
  }
`;

const Text = styled.div`
  font-size: 14px;
  font-weight: 400;
  font-style: normal;
  text-align: left;
  letter-spacing: normal;
  line-height: normal;
  margin-bottom: 15px;
  p {
    padding-bottom: 10px;
  }
  @media (max-width: 768px) {
    text-align: center;
  }
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
    padding: 20px;
  }
`;

const SwiperContainer = styled(Card)`
  position: relative;
  padding-bottom: 10px;
  width: 100%;
  .swiper-pagination-bullet:only-child {
    visibility: hidden;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const SwiperContainerMob = styled(Card)`
  display: none;
  position: relative;
  .swiper-pagination-bullet:only-child {
    visibility: hidden;
  }
  @media (max-width: 768px) {
    display: block;
    padding-bottom: 40px;
    .swiper-container {
      padding-bottom: 20px;
    }
  }
`;

const Move = keyframes`
100% { transform: rotate(360deg); }
`;

const OnDate = styled.div<{ rtt?: boolean }>`
  position: absolute;
  bottom: 25px;
  right: 25px;
  text-align: right;
  font-size: 14px;
  line-height: 116.69%;
  color: ${(props) => props.theme.text};
  cursor: pointer;
  z-index: 1;
  svg {
    animation: ${(props) => props.rtt && Move} 4s linear infinite;
  }
  @media (max-width: 768px) {
    right: 0;
    left: 0%;
    text-align: center;
    bottom: 15px;
  }
`;

const RadialWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  @media (max-width: 992px) {
    flex-wrap: wrap;
  }
`;

const RadialItem = styled.div`
  position: relative;
  width: 150px;
  height: 188px;
  margin: 30px 20px;
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

const RoundInsideName = styled.div<{ small?: boolean }>`
  text-align: center;
  font-weight: 500;
  font-size: ${(props) => (props.small ? "16px" : "18px")};
  line-height: ${(props) => (props.small ? "18px" : "21px")};
  text-transform: uppercase;
  padding-top: 26px;
  padding-bottom: 4px;
  text-overflow: ellipsis;
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
  color: ${(props) => props.theme.text};
  padding-bottom: 10px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const RoundInsideProcent = styled.div`
  text-align: center;
  font-weight: 900;
  font-size: 28px;
  line-height: 21px;
  color: #ff416e;
  @media (max-width: 768px) {
    font-size: 26px;
  }
`;

const RadialModalItem = styled.div<{ small?: boolean, flex?: boolean }>`
  width: 280px;
  flex: none;
  position: relative;
  ${RoundInside} {
    top: 50%;
    left: 50%;
    margin-left: -60px;
    margin-top: -66px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    @media (max-width: 768px) {
      width: 125px;
      height: 125px;
      margin-left: -63px;
    }
  }
  ${RoundInsideName} {
    font-weight: 500;
    line-height: 28px;
    font-size: 1.90em;
    @media (max-width: 768px) {
      max-width: 100%;
      padding-top: 23px;
    }
  }
  ${RoundInsideProcent} {
    font-size: 38px;
    line-height: 48px;
    display: ${({ flex }) => flex != null && flex ? "flex" : "" };
  }
  @media (max-width: 768px) {
    width: 280px;
  }
`;

export const BlockTitle = styled.div`
  font-size: 18px;
  font-weight: 900;
  font-style: normal;
  letter-spacing: normal;
  line-height: normal;
  text-align: left;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const Proc = styled.div`
  display: inline-block;
  font-size: 16px;
`;

const ProgramCard = styled.div`
  /* border: 1px solid #6db9ff; */
  box-sizing: border-box;
  max-width: 340px;
  width: 100%;
  backdrop-filter: blur(4px);
  border-radius: 20px;
  padding: 40px 20px;
  @media (max-width: 768px) {
    padding: 15px 20px;
    ${Button} {
      margin-left: auto;
      margin-right: auto;
    }
  }
`;

const RoundInsideItem = styled.div`
  width: 100%;
`;
