import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
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
import { countVolumeToSend, countVolumeToShow, removeLeadingZeros } from '../../../utils';
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
    const { hubConnection, balanceList } = useContext(AppContext);
    const [balanceSumm, setBalanceSumm] = useState('');
    const [fiatSumm, setFiatSumm] = useState('');
    const [paymentMethodSafeId, setPaymentMethodSafeId] = useState('');
    const [sellOrderPaymentMethods, setSellOrderPaymentMethods] = useState<CollectionPayMethod[]>([]);
    const [userPaymentMethods, setUserPaymentMethods] = useState<CollectionPayMethod[]>([]);
    const [showCreateExchangeModal, setShowCreateExchangeModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showNotEnoughFunds, setShowNotEnoughFunds] = useState(false);

    const [balanceLimitFrom, setBalanceLimitFrom] = useState(0);
    const [balanceLimitTo, setBalanceLimitTo] = useState(0);

    // The Array should have the same queue as PaymentMethodKind enum
    const paymentMethodsKinds = useMemo<{label: string; value: number}[]>(() => [
        {label: 'ERC 20', value: 0},
        {label: 'TRC 20', value: 1},
        {label: 'BEP 20', value: 2},
        {label: 'АО «Тинькофф Банк»', value: 3},
        {label: 'ПАО Сбербанк', value: 4},
        {label: 'АО «Альфа-Банк»', value: 5}
    ], []);

    useEffect(() => {
        if(order) {
            let limitFrom = 0;
            let limitTo = 0;
        
            limitFrom = Math.ceil((countVolumeToShow(order.limitFrom, order.assetKind) / order.rate) * 100000) / 100000;

            if(countVolumeToShow(order.volume, order.assetKind) < (countVolumeToShow(order.limitTo, order.assetKind) / order.rate)) {
                if(countVolumeToShow(order.volume, order.assetKind) < (countVolumeToShow(order.limitFrom, order.assetKind) / order.rate)) {
                    limitTo = Math.ceil((countVolumeToShow(order.limitFrom, order.assetKind) / order.rate) * 100000) / 100000;
                } else {
                    limitTo = Math.floor((countVolumeToShow(order.volume, order.assetKind)) * 100000) / 100000;
                }
            } else {
                limitTo = Math.floor((countVolumeToShow(order.limitTo, order.assetKind) / order.rate) * 100000) / 100000;
            }
            
            setBalanceLimitFrom(limitFrom);
            setBalanceLimitTo(limitTo);
        }
    }, [order])


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

    const handleShowCreateExchangeModal = () => {
        const balanceItem = balanceList?.find(b => b.balanceKind === order.assetKind);
        if (balanceItem) {
            const balanceRest = countVolumeToShow(balanceItem.volume, balanceItem.balanceKind);
            if(balanceRest >= Number(balanceSumm)) {
                setShowCreateExchangeModal(true);
                return;
            }
        }

        setShowNotEnoughFunds(true);
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

    const fiatFixLength = useMemo(() => {
        return order.operationAssetKind === 7 ? 5 : 2;
    }, [order]);

    const onBalanceSummChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const pattern = /^[0-9][0-9\.]*$/;
        const pattern2 = /^[0-9]{1,10}\.[0-9]{6}$/;
        if (e.target.value === '' || pattern.test(e.target.value)) {
            const value = e.target.value;
            const volume = Math.floor((countVolumeToShow(order.volume, order.assetKind)) * 100000) / 100000;
            const limitTo = Math.floor((countVolumeToShow(order.limitTo, order.assetKind) / order.rate) * 100000) / 100000;

            const dotsCount = value.split('.').length - 1;

            if(dotsCount > 1) {
                return;
            };

            if(volume <= limitTo) {
                if(+value >= volume) {
                    setBalanceSumm(String(volume));
                    setFiatSumm((volume * order.rate).toFixed(fiatFixLength));
                    return;
                }
    
                if(+value >= limitTo) {
                    setBalanceSumm(String(limitTo));
                    setFiatSumm((limitTo * order.rate).toFixed(fiatFixLength));
                    return;  
                } 
            }

            if(limitTo <= volume) {
                if(+value >= limitTo) {
                    setBalanceSumm(String(limitTo));
                    setFiatSumm((limitTo * order.rate).toFixed(fiatFixLength));
                    return;  
                } 

                if(+value >= volume) {
                    setBalanceSumm(String(volume));
                    setFiatSumm((volume * order.rate).toFixed(fiatFixLength));
                    return;
                }
            }
          

            if(!pattern2.test(e.target.value)) {
                setBalanceSumm(value);
                setFiatSumm((+value * order.rate).toFixed(fiatFixLength));
            }
            
        }
    };

    const onFiatSummChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const pattern = /^[0-9][0-9\.]*$/;
        const pattern2 = order.operationAssetKind === 7 ? /^[0-9]{1,10}\.[0-9]{6}$/ : /^[0-9]{1,10}\.[0-9]{3}$/;
        if (e.target.value === '' || pattern.test(e.target.value)) {
            const value = e.target.value;
            const volumeSumm = countVolumeToShow(+order.volume, order.assetKind) * order.rate;
            const limitToSumm = countVolumeToShow(+order.limitTo, order.assetKind);
            const volume = Math.floor((countVolumeToShow(order.volume, order.assetKind)) * 100000) / 100000;
            const limitTo = Math.floor((countVolumeToShow(order.limitTo, order.assetKind) / order.rate) * 100000) / 100000;

            const dotsCount = value.split('.').length - 1;

            if(dotsCount > 1) {
                return;
            };

            if(volumeSumm <= limitToSumm) {
                if(+value >= volumeSumm) {
                    setFiatSumm((volumeSumm).toFixed(fiatFixLength));
                    setBalanceSumm(String(volume));
                    return;
                }
    
                if(+value >= limitToSumm) {
                    setFiatSumm((limitToSumm).toFixed(fiatFixLength));
                    setBalanceSumm(String(limitTo));
                    return;
                } 
            }

            if(limitToSumm <= volumeSumm) {
                if(+value >= limitToSumm) {
                    setFiatSumm((limitToSumm).toFixed(fiatFixLength));
                    setBalanceSumm(String(limitTo));
                    return;
                } 

                if(+value >= volumeSumm) {
                    setFiatSumm((volumeSumm).toFixed(fiatFixLength));
                    setBalanceSumm(String(volume));
                    return;
                }
            }
           
            if(!pattern2.test(e.target.value)) {
                setFiatSumm(value);
                setBalanceSumm(String(Math.ceil((+value / order.rate) * 100000) / 100000))
            }
        }
    }; 

  return (
    <S.Container>
        <LeftSide bg={'#EAEFF4'}>
            <S.BlockWrapper>
                <Text size={14} lH={20} mB={10} black weightMobile={300} mBMobile={4}>
                    Количество:
                </Text>
                <Title lH={28} mB={10} heading3>
                    {`${countVolumeToShow(order.volume, order.assetKind)} ${Balance[order.assetKind]}`}
                </Title>
                <Chip>
                    {orderType === OrderType.Buy ? 'Покупка' : 'Продажа'}
                </Chip>
            </S.BlockWrapper>

            <S.BlockWrapper>
                <Text size={14} lH={20} mB={10} black weightMobile={300} mBMobile={4}>
                    Курс:
                </Text>
                <Title lH={28} heading3>
                    {order.rate.toLocaleString('ru-RU', {
                        maximumFractionDigits: 5,
                    })}
                </Title>
            </S.BlockWrapper>

            <S.BlockWrapper>
                <Text size={14} lH={20} mB={10} black weightMobile={300} mBMobile={4}>
                    На сумму:
                </Text>
                <Title lH={28} heading3>
                    {`${(countVolumeToShow(order.volume, order.assetKind) * order.rate).toLocaleString('ru-RU', {
                        maximumFractionDigits: 5,
                    })} ${FiatKind[order.operationAssetKind]}`}
                </Title>
            </S.BlockWrapper>

            <S.BlockWrapper>
                <Text size={14} lH={20} mB={10} black weightMobile={300} mBMobile={4}>
                    Лимиты:
                </Text>
                <Title lH={28} heading3>
                    {`${countVolumeToShow(order.limitFrom, order.assetKind)} - ${
                        countVolumeToShow(order.limitTo, order.assetKind)} ${FiatKind[order.operationAssetKind]}`}
                </Title>
            </S.BlockWrapper>

            <S.BlockWrapper>
                <Text size={14} lH={20} mB={10} black weightMobile={300} mBMobile={4}>
                    Методы оплаты:
                </Text>
                {
                    order.methodsKinds.map((kind, i) => (
                        <Title lH={28} mB={10} key={`method-item-${i}`} heading3 mbMobile={4}>
                            {paymentMethodsKinds[kind].label}
                        </Title>
                    ))
                }
            </S.BlockWrapper>

            <S.BlockWrapper>
                <Text size={14} lH={20} mB={10} black weightMobile={300} mBMobile={4}>
                    Время на обмен:
                </Text>
                <Title lH={28} heading3>
                {`${order.operationWindow.totalMinutes}м. ${order.operationWindow.seconds}с.`}
                </Title>
            </S.BlockWrapper>

            <S.BlockWrapper noMb>
                <Text size={14} lH={20} mB={10} black weightMobile={300} mBMobile={4}>
                    {`Рейтинг ${orderType === OrderType.Buy ? 'покупателя' : 'продавца'}:`}
                </Text>
                <Title lH={28} mB={0} heading3>
                    {`${order.userRating ? Number(order.userRating).toFixed(1) : '0.0'} (${order.totalExecuted})`}
                </Title>
            </S.BlockWrapper>
        </LeftSide>

        <RightSide>
            <Title mB={40} lH={28} main heading3 mbMobile={20}>
                {`Заявка на ${orderType === OrderType.Buy ? 
                'продажу' : 'покупку'}  ${Balance[order.assetKind]} за ${FiatKind[order.operationAssetKind]}`}
            </Title>

            <S.FormItem>
                <Text size={14} weight={300} lH={20} mB={10} black>
                    {
                        `Количество ${orderType === OrderType.Buy ? 'продажи' : 'покупки'} (min ${
                            balanceLimitFrom
                        } max ${
                           balanceLimitTo
                            } ${Balance[order.assetKind]
                        }):`
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
                        `Сумма к ${orderType === OrderType.Buy ? 'получению' : 'списанию'} (min ${
                            (countVolumeToShow(order.limitFrom, order.assetKind)).toLocaleString('ru-RU', {
                                maximumFractionDigits: fiatFixLength,
                            })
                        } max ${
                            countVolumeToShow(order.volume, order.assetKind) < (countVolumeToShow(order.limitTo, order.assetKind) / order.rate)
                            ? 
                                countVolumeToShow(order.volume, order.assetKind) > (countVolumeToShow(order.limitFrom, order.assetKind) / order.rate)
                                ?
                                    (countVolumeToShow(order.volume, order.assetKind) * order.rate).toLocaleString('ru-RU', {
                                        maximumFractionDigits: fiatFixLength,
                                    })
                                :
                                    (countVolumeToShow(order.limitFrom, order.assetKind)).toLocaleString('ru-RU', {
                                        maximumFractionDigits: fiatFixLength,
                                    })
                            : 
                                (countVolumeToShow(order.limitTo, order.assetKind)).toLocaleString('ru-RU', {
                                    maximumFractionDigits: fiatFixLength,
                                })
                            } ${FiatKind[order.operationAssetKind]
                        }):`
                    }
                </Text>
                <S.Input
                    placeholder="Введите сумму"
                    name="summ"
                    value={fiatSumm}
                    onChange={onFiatSummChange}
                />
            </S.FormItem>
         
            {
                orderType === OrderType.Buy
                ?
                <S.BlockWrapper largeMB mobileMb={20}>
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
                                        {JSON.parse(method.data).bankName}
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
                                        {paymentMethodsKinds[method.kind].label}
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
                                <S.Link to={`${routers.settingsNewPayMethod}?redirect=${order.safeId}`}>
                                    добавьте платежный метод
                                </S.Link>
                            </Text>
                        </S.EmptyPaymentsBlock>
                    }
                </S.BlockWrapper>
                :
                <S.BlockWrapper largeMB mobileMb={20}>
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
                                        {JSON.parse(method.data).bankName}
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
                                        {paymentMethodsKinds[method.kind].label}
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
                                После начала обмена - в течении ${order.operationWindow.totalMinutes} минут покупатель осуществит перевод средств на указанный счет, 
                                а покупаемое количество ${Balance[order.assetKind]} будет списано с вашего баланса и заморожено до вашего подтверждения получения средств.
                            `}
                        </Text>
                    :
                        <Text size={14} lH={20} weight={300} black>
                           {`
                            После начала обмена - в течении ${order.operationWindow.totalMinutes} минут осуществите перевод средств выбранным платежным методом.
                           `}
                        </Text>
                }
            </S.TransferInfoBlock>

            {
                
                <S.Button 
                    as="button"
                    primary 
                    fullWidthMobile
                    onClick={handleShowCreateExchangeModal}
                    disabled={
                        order.volume === 0 ||
                        order.volume < (order.limitFrom / order.rate) ||
                        !paymentMethodSafeId || 
                        !balanceSumm || 
                        (countVolumeToShow(+order.limitFrom, order.assetKind) / order.rate) > Number(balanceSumm)
                        // (   order.volume < (order.limitFrom / order.rate)
                        //     ?
                        //     countVolumeToShow(+order.volume, order.assetKind) > Number(balanceSumm)
                        //     :
                        //     (countVolumeToShow(+order.limitFrom, order.assetKind) / order.rate) > Number(balanceSumm)
                        // )
                    }
                >
                    {orderType === OrderType.Buy ? 'Продать' : 'Купить'}
                </S.Button>
            }
            
            <ExchangeRequestModal
                exchangeSumm={balanceSumm}
                fiatSumm={fiatSumm}
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
            <ExchangeRequestErrorModal 
                message={'Недостаточно средств.'}
                withAction={false}
                open={showNotEnoughFunds}
                onClose={() => setShowNotEnoughFunds(false)}
            />
        </RightSide>
    </S.Container>
  );
};
