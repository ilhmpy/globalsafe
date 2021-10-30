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
import { getMyRating } from '../utils';
 
// TODO: Update Load more Functional.
export const Advert = () => {
  const history = useHistory();
  const { hubConnection, account } = useContext(AppContext);
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
  const paymentMethodsKinds = useMemo<{label: string; value: number}[]>(() => [
    {label: 'ERC 20', value: 0},
    {label: 'TRC 20', value: 1},
    {label: 'BEP 20', value: 2},
    {label: 'АО «Тинькофф Банк»', value: 3},
    {label: 'ПАО Сбербанк', value: 4},
    {label: 'АО «Альфа-Банк»', value: 5}
  ], []);

  useEffect(() => {
    setSkip(0);
    if (hubConnection) {
      if(activeType === OrderType.Buy) {
        getBuyOrders();
      }
  
      if(activeType === OrderType.Sell) {
        getSellOrders();
      }
    }
  }, [hubConnection, activeType, selectedPair, acceptedRate, acceptedPaymentMethods, listingMyOrders]);

  const getBuyOrders = async () => {
      try {
        console.log("=======================================", acceptedPaymentMethods)

        const res = await hubConnection!.invoke<GetBuyOrdersModel>(
          'GetBuyOrders', 
          selectedPair?.balance ? [ Balance[selectedPair?.balance as keyof typeof Balance] ] : [],  // Array of BalanceKind assetKinds
          selectedPair?.fiat ? [ FiatKind[selectedPair?.fiat as keyof typeof FiatKind] ] : [],  // Array of FiatKind opAssetKinds
          acceptedPaymentMethods, // Array of PaymentMethodKind[] paymentMethodKinds
          acceptedRate, // int rating
          listingMyOrders, // if true ? will show my orders
          0, 
          10
        );
        console.log('GetBuyOrders', res);
        setOrdersList(res.collection);
        setTotalCount(res.totalRecords);
        setSkip(s => s + 10);
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
        0, 
        10
      );
      console.log('GetSellOrders', res);
      setOrdersList(res.collection);
      setTotalCount(res.totalRecords);
      setSkip(s => s + 10);
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

  const handleLoadMoreOrders = async () => {
    if(activeType === OrderType.Buy) {
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
        setOrdersList(s => [...s, ...res.collection]);
        setTotalCount(res.totalRecords);
        setSkip(s => s + 10);
      } catch (err) {
        console.log(err);
      }
    } else {
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
        setOrdersList(s => [...s, ...res.collection]);
        setTotalCount(res.totalRecords);
        setSkip(s => s + 10);
      } catch (err) {
        console.log(err);
      }
    }
  };
  
  // Listening to changes
  useEffect(() => {
    const cbOrderVolumeChanged = (orderSafeId: string, summ: number) => {
      console.log('__SOCKET__cbOrderVolumeChanged::', orderSafeId, summ);
      const key = ordersList.findIndex((order) => order.safeId === orderSafeId);
      if(key !== -1) {
        setOrdersList(state => [
          ...state.slice(0, key),
          {...state[key], volume: summ},
          ...state.slice(key + 1),
        ]);
      }
    };

    const cbOrderCreated = (newOrder: ViewBuyOrderModel | ViewSellOrderModel) => {
      console.log('__SOCKET__cbOrderCreated::', newOrder)
      if(newOrder) {
        setOrdersList(state => [newOrder, ...state])
      }
    };

    if (hubConnection) {
        hubConnection.on("BuyOrderCreated", cbOrderCreated);
        hubConnection.on("BuyOrderVolumeChanged", cbOrderVolumeChanged);

        hubConnection.on("SellOrderCreated", cbOrderCreated);
        hubConnection.on("SellOrderVolumeChanged", cbOrderVolumeChanged);
    };

    return () => {
      hubConnection?.off("BuyOrderCreated", cbOrderCreated);
      hubConnection?.off("SellOrderCreated", cbOrderCreated);

      hubConnection?.off("BuyOrderVolumeChanged", cbOrderVolumeChanged);
      hubConnection?.off("SellOrderVolumeChanged", cbOrderVolumeChanged);

    };
  }, [hubConnection, ordersList]);


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
              <div>Ордеры</div>
            </TabNavItem>

            <TabNavItem to={routers.p2pchangesOwn} exact>
              <div>Мои обмены</div>
            </TabNavItem>

            <TabNavItem to={routers.certificates} exact>
              <div>Сертификаты</div>
            </TabNavItem>
          </TabsBlock>
          <Text size={14} lH={16} weight={500}>
            Рейтинг аккаунта: {getMyRating(account)}
          </Text>
        </S.SubHeader>
        <S.Filters>
          <FilterButton 
            active={!listingMyOrders}
            onClick={() => setListingMyOrders(false)}
            style={{ marginRight: "0px" }}
          >
            Все ордеры
          </FilterButton>
          <FilterButton
            active={listingMyOrders}
            onClick={() => setListingMyOrders(true)}
            style={{ marginLeft: "0px", borderLeft: "0" }}
          >
            Мои ордеры
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
          black
        />
      </Container>
      <Container pTabletNone pNone>
        <AdvertTable list={ordersList} />
      </Container>
      {(ordersList.length < totalCount) &&  
        <S.ButtonWrap>
          <Button onClick={handleLoadMoreOrders}>Показать еще</Button>
        </S.ButtonWrap>}
    </div>
  );
};
