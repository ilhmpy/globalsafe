import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router';

import * as S from './S.el';
import {
  LeftSide,
  RightSide,
  Space,
  TabNavItem,
  Text,
  Title,
} from '../../../components/ui';
import { OrderInfoModal } from '../modals/OrderInfoModal';

import { routers } from '../../../../../constantes/routers';

import { Input } from '../../../../../components/Input';
import { Checkbox } from '../../../components/Checkbox';
import { OrderErrorModal } from '../modals/OrderErrorModal';
import { AppContext } from '../../../../../context/HubContext';
import { Balance } from '../../../../../types/balance';
import { FiatKind } from '../../../../../types/fiat';
import { CollectionPayMethod, RootPayMethod } from '../../../../../types/paymentMethodKind';
import { ViewUserCertificateModel } from '../../../../../types/certificates';
import { ViewBuyOrderModel } from '../../../../../types/orders';
 
export const OrderToBuyCard: FC = () => {
    const history = useHistory();
    const appContext = useContext(AppContext);
    const { hubConnection, user } = appContext;
    const [showOrderBuyModal, setShowOrderBuyModal] = useState(false);
    const [showOrderErrorModal, setShowOrderErrorModal] = useState(false);

    const [currencyToBuy, setCurrencyToBuy] = useState('');
    const [currencyToChange, setCurrencyToChange] = useState('');
    const [orderSumm, setOrderSumm] = useState('');
    const [changeRate, setChangeRate] = useState('');
    const [orderMinSumm, setOrderMinSumm] = useState('');
    const [orderMaxSumm, setOrderMaxSumm] = useState('');
    const timeDurations = useMemo<{label: string; value: number}[]>(() => {
        return [
            {label: '20 минут', value: 20},
            {label: '40 минут', value: 40},
            {label: '60 минут', value: 60},
            {label: '90 минут', value: 90},
            {label: '120 минут', value: 120},
            {label: '150 минут', value: 150},
        ]
    }, []);
    const [changeTimePeriod, setChangeTimePeriod] = useState(timeDurations[0].label);

    const [paymentMethods, setPaymentMethods] = useState<CollectionPayMethod[] | undefined>(undefined);
    const [selectedPaymentMethodsIds, setSelectedPaymentMethodsIds] = useState<string[]>([]);
    const [userActiveCertificate, setUserActiveCertificate] = useState<ViewUserCertificateModel | null>(null);

    const [createOrderLoading, setCreateOrderLoading] = useState(false);
    const [newCreatedOrder, setNewCreatedOrder] = useState<ViewBuyOrderModel | undefined>(undefined);

    // Get Balance Kinds List as an Array
    const balanceKinds = useMemo<string[]>(() => {
       // @ts-ignore: Unreachable code error
       const list: string[] = Object.values(Balance).filter(i => typeof i === 'string');
       return list;
    }, [Balance]);

     // Get Fiat Kinds List as an Array
     const fiatKinds = useMemo<string[]>(() => {
        // @ts-ignore: Unreachable code error
        const list: string[] = Object.values(FiatKind).filter(i => typeof i === 'string');
        return list;
     }, [Balance]);

    useEffect(() => {
        if(hubConnection) {
            setSelectedPaymentMethodsIds([]);
            getUserPaymentMethods();
            getUserCertificate();
        }
    }, [currencyToChange]);

    const getUserPaymentMethods = async () => {
        if(currencyToChange) {
            try {
                const res = await hubConnection!.invoke<RootPayMethod>(
                    'GetUserPaymentsMethods', 
                    [], // PaymentMethodKind
                    [1], // PaymentMethodState
                    [ FiatKind[currencyToChange as keyof typeof FiatKind] ], // BalanceKind
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

    const getUserCertificate = async () => {
        try {
            const res = await hubConnection!.invoke<ViewUserCertificateModel>('GetUserCertificate', 1);
            setUserActiveCertificate(res);
            console.log('getUserCertificate', res);
        } catch (err) {
            console.log(err);
        }
    };

    const findPaymentMethodKinds = (methodsList: CollectionPayMethod[] = []): number[] => {
        const kinds = methodsList.map(m => m.kind);
        const withoutDuplicates = [...new Set(kinds)];
        return withoutDuplicates;
    };

    const handleCreateBuyOrder = async () => {
        console.log('orderSumm', String(orderSumm))
        console.log('changeRate', +changeRate)
        console.log('assetKind', Balance[currencyToBuy as keyof typeof Balance])
        console.log('operationAssetKind', FiatKind[currencyToChange as keyof typeof FiatKind])
        console.log('limitFrom', Number(orderMinSumm))
        console.log('limitTo', Number(orderMaxSumm))
        console.log('window', 20)
        console.log('methodsKinds', findPaymentMethodKinds(paymentMethods?.filter(m => selectedPaymentMethodsIds.includes(String(m.id)))))
        console.log('terms', '');

        setCreateOrderLoading(true);
        try {
            const res = await hubConnection!.invoke<ViewBuyOrderModel>(
                'CreateBuyOrder', 
                String(orderSumm), // string volume
                +changeRate, // double rate
                Balance[currencyToBuy as keyof typeof Balance], // BalanceKind assetKind
                FiatKind[currencyToChange as keyof typeof FiatKind], // FiatKind operationAssetKind
                +orderMinSumm, // long limitFrom
                +orderMaxSumm, // long limitTo
                timeDurations.find(t => t.label === changeTimePeriod)?.value, // int window
                findPaymentMethodKinds(paymentMethods?.filter(m => selectedPaymentMethodsIds.includes(String(m.id)))), // Array of int methodsKinds max:5
                '', // terms
            );
            setNewCreatedOrder(res);
            console.log('GetUserPaymentsMethods', res);
            setCreateOrderLoading(false);
        } catch (err) {
            setShowOrderErrorModal(true);
            console.log(err);
            setCreateOrderLoading(false);
        }
    }

    const onOrderSummChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const pattern = /^[1-9][0-9]*$/;
        if (e.target.value === '' || pattern.test(e.target.value)) {
            if(userActiveCertificate && (+e.target.value > userActiveCertificate.certificate.dailyVolume)) {
                setOrderSumm(String(userActiveCertificate.certificate.dailyVolume));
            } else {
                setOrderSumm(e.target.value);
            }
        }
    };

    const onRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const pattern = /^[0-9][0-9\.]*$/;
        if (e.target.value === '' || pattern.test(e.target.value)) {
          setChangeRate(e.target.value);
        }
    };

    const onOrderMinSummChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const pattern = /^[1-9][0-9]*$/;
        if (e.target.value === '' || pattern.test(e.target.value)) {
            if(+e.target.value > +orderSumm) {
                setOrderMinSumm(orderSumm);
            } else {
                setOrderMinSumm(e.target.value);
            }
        }
    };

    const onOrderMaxSummChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const pattern = /^[1-9][0-9]*$/;
        if (e.target.value === '' || pattern.test(e.target.value)) {
            if(+e.target.value > +orderSumm) {
                setOrderMaxSumm(orderSumm);
            } else {
                setOrderMaxSumm(e.target.value);
            }
        }
    };

    const handleMethodsCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const methodId = e.target.value;
        if(selectedPaymentMethodsIds.includes(methodId)) {
            setSelectedPaymentMethodsIds(s => s.filter(id => id !== methodId));
        } else {
            if(selectedPaymentMethodsIds.length < 6) {
                setSelectedPaymentMethodsIds(s => [...s, methodId]);
            }
        }
    }

    const formIsValid = useMemo<boolean>(() => {
        let isValid = true;
        if(!currencyToBuy) {
            isValid = false;
        }
        if(!currencyToChange) {
            isValid = false;
        }
        if(!orderSumm) {
            isValid = false;
        }
        if(!changeRate) {
            isValid = false;
        }
        if(!orderMinSumm) {
            isValid = false;
        }
        if(!orderMaxSumm) {
            isValid = false;
        }
        if(selectedPaymentMethodsIds.length === 0) {
            isValid = false;
        }

        return isValid;
    }, [currencyToBuy, currencyToChange, orderSumm, changeRate, orderMinSumm, orderMaxSumm, selectedPaymentMethodsIds])

    return (
        <S.Container>
        <LeftSide bg={'#EAEFF4'}>
            <S.BlockWrapper>
            <Text size={14} lH={20} mB={10} black>Аккаунт:</Text>
            <Title lH={28}>{user}</Title>
            </S.BlockWrapper>

            <S.BlockWrapper>
            <Text size={14} lH={20} mB={10} black>Рейтинг аккаунта:</Text>
            <Title lH={28}>5.0</Title>
            </S.BlockWrapper>

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
                <Space gap={20} mb={20}>
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
                        />
                    </S.FormItem>
                </Space>

                <Space gap={20} mb={20}>
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
                        />
                    </S.FormItem>
                </Space>

                {
                    paymentMethods === undefined 
                    ?
                    null
                    :
                    <Space mb={20}>
                        <S.FormItem>
                            <Text size={14} weight={300} lH={20} mB={10} black>
                                Платежный метод:
                            </Text>
                            {
                                paymentMethods.length > 0
                                ?
                                    <Space gap={20} column>
                                        {
                                            paymentMethods.map((method, i) => {
                                                return FiatKind[currencyToChange as keyof typeof FiatKind] !== 7
                                                ?
                                                    <Checkbox 
                                                        key={`payment-method-${method.safeId}-${i}`}
                                                        label={JSON.parse(method.data).bankName}
                                                        labelBold
                                                        checked={selectedPaymentMethodsIds.includes(String(method.id))}
                                                        value={String(method.id)}
                                                        onChange={handleMethodsCheckboxChange}
                                                    />
                                                :
                                                    <Checkbox 
                                                        key={`payment-method-${method.safeId}-${i}`}
                                                        label={FiatKind[method.assetKind]}
                                                        labelBold
                                                        checked={selectedPaymentMethodsIds.includes(String(method.id))}
                                                        value={String(method.id)}
                                                        onChange={handleMethodsCheckboxChange}
                                                    />
                                            })
                                        }
                                    </Space>
                                :
                                    // Empty State
                                    <S.EmptyPaymentsBlock>
                                        <Text size={14} weight={300} lH={20} black>
                                            {`Платежные методы отсутствуют, `}
                                            <S.Link to={routers.settingsNewPayMethod}>добавьте платежный метод</S.Link>
                                        </Text>
                                    </S.EmptyPaymentsBlock>
                            }
                            
                        </S.FormItem>
                    </Space>
                }
               
                {
                    (currencyToBuy &&  currencyToChange && orderSumm && changeRate) &&
                    <Space gap={20} mb={20}>
                        <S.FormItem>
                            <Text size={14} weight={300} lH={20} mB={10} black>
                                Минимальный лимит операции:
                            </Text>
                            <Input
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
                                placeholder="Введите сумму"
                                name="maxSumm"
                                value={orderMaxSumm}
                                onChange={onOrderMaxSummChange}
                            />
                        </S.FormItem>
                    </Space>
                }
                
                <Space gap={20} mb={40}>
                    <S.FormItem>
                        <Text size={14} weight={300} lH={20} mB={10} black>
                            Время на обмен:
                        </Text>
                        <S.Select
                            placeholder="20 минут"
                            options={timeDurations.map(i => i.label)}
                            selectedOption={changeTimePeriod}
                            setSelectedOption={(val: string) => setChangeTimePeriod(val)}
                        />
                    </S.FormItem>
                </Space>
                
                <Space gap={10} mb={40}>
                    <S.Button 
                        primary 
                        onClick={() => setShowOrderBuyModal(true)}
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
                type={'buy'}
                currencyToBuy={currencyToBuy}
                currencyToChange={currencyToChange}
                orderSumm={orderSumm}
                rate={changeRate}
                orderMinSumm={orderMinSumm}
                orderMaxSumm={orderMaxSumm}
                timePeriod={changeTimePeriod}
                onPublish={handleCreateBuyOrder}
                loading={createOrderLoading}
                paymentMethods={paymentMethods 
                    ? 
                    paymentMethods?.filter(m => selectedPaymentMethodsIds.includes(String(m.id))) 
                    : []
                }
                newCreatedOrder={newCreatedOrder}
                open={showOrderBuyModal}
                onClose={() => setShowOrderBuyModal(false)}
            />
            <OrderErrorModal 
                open={showOrderErrorModal}
                onClose={() => setShowOrderErrorModal(false)}
            />
        </S.Container>
    );
};