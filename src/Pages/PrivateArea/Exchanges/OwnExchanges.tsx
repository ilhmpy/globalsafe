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
import { GetExchangesCollectionResult, ViewExchangeModel } from '../../../types/exchange';
import { PaymentMethods } from './components/modals/PaymentMethods';
import { CurrencyPair } from './components/modals/CurrencyPair';

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
  const [selectedStatus, setSelectedStatus] = useState<number[]>([]);


  const statuts = useMemo<string[]>(() => [
    "Ожидается подтверждение выплаты", 
    "Жалоба",
    "Отменен"
  ], []);
  
  const paymentMethodsKinds = useMemo<string[]>(() => [
    'АО «Альфа-Банк», USD',
    'ПАО Сбербанк, USD',
    'АО «Тинькофф Банк», USD',
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
  }, [hubConnection, activeFilter, selectedPaymentMethods]);

  async function getGetUserExchanges() {
    try {
      const res = await hubConnection!.invoke<GetExchangesCollectionResult>(
       'GetExchanges',
        [0, 1],
        activeFilter === 'active' ? [0, 1] : [2, 3, 4],
        0,
        10
      );
      console.log('getGetUserExchanges', res);

      if (selectedPaymentMethods.length) {
        /* setUserExchanges(() => res.collection.filter((i) => {
          if (selectedPaymentMethods.some(method => i.paymentMethod.assetKind)) {
            return i;
          };
        })); */
      } else {
        setUserExchanges(res.collection);
      };

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    };
  };

  function getMyRating() {
    if (account.claims) {
      let rating = 0;
      account.claims.forEach((claim: any) => {
      if (claim.claimType === "exchanges-rating") {
        rating = claim.claimValue;
      };
    });
      return (Number(rating)).toFixed(1);
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
            Рейтинг аккаунта: {getMyRating()}
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
        />
      </Container>
    </div>
  );
};
