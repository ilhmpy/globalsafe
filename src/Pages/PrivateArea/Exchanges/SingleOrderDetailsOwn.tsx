import React, { FC, useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Container } from '../../../components/UI/Container';
import { Back } from '../components/Back';
import { Title } from '../components/ui/Title';
import { Text } from '../components/ui/Text';
import * as S from './S.el';
import { OrderDetailCardOwn } from './components/OrderDetailCardOwn';
import { ExchangesInOrderTable } from './components/ExchangesInOrderTable';
import { routers } from '../../../constantes/routers';
import { PrivateAreaContext } from '../../../context/PrivateAreaContext';
import { Balance } from '../../../types/balance';
import { FiatKind } from '../../../types/fiatKind';
import { OrderType, ViewBuyOrderModel, ViewSellOrderModel } from '../../../types/orders';
import { AppContext } from '../../../context/HubContext';
import { GetExchangesCollectionResult, ViewExchangeModel } from '../../../types/exchange';

export const SingleOrderDetailsOwn: FC = () => {
  const history = useHistory();
  const {hubConnection} = useContext(AppContext);
  const [currentOrder, setCurrentOrder] = useState<ViewBuyOrderModel | ViewSellOrderModel | null>(null);
  const [currentOrderType, setCurrentOrderType] = useState<OrderType | undefined>(undefined);
  const [activeFilter, setActiveFilter] = useState<'active' | 'archived' | 'all'>('active');
  const [orderExchanges, setOrderExchanges] = useState<ViewExchangeModel[]>([]);

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

  useEffect(() => {
    if(hubConnection && currentOrder) {
      handleGetExchangesByOrder();
    }
  }, [hubConnection, currentOrder, activeFilter]);

  const handleGetExchangesByOrder = async () => {
    try {
      const res = await hubConnection!.invoke<GetExchangesCollectionResult>(
        'GetExchangesByOrder',  
        currentOrder?.safeId, // order safeId
        activeFilter === 'all' ? [0, 1, 2, 3, 4] : activeFilter === 'active' ? [0, 1, 3] : [2, 4], // Array of ExchangeStates
        0, // skip
        20 // take
      );
      console.log('GetExchangesByOrder', res);
      setOrderExchanges(res.collection);
    } catch (err) { 
      console.log(err);
    }
  }

  const handleGoBack = () => {
    history.replace(routers.p2pchanges);
  };

   // Listening to changes
   const cb = (res: any) => {
    console.log("socket works::", res);
    getOrder();
    handleGetExchangesByOrder();
  };

  useEffect(() => {
    if (hubConnection) {
      hubConnection.on("BuyOrderVolumeChanged", cb);
      hubConnection.on("ExchangeCreated", cb);
      hubConnection.on("SellOrderVolumeChanged", cb);
      hubConnection.on("SellOrderCompleted", cb);
      hubConnection.on("ExchangeCompleted", cb);
      hubConnection.on("BuyOrderCompleted", cb);
      hubConnection.on("ExchangeCancelled", cb);
      hubConnection.on("ExchangeConfirmationRequired", cb);
      hubConnection.on("ExchangeAbused", cb);
      hubConnection.on("SetPaymentMethod", cb);
    };
    return () => {
      hubConnection?.off("BuyOrderVolumeChanged", cb);
      hubConnection?.off("ExchangeCreated", cb);
      hubConnection?.off("SellOrderVolumeChanged", cb);
      hubConnection?.off("SellOrderCompleted", cb);
      hubConnection?.off("ExchangeCompleted", cb);
      hubConnection?.off("BuyOrderCompleted", cb);
      hubConnection?.off("ExchangeCancelled", cb);
      hubConnection?.off("ExchangeConfirmationRequired", cb);
      hubConnection?.off("ExchangeAbused", cb);
      hubConnection?.off("SetPaymentMethod", cb);
    };
  }, [hubConnection]);

  if(!currentOrder || !currentOrderType) {
    return null;
  };

  return (
    <S.Container>
      <Container>
        <Back text="Назад" onGoBackClick={handleGoBack} />
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

        <S.Container>
          <OrderDetailCardOwn order={currentOrder} orderType={currentOrderType} />
        </S.Container> 

        <S.Container>
            <Title mB={20}>Обмены в рамках ордера</Title>
            <S.Filters>
                <S.FilterButton 
                  active={activeFilter === 'all'}
                  onClick={() => setActiveFilter('all')}
                >
                  Все
                </S.FilterButton>
                <S.FilterButton 
                  active={activeFilter === 'active'}
                  onClick={() => setActiveFilter('active')}
                >
                  Активные
                </S.FilterButton>
                <S.FilterButton 
                  active={activeFilter === 'archived'}
                  onClick={() => setActiveFilter('archived')}
                >
                  Архив
                </S.FilterButton>
            </S.Filters>

            <ExchangesInOrderTable exchangesList={orderExchanges} />
        </S.Container>
        
      </Container>
    </S.Container>
  );
};