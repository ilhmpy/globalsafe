import React, { FC, useState, useContext, useEffect } from 'react';
import * as S from './S.el';
import {
  Chip,
  CopyIconButton,
  LeftSide,
  RightSide,
  Text,
  Title,
  Radio,
} from '../../../components/ui';
import { Button } from '../../../../../components/Button/V2/Button';
import { ExchangeSuccessModal } from '../modals/ExchangeSuccessModal';
import { ExchangeRejectModal } from '../modals/ExchangeRejectModal';
import { useHistory } from 'react-router';
import { routers } from '../../../../../constantes/routers';
import { ViewExchangeModel, ExchangeState } from '../../../../../types/exchange';
import { Balance } from '../../../../../types/balance';
import { FiatKind } from '../../../../../types/fiat';
import { PaymentMethodKind } from '../../../../../types/paymentMethodKind';
import { createTypeReferenceDirectiveResolutionCache, getDefaultLibFileName } from 'typescript';
import { AppContext } from '../../../../../context/HubContext';
import moment from 'moment';
import reactVirtualizedAutoSizer from 'react-virtualized-auto-sizer';
import { setUncaughtExceptionCaptureCallback } from 'process';
import { getVolume } from '../../../../../functions/getVolume';
import { getTime } from 'date-fns';
import { Counter } from '../../../components/ui/Counter';
import  { countVolumeToShow } from "../../../utils";
import { Container } from "../../../../../components/UI/Container";
import { scryRenderedComponentsWithType } from 'react-dom/test-utils';

type DetailCardProps = {
  exchange: ViewExchangeModel;
  setCall: (value: boolean) => void;
  showSuccessModal: boolean;
  setShowSuccessModal: (value: boolean) => void;
  showRejectModal: boolean;
  setShowRejectModal: (value: boolean) => void;
  owner: "seller" | "buyer";
  setExchange: (val: ViewExchangeModel) => any; 
  setLoading: (val: boolean) => any;
  exchangeId: string;
};

export const ExchangeDetailCard: FC<DetailCardProps> = ({ 
  exchange, setCall, setShowSuccessModal, 
  setShowRejectModal, showRejectModal, 
  showSuccessModal, setExchange, setLoading, 
  exchangeId
}: DetailCardProps) => {
  const history = useHistory();
  const { account, hubConnection } = useContext(AppContext);

  const [feedbackValue, setFeedbackValue] = useState(5);
  const [totalExchanges, setTotalExchanges] = useState<any>();
  const [draw, setDraw] = useState<boolean>(true);
  const [time, setTime] = useState<string>();
  const [timer, setTimer] = useState<any>();
  const [timerDown, setTimerDown] = useState<boolean>(false);
  const buyer = () => {
    return (
      (exchange && exchange.kind === 0 && exchange.ownerSafeId !== account.safeId) ||
      (exchange && exchange.kind === 1 && exchange.ownerSafeId === account.safeId)
    );
  };

  const [owner, setOwner] = useState<'seller' | 'buyer'>(buyer() ? 'buyer' : 'seller');
  const [mark, setMark] = useState<boolean | null>(null);

  useEffect(() => {
    let cancel = false;
    if (hubConnection && !cancel) {
      hubConnection.on("ExchangeAbused", cb);
    };
    return () => {
      cancel = true;
      hubConnection?.off("ExchangeAbused", cb);
    };
  }, [hubConnection, exchange]);

  useEffect(() => {
    let cancel = false;
    if (hubConnection && !cancel) {
      hubConnection.on("ExchangeCancelled", cancelledCallback);
    } 
    return () => {
      cancel = true;
      hubConnection?.off("ExchangeCancelled", cancelledCallback);
    };
  }, [hubConnection, exchange]);

  useEffect(() => {
    let cancel = false;
    if (hubConnection && !cancel) {
      hubConnection.on("ExchangeCompleted", cb);
    };
    return () => {
      cancel = true;
      hubConnection?.off("ExchangeCompleted", cb);
    };  
  }, [hubConnection, exchange]);

  useEffect(() => {
    let cancel = false;
    if (hubConnection && !cancel) {
      hubConnection.on("ExchangeConfirmationRequired", cb);
    };
    return () => {
      cancel = true;
      hubConnection?.off("ExchangeConfirmationRequired", cb);
    };  
  }, [hubConnection, exchange]);

  useEffect(() => {
    let cancel = false;
    if (hubConnection && !cancel) {
      hubConnection.on("BuyOrderVolumeChanged", volumeChanged);
    };
    return () => {
      cancel = true;
      hubConnection?.off("BuyOrderVolumeChanged", volumeChanged);
    };  
  }), [hubConnection], exchange;

  useEffect(() => {
    let cancel = false;
    if (hubConnection && !cancel) {
      hubConnection.on("SellOrderVolumeChanged", volumeChanged);
    };
    return () => {
      cancel = true;
      hubConnection?.off("SellOrderVolumeChanged", volumeChanged);
    };  
  }, [hubConnection, exchange])

  function cb(res: ViewExchangeModel) {
    console.log("ExchangeChanged RES", res, res.safeId, exchange && exchange.safeId);
    if (exchange != null && exchange.safeId == res.safeId) {
        setExchange(res);
    };
  };

  function cancelledCallback(res: ViewExchangeModel) {
    if (exchange != null && exchange.safeId === res.safeId) {
      setShowRejectModal(true);
      cb(res);
    };
  };

  function volumeChanged(id: string, volume: number) {
    if (exchange != null) {
      const newExchange = exchange;
      if (newExchange.safeId === id) {
        newExchange.orderVolume = volume;
        setExchange(newExchange);
      };  
    }
  };

  const handleClick = () => {
    history.push(routers.p2pchangesSingleExchangeChat + '/' + exchange.safeId);
    console.log('ExchangeDetailCard Click');      
  };

  function getUserMark() {
    if (hubConnection) {
      hubConnection.invoke("GetUserMark", exchange.safeId)
        .then((res) => {
          console.log("mark", res);
          setMark(res > 0);
        })
        .catch(err => console.log(err));
    };
  };
 
  useEffect(() => {
    getUserMark();
  }, [hubConnection, exchange])

  function getTotalExecutedExchanges(id: string) {
    if (hubConnection) {
      hubConnection
        .invoke('GetTotalExecutedExchanges', id)
        .then((res) => {
          console.log('totalExecutedExchanges', res);
          setTotalExchanges(res);
        })
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    getTotalExecutedExchanges(exchange.ownerSafeId);
  }, [hubConnection]);

  function getExchangeChip(chip: ExchangeState) {
    if (chip === 0 || chip === 1) {
      return (
        <Chip style={{ background: '#FF4A31', color: '#fff' }}>
          {!timerDown && "Оставшееся время"} <Counter text="Время на обмен закончилось" setTimerDown={setTimerDown} data={exchange.creationDate} delay={exchange.operationWindow.totalMilliseconds} formatNum /> 
        </Chip>
      );
    } else if (chip === 2) {
      return <Chip style={{ background: 'rgba(93, 167, 0, 0.1)', fontWeight: 500 }}>Завершен</Chip>;
    } else if (chip === 3) {
      return <Chip>Спорный</Chip>;
    } else if (chip === 4) {
      return <Chip style={{ background: 'rgba(255, 74, 49, 0.1)' }}>Отменен</Chip>;
    };
  };

  const PaymentMethods = [
    'ERC20',
    'TRC20',
    'BEP20',
    'АО «Тинькофф Банк»',
    'ПАО Сбербанк',
    'АО «Альфа-Банк»',
  ];

  function getAllTime(time: any) {
    const { days, hours, minutes, seconds } = time;
    if (days > 0) {
      return `${days}д. ${hours > 0 ? hours : 0}ч.`;
    } else if (hours > 0) {
      return `${hours}ч. ${minutes > 0 ? minutes : 0}м.`;
    } else if (minutes > 0) {
      return `${minutes}м. ${seconds > 0 ? seconds : 0}с.`;
    } else {
      return `0м. 0с.`;
    }
  }

  function getMyRating() {
    let rating = 0;
    account.claims.forEach((claim: any) => {
      if (claim.claimType === 'exchanges-rating') {
        rating = claim.claimValue;
      }
    });
    return Number(rating).toFixed(1);
  }

  function getMyExchanges() {
    let exchanges = 0;
    account.claims.forEach((claim: any) => {
      if (claim.claimType == 'sell-orders') {
        exchanges = claim.claimValue;
      }
    });
    return exchanges;
  }

  function getParsePaymentData(field: 'card' | 'name') {
    if (exchange.paymentMethod) {
      const fields = JSON.parse(exchange.paymentMethod?.data);
      if (field === 'card') {
        return fields.bankNumber;
      } else {
        return fields.name;
      }
    } else {
      return 'N/A';
    }
  }

  function abuseExchange(id: string) {
    if (hubConnection) {
      hubConnection
        .invoke('AbuseExchange', id)
        .then((res) => {
          console.log('abuse', res);
          if (owner === 'buyer') {
            setCall(true);
          }
        })
        .catch((err) => console.log(err));
    }
  }

  function completeExchange(id: string) {
    if (hubConnection) {
      hubConnection
        .invoke('CompleteExchange', id)
        .then((res) => {
          console.log('complete', res);
          setCall(true);
        })
        .catch((err) => console.log(err));
    };
  };

  function cancelExchange(id: string) {
    if (hubConnection) {
      hubConnection
        .invoke('CancelExchange', id)
        .then((res) => {
          console.log('cancel', res);
          setShowRejectModal(true);
        })
        .catch((err) => console.log(err));
    };
  };

  function confirmExchangePayment(id: string) {
    if (hubConnection) {
      hubConnection
        .invoke('ConfirmExchangePayment', id)
        .then((res) => {
          console.log('confirm', res);
          if (owner === 'buyer') {
            setCall(true);
          };
        })
        .catch((err) => console.log(err));
    }
  };

  console.log(exchange);

  function rateUser() {
    if (hubConnection) {
      hubConnection
        .invoke(
          'RateUser',
          feedbackValue,
          owner === 'seller' ? exchange.recepientSafeId : exchange.ownerSafeId,
          exchange.safeId
        )
        .then((res) => {
          console.log(res);
          setCall(true);
          setShowSuccessModal(true);
        })
        .catch((err) => console.log(err));
    }
  }
  
  function editStateForTesting(state = 0) {
    if (hubConnection) {
      hubConnection.invoke("EditExchangeState", "379035279365767168", 0)
        .then(() => console.log("EDIT_EXCHANGE_STATE"))
        .catch((err) => console.log("EDIT_EXCHANGE_STATE_ERROR", err));
    };
  };

  // editStateForTesting(0);

  return (
    <Container pTabletNone>
    <S.Container>
      <LeftSide bg={'#EAEFF4'}>
        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10} black>
            Количество:
          </Text>
          <Title lH={28} mB={10}>
            {countVolumeToShow(exchange.orderVolume, exchange.assetKind).toLocaleString('ru-RU', {
              maximumFractionDigits: 5,
            })}{' '}
            {Balance[exchange.assetKind]}
          </Title>
          <Chip>{owner === "seller" ? 'Продажа' : 'Покупка'}</Chip>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10} black>
            Курс:
          </Text>
          <Title lH={28}>{exchange.rate}</Title>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10} black>
            На сумму:
          </Text>
          <Title lH={28}>
            {(countVolumeToShow(exchange.orderVolume * exchange.rate, exchange.assetKind)).toLocaleString('ru-RU', {
              maximumFractionDigits: 2,
            })}{' '}
            {FiatKind[exchange.exchangeAssetKind]}
          </Title>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10} black>
            Лимиты:
          </Text>
          <Title lH={28}>
            {`${countVolumeToShow(exchange.limitFrom, exchange.assetKind).toLocaleString('ru-RU', {
              maximumFractionDigits: 0,
            })} - ${countVolumeToShow(exchange.limitTo, exchange.assetKind).toLocaleString('ru-RU', { maximumFractionDigits: 0 })} ${
              FiatKind[exchange.exchangeAssetKind]
            }`}
          </Title>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10} black>
            Методы оплаты:
          </Text>
          {exchange.methodsKinds.map((method: any, idx: number) => (
            <Title lH={28} key={idx}>
              {PaymentMethods[method]}
            </Title>
          ))}
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10} black>
            Время на обмен:
          </Text>
          <Title lH={28}>{getAllTime(exchange.operationWindow)}</Title>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10} black>
            Рейтинг продавца:
          </Text>
          <Title lH={28}>
            {owner === 'seller'
              ? `${getMyRating()} (${getMyExchanges()})`
              : `${Number(exchange.userRating).toFixed(1)} (${totalExchanges})`}
          </Title>
        </S.BlockWrapper>
      </LeftSide>

      {/* IF COMPLETED AND NOT GRADET */}

      <RightSide>
        <S.TitleBlockWrapper>
          <Title mB={10} lH={28} main>
            {owner === "seller" ? 'Продажа' : 'Покупка'}{' '}
            {`${Balance[exchange.assetKind]} за ${FiatKind[exchange.exchangeAssetKind]}`}
          </Title>
          {getExchangeChip(exchange.state)}
        </S.TitleBlockWrapper>
        <S.StateBlock when={exchange.state < 2 || exchange.state != 2 || mark != false}>
          <S.BlockWrapper>
            <Text size={14} lH={20} mB={4} black>
              Количество:
            </Text>
            <Text size={14} lH={20} weight={500} black>
              {countVolumeToShow(exchange.volume, exchange.assetKind).toLocaleString('ru-RU', {
                maximumFractionDigits: 5,
              })}{' '}
              {Balance[exchange.assetKind]}
            </Text>
          </S.BlockWrapper>

          <S.BlockWrapper>
            <Text size={14} lH={20} mB={4} black>
              На сумму:
            </Text>
            <Text size={14} lH={20} weight={500} black>
              {countVolumeToShow(exchange.exchangeVolume, exchange.assetKind).toLocaleString('ru-RU', { maximumFractionDigits: 0 })}{' '}
              {FiatKind[exchange.exchangeAssetKind]}
            </Text>
          </S.BlockWrapper>

          <S.BlockWrapper>
            <Text size={14} lH={20} mB={4} black>
              Метод оплаты:
            </Text>
            <Text size={14} lH={20} weight={500} black>
              {exchange.paymentMethod ? (
                <>
                  {PaymentMethods[exchange.paymentMethod?.kind]},{' '}
                  {FiatKind[exchange.paymentMethod?.assetKind]}
                </>
              ) : (
                'N/A, N/A'
              )}
            </Text>
          </S.BlockWrapper>

          <S.BlockWrapper>
            <Text size={14} lH={20} mB={4} black>
              Номер карты:
            </Text>
            <S.Space>
              <Text size={14} lH={20} weight={500} black>
                {getParsePaymentData('card')}
              </Text>
              <CopyIconButton copyValue={getParsePaymentData('card')} />
            </S.Space>
          </S.BlockWrapper>

          <S.BlockWrapper>
            <Text size={14} lH={20} mB={4} black>
              Держатель карты:
            </Text>
            <Text size={14} lH={20} weight={500} black>
              {getParsePaymentData('name')}
            </Text>
          </S.BlockWrapper>

          {/* COMPLETED, ABUSED, CANCELLED STATES */}

          <S.BlockWrapper when={exchange.state != 0 && exchange.state != 1}>
            <Text size={14} lH={20} mB={4} black>
              Рейтинг покупателя:
            </Text>
            <Text size={14} lH={20} weight={500} mB={4} black>
              {owner === 'seller'
                ? `${Number(exchange.userRating).toFixed(1)} (${totalExchanges})`
                : `${getMyRating()} (${getMyExchanges()})`}
            </Text>
          </S.BlockWrapper>
        </S.StateBlock>
        {/* ************************************ */}

        {/* ********************************************* */}

        {/* INITIATED STATE */}

        <S.StateBlock when={exchange.state === 0}>
          <S.StateBlock when={owner === 'buyer'}>
            <S.TransferInfoBlock>
              <Text size={14} lH={20} black>
                Осуществите перевод средств на указанный счет в размере{' '}
                <S.B>
                  {(countVolumeToShow(exchange.exchangeVolume, exchange.assetKind)).toLocaleString('ru-RU', {
                    maximumFractionDigits: 5,
                  })}{' '}
                  {FiatKind[exchange.exchangeAssetKind]}
                </S.B>{' '}
                и подтвердите перевод средств продавцу нажав на кнопку “средства отправлены”
              </Text>
            </S.TransferInfoBlock>
              {screen.width > 1024 ? (
                <>
                  <S.Space justify="space-between" tabletWrap>
                    <S.Space gap={20} justify="space-between">
                      <Button primary bigSize onClick={() => confirmExchangePayment(exchange.safeId)}>
                        Средства отправлены
                      </Button>
                      <Button outlinePrimary bigSize rightBtnOnTablet onClick={() => cancelExchange(exchange.safeId)}>
                        Отменить обмен
                      </Button>
                    </S.Space>

                    <S.Space gap={20} className="intf_btns">
                      <Button outlinePrimary bigSize onClick={handleClick}>
                        Чат
                      </Button>
                      <Button
                        outlinePrimary
                        bigSize
                        onClick={handleClick}
                        as="button"
                        disabled={exchange.state === 0}
                        exchangeBtn
                      >
                        Пожаловаться
                      </Button>
                    </S.Space>
                  </S.Space>
                </>
              ) : (
                <>
                  <S.Space justify="space-between">
                    <Button primary bigSize onClick={() => confirmExchangePayment(exchange.safeId)}>
                      Средства отправлены
                    </Button>
                    <Button outlinePrimary bigSize rightBtnOnTablet onClick={() => cancelExchange(exchange.safeId)}>
                      Отменить обмен
                    </Button>
                  </S.Space>
                  <S.Space gap={20} justify="flex-end" className="intf_btns">
                      <Button outlinePrimary bigSize onClick={handleClick}>
                        Чат
                      </Button>
                      <Button
                        outlinePrimary
                        bigSize
                        onClick={handleClick}
                        as="button"
                        disabled={exchange.state === 0}
                        exchangeBtn
                      >
                        Пожаловаться
                      </Button>
                    </S.Space>
                </>
              )}
          </S.StateBlock>

          <S.StateBlock when={owner === 'seller'}>
            <S.TransferInfoBlock>
              <Text size={14} lH={20} black>
                Покупатель осуществляет перевод средств на указанный счет в размере{' '}
                <S.B>
                  {(countVolumeToShow(exchange.exchangeVolume, exchange.assetKind)).toLocaleString('ru-RU', {
                    maximumFractionDigits: 0,
                  })}{' '}
                  {FiatKind[exchange.exchangeAssetKind]}
                </S.B>{' '}
                С вашего баланса списаны и заморожены{' '}
                <S.B>
                  {countVolumeToShow(exchange.volume, exchange.assetKind).toLocaleString('ru-RU', {
                    maximumFractionDigits: 5,
                  })}{' '}
                  {Balance[exchange.assetKind]}
                </S.B>{' '}
                до подтверждения вами получения средств.
              </Text>
            </S.TransferInfoBlock>

            <S.Space justify="space-between">
              <S.Space gap={20}>
                <Button primary bigSize as="button" disabled={true} onClick={() => false}>
                  Средства получены
                </Button>
              </S.Space>

              <S.Space gap={20}>
                <Button outlinePrimary bigSize onClick={handleClick}>
                  Чат
                </Button>
              </S.Space>
            </S.Space>
          </S.StateBlock>
        </S.StateBlock>

        {/* **************************** */}

        {/* CONFIRMED STATE */}

        <S.StateBlock when={exchange.state === 1}>
          <S.StateBlock when={owner === 'buyer'}>
            <S.TransferInfoBlock>
              <Text size={14} lH={20} black>
                <S.B>
                  {countVolumeToShow(exchange.volume, exchange.assetKind).toLocaleString('ru-RU', {
                    maximumFractionDigits: 5,
                  })}{' '}
                  {Balance[exchange.assetKind]}
                </S.B>{' '}
                будут отправлены вам сразу после подтверждения продавцом получения средств размере{' '}
                <S.B>
                  {(countVolumeToShow(exchange.exchangeVolume, exchange.assetKind)).toLocaleString('ru-RU', {
                    maximumFractionDigits: 0,
                  })}{' '}
                  {FiatKind[exchange.exchangeAssetKind]}
                </S.B>{' '}
                на указанный счет.
              </Text>
            </S.TransferInfoBlock>

            <S.Space justify="space-between">
              <S.Space gap={20}>
                <Button
                  primary
                  bigSize
                  as="button"
                  disabled={true}
                  onClick={() => setShowSuccessModal(true)}
                >
                  Средства отправлены
                </Button>
              </S.Space>

              <S.Space gap={20}>
                <Button outlinePrimary bigSize onClick={handleClick}>
                  Чат
                </Button>
                <Button
                  outlineDanger
                  bigSize
                  as="button"
                  disabled={!timerDown}
                  onClick={() => abuseExchange(exchange.safeId)}
                  exchangeBtn
                >
                  Пожаловаться
                </Button>
              </S.Space>
            </S.Space>
          </S.StateBlock>

          <S.StateBlock when={owner === 'seller'}>
            <S.TransferInfoBlock>
              <Text size={14} lH={20} black>
                Покупатель указал, что перевел средства в размере{' '}
                <S.B>
                  {(countVolumeToShow(exchange.exchangeVolume, exchange.assetKind)).toLocaleString('ru-RU', {
                    maximumFractionDigits: 0,
                  })}{' '}
                  {FiatKind[exchange.exchangeAssetKind]}
                </S.B>{' '}
                на указанный счет. Подтвердите получение средств для успешного завершения обмена.
                Покупатель получит{' '}
                <S.B>
                  {getVolume(exchange.volume, exchange.assetKind).toLocaleString('ru-RU', {
                    maximumFractionDigits: 5,
                  })}{' '}
                  {Balance[exchange.assetKind]}
                </S.B>
              </Text>
            </S.TransferInfoBlock>

            <S.Space justify="space-between">
              <S.Space gap={20}>
                <Button
                  primary
                  bigSize
                  as="button"
                  onClick={() => completeExchange(exchange.safeId)}
                >
                  Средства получены
                </Button>
              </S.Space>

              <S.Space gap={20}>
                <Button outlinePrimary bigSize onClick={handleClick}>
                  Чат
                </Button>
                <Button
                  outlineDanger
                  bigSize
                  as="button" 
                  disabled={true}
                  onClick={() => abuseExchange(exchange.safeId)}
                  exchangeBtn
                >
                  Пожаловаться
                </Button>
              </S.Space>
            </S.Space>
          </S.StateBlock>
        </S.StateBlock>

        {/* ******************** */}

        {/* COMPLETED STATE */}

        <S.StateBlock when={exchange.state === 2 && mark === false}>
          <S.StateBlock when={owner === 'buyer'}>
            <S.TransferInfoBlock>
              <Text size={14} lH={20} black>
                Обмен успешно завершен. Средства в размере{' '}
                <S.B>
                  {countVolumeToShow(exchange.volume, exchange.assetKind).toLocaleString('ru-RU', {
                    maximumFractionDigits: 5,
                  })}{' '}
                  {Balance[exchange.assetKind]}
                </S.B>{' '}
                отправлены на ваш баланс. Оставьте свою оценку продавцу.
              </Text>
            </S.TransferInfoBlock>
            <S.FeedbackBlock>
              <Text size={14} lH={20} mB={10} black>
                Оставьте свою оценку продавцу:
              </Text>
              <Radio.Group>
                <Radio
                  name="feedback"
                  label="1"
                  value="1"
                  checked={feedbackValue === 1}
                  onChange={(e) => setFeedbackValue(+e.target.value)}
                />
                <Radio
                  name="feedback"
                  label="2"
                  value="2"
                  checked={feedbackValue === 2}
                  onChange={(e) => setFeedbackValue(+e.target.value)}
                />
                <Radio
                  name="feedback"
                  label="3"
                  value="3"
                  checked={feedbackValue === 3}
                  onChange={(e) => setFeedbackValue(+e.target.value)}
                />
                <Radio
                  name="feedback"
                  label="4"
                  value="4"
                  checked={feedbackValue === 4}
                  onChange={(e) => setFeedbackValue(+e.target.value)}
                />
                <Radio
                  name="feedback"
                  label="5"
                  value="5"
                  checked={feedbackValue === 5}
                  onChange={(e) => setFeedbackValue(+e.target.value)}
                />
              </Radio.Group>
            </S.FeedbackBlock>

            <Button primary onClick={() => {
              rateUser();
              setShowSuccessModal(true);
              getUserMark();
            }}>
              Подтвердить
            </Button>
          </S.StateBlock>

          <S.StateBlock when={owner === 'seller'}>
            <S.TransferInfoBlock>
              <Text size={14} lH={20} black>
                Обмен успешно завершен. Средства в размере{' '}
                <S.B>
                  {countVolumeToShow(exchange.volume, exchange.assetKind).toLocaleString('ru-RU', {
                    maximumFractionDigits: 5,
                  })}{' '}
                  {Balance[exchange.assetKind]}
                </S.B>{' '}
                отправлены покупателю. Оставьте свою оценку покупателю.
              </Text>
            </S.TransferInfoBlock>
            <S.FeedbackBlock>
              <Text size={14} lH={20} mB={10} black>
                Оставьте свою оценку покупателю:
              </Text>
              <Radio.Group>
                <Radio
                  name="feedback"
                  label="1"
                  value="1"
                  checked={feedbackValue === 1}
                  onChange={(e) => setFeedbackValue(+e.target.value)}
                />
                <Radio
                  name="feedback"
                  label="2"
                  value="2"
                  checked={feedbackValue === 2}
                  onChange={(e) => setFeedbackValue(+e.target.value)}
                />
                <Radio
                  name="feedback"
                  label="3"
                  value="3"
                  checked={feedbackValue === 3}
                  onChange={(e) => setFeedbackValue(+e.target.value)}
                />
                <Radio
                  name="feedback"
                  label="4"
                  value="4"
                  checked={feedbackValue === 4}
                  onChange={(e) => setFeedbackValue(+e.target.value)}
                />
                <Radio
                  name="feedback"
                  label="5"
                  value="5"
                  checked={feedbackValue === 5}
                  onChange={(e) => setFeedbackValue(+e.target.value)}
                />
              </Radio.Group>
            </S.FeedbackBlock>
            <Button primary onClick={() => {
              rateUser();
              setShowSuccessModal(true);
              getUserMark();
            }}>
              Подтвердить
            </Button>
          </S.StateBlock>
        </S.StateBlock>
        {/* ************** */}
      </RightSide>
      <ExchangeSuccessModal
        exchange={{ ...exchange, feedback: feedbackValue, owner }}
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
      <ExchangeRejectModal
        exchange={{ ...exchange, feedback: feedbackValue, owner }}
        open={showRejectModal}
        onClose={() => setShowRejectModal(false)}
      />
    </S.Container>
    </Container>
  );
};
