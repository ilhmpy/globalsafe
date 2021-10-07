import React, { FC, useState } from 'react';
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
import { useHistory } from 'react-router';
import { OrderBuyModal } from '../modals/OrderBuyModal';

import { routers } from '../../../../../constantes/routers';

import { Input } from '../../../../../components/Input';
import { Checkbox } from '../../../components/Checkbox';
import { OrderSellModal } from '../modals/OrderSellModal';
import { OrderErrorModal } from '../modals/OrderErrorModal';
 
export const NewOrderCard: FC = () => {
  const history = useHistory();
  const [showOrderBuyModal, setShowOrderBuyModal] = useState(false);
  const [showOrderSellModal, setShowOrderSellModal] = useState(false);
  const [showOrderErrorModal, setShowOrderErrorModal] = useState(false);

  return (
    <S.Container>
      <LeftSide bg={'#EAEFF4'}>
        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10} black>Аккаунт:</Text>
          <Title lH={28}>viproller777</Title>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10} black>Рейтинг аккаунта:</Text>
          <Title lH={28}>5.0</Title>
        </S.BlockWrapper>

      </LeftSide>

      <RightSide>

        <S.TabsBlock>
            <TabNavItem to={routers.p2pchangesNewOrder} exact>
              <div>Покупка</div>
            </TabNavItem>

            <TabNavItem to={routers.p2pchangesOwn} exact>
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
                        options={['']}
                        selectedOption={''}
                        setSelectedOption={(val: string) => console.log(val)}
                    />
                </S.FormItem>
                <S.FormItem>
                    <Text size={14} weight={300} lH={20} mB={10} black>
                        Количество покупки:
                    </Text>
                    <Input
                        placeholder="Введите сумму"
                        name="fromSum"
                        value={""}
                        onChange={({ target: { value } }) => console.log(value)}
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
                        options={['']}
                        selectedOption={''}
                        setSelectedOption={(val: string) => console.log(val)}
                    />
                </S.FormItem>
                <S.FormItem>
                    <Text size={14} weight={300} lH={20} mB={10} black>
                        Курс:
                    </Text>
                    <Input
                        placeholder="Введите сумму"
                        name="fromSum"
                        value={""}
                        onChange={({ target: { value } }) => console.log(value)}
                    />
                </S.FormItem>
            </Space>

            <Space mb={20}>
                <S.FormItem>
                    <Text size={14} weight={300} lH={20} mB={10} black>
                        Платежный метод:
                    </Text>

                    {/* Empty State */}
                    <S.EmptyPaymentsBlock>
                        <Text size={14} weight={300} lH={20} black>
                            {`Платежные методы отсутствуют, `}
                            <S.Link to="/">добавьте платежный метод</S.Link>
                        </Text>
                    </S.EmptyPaymentsBlock>

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

                    {/*  */}
                    <br />
                    <hr />
                    <br />
                    <Space gap={20} column>
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
            </Space>


            <Space gap={20} mb={40}>
                <S.FormItem>
                    <Text size={14} weight={300} lH={20} mB={10} black>
                        Время на обмен:
                    </Text>
                    <S.Select
                        placeholder="20 min"
                        options={['']}
                        selectedOption={''}
                        setSelectedOption={(val: string) => console.log(val)}
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

                <S.SubmitButton type="button" onClick={() => setShowOrderErrorModal(true)}>
                    <Button primary>
                        Опубликовать ордер Error
                    </Button> 
                </S.SubmitButton>
            </Space>
           
          </S.Form>
      </RightSide>

        <OrderBuyModal
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
