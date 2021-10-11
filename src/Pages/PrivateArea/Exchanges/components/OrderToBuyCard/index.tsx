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
import { Button } from '../../../../../components/Button/V2/Button';
import { OrderInfoModal } from '../modals/OrderInfoModal';

import { routers } from '../../../../../constantes/routers';

import { Input } from '../../../../../components/Input';
import { Checkbox } from '../../../components/Checkbox';
import { OrderSellModal } from '../modals/OrderSellModal';
import { OrderErrorModal } from '../modals/OrderErrorModal';
import { AppContext } from '../../../../../context/HubContext';
import { Balance } from '../../../../../types/balance';
import { FiatKind } from '../../../../../types/fiat';
 
export const OrderToBuyCard: FC = () => {
    const history = useHistory();
    const appContext = useContext(AppContext);
    const { hubConnection, user, balance, balanceList } = appContext;
    const [showOrderBuyModal, setShowOrderBuyModal] = useState(false);
    const [showOrderSellModal, setShowOrderSellModal] = useState(false);
    const [showOrderErrorModal, setShowOrderErrorModal] = useState(false);

    const [currencyToBuy, setCurrencyToBuy] = useState('');
    const [currencyToChange, setCurrencyToChange] = useState('');
    const [orderSumm, setOrderSumm] = useState('');
    const [changeRate, setChangeRate] = useState('');
    const [orderMinSumm, setOrderMinSumm] = useState('');
    const [orderMaxSumm, setOrderMaxSumm] = useState('');
    const [changeTimePeriod, setChangeTimePeriod] = useState('20 минут');

    const [paymentMethods, setPaymentMethods] = useState<any[]>([]);

    const [createOrderLoading, setCreateOrderLoading] = useState(false);

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
            getUserPaymentMethods();
        }
    }, []);

    const getUserPaymentMethods = async () => {
        setCreateOrderLoading(true);
        try {
            const res = await hubConnection!.invoke(
                'GetUserPaymentsMethods', 
                [0, 1, 2, 3, 4], // PaymentMethodKind
                [1], // PaymentMethodState
                [1], // BalanceKind
                0, // skip
                20 // take
            );
            setPaymentMethods(res.collection);
            console.log('GetUserPaymentsMethods', res);
            setCreateOrderLoading(false);
        } catch (err) {
            console.log(err);
            setCreateOrderLoading(false);
        }
    }

    const handleCreateBuyOrder = async () => {
        try {
            const res = await hubConnection!.invoke(
                'CreateBuyOrder', 
                orderSumm, // string volume
                changeRate, // double rate
                Balance[currencyToBuy as keyof typeof Balance], // BalanceKind assetKind
                FiatKind[currencyToChange as keyof typeof FiatKind], // FiatKind operationAssetKind
                Number(orderMinSumm), // long limitFrom
                Number(orderMaxSumm), // long limitTo
                '', // int window
                [], // Array of int methodsKinds max:5
            );
            console.log('GetUserPaymentsMethods', res);
        } catch (err) {
            console.log(err);
        }
    }

    const onOrderSummChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const pattern = /^[1-9][0-9]*$/;
        if (e.target.value === '' || pattern.test(e.target.value)) {
          setOrderSumm(e.target.value);
        }
    };

    const onRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const pattern = /^[0-9.]*$/;
        if (e.target.value === '' || pattern.test(e.target.value)) {
          setChangeRate(e.target.value);
        }
    };

    const onOrderMinSummChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const pattern = /^[1-9][0-9]*$/;
        if (e.target.value === '' || pattern.test(e.target.value)) {
          setOrderMinSumm(e.target.value);
        }
    };

    const onOrderMaxSummChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const pattern = /^[1-9][0-9]*$/;
        if (e.target.value === '' || pattern.test(e.target.value)) {
          setOrderMaxSumm(e.target.value);
        }
    };

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

                <Space mb={20}>
                    <S.FormItem>
                        <Text size={14} weight={300} lH={20} mB={10} black>
                            Платежный метод:
                        </Text>
                        {
                            paymentMethods.length > 0
                            ?
                                <>
                                {/*  */}
                                    <Space gap={20} mb={20} column>
                                        <Checkbox 
                                            label={'АО «Альфа-Банк»'}
                                            checked={true}
                                            onChange={(e) => console.log(e)}
                                        />
                                        <Checkbox 
                                            label={'АО «Тинькофф Банк»'}
                                            checked={true}
                                            onChange={(e) => console.log(e)}
                                        />
                                        <Checkbox 
                                            label={'ПАО Сбербанк'}
                                            checked={false}
                                            onChange={(e) => console.log(e)}
                                        />
                                    </Space>

                                    {/*  */}
                                    <br />
                                    <hr />
                                    <br />
                                    <Space gap={20} column>
                                        <Checkbox 
                                            label={'TRC 20'}
                                            labelBold
                                            checked={true}
                                            onChange={(e) => console.log(e)}
                                        />
                                        <Checkbox 
                                            label={'ERC 20'}
                                            labelBold
                                            checked={true}
                                            onChange={(e) => console.log(e)}
                                        />
                                        <Checkbox 
                                            label={'BEP 20'}
                                            labelBold
                                            checked={false}
                                            onChange={(e) => console.log(e)}
                                        />
                                    </Space>
                                </>
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
                {
                    currencyToChange && 
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
                            options={['20 минут', '40 минут', '60 минут', '90 минут', '120 минут', '150 минут']}
                            selectedOption={changeTimePeriod}
                            setSelectedOption={(val: string) => setChangeTimePeriod(val)}
                        />
                    </S.FormItem>
                </Space>
                
                <Space gap={10} mb={40}>
                    <S.SubmitButton type="button" onClick={() => setShowOrderBuyModal(true)}>
                        <Button primary>
                            Опубликовать ордер
                        </Button> 
                    </S.SubmitButton>

                    <S.SubmitButton type="button" onClick={() => setShowOrderSellModal(true)}>
                        <Button primary>
                            Опубликовать ордер 2
                        </Button> 
                    </S.SubmitButton>

                    <S.SubmitButton 
                        type="button" 
                        onClick={() => setShowOrderErrorModal(true)}
                    >
                        <Button primary>
                            Опубликовать ордер Error
                        </Button> 
                    </S.SubmitButton>
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
                open={showOrderBuyModal}
                onClose={() => setShowOrderBuyModal(false)}
            />
            <OrderSellModal
                open={showOrderSellModal}
                onClose={() => setShowOrderSellModal(false)}
            />
            <OrderErrorModal 
                open={showOrderErrorModal}
                onClose={() => setShowOrderErrorModal(false)}
            />
        </S.Container>
    );
};


 {/* <Space gap={20} column>
    <Space gap={10} column>
        <Checkbox 
             label={'АО «Альфа-Банк»'}
             checked={true}
             onChange={(e) => console.log(e)}
         />
         <S.PaymentMethodDetailsBlock>
             <Text size={14} weight={300} lH={20} black mB={4}>Номер карты:</Text>
             <Text size={14} weight={500} lH={16} black mB={10}>5536 9137 9922 7240</Text>

             <Text size={14} weight={300} lH={20} black mB={4}>Держатель карты:</Text>
             <Text size={14} weight={500} lH={16} black>VYACHESLAV TROSCHIN</Text>
         </S.PaymentMethodDetailsBlock>
     </Space>

     <Space gap={10} column>
         <Checkbox 
             label={'АО «Тинькофф Банк»'}
             checked={true}
             onChange={(e) => console.log(e)}
         />
         <S.PaymentMethodDetailsBlock>
             <Text size={14} weight={300} lH={20} black mB={4}>Номер карты:</Text>
             <Text size={14} weight={500} lH={16} black mB={10}>5536 9137 9922 7240</Text>

             <Text size={14} weight={300} lH={20} black mB={4}>Держатель карты:</Text>
             <Text size={14} weight={500} lH={16} black>VYACHESLAV TROSCHIN</Text>
         </S.PaymentMethodDetailsBlock>
     </Space>

     <Space gap={10} column>
         <Checkbox 
             label={'ПАО Сбербанк'}
             checked={false}
             onChange={(e) => console.log(e)}
         />
         <S.PaymentMethodDetailsBlock>
             <Text size={14} weight={300} lH={20} black mB={4}>Номер карты:</Text>
             <Text size={14} weight={500} lH={16} black mB={10}>5536 9137 9922 7240</Text>

             <Text size={14} weight={300} lH={20} black mB={4}>Держатель карты:</Text>
             <Text size={14} weight={500} lH={16} black>VYACHESLAV TROSCHIN</Text>
         </S.PaymentMethodDetailsBlock>
     </Space>
 </Space> */}





 {/* <Space gap={20} column>
     <Space gap={10} column>
         <Checkbox 
             label={'TRC 20'}
             labelBold
             checked={true}
             onChange={(e) => console.log(e)}
         />
         <S.PaymentMethodDetailsBlock>
             <Text size={14} weight={300} lH={20} black mB={4}>Адрес кошелька:</Text>
             <Text size={14} weight={500} lH={16} black>377JKD792HcVkP5qZoF7Pv31MbUwke5iMX</Text>
         </S.PaymentMethodDetailsBlock>
     </Space>

     <Space gap={10} column>
         <Checkbox 
             label={'ERC 20'}
             labelBold
             checked={true}
             onChange={(e) => console.log(e)}
         />
         <S.PaymentMethodDetailsBlock>
             <Text size={14} weight={300} lH={20} black mB={4}>Адрес кошелька:</Text>
             <Text size={14} weight={500} lH={16} black>377JKD792HcVkP5qZoF7Pv31MbUwke5iMX</Text>
         </S.PaymentMethodDetailsBlock>
     </Space>

     <Space gap={10} column>
         <Checkbox 
             label={'BEP 20'}
             labelBold
             checked={false}
             onChange={(e) => console.log(e)}
         />
         <S.PaymentMethodDetailsBlock>
             <Text size={14} weight={300} lH={20} black mB={4}>Адрес кошелька:</Text>
             <Text size={14} weight={500} lH={16} black>377JKD792HcVkP5qZoF7Pv31MbUwke5iMX</Text>
         </S.PaymentMethodDetailsBlock>
     </Space>
 </Space>

</S.FormItem>
</Space> */}