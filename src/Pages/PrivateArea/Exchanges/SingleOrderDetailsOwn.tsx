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
import { Balance } from '../../../types/balance';
import { FiatKind } from '../../../types/fiatKind';
import { OrderType, ViewBuyOrderModel, ViewSellOrderModel } from '../../../types/orders';
import { AppContext } from '../../../context/HubContext';
import { GetExchangesCollectionResult, ViewExchangeModel } from '../../../types/exchange';
import { FilterButton } from '../components/ui';
import { useIsMobile } from '../utils';
import { Button } from '../../../components/Button/V2/Button';

export const SingleOrderDetailsOwn: FC = () => {
  const history = useHistory();
  const {hubConnection} = useContext(AppContext);
  const isMobile = useIsMobile();
  const [currentOrder, setCurrentOrder] = useState<ViewBuyOrderModel | ViewSellOrderModel | null>(null);
  const [currentOrderType, setCurrentOrderType] = useState<OrderType | undefined>(undefined);
  const [activeFilter, setActiveFilter] = useState<'active' | 'archived' | 'all'>('active');
  const [orderExchanges, setOrderExchanges] = useState<ViewExchangeModel[]>([]);
  const [mobileActiveTab, setMobileActiveTab] = useState<'order' | 'list'>('order');

  const [totalCount, setTotalCount] = useState(0);
  const [skip, setSkip] = useState(0);

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
      setOrderExchanges([])
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
        10 // take
      );
      console.log('GetExchangesByOrder', res);
      setOrderExchanges(res.collection);
      setTotalCount(res.totalRecords);
      setSkip((s) => s + 10);
    } catch (err) { 
      console.log(err);
    }
  }

  const handleLoadMoreExchanges = async () => {
    try {
      const res = await hubConnection!.invoke<GetExchangesCollectionResult>(
        'GetExchangesByOrder',  
        currentOrder?.safeId, // order safeId
        activeFilter === 'all' ? [0, 1, 2, 3, 4] : activeFilter === 'active' ? [0, 1, 3] : [2, 4], // Array of ExchangeStates
        skip, // skip
        10 // take
      );
      console.log('GetExchangesByOrder', res);
      setOrderExchanges((s) => [...s, ...res.collection]);
      setTotalCount(res.totalRecords);
      setSkip((s) => s + 10);
    } catch (err) { 
      console.log(err);
    }
  };

  const handleGoBack = () => {
    history.replace(routers.p2pchanges);
  };
  
  // Listening to changes
  useEffect(() => {
    const cbOrderVolumeChanged = (orderSafeId: string, summ: number) => {
      console.log('__SOCKET__cbOrderVolumeChanged::', orderSafeId, summ);
      if(currentOrder && orderSafeId) {
        setCurrentOrder(() => {
          return {
            ...currentOrder,
            volume: summ
          }
        });
      }
    };

    const cbOrderCompleted = (orderSafeId: string) => {
      console.log('__SOCKET__cbOrderCompleted::', orderSafeId)
    }; 

    // Exchanges Callbacks
    const cbExchangeCreated = (exchange: ViewExchangeModel) => {
      console.log('__SOCKET__cbExchangeCreated::', exchange)
      if(exchange && activeFilter !== 'archived') {
        setOrderExchanges(state => [exchange, ...state]);
      }
    };

    const cbExchangeCompleted = (exchange: ViewExchangeModel) => {
      console.log('__SOCKET__cbExchangeCompleted::', exchange);
      if(exchange) {
        cbExchangeStatusChanged(exchange);
      }
    };

    const cbExchangeCancelled = (exchange: ViewExchangeModel) => {
      console.log('__SOCKET__ExchangeCancelled::', exchange);
      if(exchange) {
        cbExchangeStatusChanged(exchange);
      }
    }; 

    const cbExchangeConfirmationRequired = (exchange: ViewExchangeModel) => {
      console.log('__SOCKET__ExchangeConfirmationRequired::', exchange);
      if(exchange) {
        cbExchangeStatusChanged(exchange);
      }
    };

    const cbExchangeAbused = (exchange: ViewExchangeModel) => {
      console.log('__SOCKET__ExchangeAbused::', exchange);
      if(exchange) {
        cbExchangeStatusChanged(exchange);
      }
    };

    const cbExchangeStatusChanged = (exchange: ViewExchangeModel) => {
      const key = orderExchanges.findIndex((ex) => ex.safeId === exchange.safeId);
      if(key !== -1) {
        setOrderExchanges(state => [
          ...state.slice(0, key),
          {...exchange},
          ...state.slice(key + 1),
        ]);
      }
    };

    if (hubConnection) {
      hubConnection.on("BuyOrderVolumeChanged", cbOrderVolumeChanged);
      hubConnection.on("SellOrderVolumeChanged", cbOrderVolumeChanged);
      hubConnection.on("BuyOrderCompleted", cbOrderCompleted);
      hubConnection.on("SellOrderCompleted", cbOrderCompleted);

      hubConnection.on("ExchangeCreated", cbExchangeCreated);
      hubConnection.on("ExchangeCompleted", cbExchangeCompleted);
      hubConnection.on("ExchangeCancelled", cbExchangeCancelled);
      hubConnection.on("ExchangeConfirmationRequired", cbExchangeConfirmationRequired);
      hubConnection.on("ExchangeAbused", cbExchangeAbused);
    };

    return () => {
      hubConnection?.off("BuyOrderVolumeChanged", cbOrderVolumeChanged);
      hubConnection?.off("SellOrderVolumeChanged", cbOrderVolumeChanged);
      hubConnection?.off("SellOrderCompleted", cbOrderCompleted);
      hubConnection?.off("BuyOrderCompleted", cbOrderCompleted);

      hubConnection?.off("ExchangeCreated", cbExchangeCreated);
      hubConnection?.off("ExchangeCompleted", cbExchangeCompleted);
      hubConnection?.off("ExchangeCancelled", cbExchangeCancelled);
      hubConnection?.off("ExchangeConfirmationRequired", cbExchangeConfirmationRequired);
      hubConnection?.off("ExchangeAbused", cbExchangeAbused);
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
            <Title mB={0} mbMobile={10} heading2>
              {
                `Ордер на ${currentOrderType === OrderType.Buy ? 
                'покупку' : 'продажу'} ${Balance[currentOrder.assetKind]}-${FiatKind[currentOrder.operationAssetKind]}`
              }
            </Title>
            <Text 
              size={14} 
              lH={20} 
              black
              sizeMobile={12}
              lHMobile={18}
              weightMobile={300}
              mBMobile={20}
            >
              {`№ ${currentOrder.safeId}`}
            </Text>

            <S.Filters hidden smVisible mB={0}>
              <FilterButton 
                smHalfWidth
                active={mobileActiveTab === 'order'}
                onClick={() => setMobileActiveTab('order')}
                switchLeft
                noMargin
              >
                Ордер
              </FilterButton>
              <FilterButton
                smHalfWidth
                active={mobileActiveTab === 'list'}
                onClick={() => setMobileActiveTab('list')}
                switchRight
                noMargin
              >
                Обмены по ордеру
              </FilterButton>
            </S.Filters>

        </S.TitleContainer>
      </Container>

      {/* Order Details Card */}
      {
        mobileActiveTab === 'order' &&
        <Container pTabletNone pNone>
            <S.Container >
              <OrderDetailCardOwn order={currentOrder} orderType={currentOrderType} />
            </S.Container> 
        </Container>
      }
 
      {/* Show Exchanges List on Mobile if exchanges tab is active */}
      {
        isMobile && (mobileActiveTab === 'list') && (
          <>
            <ExchangesInOrderTable 
              exchangesList={orderExchanges} 
              activeFilter={activeFilter} 
            />
            {orderExchanges.length < totalCount && (
              <S.ButtonWrap>
                <Button onClick={handleLoadMoreExchanges}>Показать еще</Button>
              </S.ButtonWrap>
            )}
          </>
        )
      
      }
 
      {/* Show Table on Tablet and large Devices */}
      {
        !isMobile &&
        <Container>
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
              <ExchangesInOrderTable exchangesList={orderExchanges} activeFilter={activeFilter} />
            </S.Container>
            {orderExchanges.length < totalCount && (
              <S.ButtonWrap>
                <Button onClick={handleLoadMoreExchanges}>Показать еще</Button>
              </S.ButtonWrap>
            )}
        </Container>
      }
      
    </S.Container>
  );
};