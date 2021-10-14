import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';

import { AppContext } from '../../../../../context/HubContext';
import { Balance } from '../../../../../types/balance';
import { FiatKind } from '../../../../../types/fiat';
import { ViewBuyOrderModel, ViewSellOrderModel } from '../../../../../types/orders';
import { paymentMethodIconSrc } from '../../../utils';
import { PaymentMethods } from '../modals/PaymentMethods';
import { Rating } from '../modals/Rating';

import * as S from './S.el';

interface AdvertTableProps {
  list: Array<ViewBuyOrderModel | ViewSellOrderModel>;
}

export const AdvertTable = ({list}: AdvertTableProps) => {
  const history = useHistory();
  const { userSafeId } = useContext(AppContext);
  const [selectedOption, setSelectedOption] = useState<string | null>('Все валюты предложения');

  const handleNavigateTo = (orderId: number) => {
    history.replace(`/info/p2p-changes/orders/${orderId}`)
  }

  const [ratingOption, setRatingOption] = useState<string | null>('Рейтинг участников 5.0');
  return (
    <>
      {/* <Rating
        open={true}
        onClose={() => undefined}
        options={['Рейтинг участников 5.0', 'Рейтинг участников 4.0', 'Рейтинг участников 3.0']}
        selectedOption={ratingOption}
        setSelectedOption={setRatingOption}
      /> */}
      {/* <PaymentMethods open={true} onClose={() => undefined} /> */}
      <S.Table>
        <S.Header>
          <S.Cell>
            <span>Кол-во</span>
          </S.Cell>
          <S.Cell>
            <span>Курс</span>
          </S.Cell>
          <S.Cell>
            <span>На сумму</span>
          </S.Cell>
          <S.Cell>
            <span>Лимиты</span>
          </S.Cell>
          <S.Cell>
            <span>Метод оплаты</span>
          </S.Cell>
          <S.Cell>
            <span>Время на обмен</span>
          </S.Cell>
          <S.Cell>
            <span>Рейтинг</span>
          </S.Cell>
        </S.Header>


        {
          list.length > 0 &&
          list.map((order) => (
            <S.BodyItem 
              key={`order-list-item-${order.safeId}`}
              active={order.userSafeId === userSafeId}
              onClick={() => handleNavigateTo(order.id)} 
            >
              <S.Cell data-label="Кол-во">
                {`${order.volume} ${Balance[order.assetKind]}`}
              </S.Cell>
              <S.Cell data-label="Курс">{order.rate}</S.Cell>
              <S.Cell data-label="На сумму">
                {`${(order.volume * order.rate)} ${FiatKind[order.operationAssetKind]}`}
              </S.Cell>
              <S.Cell data-label="Лимиты">
                {`${order.limitFrom} - ${order.limitTo} ${FiatKind[order.operationAssetKind]}`}
              </S.Cell>
              <S.Cell data-label="Метод оплаты">
                <S.BankList>
                  {
                    order.methodsKinds.length > 0 &&
                    order.methodsKinds.map((method, i) => (
                      method < 3 
                      ?
                        <S.BankItemText key={`method-item-${i}`}>
                          <img src={paymentMethodIconSrc(method)} alt="" />
                        </S.BankItemText>
                      :
                        <S.BankItem key={`method-item-${i}`}>
                          <img src={paymentMethodIconSrc(method)} alt="" />
                        </S.BankItem>
                    ))
                  }
                </S.BankList>
              </S.Cell>
              <S.Cell data-label="Время на обмен">{`${order.operationWindow.totalMinutes} м`}</S.Cell>
              <S.Cell data-label="Рейтинг">{`${order.userRating} (${order.totalExecuted})`}</S.Cell>
            </S.BodyItem>
          ))
        }
      </S.Table>
    </>
  );
};
