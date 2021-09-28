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
import { ReactComponent as Refresh } from '../../../../assets/svg/refresh.svg';
import { Button } from '../../../../components/Button/Button';
import { RadialBar } from '../../../../components/Charts/Test';
import { Modal } from '../../../../components/Modal/Modal';
import { Input } from '../../../../components/UI/Input';
import { H2 } from '../../../../components/UI/MainStyled';
import { Page } from '../../../../components/UI/Page';
import { AppContext } from '../../../../context/HubContext';
import { Container } from '../../../../components/UI/Container';
import { Card } from '../../../../globalStyles';
import { Pokedex, RootPayDeposit } from '../../../../types/payouts';
import { ModalBlock, ModalTitle } from '../Tariffs/Tariffs.elements';
import { ReactComponent as Reload } from '../../../../assets/svg/reload.svg';
import { AnyMxRecord } from 'dns';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

type RadialComponentProps = {
  data: Pokedex;
  height: number;
};

const RadialComponent: FC<RadialComponentProps> = ({ data, height }: RadialComponentProps) => {
  const [show, setShow] = useState(false);
  const [isNormalOpen, setIsNormalOpen] = useState(false);
  const [oldLink, setOldLink] = useState('');
  const [link, setLink] = useState('');
  const [min, setMin] = useState(500);
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();
  const onClose = () => {
    setShow(false);
  };

  const handleClick = (str: string, num: number) => {
    setIsNormalOpen(true);
    onClose();
    setValue('');
    const newLink = `https://backup.cwd.global/shopping/payment?to_name=${str}&amount=${
      num / 100000
    }`;
    setLink(newLink);
    setOldLink(`https://backup.cwd.global/shopping/payment?to_name=${str}&amount=`);
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
    const newLink = oldLink.replace(/\d{3,}/g, '');
    if (id === '') {
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
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [show]);

  return (
    <div>
      {isNormalOpen && (
        <Modal zIndex="999999" onClose={() => setIsNormalOpen(false)}>
          <ModalBlock>
            <ModalTitle>{t('tariffs.depositSize')}</ModalTitle>
            <Input
              onChange={onChange}
              // placeholder={min.toString()}
              type="number"
              ref={inputRef}
              value={value}
            />
            <ModalButton as="button" onClick={toLink} danger disabled={+value < min}>
              {t('tariffs.ok')}
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
                <Text dangerouslySetInnerHTML={{ __html: data.deposit.description }} />
              </div>
              <ModalButton
                as="button"
                disabled={!data.deposit.isActive}
                blue
                onClick={() => handleClick(data.deposit.account, data.deposit.minAmount)}
              >
                {t('payments.open')}
              </ModalButton>
            </ProgramCard>
            <RadialModalItem
              small={
                data.deposit.name.split(' ')[0].length > 6 &&
                data.deposit.name.split(' ').length > 1
              }
              flex={true}
            >
              <RadialBar
                height={300}
                values={Number((data.procent * 100).toFixed(0))}
                color={data.deposit.isActive ? data.colors : '#666'}
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
          color={data.deposit.isActive ? data.colors : '#666'}
        />
        <RoundInside>
          <RoundInsideName
            small={
              data.deposit.name.split(' ')[0].length > 6 && data.deposit.name.split(' ').length > 1
            }
          >
            {data.depositName}
          </RoundInsideName>
          <RoundInsideDate>{moment(data.date).format('DD.MM.YYYY')}</RoundInsideDate>
          <RoundInsideProcent>
            {(data.procent * 100).toFixed(2)}
            <Proc>%</Proc>
          </RoundInsideProcent>
        </RoundInside>
      </RadialItem>
    </div>
  );
};

export const Payments: FC = () => {
  const [statsDeposit, setStatsDeposit] = useState<RootPayDeposit[]>([]);
  const [bigArr, setBigArr] = useState<any>([]);
  const [smallArr, setSmallArr] = useState<any>([]);
  const [loadReset, setLoadReset] = useState(false);
  const arrSizeBig = 10;
  const arrSizeMob = 6;
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const [isMobile, setIsMobile] = useState<boolean | undefined>();
  const { t } = useTranslation();

  useEffect(() => setIsMobile(screen.width <= 480), []);

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
      date: { day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear() },
    };
    localStorage.setItem('last', JSON.stringify(newDate));
    getLastUpdate(newDate);
    const update = () => {
      console.log('yes');
      getLastUpdate(newDate);
    };
  }

  function getLastUpdate(last: any) {
    const currentDate = new Date();
    const updateTime = last;

    if (updateTime.date.year == currentDate.getFullYear()) {
      if (updateTime.date.month == currentDate.getMonth() + 1) {
        if (updateTime.date.day == currentDate.getDate()) {
          const time =
            currentDate.getHours() * 60 +
            currentDate.getMinutes() -
            (updateTime.time.hours * 60 + updateTime.time.minutes);
          if (time >= 60) {
            console.log('hours', `${Math.floor(time / 60)} часов`);
            return setLastTime(`${Math.floor(time / 60)} часов`);
          } else {
            console.log('minutes', `${time} минут`);
            if (time > 0) {
              setLastTime(`${time} минут`);
            } else {
              setLastTime(null);
            }
          }
        } else {
          setActualDate(new Date());
          console.log('not current day', `${currentDate.getDate() - updateTime.date.day} дней`);
          return setLastTime(`${currentDate.getDate() - updateTime.date.day} дней`);
        }
      } else {
        setActualDate(new Date());
        console.log(
          'not current month',
          `${currentDate.getMonth() + 1 - updateTime.date.month} месяцев`
        );
        return setLastTime(`${currentDate.getMonth() + 1 - updateTime.date.month} месяцев`);
      }
    } else {
      setActualDate(new Date());
      console.log('not current year: ', `${currentDate.getFullYear() - updateTime.date.year} лет`);
      return setLastTime(`${currentDate.getFullYear() - updateTime.date.year} лет`);
    }
  }

  return (
    <>
      {statsDeposit.length ? (
        <Page>
          <Container>
            <H2 center>{t('payments.currPay')}</H2>
          </Container>
          <Container>
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
                    <Swiper spaceBetween={10} slidesPerView={1} pagination={{ clickable: true }}>
                      {smallArr.map((i: any, idx: number) => (
                        <SwiperSlide key={idx}>
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
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </>
                ) : (
                  <>
                    {statsDeposit.length ? (
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
        </Page>
      ) : null}
    </>
  );
};

const ModalButton = styled(Button)`
  width: 100%;
  max-width: 100%;
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
  font-size: ${(props) => (props.small ? '16px' : '18px')};
  line-height: ${(props) => (props.small ? '18px' : '21px')};
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

const RadialModalItem = styled.div<{ small?: boolean; flex?: boolean }>`
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
    font-size: 1.8em;
    @media (max-width: 768px) {
      max-width: 100%;
      padding-top: 23px;
    }
  }
  ${RoundInsideProcent} {
    font-size: 38px;
    line-height: 48px;
    display: ${({ flex }) => (flex != null && flex ? 'flex' : '')};
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

const WhiteBox = styled.div`
  width: 100%;
  min-height: 612px;
  background: #ffffff;
  border-radius: 4px;
  -webkit-box-shadow: 0px 80px 80px -40px #dcdce880;
  -moz-box-shadow: 0px 80px 80px -40px #dcdce880;
  box-shadow: 0px 80px 80px -40px #dcdce880;
  padding: 30px;
  padding-top: 40px;

  @media only screen and (min-device-width: 481px) and (max-device-width: 1024px) {
    padding: 20px;
    padding-top: 25px;
    max-width: 700px;
  }

  @media only screen and (max-device-width: 767px) {
    width: 100%;
    max-width: 100%;
    padding: 20px;
    height: 480px;
    min-height: 480px;
    padding-bottom: 0px;
    padding-right: 0px;
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

  @media only screen and (max-device-width: 767px) {
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

  @media only screen and (max-device-width: 767px) {
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
    min-height: 370px;
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

const WhiteItem = styled.div`
  width: 180px;
  height: 108px;
  min-width: 180px;
  min-height: 108px;
  background: #f8f7fc;
  margin-right: 20px;
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-items: center;

  @media only screen and (min-device-width: 481px) and (max-device-width: 1024px) {
    width: 150px;
    min-width: 150px;
  }

  @media only screen and (max-device-width: 767px) {
    width: 135px;
    min-width: 135px;
    margin-right: 10px;
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 40px;
    }
  }

  @media only screen and (min-device-width: 360px) and (max-device-width: 409px) {
    max-width: 180px;
    width: 45%;
  }

  @media only screen and (min-device-width: 410px) and (max-device-width: 480px) {
    max-width: 200px;
    width: 45%;
  }
`;

const WhiteItemText = styled.div<{ bold?: boolean }>`
  color: #000000;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;

  ${({ bold }) => {
    if (bold) {
      return `
          font-weight: 700;
          color: #3F3E4E;
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
  min-width: 140px;

  &::after {
    display: inline;
    content: '';
    background: #0094ff;
    position: absolute;
    width: ${({ procent }) => procent}%;
    height: inherit;
  }
`;
