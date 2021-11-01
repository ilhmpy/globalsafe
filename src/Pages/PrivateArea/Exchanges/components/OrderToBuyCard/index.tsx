import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router';
import { Input } from '../../../../../components/Input';
import { routers } from '../../../../../constantes/routers';
import { AppContext } from '../../../../../context/HubContext';
import { Balance } from '../../../../../types/balance';
import { RootViewUserCertificatesModel, ViewUserCertificateModel } from '../../../../../types/certificates';
import { FiatKind } from '../../../../../types/fiat';
import { GetBuyOrdersModel, OrderType, ViewBuyOrderModel } from '../../../../../types/orders';
import { CollectionPayMethod, PaymentMethodKind, RootPayMethod } from '../../../../../types/paymentMethodKind';
import { Checkbox } from '../../../components/Checkbox';
import { LeftSide, RightSide, Space, TabNavItem, Text, Title } from '../../../components/ui';
import { countVolumeToSend, countVolumeToShow } from '../../../utils';
import { OrderErrorModal } from '../modals/OrderErrorModal';
import { OrderInfoModal } from '../modals/OrderInfoModal';
import * as S from './S.el';

export const OrderToBuyCard: FC = () => {
  const history = useHistory();
  const appContext = useContext(AppContext);
  const { hubConnection, user, balanceList, userSafeId } = appContext;
  const [showOrderBuyModal, setShowOrderBuyModal] = useState(false);
  const [showOrderErrorModal, setShowOrderErrorModal] = useState(false);

  const [currencyToBuy, setCurrencyToBuy] = useState('');
  const [currencyToChange, setCurrencyToChange] = useState('');
  const [orderSumm, setOrderSumm] = useState('');
  const [changeRate, setChangeRate] = useState('');
  const [orderMinSumm, setOrderMinSumm] = useState('');
  const [orderMaxSumm, setOrderMaxSumm] = useState('');
  const timeDurations = useMemo<{ label: string; value: number }[]>(() => {
    return [
      { label: '20 минут', value: 20 },
      { label: '40 минут', value: 40 },
      { label: '60 минут', value: 60 },
      { label: '90 минут', value: 90 },
      { label: '120 минут', value: 120 },
      { label: '150 минут', value: 150 },
    ];
  }, []);
  const [changeTimePeriod, setChangeTimePeriod] = useState(timeDurations[0].label);

  const [paymentMethods, setPaymentMethods] = useState<CollectionPayMethod[] | undefined>(
    undefined
  );
  const [selectedPaymentMethodsIds, setSelectedPaymentMethodsIds] = useState<string[]>([]);
  const [userActiveCertificate, setUserActiveCertificate] =
    useState<ViewUserCertificateModel | null>(null);

  const [createOrderLoading, setCreateOrderLoading] = useState(false);
  const [newCreatedOrder, setNewCreatedOrder] = useState<ViewBuyOrderModel | undefined>(undefined);
  const [dailyLimitRest, setDailyLimitRest] = useState<undefined | number>(0);
  const [hasFamiliarOrder, setHasFamiliarOrder] = useState(false);
  const [showHasFamiliarOrder, setShowHasFamiliarOrder] = useState(false);
  const [showCertificateIsMissingModal, setShowCertificateIsMissingModal] = useState(false);

  // Get Balance Kinds List as an Array
  const balanceKinds = useMemo<string[]>(() => {
    const ownBalanceKinds: number[] = balanceList?.map(b => b.balanceKind) || [];

    // @ts-ignore: Unreachable code error
    const list: string[] = Object.values(Balance)
    .filter((b) => typeof b === 'string')
    .filter((b, i) => ownBalanceKinds.includes(i))
    .filter((b) => b !== 'Na');

    return list;
  }, [Balance, balanceList]);

  // Get Fiat Kinds List as an Array
  const fiatKinds = useMemo<string[]>(() => {
    // @ts-ignore: Unreachable code error
    const list: string[] = Object.values(FiatKind).filter((i) => typeof i === 'string');
    return list;
  }, [Balance]);

  useEffect(() => {
    if (hubConnection) {
      setSelectedPaymentMethodsIds([]);
      getUserPaymentMethods();
    }
  }, [currencyToChange]);

  useEffect(() => {
    if (hubConnection && currencyToBuy) {
      handleGetOrdersVolume();
      getUserCertificates();
    }
  }, [currencyToBuy]);

 useEffect(() => {
    if (hubConnection && currencyToBuy) {
      handleGetOrdersVolume();
    }
  }, [userActiveCertificate]);

  const handleGetOrdersVolume = async () => {
      try {
        const res = await hubConnection!.invoke<number>(
          'GetOrdersVolume', 
          Balance[currencyToBuy as keyof typeof Balance]
        );
        console.log('GetOrdersVolume', res);
        if(userActiveCertificate) {
          const rest = ( countVolumeToShow(userActiveCertificate.certificate.dailyVolume, userActiveCertificate.certificate.assetKind) - 
          countVolumeToShow(res, Balance[currencyToBuy as keyof typeof Balance]) );
          setDailyLimitRest(rest);
        } else {
          // Fake Value
          setDailyLimitRest(undefined);
        }
      } catch (err) {
        console.log(err);
      }
  };

  const getUserPaymentMethods = async () => {
    if (currencyToChange) {
      try {
        const res = await hubConnection!.invoke<RootPayMethod>(
          'GetUserPaymentsMethods',
          [], // PaymentMethodKind
          [1], // PaymentMethodState
          [FiatKind[currencyToChange as keyof typeof FiatKind]], // BalanceKind
          0, // skip
          20 // take
        );
        setPaymentMethods(res.collection);
        console.log('GetUserPaymentsMethods', res);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const getUserCertificates = async () => {
    try {
      const res = await hubConnection!.invoke<RootViewUserCertificatesModel>(
        'GetUserCertificates', 
        currencyToBuy ? [ Balance[currencyToBuy as keyof typeof Balance] ] : [],
        0, 
        20
      );
      console.log('getUserCertificates', res);

      if(res.collection.length > 0) {
        const sorted = [...res.collection].sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());
        setUserActiveCertificate(sorted[0]);
      } else {
        setUserActiveCertificate(null);
      }
    } catch (err) {
      console.log(err);
    }
  }; 

  const findPaymentMethodKinds = (methodsList: CollectionPayMethod[] = []): number[] => {
    const kinds = methodsList.map((m) => m.kind);
    const withoutDuplicates = [...new Set(kinds)];
    return withoutDuplicates;
  };

  useEffect(() => {
    if (hubConnection && currencyToBuy && currencyToChange) {
      getBuyOrders();
    }
  }, [hubConnection, currencyToBuy, currencyToChange]);

  const getBuyOrders = async () => {
    try {
      const res = await hubConnection!.invoke<GetBuyOrdersModel>(
        'GetBuyOrders', 
        currencyToBuy ? [ Balance[currencyToBuy as keyof typeof Balance] ] : [],  // Array of BalanceKind assetKinds
        currencyToChange ? [ FiatKind[currencyToChange as keyof typeof FiatKind] ] : [],  // Array of FiatKind opAssetKinds
        [], // Array of PaymentMethodKind[] paymentMethodKinds
        0, // int rating
        true, // if true ? will show my orders
        0, 
        10
      );
      console.log('GetBuyOrders', res);
      if(res.collection.length > 0) {
        setHasFamiliarOrder(true);
      } else {
        setHasFamiliarOrder(false);
      }
      
    } catch (err) {
      console.log(err);
    }
  };


  const handleCreateBuyOrder = async () => {
    setCreateOrderLoading(true);
    try {
      const res = await hubConnection!.invoke<ViewBuyOrderModel>(
        'CreateBuyOrder',
        countVolumeToSend(orderSumm, Balance[currencyToBuy as keyof typeof Balance]), // string volume
        +changeRate, // double rate
        Balance[currencyToBuy as keyof typeof Balance], // BalanceKind assetKind
        FiatKind[currencyToChange as keyof typeof FiatKind], // FiatKind operationAssetKind
        +countVolumeToSend(orderMinSumm, Balance[currencyToBuy as keyof typeof Balance]), // long limitFrom
        +countVolumeToSend(orderMaxSumm, Balance[currencyToBuy as keyof typeof Balance]), // long limitTo
        timeDurations.find((t) => t.label === changeTimePeriod)?.value, // int window
        findPaymentMethodKinds(
          paymentMethods?.filter((m) => selectedPaymentMethodsIds.includes(String(m.id)))
        ), // Array of int methodsKinds max:5
        '' // terms
      );
      setNewCreatedOrder(res);
      console.log('CreateBuyOrder', res);
      setCreateOrderLoading(false);
    } catch (err) {
      setShowOrderErrorModal(true);
      console.log(err);
      setCreateOrderLoading(false);
    }
  };

  const onOrderSummChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pattern = /^[0-9][0-9\.]*$/;
    const pattern2 = /^[0-9]{1,10}\.[0-9]{6}$/;
    if (e.target.value === '' || pattern.test(e.target.value)) {
      // Clear Min-Max values
      setOrderMinSumm('');
      setOrderMaxSumm('');
      if(dailyLimitRest !== undefined) {
        if (+e.target.value > dailyLimitRest) {
          if(dailyLimitRest > 0) {
            setOrderSumm(String(dailyLimitRest));
          }
        } else {
          if(!pattern2.test(e.target.value)) {
            setOrderSumm(e.target.value);
          }
        }
        return
      }

      if(dailyLimitRest === undefined) {
        setOrderSumm(e.target.value);
      }
    
    }
  };

  const onRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pattern = /^[0-9][0-9\.]*$/;
    const pattern2 = /^[0-9]{1,10}\.[0-9]{6}$/;
    if (e.target.value === '' || pattern.test(e.target.value)) {
      // Clear Max limit
      setOrderMinSumm('');
      setOrderMaxSumm('');
      if(!pattern2.test(e.target.value)) {
        setChangeRate(e.target.value);
      }
    }
  };

  const onOrderMinSummChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pattern = /^[0-9][0-9\.]*$/;
    const pattern2 = /^[0-9]{1,10}\.[0-9]{3}$/;
    if (e.target.value === '' || pattern.test(e.target.value)) {
      if (+e.target.value > ((+orderSumm - 1) * +changeRate)) {
        setOrderMinSumm(((+orderSumm - 1) * +changeRate).toFixed(2));
      } else {
        if(!pattern2.test(e.target.value)) {
          setOrderMinSumm(e.target.value);
        }
      }
    }
  };

  const onOrderMaxSummChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pattern = /^[0-9][0-9\.]*$/;
    const pattern2 = /^[0-9]{1,10}\.[0-9]{3}$/;
    if (e.target.value === '' || pattern.test(e.target.value)) {
      if (+e.target.value > (+orderSumm * +changeRate)) {
        setOrderMaxSumm((+orderSumm * +changeRate).toFixed(2));
      } else {
        if(!pattern2.test(e.target.value)) {
          setOrderMaxSumm(e.target.value);
        }
      }
    }
  };

  const handleMethodsCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const methodId = e.target.value;
    if (selectedPaymentMethodsIds.includes(methodId)) {
      setSelectedPaymentMethodsIds((s) => s.filter((id) => id !== methodId));
    } else {
      if (selectedPaymentMethodsIds.length < 6) {
        setSelectedPaymentMethodsIds((s) => [...s, methodId]);
      }
    }
  };

  const formIsValid = useMemo<boolean>(() => {
    let isValid = true;
    if (!currencyToBuy) {
      isValid = false;
    }
    if (!currencyToChange) {
      isValid = false;
    }
    if (!orderSumm) {
      isValid = false;
    }
    if (!changeRate) {
      isValid = false;
    }
    if (!orderMinSumm) {
      isValid = false;
    }
    if (!orderMaxSumm) {
      isValid = false;
    }
    if (selectedPaymentMethodsIds.length === 0) {
      isValid = false;
    }

    return isValid;
  }, [
    currencyToBuy,
    currencyToChange,
    orderSumm,
    changeRate,
    orderMinSumm,
    orderMaxSumm,
    selectedPaymentMethodsIds,
  ]);

  const handlePublushOrder = () => {
    if(hasFamiliarOrder) {
      setShowHasFamiliarOrder(true);
      return;
    }

    if(userActiveCertificate === null) {
      setShowCertificateIsMissingModal(true);
      return;
    }

    setShowOrderBuyModal(true);
  };

  // Listening to changes
  useEffect(() => {
    const cbOrderCreated = (order: ViewBuyOrderModel) => {
      console.log('__SOCKET__cbOrderCreated::', order);
      if(order && order.userSafeId === userSafeId) {
        handleGetOrdersVolume();
        getBuyOrders();
      }
    };

    if (hubConnection) {
      hubConnection.on("BuyOrderCreated", cbOrderCreated);
    };

    return () => {
      hubConnection?.off("BuyOrderCreated", cbOrderCreated);
    };
  }, [hubConnection, userSafeId, currencyToBuy, currencyToChange]);

  return (
    <S.Container>
      <LeftSide bg={'#EAEFF4'}>
        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10} black>
            Аккаунт:
          </Text>
          <Title lH={28}>{user}</Title>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10} black>
            Рейтинг аккаунта:
          </Text>
          <Title lH={28}>5.0</Title>
        </S.BlockWrapper>
        {
          currencyToBuy
          ?
            dailyLimitRest !== undefined
            ?
              <S.BlockWrapper>
                <Text size={14} lH={20} mB={10} black>
                  Оставшийся лимит в сутках:
                </Text>
                <Title lH={28}>
                  {`${dailyLimitRest} ${currencyToBuy}`}
                </Title>
              </S.BlockWrapper>
            :
              <S.BlockWrapper>
                <Text size={14} lH={20} mB={10} black>
                  Отсутствует сертификат 
                </Text>
                <S.Link to={routers.certificates}>Купить сертификат</S.Link>
              </S.BlockWrapper>
          :
            null
        }
        
      </LeftSide>

      <RightSide>
        <S.TabsBlock>
          <TabNavItem to={routers.p2pchangesOrderToBuy} exact>
            <div>Покупка</div>
          </TabNavItem>

          <TabNavItem to={routers.p2pchangesOrderToSell} exact>
            <div>Продажа</div>
          </TabNavItem>
        </S.TabsBlock>

        <S.Form>
          <Space gap={20} mb={20} mobileColumn>
            <S.FormItem>
              <Text size={14} weight={300} lH={20} mB={10} black>
                Валюта покупки:
              </Text>
              <S.Select
                placeholder="Не выбрано"
                options={balanceKinds}
                selectedOption={currencyToBuy}
                setSelectedOption={(val: string) => setCurrencyToBuy(val)}
              />
            </S.FormItem>
            <S.FormItem>
              <Text size={14} weight={300} lH={20} mB={10} black>
                Количество покупки:
              </Text>
              <Input
                placeholder="Введите сумму"
                name="summ"
                value={orderSumm}
                onChange={onOrderSummChange}
                readOnly={!currencyToBuy}
              />
            </S.FormItem>
          </Space>

          <Space gap={20} mb={20} mobileColumn>
            <S.FormItem>
              <Text size={14} weight={300} lH={20} mB={10} black>
                Валюта обмена:
              </Text>
              <S.Select
                placeholder="Не выбрано"
                options={fiatKinds}
                selectedOption={currencyToChange}
                setSelectedOption={(val: string) => setCurrencyToChange(val)}
              />
            </S.FormItem>
            <S.FormItem>
              <Text size={14} weight={300} lH={20} mB={10} black>
                Курс:
              </Text>
              <Input
                placeholder="Введите сумму"
                name="changeRate"
                value={changeRate}
                onChange={onRateChange}
                readOnly={!currencyToBuy}
              />
            </S.FormItem>
          </Space>

          {paymentMethods === undefined ? null : (
            <Space mb={20}>
              <S.FormItem>
                <Text size={14} weight={300} lH={20} mB={10} black>
                  Платежный метод:
                </Text>
                {paymentMethods.length > 0 ? (
                  <Space gap={20} column>
                    {paymentMethods.map((method, i) => {
                      return FiatKind[currencyToChange as keyof typeof FiatKind] !== 7 ? (
                        <Checkbox
                          key={`payment-method-${method.safeId}-${i}`}
                          label={JSON.parse(method.data).bankName}
                          labelBold
                          checked={selectedPaymentMethodsIds.includes(String(method.id))}
                          value={String(method.id)}
                          onChange={handleMethodsCheckboxChange}
                        />
                      ) : (
                        <Checkbox
                          key={`payment-method-${method.safeId}-${i}`}
                          label={PaymentMethodKind[method.kind]}
                          labelBold
                          checked={selectedPaymentMethodsIds.includes(String(method.id))}
                          value={String(method.id)}
                          onChange={handleMethodsCheckboxChange}
                        />
                      );
                    })}
                  </Space>
                ) : (
                  // Empty State
                  <S.EmptyPaymentsBlock>
                    <Text size={14} weight={300} lH={20} black>
                      {`Платежные методы отсутствуют, `}
                      <S.Link to={routers.settingsNewPayMethod}>добавьте платежный метод</S.Link>
                    </Text>
                  </S.EmptyPaymentsBlock>
                )}
              </S.FormItem>
            </Space>
          )}

          {currencyToBuy && currencyToChange && orderSumm && changeRate && (
            <Space gap={20} mb={20}>
              <S.FormItem>
                <Text size={14} weight={300} lH={20} mB={10} black>
                  Минимальный лимит операции:
                </Text>
                <Input
                  suffix={currencyToChange ? currencyToChange : '-'}
                  placeholder="Введите сумму"
                  name="minSumm"
                  value={orderMinSumm}
                  onChange={onOrderMinSummChange}
                />
              </S.FormItem>
              <S.FormItem>
                <Text size={14} weight={300} lH={20} mB={10} black>
                  Максимальный лимит операции:
                </Text>
                <Input
                  suffix={currencyToChange ? currencyToChange : '-'}
                  placeholder="Введите сумму"
                  name="maxSumm"
                  value={orderMaxSumm}
                  onChange={onOrderMaxSummChange}
                />
              </S.FormItem>
            </Space>
          )}

          <Space gap={20} mb={40}>
            <S.FormItem>
              <Text size={14} weight={300} lH={20} mB={10} black>
                Время на обмен:
              </Text>
              <S.Select
                placeholder="20 минут"
                options={timeDurations.map((i) => i.label)}
                selectedOption={changeTimePeriod}
                setSelectedOption={(val: string) => setChangeTimePeriod(val)}
              />
            </S.FormItem>
          </Space>

          <Space gap={10} mb={40}>
            <S.Button
              fullWidthMobile
              primary
              onClick={handlePublushOrder}
              as={'button'}
              disabled={!formIsValid}
              type="button"
            >
              Опубликовать ордер
            </S.Button>
          </Space>
        </S.Form>
      </RightSide>

      <OrderInfoModal
        type={OrderType.Buy}
        currencyToBuy={currencyToBuy}
        currencyToChange={currencyToChange}
        orderSumm={orderSumm}
        rate={changeRate}
        orderMinSumm={orderMinSumm}
        orderMaxSumm={orderMaxSumm}
        timePeriod={changeTimePeriod}
        onPublish={handleCreateBuyOrder}
        loading={createOrderLoading}
        paymentMethods={
          paymentMethods
            ? paymentMethods?.filter((m) => selectedPaymentMethodsIds.includes(String(m.id)))
            : []
        }
        newCreatedOrder={newCreatedOrder}
        open={showOrderBuyModal}
        onClose={() => setShowOrderBuyModal(false)}
      />
      <OrderErrorModal 
        onlyCloseAction
        open={showOrderErrorModal} 
        onClose={() => setShowOrderErrorModal(false)} 
      /> 
      <OrderErrorModal  
        onlyCloseAction
        message="У вас уже есть ордер с такой же валютной парой"
        open={showHasFamiliarOrder} 
        onClose={() => setShowHasFamiliarOrder(false)} 
      />  
      <OrderErrorModal  
        message="Отсутствует сертификат"
        open={showCertificateIsMissingModal} 
        onClose={() => setShowCertificateIsMissingModal(false)} 
      /> 
    </S.Container>
  );
};