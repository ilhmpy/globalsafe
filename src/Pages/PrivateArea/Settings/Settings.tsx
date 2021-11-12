import { FC, useContext, useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Switcher } from '../../../components/Switcher';
import { routers } from '../../../constantes/routers';
import { AppContext } from '../../../context/HubContext';
import { Card, Container } from '../../../globalStyles';
import * as S from '../components/Filter/S.el';
import { Heading } from '../components/Heading';
import {
  PaymentMethodKind,
  RootPayMethod,
  CollectionPayMethod,
} from '../../../types/paymentMethodKind';
import { PaymentMethodState } from '../../../types/paymentMethodState';
import { FiatKind } from '../../../types/fiatKind';
import { SettingsContext } from '../../../context/SettingsContext';
import {
  GetExchangesCollectionResult,
  ViewExchangeModel,
  ExchangeState,
} from '../../../types/exchange';
import { DontDeleteModal } from './DontDeleteModal';
import { useIsMobile } from '../utils';
import { FilterButton } from '../components/ui';
import { Device } from '../consts';
import { MobileFiltersModal } from './MobileFiltersModal';

type TableRowType = {
  method?: string;
  cardHolder?: string;
  cardNumber?: string;
  currency?: string;
  isActive: boolean;
};

type Rows = {
  data: CollectionPayMethod;
  active: (item: CollectionPayMethod) => void;
  toView: (id: string) => void;
};

type PayMethod = {
  bankNumber?: string;
  name?: string;
  bankName?: string;
  paymentAddress?: string;
  assetKind?: number;
  phone?: string;
};

export const TableRows: FC<Rows> = ({ data, active, toView }: Rows) => {
  const payMethod: PayMethod = JSON.parse(data.data);
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  if(isMobile) {
    return (
      <MobileCard onClick={() => toView(data.safeId)}>
        <MobileRow>
          <MobileRowItem>
            {payMethod.bankName ? payMethod.bankName : PaymentMethodKind[data.kind]}
          </MobileRowItem>
          <MobileRowItem>
            <Ceil
              checked={data.state === 1}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Switcher
                onChange={() => {
                  active(data);
                }}
                checked={data.state === 1}
              />
              <span>{t(data.state === 1 ? 'depositsPrograms.on' : 'depositsPrograms.off')}</span>
            </Ceil>
          </MobileRowItem>
        </MobileRow>
        <MobileRow>
          {payMethod.name ? payMethod.name : '-'}
        </MobileRow>
      </MobileCard>
    )
  };

  return (
    <TableRow onClick={() => toView(data.safeId)}>
      <Ceil>{payMethod.bankName ? payMethod.bankName : PaymentMethodKind[data.kind]}</Ceil>
      <Ceil>{payMethod.name ? payMethod.name : '-'}</Ceil>
      <Ceil>{FiatKind[data.assetKind]}</Ceil>
      <Ceil
        checked={data.state === 1}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Switcher
          onChange={() => {
            active(data);
          }}
          checked={data.state === 1}
        />
        <span>{t(data.state === 1 ? 'depositsPrograms.on' : 'depositsPrograms.off')}</span>
      </Ceil>
    </TableRow>
  );
};

export const Settings: FC = () => {
  const appContext = useContext(AppContext);
  const { hubConnection, userSafeId } = appContext;
  const [dontDeleteModal, setDontDeleteModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('Все');
  const history = useHistory();
  const isMobile = useIsMobile();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<number[]>([]);
  const [acceptedPaymentMethods, setAcceptedPaymentMethods] = useState<number[]>([]);

  const { userPaymentsMethod, setUserPaymentsMethod, usePaymentMethods, setUsePaymentMethods } =
    useContext(SettingsContext);
  const [total, setTotal] = useState(0);
  const [myExchanges, setMyExchanges] = useState<ViewExchangeModel[]>([]);

  useEffect(() => {
    if (userPaymentsMethod.length && myExchanges.length && userSafeId && !usePaymentMethods) {
      const arrSell = myExchanges.filter(
        (exchange) =>
          (exchange.kind === 0 && exchange.ownerSafeId === userSafeId) ||
          (exchange.kind === 1 && exchange.ownerSafeId !== userSafeId)
      );
      const methods = userPaymentsMethod.filter((i) =>
        arrSell.some((j) => j.exchangeAssetKind === i.assetKind && j.methodsKinds.includes(i.kind))
      );
      setUsePaymentMethods(methods);
    }
  }, [userPaymentsMethod, myExchanges, userSafeId, usePaymentMethods]);

  const getExchanges = async () => {
    let arrList: ViewExchangeModel[] = [];
    let isFetching = true;
    let totalNum = 0;
    if (hubConnection) {
      while (isFetching) {
        try {
          const res = await hubConnection.invoke<GetExchangesCollectionResult>(
            'GetExchanges',
            [0, 1],
            [ExchangeState.Initiated, ExchangeState.Abused, ExchangeState.Confirmed],
            totalNum,
            100
          );
          if (res) {
            if (arrList.length < res.totalRecords) {
              arrList = [...arrList, ...res.collection];

              if (arrList.length === res.totalRecords) {
                setTotal(res.totalRecords);
                isFetching = false;
                break;
              }
              if (total === 0) {
                setTotal(0);
              }
              totalNum += 100;
            } else {
              isFetching = false;
              setTotal(0);
              break;
            }
          }
        } catch (e) {
          console.log(e);
          setTotal(0);
          isFetching = false;
        }
      }
      setMyExchanges(arrList);
      console.log('arrList', arrList);
    }
  };

  useEffect(() => {
    if (hubConnection) {
      getExchanges();
    }
  }, [hubConnection]);

  const userPaymentsMethods = async (arr: number[]) => {
    if (!hubConnection) return;
    try {
      const res = await hubConnection.invoke<RootPayMethod>(
        'GetUserPaymentsMethods',
        arr,
        [PaymentMethodState.Active, PaymentMethodState.Disabled],
        null,
        0,
        100
      );
      console.log('GetUserPaymentsMethods', res);
      setUserPaymentsMethod(res.collection);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const arr = () => {
      if (activeFilter === 'Все') {
        return [
          PaymentMethodKind.BEP20,
          PaymentMethodKind.ERC20,
          PaymentMethodKind.TRC20,
          PaymentMethodKind.Alfabank,
          PaymentMethodKind.Sberbank,
          PaymentMethodKind.Tinkoff,
        ];
      } else if (activeFilter === 'АО «Альфа-Банк»') {
        return [PaymentMethodKind.Alfabank];
      } else if (activeFilter === 'АО «Тинькофф Банк»') {
        return [PaymentMethodKind.Tinkoff];
      } else if (activeFilter === 'ПАО Сбербанк') {
        return [PaymentMethodKind.Sberbank];
      } else if (activeFilter === 'ERC 20') {
        return [PaymentMethodKind.ERC20];
      } else if (activeFilter === 'TRC 20') {
        return [PaymentMethodKind.TRC20];
      } else if (activeFilter === 'BEP 20') {
        return [PaymentMethodKind.BEP20];
      } else {
        return [
          PaymentMethodKind.BEP20,
          PaymentMethodKind.ERC20,
          PaymentMethodKind.TRC20,
          PaymentMethodKind.Alfabank,
          PaymentMethodKind.Sberbank,
          PaymentMethodKind.Tinkoff,
        ];
      }
    };
    if (hubConnection) {
      userPaymentsMethods(arr());
    }
  }, [hubConnection, activeFilter]);

  useEffect(() => {
    if (hubConnection) {
      userPaymentsMethods(acceptedPaymentMethods);
    }
  }, [hubConnection, acceptedPaymentMethods])

  const adjustPaymentMethod = async (id: number, safeId: string) => {
    if (!hubConnection) return;
    try {
      await hubConnection.invoke('AdjustStatePaymentMethod', safeId, id);
    } catch (e) {
      console.log(e);
    }
  };

  const active = (item: CollectionPayMethod) => {
    const isHave = usePaymentMethods
      ? usePaymentMethods.filter((i) => i.safeId === item.safeId)
      : [];

    if (isHave.length) {
      console.log('isHave');
      setDontDeleteModal(true);
      return;
    }

    const key = userPaymentsMethod.findIndex((i) => i.safeId === item.safeId);
    if (item.state === PaymentMethodState.Active) {
      adjustPaymentMethod(PaymentMethodState.Disabled, item.safeId);
      setUserPaymentsMethod([
        ...userPaymentsMethod.slice(0, key),
        { ...item, state: PaymentMethodState.Disabled },
        ...userPaymentsMethod.slice(key + 1),
      ]);
    } else {
      adjustPaymentMethod(PaymentMethodState.Active, item.safeId);
      setUserPaymentsMethod([
        ...userPaymentsMethod.slice(0, key),
        { ...item, state: PaymentMethodState.Active },
        ...userPaymentsMethod.slice(key + 1),
      ]);
    }
  };

  const toView = (id: string) => {
    history.push(routers.settingsViewPayMethod + '/' + id);
  };

  // The Array should have the same queue as PaymentMethodKind enum
  const paymentMethodsKinds = useMemo<{ label: string; value: number }[]>(
    () => [
      { label: 'ERC 20', value: 0 },
      { label: 'TRC 20', value: 1 },
      { label: 'BEP 20', value: 2 },
      { label: 'АО «Тинькофф Банк»', value: 3 },
      { label: 'ПАО Сбербанк', value: 4 },
      { label: 'АО «Альфа-Банк»', value: 5 },
    ],
    []
  );

  const handleAcceptPaymentMethods = () => {
    setAcceptedPaymentMethods([...selectedPaymentMethods]);
    setShowMobileFilters(false);
  };

  const resetFilters = () => {
    setAcceptedPaymentMethods([]);
    setSelectedPaymentMethods([]);
  };

  return (
    <Container pNone>
      <Container>
        <Heading
          onClick={() => history.push(routers.settingsNewPayMethod)}
          title="Настройки"
          btnText="Добавить платежный метод"
        />
        <DontDeleteModal open={dontDeleteModal} setOpen={setDontDeleteModal} />
        <S.Container>
          {
            !isMobile
            ?
              <S.Buttons>
                {[
                  'Все',
                  'АО «Альфа-Банк»',
                  'АО «Тинькофф Банк»',
                  'ПАО Сбербанк',
                  'ERC 20',
                  'TRC 20',
                  'BEP 20',
                ].map((value: string, i: number) => (
                  <S.Button
                    key={i}
                    active={activeFilter === value}
                    onClick={() => setActiveFilter(value)}
                  >
                    {value}
                  </S.Button>
                ))}
              </S.Buttons>
            :
              <FilterButton noMargin wFull active={false} switchLeft onClick={() => setShowMobileFilters(true)}>
                Фильтры (3)
              </FilterButton>
          }
        </S.Container>
      </Container>

      <TableCard>
        <TableHeader>
          <Ceil>Платежный метод</Ceil>
          <Ceil>Держатель карты</Ceil>
          <Ceil>Валюта</Ceil>
          <Ceil>Активность</Ceil>
        </TableHeader>

        {userPaymentsMethod.length ? (
          userPaymentsMethod.map((row) => (
            <TableRows active={active} toView={toView} data={row} key={row.safeId} />
          ))
        ) : (
          <NotData>Нет платежных методов</NotData>
        )}
      </TableCard>

      <MobileFiltersModal
        open={showMobileFilters}
        onClose={() => setShowMobileFilters(false)}
        onAccept={handleAcceptPaymentMethods}
        onResetFilters={resetFilters}

        selectedPaymentMethods={selectedPaymentMethods}
        setSelectedPaymentMethods={setSelectedPaymentMethods}
        methodsList={paymentMethodsKinds}
      />
    </Container>
  );
};

const NotData = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  padding: 12px 20px;
`;

const Ceil = styled.li<{ checked?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  > span {
    color: ${(props) => (props.checked ? '#0094FF' : '')};
  }

  :nth-child(1) {
    max-width: 250px;
    width: 100%;
  }
  :nth-child(2) {
    max-width: 270px;
    width: 100%;
  }
  :nth-child(3) {
    max-width: 270px;
    width: 100%;
  }
  :nth-child(4) {
    max-width: 230px;
    width: 100%;
  }
`;

const TableRow = styled.ul`
  margin: 0;
  padding: 0;
  text-indent: 0;
  list-style-type: none;

  display: flex;
  padding: 20px;

  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #000000;
  background: #ffffff;
  margin-bottom: 2px;
  cursor: pointer;
`;

const TableHeader = styled(TableRow)`
  cursor: auto;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 16px;

  color: #000000;

  background: #ebebf2;
  margin-bottom: 0px;

  @media ${Device.mobile} {
    display: none;
  }
`;

const TableCard = styled(Card)`
  background: transparent;
  box-shadow: 0px 40px 40px -40px rgba(220, 220, 232, 0.5);
  border-radius: 4px;
  margin-bottom: 40px;
`;

const MobileCard = styled.div`
  width: 100;
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.white};
  padding: 20px;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
`;


const MobileRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const MobileRowItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
