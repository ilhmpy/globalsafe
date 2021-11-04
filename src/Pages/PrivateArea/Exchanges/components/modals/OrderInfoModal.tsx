import React, { FC, Fragment } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { Button as BaseButton } from '../../../../../components/Button/V2/Button';
import { Modal } from '../../../../../components/ModalAnimated';
import { FiatKind } from '../../../../../types/fiat';
import { OrderType, ViewBuyOrderModel, ViewSellOrderModel } from '../../../../../types/orders';
import { CollectionPayMethod, PaymentMethodKind } from '../../../../../types/paymentMethodKind';
import { Space, Text } from '../../../components/ui';
import * as S from './S.el';

interface OrderInfoModalProps {
  type: OrderType;
  currencyToBuy: string;
  currencyToChange: string;
  orderSumm: string;
  rate: string;
  orderMinSumm: string;
  orderMaxSumm: string;
  timePeriod: string;
  onPublish: () => void;
  loading: boolean;
  paymentMethods: CollectionPayMethod[];
  newCreatedOrder: ViewBuyOrderModel | ViewSellOrderModel | undefined;
  onClose: () => void;
  open: boolean;
}

export const OrderInfoModal: FC<OrderInfoModalProps> = ({
  type,
  currencyToBuy,
  currencyToChange,
  orderSumm,
  rate,
  orderMinSumm,
  orderMaxSumm,
  timePeriod,
  onPublish,
  loading,
  paymentMethods,
  newCreatedOrder,
  onClose,
  open,
}: OrderInfoModalProps) => {
  const history = useHistory();

  const handleNavigateToOrder = () => {
    if(newCreatedOrder) {
      history.replace(`/info/p2p-changes/orders/my/${newCreatedOrder.safeId}`)
    }
  };

  return (
    <>
      {open && (
        <Modal onClose={onClose} open={open}>
          <S.SmallContainer mobileWFull>
            <S.Title>
              {newCreatedOrder ? 'Ордер успешно опубликован' : 'Публикация ордера'}
            </S.Title>

            <S.MobileContent>
              <S.DataList>
                <S.DataListItem>
                  <Text size={14} lH={20} weightMobile={400}>
                    Направление:
                  </Text>
                  <S.ListItemDivider />
                  <Text size={14} lH={20} weight={700} weightMobile={700}>
                    {type === OrderType.Buy ? 'Покупка' : 'Продажа'}
                  </Text>
                </S.DataListItem>

                <S.DataListItem>
                  <Text size={14} lH={20} weightMobile={400}>
                    Валюта покупки:
                  </Text>
                  <S.ListItemDivider />
                  <Text size={14} lH={20} weight={700} weightMobile={700}>
                    {currencyToBuy}
                  </Text>
                </S.DataListItem>

                <S.DataListItem>
                  <Text size={14} lH={20} weightMobile={400}>
                    Кол-во покупки:
                  </Text>
                  <S.ListItemDivider />
                  <Text size={14} lH={20} weight={700} weightMobile={700}>
                    {orderSumm}
                  </Text>
                </S.DataListItem>

                <S.DataListItem>
                  <Text size={14} lH={20} weightMobile={400}>
                    Валюта обмена:
                  </Text>
                  <S.ListItemDivider />
                  <Text size={14} lH={20} weight={700} weightMobile={700}>
                    {currencyToChange}
                  </Text>
                </S.DataListItem>

                <S.DataListItem>
                  <Text size={14} lH={20} weightMobile={400}>
                    Курс:
                  </Text>
                  <S.ListItemDivider />
                  <Text size={14} lH={20} weight={700} weightMobile={700}>
                    {rate}
                  </Text>
                </S.DataListItem>

                {type === OrderType.Buy ? (
                  <DrawBuyOrderPaymentsBlock
                    paymentMethods={paymentMethods}
                    currencyToChange={currencyToChange}
                  />
                ) : (
                  <DrawSellOrderPaymentsBlock
                    paymentMethods={paymentMethods}
                    currencyToChange={currencyToChange}
                  />
                )}

                <S.DataListItem>
                  <Text size={14} lH={20} weightMobile={400}>
                    Лимиты:
                  </Text>
                  <S.ListItemDivider />
                  <Text size={14} lH={20} weight={700} weightMobile={700}>
                    {`${orderMinSumm} - ${orderMaxSumm}`}
                  </Text>
                </S.DataListItem>

                <S.DataListItem>
                  <Text size={14} lH={20} weightMobile={400}>
                    Время на обмен:
                  </Text>
                  <S.ListItemDivider />
                  <Text size={14} lH={20} weight={700} weightMobile={700}>
                    {timePeriod}
                  </Text>
                </S.DataListItem>
              </S.DataList>

              {newCreatedOrder ? (
                <Button
                  primary
                  fullWidth
                  onClick={handleNavigateToOrder}
                >
                  Перейти к ордеру
                </Button>
              ) : (
                <Space mobileColumn>
                  <Button primary fullWidth onClick={() => onPublish()}>
                    Опубликовать
                  </Button>
                  <Button outlinePrimary fullWidth onClick={onClose}>
                    Отмена
                  </Button>
                </Space>
              )}
            </S.MobileContent>
          </S.SmallContainer>
        </Modal>
      )}
    </>
  );
};

const Button = styled(BaseButton)`
  text-transform: none;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
`;

interface PMProps {
  paymentMethods: CollectionPayMethod[];
  currencyToChange: string;
}

const DrawBuyOrderPaymentsBlock = ({ paymentMethods, currencyToChange }: PMProps) => {
  if (FiatKind[currencyToChange as keyof typeof FiatKind] !== 7) {
    return (
      <>
        <S.DataListItem mobileColumn mobileAlign="start">
          <Text size={14} lH={20} weightMobile={400}>
            Платежные методы:
          </Text>
          <S.ListItemDivider />
          <Text size={14} lH={20} weight={700} weightMobile={700}>
            {JSON.parse(paymentMethods[0].data).bankName}
          </Text>
        </S.DataListItem>
        {paymentMethods.length > 1 &&
          [...paymentMethods].splice(1).map((method) => (
            <S.DataListItem justifyEnd key={method.safeId} mobileAlign="start" mobileJustify="start">
              <Text size={14} lH={20} weight={700} weightMobile={700}>
                {JSON.parse(method.data).bankName}
              </Text>
            </S.DataListItem>
          ))}
      </>
    );
  }

  return (
    <>
      <S.DataListItem mobileColumn mobileAlign="start">
        <Text size={14} lH={20} weightMobile={400}>
          Платежные методы:
        </Text>
        <S.ListItemDivider />
        <Text size={14} lH={20} weight={700} weightMobile={700}>
          {PaymentMethodKind[paymentMethods[0].kind]}
        </Text>
      </S.DataListItem>
      {paymentMethods.length > 1 &&
        [...paymentMethods].splice(1).map((method) => (
          <S.DataListItem justifyEnd key={method.safeId} mobileJustify="start">
            <Text size={14} lH={20} weight={700} weightMobile={700}>
              {PaymentMethodKind[method.kind]}
            </Text>
          </S.DataListItem>
        ))}
    </>
  );
};

const DrawSellOrderPaymentsBlock = ({ paymentMethods, currencyToChange }: PMProps) => {
  if (FiatKind[currencyToChange as keyof typeof FiatKind] !== 7) {
    return (
      <>
        {paymentMethods.map((method, i) => {
          return i === 0 ? (
            <Fragment key={`payment-method-${method.safeId}-${i}`}>
              <S.DataListItem mobileColumn mobileAlign="start" mbMobile={0}>
                <Text size={14} lH={20} weightMobile={400} mBMobile={10}>
                  Платежные методы:
                </Text>
                <S.ListItemDivider />
                <Text size={14} lH={20} weight={700} weightMobile={700}>
                  {JSON.parse(method.data).bankName}
                </Text>
              </S.DataListItem>

              <S.DataListItem spaceBetween mobileAlign="start" mobileJustify="start" mbMobile={0}>
                <Text size={14} lH={20} weight={300} smHidden>
                  Номер карты:
                </Text>
                <Text size={14} lH={20} weight={700} weightMobile={700}>
                  {JSON.parse(method.data).bankNumber}
                </Text>
              </S.DataListItem>
              <S.DataListItem spaceBetween mb={20} mobileAlign="start" mobileJustify="start" >
                <Text size={14} lH={20} weight={300} smHidden>
                  Держатель карты:
                </Text>
                <Text size={14} lH={20} weight={700} weightMobile={700}>
                  {JSON.parse(method.data).name}
                </Text>
              </S.DataListItem>
            </Fragment>
          ) : (
            <Fragment key={`payment-method-${method.safeId}-${i}`}>
              <S.DataListItem justifyEnd mobileColumn mobileAlign="start" mbMobile={0}>
                <Text size={14} lH={20} weight={700} weightMobile={700}>
                  {JSON.parse(method.data).bankName}
                </Text>
              </S.DataListItem>

              <S.DataListItem spaceBetween mobileAlign="start" mobileJustify="start" mbMobile={0}>
                <Text size={14} lH={20} weight={300} smHidden>
                  Номер карты:
                </Text>
                <Text size={14} lH={20} weight={700} weightMobile={700}>
                  {JSON.parse(method.data).bankNumber}
                </Text>
              </S.DataListItem>
              <S.DataListItem spaceBetween mobileAlign="start" mobileJustify="start">
                <Text size={14} lH={20} weight={300} smHidden>
                  Держатель карты:
                </Text>
                <Text size={14} lH={20} weight={700} weightMobile={700}>
                  {JSON.parse(method.data).name}
                </Text>
              </S.DataListItem>
            </Fragment>
          );
        })}
      </>
    );
  }

  return (
    <>
      {paymentMethods.map((method, i) => {
        return i === 0 ? (
          <Fragment key={`payment-method-${method.safeId}-${i}`}>
            <S.DataListItem mobileColumn mobileAlign="start" mbMobile={0} mobileJustify="start">
              <Text size={14} lH={20} weightMobile={400} mBMobile={10}>
                Платежные методы:
              </Text>
              <S.ListItemDivider />
              <Text size={14} lH={20} weight={700} weightMobile={700}>
                {PaymentMethodKind[method.kind]}
              </Text>
            </S.DataListItem>

            <S.DataListItem spaceBetween mb={20} mobileAlign="start" mobileJustify="start">
              <Text size={14} lH={20} weight={300} smHidden>
                Адрес кошелька:
              </Text>
              <Text size={14} lH={20} weight={700} weightMobile={700}>
                {JSON.parse(method.data).paymentAddress}
              </Text>
            </S.DataListItem>
          </Fragment>
        ) : (
          <Fragment key={`payment-method-${method.safeId}-${i}`}>
            <S.DataListItem justifyEnd mobileColumn mobileAlign="start" mbMobile={0} mobileJustify="start">
              <Text size={14} lH={20} weight={700} weightMobile={700}>
                {PaymentMethodKind[method.kind]}
              </Text>
            </S.DataListItem>

            <S.DataListItem spaceBetween mb={20} mobileAlign="start" mobileJustify="start">
              <Text size={14} lH={20} weight={300} smHidden>
                Адрес кошелька:
              </Text>
              <Text size={14} lH={20} weight={700} weightMobile={700}>
                {JSON.parse(method.data).paymentAddress}
              </Text>
            </S.DataListItem>
          </Fragment>
        );
      })}
    </>
  );
};
