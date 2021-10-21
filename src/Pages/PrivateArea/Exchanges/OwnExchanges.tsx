import { useContext, useEffect, useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import { Container } from '../../../components/UI/Container';
import { Heading } from '../components/Heading';
import { routers } from '../../../constantes/routers';
import { TabNavItem, TabsBlock, Text, FilterButton } from '../components/ui';
import * as S from './S.el';

import { OwnActiveExchangesTable } from './components/OwnActiveExchangesTable/OwnActiveExchangesTable';
import { OwnArchivedExchangesTable } from './components/OwnArchivedExchangeTable/OwnArchivedExchangeTable';
import { AppContext } from '../../../context/HubContext';
import { GetExchangesCollectionResult, ViewExchangeModel, ExchangeState } from '../../../types/exchange';
import { PaymentMethods } from './components/modals/PaymentMethods';
import { CurrencyPair } from './components/modals/CurrencyPair';
import { Balance } from '../../../types/balance';
import { getBalanceKindByStringName, getFiatKindByStringName, getMyRating } from '../utils';

export const OwnExchanges = () => {
  const history = useHistory();
  const { hubConnection, account } = useContext(AppContext);
  const [activeFilter, setActiveFilter] = useState<'active' | 'archived'>('active');
  const [userExchanges, setUserExchanges] = useState<ViewExchangeModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<number[]>([]);
  const [showPaymentMethodsModal, setShowPaymentMethodsModal] = useState<boolean>(false);
  
  const [showCurrencyPairModal, setShowCurrencyPairModal] = useState<boolean>(false);
  const [selectedBalanceKind, setSelectedBalanceKind] = useState<string | null>(null);
  const [selectedFiatKind, setSelectedFiatKind] = useState<string | null>(null);

  const [showSelectedStatus, setShowSelectedStatus] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<any>([]);
  
  const status = ["Initiated", "Confirmed", "Completed", "Abused", "Cancelled"];

  const statuts = useMemo<Object[]>(() => activeFilter === "active" ? [
    { methodName: "Новый", kind: 0 },
    { methodName: "Ожидается подтверждение оплаты", kind: 1 },
  ] : [
    { methodName: "Завершен", kind: 2 },
    { methodName: "Подана жалоба", kind: 3 },
    { methodName: "Отменен", kind: 4 }
  ], [activeFilter]);
  
  const paymentMethodsKinds = useMemo<string[]>(() => [
    'АО «Альфа-Банк»',
    'ПАО Сбербанк',
    'АО «Тинькофф Банк»',
    'BEP 20',
    'TRC 20',
    'ERC 20',
  ], []);

  useEffect(() => {
    if (hubConnection) {
      if (!selectedPaymentMethods.length) {
        setLoading(true);
      };
      getGetUserExchanges();
    };
  }, [hubConnection, activeFilter, selectedPaymentMethods, selectedBalanceKind, selectedFiatKind, selectedStatus]);

  async function getGetUserExchanges() {
    try {
      const res = await hubConnection!.invoke<GetExchangesCollectionResult>(
       'GetExchanges',
        [0, 1],
        activeFilter === 'active' ? [0, 1] : [2, 3, 4],
        0,
        10
      );
      console.log('GetExchanges', res);
      if (selectedPaymentMethods.length) {
        const filter = res.collection.filter((i) => {
          if (selectedPaymentMethods.includes(i.paymentMethod?.kind)) {
              return i;
          };
        });
        setUserExchanges(filter);
      } else if (selectedBalanceKind && selectedFiatKind) {
        const kind = getBalanceKindByStringName(selectedBalanceKind);
        const fiatKind = getFiatKindByStringName(selectedFiatKind);

        const filter = res.collection.filter((i) => {
          if (i.assetKind === kind && i.exchangeAssetKind === fiatKind) {
            return i;
          };
        });
        setUserExchanges(filter);
      } else if (selectedStatus.length) {
        const filter = res.collection.filter((i) => {
          for (let el = 0; el < selectedStatus.length; el++) {
            if (i.state === selectedStatus[el]) {
              return i;
            };
          };
        });
        setUserExchanges(filter);
      } else {
        setUserExchanges(res.collection);
      };
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    };
  };

  function handleAcceptPaymentMethods() {
    setShowPaymentMethodsModal(false);
  };

  function handleAcceptPair() {
    setShowCurrencyPairModal(false)
  };

  function handleAcceptSelectedStatus() {
    setShowSelectedStatus(false);
  };

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
          <Text size={14} lH={16} weight={500} black>
            Рейтинг аккаунта: {getMyRating(account)}
          </Text>
        </S.SubHeader>

        <S.Filters style={{ marginBottom: "10px" }}>
          <FilterButton
              active={activeFilter === 'active'}
              onClick={() => setActiveFilter('active')}
              style={{ marginRight: "0px" }}
            >
              Активные
            </FilterButton>
            <FilterButton
              active={activeFilter === 'archived'}
              onClick={() => setActiveFilter('archived')}
              style={{ marginLeft: "0px", borderLeft: "0" }}
            >
              Архив
            </FilterButton>
        </S.Filters>
        <S.Filters style={{ marginBottom: "10px" }}>
          <S.Line style={{ display: "none" }} />
          <FilterButton active style={{ marginLeft: "0px" }} onClick={() => setShowCurrencyPairModal(true)}>Все валюты</FilterButton>
          <S.Line />
          <FilterButton active onClick={() => setShowPaymentMethodsModal(true)}>Все методы оплаты</FilterButton>
          <S.Line />
          <FilterButton active onClick={() => setShowSelectedStatus(true)}>Все Статусы</FilterButton>
        </S.Filters>

        {activeFilter === 'active' && <OwnActiveExchangesTable setExchanges={setUserExchanges} loading={loading} exchanges={userExchanges} />}
        {activeFilter === 'archived' && <OwnArchivedExchangesTable loading={loading} exchanges={userExchanges} />}
        
        <PaymentMethods 
          selectedPaymentMethods={selectedPaymentMethods}
          setSelectedPaymentMethods={setSelectedPaymentMethods}
          methodsList={paymentMethodsKinds}
          onAccept={handleAcceptPaymentMethods}
          open={showPaymentMethodsModal} 
          onClose={() => setShowPaymentMethodsModal(false)} 
          black
        />

        <CurrencyPair
          open={showCurrencyPairModal}
          onClose={() => setShowCurrencyPairModal(false)}
          selectedBalanceKind={selectedBalanceKind}
          setSelectedBalanceKind={setSelectedBalanceKind}
          selectedFiatKind={selectedFiatKind}
          setSelectedFiatKind={setSelectedFiatKind}
          onAccept={handleAcceptPair}
        />
        
        <PaymentMethods 
          text="Выбор статусов"
          selectedPaymentMethods={selectedStatus}
          setSelectedPaymentMethods={setSelectedStatus}
          methodsList={statuts}
          onAccept={handleAcceptSelectedStatus}
          open={showSelectedStatus}  
          onClose={() => setShowSelectedStatus(false)} 
          objectsArray
          black
        />
      </Container>
    </div>
  );
};
