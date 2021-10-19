import React, { useContext } from 'react';
import { useHistory } from 'react-router';

import { AppContext } from '../../../../../context/HubContext';
import { PrivateAreaContext } from '../../../../../context/PrivateAreaContext';
import { Balance } from '../../../../../types/balance';
import { FiatKind } from '../../../../../types/fiat';
import { OrderType, ViewBuyOrderModel, ViewSellOrderModel } from '../../../../../types/orders';
import { countVolumeToShow, paymentMethodIconSrc } from '../../../utils';

import * as S from './S.el';

interface AdvertTableProps {
  list: Array<ViewBuyOrderModel | ViewSellOrderModel>;
  ordersType: OrderType;
}

export const AdvertTable = ({ list, ordersType }: AdvertTableProps) => {
  const history = useHistory();
  const { account } = useContext(AppContext);
  const { setCurrentOrder, setCurrentOrderType } = useContext(PrivateAreaContext);

  const handleNavigateTo = (order: ViewBuyOrderModel | ViewSellOrderModel) => {
    setCurrentOrder(order);
    setCurrentOrderType(ordersType);

    if(order.userSafeId === account.safeId) {
      history.replace(`/info/p2p-changes/orders/my/${order.id}`);
    }
  };

  return (
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
              active={order.userSafeId === account.safeId}
              onClick={() => handleNavigateTo(order)} 
            > 
              <S.Cell data-label="Кол-во">
                {`${countVolumeToShow(order.volume, order.assetKind).toLocaleString('ru-RU', {
                    maximumFractionDigits: 4,
                  })} ${Balance[order.assetKind]}`}
              </S.Cell>
              <S.Cell data-label="Курс">{order.rate}</S.Cell>
              <S.Cell data-label="На сумму">
                {`${(countVolumeToShow(order.volume, order.assetKind) * order.rate).toLocaleString('ru-RU', {
                    maximumFractionDigits: 4,
                  })} ${FiatKind[order.operationAssetKind]}`}
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
              <S.Cell data-label="Рейтинг">{`${order.userRating ? order.userRating : '-'} (${order.totalExecuted})`}</S.Cell>
            </S.BodyItem>
          ))
        }
      </S.Table>
  );
};
