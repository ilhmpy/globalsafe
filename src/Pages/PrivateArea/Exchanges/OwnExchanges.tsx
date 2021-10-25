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
import { FiatKind } from "../../../types/fiatKind";
import { getBalanceKindByStringName, getFiatKindByStringName, getMyRating } from '../utils';
import { ExchangesInOrderTable } from './components/ExchangesInOrderTable';

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

  const [status, setStatus] = useState<any[] | null>(null);
  const [payments, setPayments] = useState<any[]>([]);
  const [balanceKind, setBalanceKind] = useState<number | null>(null);
  const [fiatKind, setFiatKind] = useState<number | null>(null);

  /*
    CALLBACKS: 
    BuyOrderVolumeChanged - значение доступной валюты ордера на покупку изменилось
    ExchangeCreated - создан новый обмен
    SellOrderVolumeChanged - значение доступной валюты ордера на продажу изменилось
    ExchangeCompleted - обмен завершен
    ExchangeCancelled - обмен отменен
    ExchangeConfirmationRequired - обмен ожидает подтверждения
    ExchangeAbused - на обмен подана жалоба
  */

  /*
    изменить цвет кнопки жалоба на красный
    убрать из фильтров обменов статус в жалобе
    
  */

    function resetFilters() {
      setSelectedBalanceKind(null);
      setSelectedFiatKind(null);
      setStatus([]);
      setPayments([]);
      setSelectedPaymentMethods([]);
      setSelectedStatus([]);
      setBalanceKind(null);
      setFiatKind(null);
    };
    
    function filters(res: GetExchangesCollectionResult) {
      if (payments.length) {
        console.log(payments);
        const filter = res.collection.filter((i) => {
          if (payments.includes(i.paymentMethod?.kind)) {
              return i;
          };
        });
        setUserExchanges(filter);
      } else if (balanceKind != null || fiatKind != null) {
        let filter: ViewExchangeModel[] = [];
        if (balanceKind != null && fiatKind == null) {
          filter = res.collection.filter((i) => {
            if (i.assetKind === balanceKind) {
              return i; 
            };
          });
        };
        if (balanceKind === null && fiatKind != null) {
          filter = res.collection.filter((i) => {
            if (i.exchangeAssetKind === fiatKind) {
              return i; 
            };
          });
        };
        if (balanceKind !== null && fiatKind !== null) {
          filter = res.collection.filter((i) => {
            if (i.exchangeAssetKind === fiatKind && i.assetKind === balanceKind) {
              return i; 
            };
          });
        };
        setUserExchanges(filter);
      } else if (status && status.length) {
        const filter = res.collection.filter((i) => {
          for (let el = 0; el < status.length; el++) {
            if (i.state === status[el]) {
              return i;
            };
          };
        });
        setUserExchanges(filter);
      } else {
        setUserExchanges(res.collection);
      };
    }
    
    async function getGetUserExchanges() {
      try {
        const res = await hubConnection!.invoke<GetExchangesCollectionResult>(
         'GetExchanges',
          [0, 1],
          activeFilter === 'active' ? [0, 1, 3] : [2, 4],
          0,
          10
        );
        console.log("GetExchanges", res.collection);
        filters(res);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      };
    };

  useEffect(() => {
    let cancel = false;
    if (hubConnection && !cancel) {
      setLoading(true);
      getGetUserExchanges();
    };
    return () => {
      cancel = true;
    }
  }, [hubConnection, activeFilter, balanceKind, fiatKind, status, payments]);

  function cb(res: any) {
    const exchanges = [...userExchanges];
    console.log("ExchangeChanged/Created/Completed", res);
    userExchanges.forEach((item) => {
      if (item.safeId === res.safeId) {
        exchanges[userExchanges.indexOf(item)] = res;
      };
    });
    setUserExchanges(exchanges);
  };

  function volumeChanged(id: string, volume: number) {
    console.log("ExchangeChanged/Created/Completed", id, volume);
    const exchanges = [...userExchanges];
    userExchanges.forEach((item) => {
      if (item.safeId === id) {
        exchanges[userExchanges.indexOf(item)].orderVolume = volume;
      };
    });
    setUserExchanges(exchanges);
  };

  function exchangeCreated(res: ViewExchangeModel) {
    if (userExchanges) {
      console.log("ExchangeChanged/Created/Completed", res);
      if (res.state <= 2 && activeFilter === "active") {
        setUserExchanges([res, ...userExchanges]);
      };
      if (res.state >= 3 && activeFilter === "archived") {
        setUserExchanges([res, ...userExchanges]);
      };
    };
  };

  useEffect(() => {
    let cancel = false;
    if (hubConnection && !cancel) {
      hubConnection.on("BuyOrderVolumeChanged", volumeChanged);
    };
    return () => {
      cancel = true;
      hubConnection?.off("BuyOrderVolumeChanged", volumeChanged);
    };
  }, [hubConnection, userExchanges]);

  useEffect(() => {
    let cancel = false;
    if (hubConnection && !cancel) {
      hubConnection.on("SellOrderVolumeChanged", volumeChanged);
    };
    return () => {
      cancel = true;
      hubConnection?.off("SellOrderVolumeChanged", volumeChanged);
    };
  }, [hubConnection, userExchanges]);

  useEffect(() => {
    let cancel = false;
    if (hubConnection && !cancel) {
      hubConnection.on("ExchangeCreated", exchangeCreated);
    };
    return () => {
      cancel = true;
      hubConnection?.off("ExchangeCreated", exchangeCreated);
    };
  }, [hubConnection, userExchanges]);

  useEffect(() => {
    let cancel = false;
    if (hubConnection && !cancel) {
      hubConnection.on("ExchangeCompleted", cb);
    };
    return () => {
      cancel = true;
      hubConnection?.off("ExchangeCompleted", cb);
    };
  }, [hubConnection, userExchanges]);

  useEffect(() => {
    let cancel = false;
    if (hubConnection) {
      hubConnection.on("ExchangeCancelled", cb);
    };
    return () => {
      cancel = true;
      hubConnection?.off("ExchangeCancelled", cb);
    };
  }, [hubConnection, userExchanges]);

  useEffect(() => {
    let cancel = false;
    if (hubConnection && !cancel) {
      hubConnection.on("ExchangeConfirmationRequired", cb);
    };
    return () => {
      cancel = true;
      hubConnection?.off("ExchangeConfirmationRequired", cb);
    };
  }, [hubConnection, userExchanges]);

  useEffect(() => {
    let cancel = false;
    if (hubConnection && !cancel) {
      hubConnection.on("ExchangeAbused", cb);
    };
    return () => {
      cancel = true;
      hubConnection?.off("ExchangeAbused", cb);
    };
  }, [hubConnection, userExchanges]);

  const statuts = useMemo<Object[]>(() => activeFilter === "active" ? [
    { methodName: "Новый", kind: 0 },
    { methodName: "Ожидается подтверждение оплаты", kind: 1 },
    { methodName: "Спорный", kind: 3 }
  ] : [
    { methodName: "Завершен", kind: 2 },
    { methodName: "Отменен", kind: 4 }
  ], [activeFilter]);
  
  const paymentMethodsKinds = useMemo<Object[]>(() => [
    { methodName: 'ERC 20', kind: 0 },
    { methodName: 'TRC 20', kind: 1 },
    { methodName: "BEP 20", kind: 2 },
    { methodName: 'АО «Тинькофф Банк»', kind: 3 },
    { methodName: 'ПАО Сбербанк', kind: 4 },
    { methodName: 'АО «Альфа-Банк»', kind: 5 },
  ], []);

  function handleAcceptPaymentMethods() {
    setPayments(selectedPaymentMethods);
    setShowPaymentMethodsModal(false);
  };

  function handleAcceptPair() {
    const kind = getBalanceKindByStringName(selectedBalanceKind); 
    const fiatKind = getFiatKindByStringName(selectedFiatKind);
    setBalanceKind(kind);
    setFiatKind(fiatKind);
    setShowCurrencyPairModal(false)
  };

  function handleAcceptSelectedStatus() {
    setStatus(selectedStatus);
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

        <S.Filters style={{ marginBottom: "10px", position: "relative" }}>
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
        <S.Filters style={{ marginBottom: "10px", position: "relative" }}>
          <S.Line style={{ display: "none" }} />
          <FilterButton active style={{ marginLeft: "0px" }} onClick={() => setShowCurrencyPairModal(true)}>
            {balanceKind != null && fiatKind != null ? 
              `${Balance[balanceKind]} - ${FiatKind[fiatKind]}`  
              : balanceKind != null && fiatKind == null ? 
              `${Balance[balanceKind]} - Все` 
              : balanceKind == null && fiatKind != null ? 
              `Все - ${FiatKind[fiatKind]}` 
              : "Все валюты"
            }
          </FilterButton>
          <S.Line />
          <FilterButton active onClick={() => setShowPaymentMethodsModal(true)}>
            {payments && payments.length ? "Методы оплаты - " : "Все методы оплаты"} {payments && payments.length ? payments.length : ""}
          </FilterButton>
          <S.Line />
          <FilterButton active onClick={() => setShowSelectedStatus(true)}>
            {status && status.length ? "Статусы - " : "Все статусы"} {status && status.length ? status.length : ""}
          </FilterButton>
          {payments.length > 0 || (status != null && status.length > 0) || balanceKind != null || fiatKind != null ? (
            <>
              <FilterButton style={{ position: "absolute", right: "0px", }} onClick={resetFilters}>
                Очистить фильтр
              </FilterButton>
            </>
          ) : null}
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
          objectsArray
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
