import React, { FC, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as S from './S.el';
import {
    Chip,
    CopyIconButton,
    LeftSide,
    RightSide,
    Space,
    Text,
    Title,
} from '../../../components/ui';
import { OrderType, ViewBuyOrderModel, ViewSellOrderModel } from '../../../../../types/orders';
import { AppContext } from '../../../../../context/HubContext';
import { Balance } from '../../../../../types/balance';
import { FiatKind } from '../../../../../types/fiat';
import { CollectionPayMethod, PaymentMethodKind, RootPayMethod } from '../../../../../types/paymentMethodKind';
import { routers } from '../../../../../constantes/routers';
import { countVolumeToSend, countVolumeToShow } from '../../../utils';
import { ViewExchangeModel } from '../../../../../types/exchange';
import { ExchangeRequestModal } from '../../components/modals/ExchangeRequest';
import { ExchangeRequestErrorModal } from '../modals/ExchangeRequestErrorModal';
import { Radio } from '../../../components/Radio/Radio';
 
interface OrderDetailsCardProps {
  order: ViewBuyOrderModel | ViewSellOrderModel;
  orderType: OrderType;
};

export const OrderDetailsCard: FC<OrderDetailsCardProps> = ({ order, orderType }: OrderDetailsCardProps) => {
  const history = useHistory();
  const { hubConnection } = useContext(AppContext);
  const [balanceSumm, setBalanceSumm] = useState('');
  const [fiatSumm, setFiatSumm] = useState('');
  const [paymentMethodSafeId, setPaymentMethodSafeId] = useState('');
  const [sellOrderPaymentMethods, setSellOrderPaymentMethods] = useState<CollectionPayMethod[]>([]);
  const [userPaymentMethods, setUserPaymentMethods] = useState<CollectionPayMethod[]>([]);
  const [showCreateExchangeModal, setShowCreateExchangeModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);


  useEffect(() => {
    if(hubConnection) {
      if(order && orderType === OrderType.Sell) {
        getSellOrderPaymentMethods();
      }
      if(order && orderType === OrderType.Buy) {
        getUserPaymentMethods();
      }
    }
  }, [hubConnection, orderType, order]);

    const getUserPaymentMethods = async () => {
        try {
            const res = await hubConnection!.invoke<RootPayMethod>(
                'GetUserPaymentsMethods',
                order.methodsKinds, // PaymentMethodKind
                [1], // PaymentMethodState
                [ order.operationAssetKind ], // BalanceKind
                0, // skip
                20 // take
            );
            setUserPaymentMethods(res.collection);
            console.log('GetUserPaymentsMethods', res);
        } catch (err) {
            console.log(err);
        }
    };

    const getSellOrderPaymentMethods = async () => {
        try {
            const res = await hubConnection!.invoke<CollectionPayMethod[]>(
                'GetSellOrderPaymentMethods',  
                order.safeId
            );
            console.log('GetSellOrderPaymentMethods', res);
            setSellOrderPaymentMethods(res);
        } catch (err) { 
            console.log(err);
        }
    };

    // TODO Use SetExchangePaymentMethod for CreateSellExchange created exchange
    const handleCreateExchange = async () => {
        if(orderType === OrderType.Buy) {
            try {
                const res = await hubConnection!.invoke<ViewExchangeModel>(
                    'CreateSellExchange',  
                    order.safeId,
                    countVolumeToSend(balanceSumm, order.assetKind)
                );

                // Add Payment Method for created Exchange
                await hubConnection!.invoke<null>(
                    'SetExchangePaymentMethod',  
                    res.safeId,
                    paymentMethodSafeId
                );
                setShowCreateExchangeModal(false);

                // On Exchange Create success Navigate to exchange Page
                history.replace(`${routers.p2pchanges}/${res.safeId}`);
            } catch (err) { 
                setShowCreateExchangeModal(false);
                setShowErrorModal(true);
            }
        } else {
            try {
                const res = await hubConnection!.invoke<ViewExchangeModel>(
                    'CreateBuyExchange',  
                    order.safeId,
                    countVolumeToSend(balanceSumm, order.assetKind), 
                    paymentMethodSafeId 
                );
                setShowCreateExchangeModal(false);

                // On Exchange Create success Navigate to exchange Page
                history.replace(`${routers.p2pchanges}/${res.safeId}`);
            } catch (err) { 
                setShowCreateExchangeModal(false);
                setShowErrorModal(true);
            }
        }
    };

    const onBalanceSummChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const pattern = /^[0-9][0-9\.]*$/;
        if (e.target.value === '' || pattern.test(e.target.value)) {
            const volume = countVolumeToShow(+order.volume, order.assetKind);
            if(+e.target.value > volume) {
                setBalanceSumm(String(volume));
                return;
            }

            const limitTo = countVolumeToShow(+order.limitTo, order.assetKind);
            if(+e.target.value > limitTo) {
                setBalanceSumm(String(limitTo));
                return;
            } 
                
            setBalanceSumm(e.target.value);
        }
    };

    const onFiatSummChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const pattern = /^[0-9][0-9\.]*$/;
        if (e.target.value === '' || pattern.test(e.target.value)) {
            setFiatSumm(e.target.value);
        }
    };

  return (
    <S.Container>
        <LeftSide bg={'#EAEFF4'}>
            <S.BlockWrapper>
            <Text size={14} lH={20} mB={10} black>
                Количество:
            </Text>
            <Title lH={28} mB={10}>
                {`${countVolumeToShow(order.volume, order.assetKind)} ${Balance[order.assetKind]}`}
            </Title>
            <Chip>
                {orderType === OrderType.Buy ? 'Покупка' : 'Продажа'}
            </Chip>
            </S.BlockWrapper>

            <S.BlockWrapper>
            <Text size={14} lH={20} mB={10} black>
                Курс:
            </Text>
            <Title lH={28}>
                {order.rate.toLocaleString('ru-RU', {
                    maximumFractionDigits: 5,
                })}
            </Title>
            </S.BlockWrapper>

            <S.BlockWrapper>
            <Text size={14} lH={20} mB={10} black>
                На сумму:
            </Text>
            <Title lH={28}>
                {`${(countVolumeToShow(order.volume, order.assetKind) * order.rate).toLocaleString('ru-RU', {
                    maximumFractionDigits: 4,
                })} ${FiatKind[order.operationAssetKind]}`}
            </Title>
            </S.BlockWrapper>

            <S.BlockWrapper>
            <Text size={14} lH={20} mB={10} black>
                Лимиты:
            </Text>
            <Title lH={28}>
            {`${countVolumeToShow(order.limitFrom, order.assetKind)} - ${countVolumeToShow(order.limitTo, order.assetKind)} ${FiatKind[order.operationAssetKind]}`}
            </Title>
            </S.BlockWrapper>

            <S.BlockWrapper>
            <Text size={14} lH={20} mB={10} black>
                Методы оплаты:
            </Text>
            {
                order.methodsKinds.map((kind, i) => (
                    <Title lH={28} mB={10} key={`method-item-${i}`}>
                        {PaymentMethodKind[kind]}
                    </Title>
                ))
            }
            </S.BlockWrapper>

            <S.BlockWrapper>
            <Text size={14} lH={20} mB={10} black>
                Время на обмен:
            </Text>
            <Title lH={28}>
             {`${order.operationWindow.minutes}м. ${order.operationWindow.seconds}с.`}
            </Title>
            </S.BlockWrapper>

            <S.BlockWrapper>
            <Text size={14} lH={20} mB={10} black>
                {`Рейтинг ${orderType === OrderType.Buy ? 'покупателя' : 'продавца'}:`}
            </Text>
            <Title lH={28}>
                {`${order.userRating ? Number(order.userRating).toFixed(1) : '-'} (${order.totalExecuted})`}
            </Title>
            </S.BlockWrapper>
        </LeftSide>

        <RightSide>
            <Title mB={40} lH={28}>
                {`Заявка на ${orderType === OrderType.Buy ? 
                'продажу' : 'покупку'}  ${Balance[order.assetKind]} за ${FiatKind[order.operationAssetKind]}`}
            </Title>

            <S.FormItem>
              <Text size={14} weight={300} lH={20} mB={10} black>
                  {
                    orderType === OrderType.Buy
                    ?
                    `Количество продажи (max ${
                        order.volume < order.limitTo
                        ? 
                            countVolumeToShow(order.volume, order.assetKind) 
                        : 
                            countVolumeToShow(order.limitTo, order.assetKind)
                    } ${Balance[order.assetKind]}):`
                    :
                    `Количество продажи (max ${
                        order.volume < order.limitTo
                        ? 
                            countVolumeToShow(order.volume, order.assetKind) 
                        : 
                            countVolumeToShow(order.limitTo, order.assetKind)
                    } ${Balance[order.assetKind]}):`
                  }
              </Text>
              <S.Input
                placeholder="Введите сумму"
                name="summ"
                value={balanceSumm}
                onChange={onBalanceSummChange}
              />
            </S.FormItem>

            <S.FormItem>
              <Text size={14} weight={300} lH={20} mB={10} black>
                {
                    orderType === OrderType.Buy
                    ?
                    `Сумма к получению (max ${
                        order.volume < order.limitTo
                        ?
                            countVolumeToShow(order.volume, order.assetKind) * order.rate
                        :
                            countVolumeToShow(order.limitTo, order.assetKind) * order.rate
                    } ${FiatKind[order.operationAssetKind]}):`
                    :
                    `Сумма к списанию (min ${
                        order.volume < order.limitFrom 
                        ?
                            countVolumeToShow(order.volume, order.assetKind) * order.rate
                        :
                            countVolumeToShow(order.limitFrom, order.assetKind) * order.rate
                    } max ${
                        order.volume < order.limitTo 
                        ? 
                            countVolumeToShow(order.volume, order.assetKind) * order.rate
                        : 
                            countVolumeToShow(order.limitTo, order.assetKind) * order.rate
                        } ${FiatKind[order.operationAssetKind]
                    }):`
                  }
              </Text>
              <S.Input
                readOnly
                placeholder="Введите сумму"
                name="summ"
                value={balanceSumm ? (+balanceSumm * order.rate) : ''}
                onChange={onFiatSummChange}
              />
            </S.FormItem>
         
            {
                orderType === OrderType.Buy
                ?
                <S.BlockWrapper largeMB>
                    <Text size={14} lH={20} mB={10} black>Платежные методы:</Text>
                    {
                        userPaymentMethods?.length > 0 
                        ?
                            userPaymentMethods.map((method, i) => (
                            method.assetKind !== 7
                            ?
                                <Space gap={10} column mb={20} key={`payment-method-${method.safeId}-${i}`}>
                                    <Radio 
                                        name="payment-method"
                                        value={method.safeId}
                                        checked={paymentMethodSafeId === method.safeId} 
                                        onChange={(e) => setPaymentMethodSafeId(e.target.value)} 
                                    >
                                        <Text size={14} lH={20} weight={500} mL={10} black>
                                            {JSON.parse(method.data).bankName}
                                        </Text>
                                    </Radio>
                                    <S.PaymentMethodDetailsBlock>
                                        <Text size={14} weight={300} lH={20} black mB={4}>Номер карты:</Text>
                                        <Space gap={10} mb={10}>
                                            <Text size={14} weight={500} lH={16} black>
                                            {JSON.parse(method.data).bankNumber}
                                            </Text>
                                            <CopyIconButton copyValue={JSON.parse(method.data).bankNumber} />
                                        </Space>
                                        

                                        <Text size={14} weight={300} lH={20} black mB={4}>Держатель карты:</Text>
                                        <Text size={14} weight={500} lH={16} black>
                                            {JSON.parse(method.data).name}
                                        </Text>
                                    </S.PaymentMethodDetailsBlock>
                                </Space>
                            :
                                <Space gap={10} column mb={20} key={`payment-method-${method.safeId}-${i}`}>
                                    <Radio 
                                        name="payment-method"
                                        value={method.safeId}
                                        checked={paymentMethodSafeId === method.safeId} 
                                        onChange={(e) => setPaymentMethodSafeId(e.target.value)} 
                                    >
                                        <Text size={14} lH={20} weight={500} mL={10} black>
                                            {PaymentMethodKind[method.kind]}
                                        </Text>
                                    </Radio>
                                    <S.PaymentMethodDetailsBlock>
                                        <Text size={14} weight={300} lH={20} black mB={4}>Адрес кошелька:</Text>
                                        <Space gap={10} mb={10}>
                                            <Text size={14} weight={500} lH={16} black>
                                            {JSON.parse(method.data).paymentAddress}
                                            </Text>
                                            <CopyIconButton copyValue={JSON.parse(method.data).bankNumber} />
                                        </Space>
                                    </S.PaymentMethodDetailsBlock>
                                </Space>
                            ))
                        :
                         // Empty State
                         <S.EmptyPaymentsBlock>
                            <Text size={14} weight={300} lH={20} black>
                                {`Платежные методы отсутствуют, `}
                                <S.Link to={routers.settingsNewPayMethod}>добавьте платежный метод</S.Link>
                            </Text>
                        </S.EmptyPaymentsBlock>
                    }
                </S.BlockWrapper>
                :
                <S.BlockWrapper largeMB>
                    <Text size={14} lH={20} mB={10} black>Платежные методы:</Text>
                    {
                        sellOrderPaymentMethods?.length > 0 ?

                            sellOrderPaymentMethods.map((method, i) => (
                            method.assetKind !== 7
                            ?
                                <Space gap={10} column mb={20} key={`payment-method-${method.safeId}-${i}`}>
                                    <Radio 
                                        name="payment-method"
                                        value={method.safeId}
                                        checked={paymentMethodSafeId === method.safeId} 
                                        onChange={(e) => setPaymentMethodSafeId(e.target.value)} 
                                    >
                                        <Text size={14} lH={20} weight={500} mL={10} black>
                                            {JSON.parse(method.data).bankName}
                                        </Text>
                                    </Radio>
                                    <S.PaymentMethodDetailsBlock>
                                        <Text size={14} weight={300} lH={20} black mB={4}>Номер карты:</Text>
                                        <Space gap={10} mb={10}>
                                            <Text size={14} weight={500} lH={16} black>
                                            {JSON.parse(method.data).bankNumber}
                                            </Text>
                                            <CopyIconButton copyValue={JSON.parse(method.data).bankNumber} />
                                        </Space>
                                        

                                        <Text size={14} weight={300} lH={20} black mB={4}>Держатель карты:</Text>
                                        <Text size={14} weight={500} lH={16} black>
                                            {JSON.parse(method.data).name}
                                        </Text>
                                    </S.PaymentMethodDetailsBlock>
                                </Space>
                            :
                                <Space gap={10} column mb={20} key={`payment-method-${method.safeId}-${i}`}>
                                    <Radio 
                                        name="payment-method"
                                        value={method.safeId}
                                        checked={paymentMethodSafeId === method.safeId} 
                                        onChange={(e) => setPaymentMethodSafeId(e.target.value)} 
                                    >
                                        <Text size={14} lH={20} weight={500} mL={10} black>
                                            {PaymentMethodKind[method.kind]}
                                        </Text>
                                    </Radio>
                                    <S.PaymentMethodDetailsBlock>
                                        <Text size={14} weight={300} lH={20} black mB={4}>Адрес кошелька:</Text>
                                        <Space gap={10} mb={10}>
                                            <Text size={14} weight={500} lH={16} black>
                                            {JSON.parse(method.data).paymentAddress}
                                            </Text>
                                            <CopyIconButton copyValue={JSON.parse(method.data).bankNumber} />
                                        </Space>
                                    </S.PaymentMethodDetailsBlock>
                                </Space>
                            ))
                        :
                            // Empty State
                            <S.EmptyPaymentsBlock>
                                <Text size={14} weight={300} lH={20} black>
                                    {`Платежные методы отсутствуют, `}
                                    <S.Link to={routers.settingsNewPayMethod}>добавьте платежный метод</S.Link>
                                </Text>
                            </S.EmptyPaymentsBlock>
                    }
                </S.BlockWrapper>
            }

            <S.TransferInfoBlock>
                {
                    orderType === OrderType.Buy
                    ?
                        <Text size={14} lH={20} weight={300} black>
                            {` 
                                После начала обмена - в течении ${order.operationWindow.minutes} минут покупатель осуществит перевод средств на указанный счет, 
                                а покупаемое количество ${Balance[order.assetKind]} будет списано с вашего баланса и заморожено до вашего подтверждения получения средств.
                            `}
                        </Text>
                    :
                        <Text size={14} lH={20} weight={300} black>
                           {`
                            После начала обмена - в течении ${order.operationWindow.minutes} минут осуществите перевод средств выбранным платежным методом.
                           `}
                        </Text>
                }
            </S.TransferInfoBlock>

            {
                
                    <S.Button 
                        as="button"
                        primary 
                        onClick={() => setShowCreateExchangeModal(true)}
                        disabled={
                            !paymentMethodSafeId || 
                            !balanceSumm || 
                            (countVolumeToShow(+order.limitFrom, order.assetKind) > Number(balanceSumm))
                        }
                    >
                       {orderType === OrderType.Buy ? 'Продать' : 'Купить'}
                    </S.Button>
            }
            
            <ExchangeRequestModal
                exchangeSumm={balanceSumm}
                order={order}
                orderType={orderType}
                onAccept={handleCreateExchange}
                open={showCreateExchangeModal}
                onClose={() => setShowCreateExchangeModal(false)}
            />
            <ExchangeRequestErrorModal
                open={showErrorModal}
                onClose={() => setShowErrorModal(false)}
            />
        </RightSide>
    </S.Container>
  );
};
