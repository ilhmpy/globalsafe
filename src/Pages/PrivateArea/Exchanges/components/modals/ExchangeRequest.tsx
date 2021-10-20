import React, { FC } from 'react';
import { Button } from '../../../../../components/Button/V2/Button';
import { Modal } from '../../../../../components/ModalAnimated';
import { Balance } from '../../../../../types/balance';
import { FiatKind } from '../../../../../types/fiatKind';
import { OrderType, ViewBuyOrderModel, ViewSellOrderModel } from '../../../../../types/orders';
import * as S from './S.el';

type Props = {
  exchangeSumm: string;
  order: ViewBuyOrderModel | ViewSellOrderModel;
  orderType: OrderType;
  onAccept: () => void;
  onClose: () => void;
  open: boolean;
};

export const ExchangeRequestModal: FC<Props> = ({ 
  exchangeSumm,
  order,
  orderType,
  onAccept,
  onClose, 
  open 
}: Props) => {
  return (
    <>
      {open && (
        <Modal onClose={onClose} open={open}>
          <S.Container>
            <S.Title>Заявка на обмен</S.Title>
            <S.List>
              <S.Listitem>
                <S.ListitemName>
                  {`${orderType === OrderType.Buy ? 'Продажа' : 'Покупка'} ${Balance[order.assetKind]}:`}
                </S.ListitemName>
                <S.Line />
                <S.ListitemValue>{exchangeSumm}</S.ListitemValue>
              </S.Listitem>
              <S.Listitem>
                <S.ListitemName>
                  {`Курс (${Balance[order.assetKind]}-${FiatKind[order.operationAssetKind]}):`}
                </S.ListitemName>
                <S.Line />
                <S.ListitemValue>
                  {order.rate}
                </S.ListitemValue>
              </S.Listitem>
              <S.Listitem>
                <S.ListitemName>
                  {`Стоимость ${FiatKind[order.operationAssetKind]}:`}
                </S.ListitemName>
                <S.Line />
                <S.ListitemValue>
                  {`${Number(exchangeSumm) * order.rate}`}
                </S.ListitemValue>
              </S.Listitem>
              <S.Listitem>
                <S.ListitemName>
                   
                  {`Рейтинг ${orderType === OrderType.Buy ? 'продавца' : 'покупателя'}:`}
                </S.ListitemName>
                <S.Line />
                <S.ListitemValue>{order.userRating ? order.userRating : '-'}</S.ListitemValue>
              </S.Listitem>
            </S.List>
            <S.Buttons>
              <Button bigSize primary onClick={onAccept}>
                Подтвердить
              </Button>
              <Button bigSize outlinePrimary onClick={onClose}>
                Отмена
              </Button>
            </S.Buttons>
          </S.Container>
        </Modal>
      )}
    </>
  );
};
