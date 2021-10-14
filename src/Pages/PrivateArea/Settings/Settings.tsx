import { FC, useContext, useState, useEffect } from 'react';
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
  const { hubConnection } = appContext;

  const [activeFilter, setActiveFilter] = useState<string>('Все');
  const history = useHistory();

  const { userPaymentsMethod, setUserPaymentsMethod } = useContext(SettingsContext);

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
      console.log('res', res);
      setUserPaymentsMethod(res.collection);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const arr = () => {
      if (activeFilter === 'Все') {
        return [
          PaymentMethodKind.BankTransfer,
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
          PaymentMethodKind.BankTransfer,
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

  const adjustPaymentMethod = async (id: number, safeId: string) => {
    if (!hubConnection) return;
    try {
      await hubConnection.invoke('AdjustStatePaymentMethod', safeId, id);
    } catch (e) {
      console.log(e);
    }
  };

  const active = (item: CollectionPayMethod) => {
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

  return (
    <Container>
      <Heading
        onClick={() => history.push(routers.settingsNewPayMethod)}
        title="Настройки"
        btnText="Добавить платежный метод"
      />

      <S.Container>
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
      </S.Container>

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
`;

const TableCard = styled(Card)`
  background: transparent;
  box-shadow: 0px 40px 40px -40px rgba(220, 220, 232, 0.5);
  border-radius: 4px;
  margin-bottom: 40px;
`;
