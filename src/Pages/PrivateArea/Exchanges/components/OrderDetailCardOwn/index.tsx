import React, { FC, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as S from './S.el';
import {
  CopyIconButton,
  LeftSide,
  RightSide,
  Space,
  Text,
  Title,
} from '../../../components/ui';
import { Button } from '../../../../../components/Button/V2/Button';
import { DeleteOrderModal } from '../modals/DeleteOrderModal';
import { DeleteOrderErrorModal } from '../modals/DeleteOrderErrorModal';
import { OrderType, ViewBuyOrderModel, ViewSellOrderModel } from '../../../../../types/orders';
import { AppContext } from '../../../../../context/HubContext';
import { Balance } from '../../../../../types/balance';
import { FiatKind } from '../../../../../types/fiat';
import { CollectionPayMethod, PaymentMethodKind } from '../../../../../types/paymentMethodKind';
import { routers } from '../../../../../constantes/routers';
import { countVolumeToShow } from '../../../utils';
 
interface OrderDetailsCardOwnProps {
  order: ViewBuyOrderModel | ViewSellOrderModel;
  orderType: OrderType;
}

export const OrderDetailCardOwn: FC<OrderDetailsCardOwnProps> = ({ order, orderType }: OrderDetailsCardOwnProps) => {
  const history = useHistory();
  const { user, hubConnection } = useContext(AppContext);
  const [sellOrderPaymentMethods, setSellOrderPaymentMethods] = useState<CollectionPayMethod[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteErrorModal, setShowDeleteErrorModal] = useState(false);
  const [deleteSuccessed, setDeleteSuccessed] = useState(false);


  useEffect(() => {
    if(hubConnection) {
      if(order && orderType === OrderType.Sell) {
        getSellOrderPaymentMethods();
      }
    }
  }, [hubConnection, orderType, order]);

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



  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);

    if(deleteSuccessed) {
      history.replace(routers.p2pchanges)
    }
  };

  const handleCancelOrder = async () => {
    if(orderType === OrderType.Buy) {
      try {
        await hubConnection!.invoke<null>(
          'CancelBuyOrder',  
          order.safeId
        );
        setDeleteSuccessed(true);
      } catch (err) { 
        handleCloseDeleteModal();
        setShowDeleteErrorModal(true);
      }
    } else {
      try {
        await hubConnection!.invoke<null>(
          'CancelSellOrder',  
          order.safeId
        );
        setDeleteSuccessed(true);
      } catch (err) { 
        handleCloseDeleteModal();
        setShowDeleteErrorModal(true);
      }
    }
  }

  return (
    <S.Container>
      <LeftSide bg={'#EAEFF4'}>
        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10} black>Аккаунт:</Text>
          <Title lH={28}>{user}</Title>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10} black>Рейтинг аккаунта:</Text>
          <Title lH={28}>{order.userRating}</Title>
        </S.BlockWrapper>

      </LeftSide>

      <RightSide>
          <S.BlockWrapper>
            <Text size={14} lH={20} mB={4} black>Количество:</Text>
            <Text size={14} lH={20} weight={500} black>
              {`${countVolumeToShow(order.volume, order.assetKind).toLocaleString('ru-RU', {
                    maximumFractionDigits: 4,
                })} ${Balance[order.assetKind]}`}
            </Text>
          </S.BlockWrapper>

          <S.BlockWrapper>
            <Text size={14} lH={20} mB={4} black>Курс:</Text>
            <Text size={14} lH={20} weight={500} black>{order.rate}</Text>
          </S.BlockWrapper>

          <S.BlockWrapper>
            <Text size={14} lH={20} mB={4} black>На сумму:</Text>
            <Text size={14} lH={20} weight={500} black>
              {`${(countVolumeToShow(order.volume, order.assetKind) * order.rate).toLocaleString('ru-RU', {
                    maximumFractionDigits: 4,
                })} ${FiatKind[order.operationAssetKind]}`}
            </Text>
          </S.BlockWrapper>

          <S.BlockWrapper>
            <Text size={14} lH={20} mB={4} black>Лимиты:</Text>
            <Text size={14} lH={20} weight={500} black>
              {`${countVolumeToShow(order.limitFrom, order.assetKind)} - ${countVolumeToShow(order.limitTo, order.assetKind)} ${FiatKind[order.operationAssetKind]}`}
            </Text>
          </S.BlockWrapper>

          <S.BlockWrapper>
            <Text size={14} lH={20} mB={4} black>Время на обмен:</Text>
            <Text size={14} lH={20} weight={500} black>
              {`${order.operationWindow.minutes}м. ${order.operationWindow.seconds}с.`}
            </Text>
          </S.BlockWrapper>

          {
            orderType === OrderType.Buy
            ?
              <S.BlockWrapper largeMB>
                <Text size={14} lH={20} mB={4} black>Платежные методы:</Text>

                {
                  order.methodsKinds.map((kind, i) => (
                    <Text size={14} lH={20} weight={500} black mB={4} key={`method-item-${i}`}>
                      {PaymentMethodKind[kind]}
                    </Text>
                  ))
                }
              </S.BlockWrapper>
            :
              <S.BlockWrapper largeMB>
                <Text size={14} lH={20} mB={20} black>Платежные методы:</Text>
                {
                    sellOrderPaymentMethods?.length > 0 &&
                    sellOrderPaymentMethods.map((method, i) => (
                    method.assetKind !== 7
                      ?
                        <Space gap={10} column mb={20} key={`payment-method-${method.safeId}-${i}`}>
                          <Text size={14} lH={20} weight={500} black>
                            {JSON.parse(method.data).bankName}
                          </Text>
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
                          <Text size={14} lH={20} weight={500} black>
                            {PaymentMethodKind[method.kind]}
                          </Text>
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
                }
              </S.BlockWrapper>
          }
      
          <Button primary onClick={() => setShowDeleteModal(true)}>
            Удалить ордер
          </Button>
      </RightSide>
      <DeleteOrderModal
        order={order}
        orderType={orderType}
        deleteSuccessed={deleteSuccessed}
        onDelete={handleCancelOrder}
        open={showDeleteModal} 
        onClose={handleCloseDeleteModal}  
      />
      <DeleteOrderErrorModal
        open={showDeleteErrorModal} 
        onClose={() => setShowDeleteErrorModal(false)}  
      />
    </S.Container>
  );
};
