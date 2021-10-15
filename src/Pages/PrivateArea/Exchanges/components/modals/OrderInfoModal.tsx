import React, { FC, Fragment } from 'react';
import { useHistory } from 'react-router';

import { Button } from '../../../../../components/Button/V2/Button';
import { Modal } from '../../../../../components/ModalAnimated';
import { FiatKind } from '../../../../../types/fiat';
import { ViewBuyOrderModel } from '../../../../../types/orders';
import { CollectionPayMethod } from '../../../../../types/paymentMethodKind';
import { Space, Text } from '../../../components/ui';
import * as S from './S.el';

interface OrderInfoModalProps {
    type: 'buy' | 'sell',
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
    newCreatedOrder: ViewBuyOrderModel | undefined;
    onClose: () => void;
    open: boolean;
};

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

  return (
    <>
      {open && (
        <Modal onClose={onClose} open={open}>
          <S.SmallContainer>
            <S.BlackTitle>
              {newCreatedOrder ? 'Ордер успешно опубликован' : 'Публикация ордера'}
            </S.BlackTitle>

            <S.DataList>
              <S.DataListItem>
                <Text size={14} lH={20}>
                  Направление:
                </Text>
                <S.ListItemDivider />
                <Text size={14} lH={20} weight={700}>
                  {type === 'buy' ? 'Покупка' : 'Продажа'}
                </Text>
              </S.DataListItem>

              <S.DataListItem>
                <Text size={14} lH={20}>
                  Валюта покупки:
                </Text>
                <S.ListItemDivider />
                <Text size={14} lH={20} weight={700}>
                  {currencyToBuy}
                </Text>
              </S.DataListItem>

              <S.DataListItem>
                <Text size={14} lH={20}>
                  Кол-во покупки:
                </Text>
                <S.ListItemDivider />
                <Text size={14} lH={20} weight={700}>
                  {orderSumm}
                </Text>
              </S.DataListItem>

              <S.DataListItem>
                <Text size={14} lH={20}>
                  Валюта обмена:
                </Text>
                <S.ListItemDivider />
                <Text size={14} lH={20} weight={700}>
                  {currencyToChange}
                </Text>
              </S.DataListItem>

              <S.DataListItem>
                <Text size={14} lH={20}>
                  Курс:
                </Text>
                <S.ListItemDivider />
                <Text size={14} lH={20} weight={700}>
                  {rate}
                </Text>
              </S.DataListItem>

              {
                type === 'buy'
                ?
                  <DrawBuyOrderPaymentsBlock 
                    paymentMethods={paymentMethods} 
                    currencyToChange={currencyToChange}
                  />
                :
                  <DrawSellOrderPaymentsBlock 
                    paymentMethods={paymentMethods} 
                    currencyToChange={currencyToChange}
                  />
              }

              <S.DataListItem>
                <Text size={14} lH={20}>
                  Лимиты:
                </Text>
                <S.ListItemDivider />
                <Text size={14} lH={20} weight={700}>{`${orderMinSumm} - ${orderMaxSumm}`}</Text>
              </S.DataListItem>

              <S.DataListItem>
                <Text size={14} lH={20}>
                  Время на обмен:
                </Text>
                <S.ListItemDivider />
                <Text size={14} lH={20} weight={700}>
                  {timePeriod}
                </Text>
              </S.DataListItem>
            </S.DataList>

            {
              newCreatedOrder
              ?
                <Button primary fullWidth onClick={() => history.replace(`/info/p2p-changes/orders/${newCreatedOrder.id}`)}>
                  Перейти к ордеру
                </Button>
              :
                <Space>
                  <Button primary fullWidth onClick={() => onPublish()}>
                    Опубликовать
                  </Button>
                  <Button outlinePrimary fullWidth onClick={onClose}>
                    Отмена
                  </Button>
              </Space>
            }
          </S.SmallContainer>
        </Modal>
      )}
    </>
  );
};



interface PMProps {
  paymentMethods: CollectionPayMethod[];
  currencyToChange: string;
}


const DrawBuyOrderPaymentsBlock = ({ paymentMethods, currencyToChange }: PMProps) => {
  if(FiatKind[currencyToChange as keyof typeof FiatKind] !== 7) {
    return (
      <>
        <S.DataListItem>
            <Text size={14} lH={20}>Платежные методы:</Text>
            <S.ListItemDivider />
            <Text size={14} lH={20} weight={700}>
                {JSON.parse(paymentMethods[0].data).bankName}
            </Text>
        </S.DataListItem>
        {
            paymentMethods.length > 1 &&
            [...paymentMethods].splice(1).map((method) => (
                <S.DataListItem justifyEnd key={method.safeId}>
                    <Text size={14} lH={20} weight={700}>
                        {JSON.parse(method.data).bankName}
                    </Text>
                </S.DataListItem>
            ))
        }
      </>
    )
  }
   

  return (
      <>
        <S.DataListItem>
            <Text size={14} lH={20}>Платежные методы:</Text>
            <S.ListItemDivider />
            <Text size={14} lH={20} weight={700}>
              {FiatKind[paymentMethods[0].assetKind]}
            </Text>
        </S.DataListItem>
        {
            paymentMethods.length > 1 &&
            [...paymentMethods].splice(1).map((method) => (
                <S.DataListItem justifyEnd key={method.safeId}>
                    <Text size={14} lH={20} weight={700}>
                      {FiatKind[method.assetKind]} 
                    </Text>
                </S.DataListItem>
            ))
        }
      </>
  )
};

const DrawSellOrderPaymentsBlock = ({ paymentMethods, currencyToChange }: PMProps) => {
  if(FiatKind[currencyToChange as keyof typeof FiatKind] !== 7) {
      return (
        <>
          {
            paymentMethods.map((method, i) => {
              return i === 0 ?
                (
                  <Fragment key={`payment-method-${method.safeId}-${i}`}>
                    <S.DataListItem>
                      <Text size={14} lH={20}>
                        Платежные методы:
                      </Text>
                      <S.ListItemDivider />
                      <Text size={14} lH={20} weight={700}>
                        {JSON.parse(method.data).bankName}
                      </Text>
                    </S.DataListItem>

                    <S.DataListItem spaceBetween>
                          <Text size={14} lH={20} weight={300}>
                            Номер карты:
                          </Text>
                          <Text size={14} lH={20} weight={700}>
                            {JSON.parse(method.data).bankNumber}
                          </Text>
                        </S.DataListItem>
                        <S.DataListItem spaceBetween mb={20}>
                          <Text size={14} lH={20} weight={300}>
                            Держатель карты:
                          </Text>
                          <Text size={14} lH={20} weight={700}>
                            {JSON.parse(method.data).name}
                          </Text>
                    </S.DataListItem>
                  </Fragment>
                )
              :
              (
                <Fragment key={`payment-method-${method.safeId}-${i}`}>
                  <S.DataListItem justifyEnd>
                    <Text size={14} lH={20} weight={700}>
                      {JSON.parse(method.data).bankName}
                    </Text>
                  </S.DataListItem>

                  <S.DataListItem spaceBetween>
                    <Text size={14} lH={20} weight={300}>
                      Номер карты:
                    </Text>
                    <Text size={14} lH={20} weight={700}>
                      {JSON.parse(method.data).bankNumber}
                    </Text>
                  </S.DataListItem>
                  <S.DataListItem spaceBetween>
                    <Text size={14} lH={20} weight={300}>
                      Держатель карты:
                    </Text>
                    <Text size={14} lH={20} weight={700}>
                      {JSON.parse(method.data).name}
                    </Text>
                  </S.DataListItem>
                </Fragment>
              )
            })
          }
        </>
      )
  }


  return (
    <>
      {
        paymentMethods.map((method, i) => {
          return i === 0 ?
            (
              <Fragment key={`payment-method-${method.safeId}-${i}`}>
                <S.DataListItem>
                  <Text size={14} lH={20}>
                    Платежные методы:
                  </Text>
                  <S.ListItemDivider />
                  <Text size={14} lH={20} weight={700}>
                    {FiatKind[method.assetKind]} 
                  </Text>
                </S.DataListItem>

                <S.DataListItem spaceBetween mb={20}>
                      <Text size={14} lH={20} weight={300}>
                        Адрес кошелька:
                      </Text>
                      <Text size={14} lH={20} weight={700}>
                        {JSON.parse(method.data).paymentAddress}
                      </Text>
                    </S.DataListItem>
              </Fragment>
            )
          :
          (
            <Fragment key={`payment-method-${method.safeId}-${i}`}>
              <S.DataListItem justifyEnd>
                <Text size={14} lH={20} weight={700}>
                  {FiatKind[method.assetKind]} 
                </Text>
              </S.DataListItem>

              <S.DataListItem spaceBetween mb={20}>
                <Text size={14} lH={20} weight={300}>
                  Адрес кошелька:
                </Text>
                <Text size={14} lH={20} weight={700}>
                  {JSON.parse(method.data).paymentAddress}
                </Text>
              </S.DataListItem>
            </Fragment>
          )
        })
      }
    </>
  )
};
