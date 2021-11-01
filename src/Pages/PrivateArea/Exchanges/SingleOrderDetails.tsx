import React, { FC, useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Container } from '../../../components/UI/Container';
import { Back } from '../components/Back';
import { Title } from '../components/ui/Title';
import { Text } from '../components/ui/Text';
import * as S from './S.el';
import { routers } from '../../../constantes/routers';
import { Balance } from '../../../types/balance';
import { FiatKind } from '../../../types/fiatKind';
import { OrderType, ViewBuyOrderModel, ViewSellOrderModel } from '../../../types/orders';
import { OrderDetailsCard } from './components/OrderDetailsCard';
import { AppContext } from '../../../context/HubContext';
import { OrderNotActualModal } from './components/modals/OrderNotActualModal';

export const SingleOrderDetails: FC = () => {
  const history = useHistory();
  const {hubConnection} = useContext(AppContext);
  const [currentOrder, setCurrentOrder] = useState<ViewBuyOrderModel | ViewSellOrderModel | null>(null);
  const [currentOrderType, setCurrentOrderType] = useState<OrderType | undefined>(undefined);
  const [showOrderNotActualModal, setShowOrderNotActualModal] = useState(false);

  const { orderSafeId } = useParams<{orderSafeId: string}>();

  useEffect(() => {
    if (hubConnection && orderSafeId) {
      getOrder();
    }
  }, [hubConnection, orderSafeId]);


  const getOrder = async () => {
    try {
      const res = await hubConnection!.invoke<ViewBuyOrderModel>('GetBuyOrder', orderSafeId);
      setCurrentOrder(res);
      setCurrentOrderType(OrderType.Buy);
    } catch (err) {
      try {
        const res = await hubConnection!.invoke<ViewSellOrderModel>('GetSellOrder', orderSafeId);
        setCurrentOrder(res);
        setCurrentOrderType(OrderType.Sell);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleGoBack = () => {
    history.replace(routers.p2pchanges);
  };

  const handleCloseOrderNotActualModal = () => {
    setShowOrderNotActualModal(false);
    history.replace(routers.p2pchanges);
  };

  // Listening to changes
  useEffect(() => {
    const cbOrderVolumeChanged = (orderSafeId: string, summ: number) => {
      console.log('__SOCKET__cbOrderVolumeChanged::', orderSafeId, summ);
      if(currentOrder && orderSafeId) {
        setCurrentOrder({
          ...currentOrder,
          volume: summ
        })
      }
    };

    const cbOrderCompleted = (orderSafeId: string) => {
      console.log('__SOCKET__cbOrderCompleted::', orderSafeId);
      setShowOrderNotActualModal(true);
    };

    const cbOrderCanceled = (order: ViewBuyOrderModel | ViewSellOrderModel) => {
      console.log('__SOCKET__cbOrderCanceled::', order);
      setShowOrderNotActualModal(true);
    };

    if (hubConnection) {
        hubConnection.on("BuyOrderVolumeChanged", cbOrderVolumeChanged);
        hubConnection.on("SellOrderVolumeChanged", cbOrderVolumeChanged);

        hubConnection.on("BuyOrderCompleted", cbOrderCompleted);
        hubConnection.on("SellOrderCompleted", cbOrderCompleted);
        
        hubConnection.on("BuyOrderCanceled", cbOrderCanceled);
        hubConnection.on("SellOrderCanceled", cbOrderCanceled);
    };

    return () => {
      hubConnection?.off("BuyOrderVolumeChanged", cbOrderVolumeChanged);
      hubConnection?.off("SellOrderVolumeChanged", cbOrderVolumeChanged);
      hubConnection?.off("SellOrderCompleted", cbOrderCompleted);
      hubConnection?.off("BuyOrderCompleted", cbOrderCompleted);
      hubConnection?.off("BuyOrderCanceled", cbOrderCanceled);
      hubConnection?.off("SellOrderCanceled", cbOrderCanceled);
    };
  }, [hubConnection]);

  if(!currentOrder || !currentOrderType) {
    return null;
  };

  return (
    <S.Container>
      <Container>
        <Back text="К списку ордеров" onGoBackClick={handleGoBack} />
        <S.TitleContainer>
            <Title mB={0}> 
              {
                `Ордер на ${currentOrderType === OrderType.Buy ? 
                'покупку' : 'продажу'} ${Balance[currentOrder.assetKind]}-${FiatKind[currentOrder.operationAssetKind]}`
              }
            </Title>
            <Text size={14} lH={20} black>
              {`№ ${currentOrder.safeId}`}
            </Text>
        </S.TitleContainer>
      </Container>

      <Container pTabletNone pNone>
        <OrderDetailsCard order={currentOrder} orderType={currentOrderType} />
        <OrderNotActualModal 
          open={showOrderNotActualModal} 
          onClose={handleCloseOrderNotActualModal} 
        />
      </Container>
    </S.Container>
  );
};