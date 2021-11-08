import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

import { Button } from '../../../../../components/Button/V2/Button';
import { Modal } from '../../../../../components/ModalAnimated';
import { routers } from '../../../../../constantes/routers';
import { Balance } from '../../../../../types/balance';
import { FiatKind } from '../../../../../types/fiat';
import { OrderType, ViewBuyOrderModel, ViewSellOrderModel } from '../../../../../types/orders';
import { Space, Text } from '../../../components/ui';
import { countVolumeToShow } from '../../../utils';
import * as S from './S.el';

type Props = {
  order: ViewBuyOrderModel | ViewSellOrderModel;
  orderType: OrderType;
  deleteSuccessed: boolean;
  onDelete: () => void;
  onClose: () => void;
  open: boolean;
};

export const DeleteOrderModal: FC<Props> = ({
  order,
  orderType,
  deleteSuccessed,
  onDelete,
  onClose,
  open,
}: Props) => {
  const history = useHistory();

  return (
    <>
      {open && (
        <Modal onClose={onClose} open={open}>
          <S.SmallContainer mobileWFull>
            <S.Title>{deleteSuccessed ? 'Ордер успешно удален' : 'Удаление ордера'}</S.Title>
            <S.MobileContent>
              {!deleteSuccessed && (
                <Text size={14} lH={20} mB={20}>
                  Вы действительно хотите удалить ордер ?
                </Text>
              )}

              <S.DataList>
                <S.DataListItem>
                  <Text size={14} lH={20}>
                    Номер ордера:
                  </Text>
                  <S.ListItemDivider />
                  <Text size={14} lH={20} weight={700}>
                    {order.safeId}
                  </Text>
                </S.DataListItem>

                <S.DataListItem>
                  <Text size={14} lH={20}>
                    Направление:
                  </Text>
                  <S.ListItemDivider />
                  <Text size={14} lH={20} weight={700}>
                    {orderType === OrderType.Buy ? 'Покупка' : 'Продажа'}
                  </Text>
                </S.DataListItem>

                <S.DataListItem>
                  <Text size={14} lH={20}>
                    Валюта:
                  </Text>
                  <S.ListItemDivider />
                  <Text size={14} lH={20} weight={700}>
                    {Balance[order.assetKind]}
                  </Text>
                </S.DataListItem>

                <S.DataListItem>
                  <Text size={14} lH={20}>{`Кол-во (${Balance[order.assetKind]}):`}</Text>
                  <S.ListItemDivider />
                  <Text size={14} lH={20} weight={700}>
                    {countVolumeToShow(order.volume, order.assetKind)}
                  </Text>
                </S.DataListItem>

                <S.DataListItem>
                  <Text size={14} lH={20}>
                    {`Курс (${Balance[order.assetKind]}-${FiatKind[order.operationAssetKind]}):`}
                  </Text>
                  <S.ListItemDivider />
                  <Text size={14} lH={20} weight={700}>
                    {order.rate.toLocaleString('ru-RU', {
                      maximumFractionDigits: 5,
                    })}
                  </Text>
                </S.DataListItem>

                <S.DataListItem>
                  <Text size={14} lH={20}>
                    {`На сумму (${FiatKind[order.operationAssetKind]}):`}
                  </Text>
                  <S.ListItemDivider />
                  <Text size={14} lH={20} weight={700}>
                    {(countVolumeToShow(order.volume, order.assetKind) * order.rate).toLocaleString(
                      'ru-RU',
                      {
                        maximumFractionDigits: 4,
                      }
                    )}
                  </Text>
                </S.DataListItem>

                <S.DataListItem>
                  <Text size={14} lH={20}>
                    Кол-во успешных обменов:
                  </Text>
                  <S.ListItemDivider />
                  <Text size={14} lH={20} weight={700}>
                    {order.totalExecuted}
                  </Text>
                </S.DataListItem>
              </S.DataList>

              {!deleteSuccessed ? (
                <Space mobileColumn mobileGap={20}>
                  <Button primary fullWidth onClick={onDelete}>
                    Удалить ордер
                  </Button>
                  <Button outlinePrimary fullWidth onClick={onClose}>
                    Отмена
                  </Button>
                </Space>
              ) : (
                <Button primary fullWidth onClick={() => history.replace(routers.p2pchanges)}>
                  К списку ордеров
                </Button>
              )}
            </S.MobileContent>
          </S.SmallContainer>
        </Modal>
      )}
    </>
  );
};
