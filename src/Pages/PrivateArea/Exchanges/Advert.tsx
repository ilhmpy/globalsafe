import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Container } from '../../../components/UI/Container';
import { Heading } from '../components/Heading';
import { routers } from '../../../constantes/routers';
import { TabNavItem, TabsBlock, Text, Chip, FilterButton } from '../components/ui';
import * as S from './S.el';
import { AdvertTable } from './components/AdvertTable/AdvertTable';
import { Button } from '../../../components/Button/V2/Button';
import { AppContext } from '../../../context/HubContext';
import { GetBuyOrdersModel, GetSellOrdersModel, ViewBuyOrderModel, ViewSellOrderModel } from '../../../types/orders';
import { CurrencyPair } from './components/modals/CurrencyPair';
import { Balance } from '../../../types/balance';
import { FiatKind } from '../../../types/fiat';
 
// TODO: Update Load more Functional.
export const Advert = () => {
  const history = useHistory();
  const { hubConnection } = useContext(AppContext);
  const [activeType, setActiveType] = useState<'buy' | 'sell'>('buy');
  const [selectedBalanceKind, setSelectedBalanceKind] = useState<string | null>(null);
  const [selectedFiatKind, setSelectedFiatKind] = useState<string | null>(null);
  const [showCurrencyPairModal, setShowCurrenctPairModal] = useState(false);
  const [selectedPair, setSelectedPair] = useState<null | {balance: string; fiat: string;}>(null);
  const [ordersList, setOrdersList] = useState<ViewBuyOrderModel[] | ViewSellOrderModel[]>([]);

  const [totalCount, setTotalCount] = useState(0);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    if (hubConnection) {
      if(activeType === 'buy') {
        getBuyOrders();
      }

      if(activeType === 'sell') {
        getSellOrders();
      }
    }
  }, [hubConnection, activeType, selectedPair]);


  const getBuyOrders = async () => {
      try {
        const res = await hubConnection!.invoke<GetBuyOrdersModel>(
          'GetBuyOrders', 
          selectedPair?.balance ? [ Balance[selectedPair?.balance as keyof typeof Balance] ] : [],  // Array of BalanceKind assetKinds
          selectedPair?.fiat ? [ FiatKind[selectedPair?.fiat as keyof typeof FiatKind] ] : [],  // Array of FiatKind opAssetKinds
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
  console.log(skip)

  const getSellOrders = async () => {
    try {
      const res = await hubConnection!.invoke<GetSellOrdersModel>(
        'GetSellOrders', 
        selectedPair?.balance ? [ Balance[selectedPair?.balance as keyof typeof Balance] ] : [],  // Array of BalanceKind assetKinds
        selectedPair?.fiat ? [ FiatKind[selectedPair?.fiat as keyof typeof FiatKind] ] : [],  // Array of FiatKind opAssetKinds
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
    }

    setSelectedPair({
      balance: selectedBalanceKind ? selectedBalanceKind : '',
      fiat: selectedFiatKind ? selectedFiatKind : ''
    });
    setShowCurrenctPairModal(false);
  }

  const resetFilters = () => {
    setSelectedPair(null);
    setSelectedBalanceKind(null);
    setSelectedFiatKind(null);
  };

  const handleLoadMore = () => {
    if(activeType === 'buy') {
      getBuyOrders();
    }

    if(activeType === 'sell') {
      getSellOrders();
    }
  }

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
          <FilterButton active>Все объявления</FilterButton>
          <FilterButton>Мои объявления</FilterButton>

        </S.Filters>
        <S.Filters>
          <FilterButton 
            active={activeType === 'buy'}
            onClick={() => setActiveType('buy')}
          >
            Покупка
          </FilterButton>
          <FilterButton
            active={activeType === 'sell'}
            onClick={() => setActiveType('sell')}
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
          <FilterButton active>Все методы оплаты</FilterButton>
          <S.Line />
          <FilterButton active>Все рейтинги</FilterButton>

          {
            selectedPair &&
            <S.MLAutoFilterButton
              onClick={resetFilters}
            >
              Очистить фильтр
            </S.MLAutoFilterButton>
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
