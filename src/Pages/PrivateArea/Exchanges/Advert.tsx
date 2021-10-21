import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Container } from '../../../components/UI/Container';
import { Heading } from '../components/Heading';
import { routers } from '../../../constantes/routers';
import { TabNavItem, TabsBlock, Text, FilterButton } from '../components/ui';
import * as S from './S.el';
import { AdvertTable } from './components/AdvertTable/AdvertTable';
import { Button } from '../../../components/Button/V2/Button';
import { AppContext } from '../../../context/HubContext';
import { GetBuyOrdersModel, GetSellOrdersModel, OrderType, ViewBuyOrderModel, ViewSellOrderModel } from '../../../types/orders';
import { CurrencyPair } from './components/modals/CurrencyPair';
import { Rating } from './components/modals/Rating';
import { PaymentMethods } from './components/modals/PaymentMethods';
import { Balance } from '../../../types/balance';
import { FiatKind } from '../../../types/fiat';
 
// TODO: Update Load more Functional.
export const Advert = () => {
  const history = useHistory();
  const { hubConnection } = useContext(AppContext);
  const [activeType, setActiveType] = useState<OrderType>(OrderType.Buy);
  const [listingMyOrders, setListingMyOrders] = useState<boolean>(false);
  const [selectedBalanceKind, setSelectedBalanceKind] = useState<string | null>(null);
  const [selectedFiatKind, setSelectedFiatKind] = useState<string | null>(null);
  const [showCurrencyPairModal, setShowCurrenctPairModal] = useState(false);
  const [selectedPair, setSelectedPair] = useState<null | {balance: string; fiat: string;}>(null);
  const [ordersList, setOrdersList] = useState<ViewBuyOrderModel[] | ViewSellOrderModel[]>([]);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedRate, setSelectedRate] = useState('Не выбрано');
  const [acceptedRate, setAcceptedRate] = useState(0);
  const [showPaymentMethodsModal, setShowPaymentMethodsModal] = useState(false);
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<number[]>([]);
  const [acceptedPaymentMethods, setAcceptedPaymentMethods] = useState<number[]>([]);
 
  const [totalCount, setTotalCount] = useState(0);
  const [skip, setSkip] = useState(0);

  const ratesList = useMemo<string[]>(() => [
    'Не выбрано',
    'Рейтинг участников 1.0',
    'Рейтинг участников 2.0',
    'Рейтинг участников 3.0',
    'Рейтинг участников 4.0',
    'Рейтинг участников 5.0',
  ], []);

  // The Array should have the same queue as PaymentMethodKind enum
  const paymentMethodsKinds = useMemo<string[]>(() => [
    'ERC 20',
    'TRC 20',
    'BEP 20',
    'АО «Тинькофф Банк», USD',
    'ПАО Сбербанк, USD',
    'АО «Альфа-Банк», USD',
  ], []);

  const getOrders = () => {
    if(activeType === OrderType.Buy) {
      getBuyOrders();
    }

    if(activeType === OrderType.Sell) {
      getSellOrders();
    }
  }

  useEffect(() => {
    console.log("CHANGE")
    if (hubConnection) {
      getOrders();
    }
  }, [hubConnection, activeType, selectedPair, acceptedRate, acceptedPaymentMethods, listingMyOrders]);

  const getBuyOrders = async () => {
      try {
        const res = await hubConnection!.invoke<GetBuyOrdersModel>(
          'GetBuyOrders', 
          selectedPair?.balance ? [ Balance[selectedPair?.balance as keyof typeof Balance] ] : [],  // Array of BalanceKind assetKinds
          selectedPair?.fiat ? [ FiatKind[selectedPair?.fiat as keyof typeof FiatKind] ] : [],  // Array of FiatKind opAssetKinds
          acceptedPaymentMethods, // Array of PaymentMethodKind[] paymentMethodKinds
          acceptedRate, // int rating
          listingMyOrders, // if true ? will show my orders
          skip, 
          10
        );
        console.log('GetBuyOrders', res);
        // setOrdersList(s => [...s, ...res.collection]);
        setOrdersList(res.collection);
        setTotalCount(res.totalRecords);
        // setSkip(s => s + 10);
      } catch (err) {
        console.log(err);
      }
  };

  const getSellOrders = async () => {
    try {
      const res = await hubConnection!.invoke<GetSellOrdersModel>(
        'GetSellOrders', 
        selectedPair?.balance ? [ Balance[selectedPair?.balance as keyof typeof Balance] ] : [],  // Array of BalanceKind assetKinds
        selectedPair?.fiat ? [ FiatKind[selectedPair?.fiat as keyof typeof FiatKind] ] : [],  // Array of FiatKind opAssetKinds
        acceptedPaymentMethods, // Array of PaymentMethodKind[] paymentMethodKinds
        acceptedRate, // int rating
        listingMyOrders, // if true ? will show my orders
        skip, 
        10
      );
      console.log('GetSellOrders', res);
      // setOrdersList(s => [...s, ...res.collection]);
      setOrdersList(res.collection);
      setTotalCount(res.totalRecords);
      // setSkip(s => s + 10);
    } catch (err) {
      console.log(err);
    }
  };


  const handleAcceptPair = () => {
    if(!selectedBalanceKind && !selectedFiatKind) {
      setSelectedPair(null);
      setShowCurrenctPairModal(false);
      return;
    };
 
    setSelectedPair({
      balance: selectedBalanceKind ? selectedBalanceKind : '',
      fiat: selectedFiatKind ? selectedFiatKind : ''
    });
    setShowCurrenctPairModal(false);
  }

  const handleAcceptRate = () => {
    setAcceptedRate(ratesList.indexOf(selectedRate));
    setShowRatingModal(false);
  };

  const handleAcceptPaymentMethods = () => {
    setAcceptedPaymentMethods([...selectedPaymentMethods]);
    setShowPaymentMethodsModal(false);
  };

  const resetFilters = () => {
    setSelectedPair(null);
    setSelectedBalanceKind(null);
    setSelectedFiatKind(null);
    setSelectedRate(ratesList[0]);
    setAcceptedRate(0);
    setAcceptedPaymentMethods([]);
    setSelectedPaymentMethods([]);
  };

  const handleLoadMore = () => {
    if(activeType === OrderType.Buy) {
      getBuyOrders();
    }

    if(activeType === OrderType.Sell) {
      getSellOrders();
    }
  };


  // Listening to changes
  const cb = (res: any) => {
    console.log("socket works::", res);
    getOrders();
  };

  useEffect(() => {
    if (hubConnection) {
      hubConnection.on("SellOrderCreated", cb);
      hubConnection.on("BuyOrderCreated", cb);
      hubConnection.on("BuyOrderVolumeChanged", cb);
      hubConnection.on("SellOrderVolumeChanged", cb);
      hubConnection.on("SellOrderCompleted", cb);
      hubConnection.on("BuyOrderCompleted", cb);
    };
    return () => {
      hubConnection?.off("SellOrderCreated", cb);
      hubConnection?.off("BuyOrderCreated", cb);
      hubConnection?.off("BuyOrderVolumeChanged", cb);
      hubConnection?.off("SellOrderVolumeChanged", cb);
      hubConnection?.off("SellOrderCompleted", cb);
      hubConnection?.off("BuyOrderCompleted", cb);
    };
  }, [hubConnection]);

  return (
    <div>
      <Container>
        <Heading
          onClick={() => history.push(routers.p2pchangesOrderToBuy)}
          title="P2P обмены"
          btnText="Опубликовать ордер"
        />
        <S.SubHeader>
          <TabsBlock>
            <TabNavItem to={routers.p2pchanges} exact>
              <div>Объявления</div>
            </TabNavItem>

            <TabNavItem to={routers.p2pchangesOwn} exact>
              <div>Мои обмены</div>
            </TabNavItem>

            <TabNavItem to={routers.certificates} exact>
              <div>Сертификаты</div>
            </TabNavItem>
          </TabsBlock>
          <Text size={14} lH={16} weight={500}>
            Рейтинг аккаунта: 5.0
          </Text>
        </S.SubHeader>
        <S.Filters>
          <FilterButton 
            active={!listingMyOrders}
            onClick={() => setListingMyOrders(false)}
            style={{ marginRight: "0px" }}
          >
            Все объявления
          </FilterButton>
          <FilterButton
            active={listingMyOrders}
            onClick={() => setListingMyOrders(true)}
            style={{ marginLeft: "0px", borderLeft: "0" }}
          >
            Мои объявления
          </FilterButton>

        </S.Filters>
        <S.Filters>
          <FilterButton 
            active={activeType === OrderType.Buy}
            onClick={() => setActiveType(OrderType.Buy)}
            style={{ marginRight: "0px" }}
          >
            Покупка
          </FilterButton>
          <FilterButton
            active={activeType === OrderType.Sell}
            onClick={() => setActiveType(OrderType.Sell)}
            style={{ marginLeft: "0px", borderLeft: "0" }}
          >
            Продажа
          </FilterButton>

          <S.Line />

          <FilterButton 
            onClick={() => setShowCurrenctPairModal(true)}
            active
          >
            {
              !selectedPair
              ?
              'Все валюты'
              :
              `${selectedPair.balance ? selectedPair.balance : 'все'} - ${selectedPair.fiat ? selectedPair.fiat : 'все'}`
            }
             
          </FilterButton>
          <S.Line />
          <FilterButton 
            active
            onClick={() => setShowPaymentMethodsModal(true)}
          >
            {`Все методы оплаты ${acceptedPaymentMethods.length ? acceptedPaymentMethods.length : ''}`}
          </FilterButton>
          <S.Line />
          <FilterButton 
            active
            onClick={() => setShowRatingModal(true)}
          >
            {acceptedRate === 0 ? 'Все рейтинги' : ratesList[acceptedRate]}
            </FilterButton>

          {
            (selectedPair || (acceptedRate !== 0) || (acceptedPaymentMethods.length)) 
            ?
              <S.MLAutoFilterButton
                onClick={resetFilters}
              >
                Очистить фильтр
              </S.MLAutoFilterButton>
            :
              null
          }
          
        </S.Filters>

        <CurrencyPair
          open={showCurrencyPairModal}
          onClose={() => setShowCurrenctPairModal(false)}
          selectedBalanceKind={selectedBalanceKind}
          setSelectedBalanceKind={setSelectedBalanceKind}
          selectedFiatKind={selectedFiatKind}
          setSelectedFiatKind={setSelectedFiatKind}
          onAccept={handleAcceptPair}
        />
        <Rating 
          selectedRate={selectedRate}
          setSelectedRate={setSelectedRate}
          rates={ratesList}
          onAccept={handleAcceptRate}
          open={showRatingModal}
          onClose={() => setShowRatingModal(false)}
        />
        <PaymentMethods 
          selectedPaymentMethods={selectedPaymentMethods}
          setSelectedPaymentMethods={setSelectedPaymentMethods}
          methodsList={paymentMethodsKinds}
          onAccept={handleAcceptPaymentMethods}
          open={showPaymentMethodsModal} 
          onClose={() => setShowPaymentMethodsModal(false)} 
        />
      
        <AdvertTable list={ordersList} />

        {
          (ordersList.length < totalCount) &&  
          <S.ButtonWrap>
            <Button onClick={handleLoadMore}>Показать еще</Button>
          </S.ButtonWrap>
        }
      
      </Container>
    </div>
  );
};
