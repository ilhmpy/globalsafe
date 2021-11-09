import { ChangeEvent, FC, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';

import { Button } from '../../../components/Button/V2/Button';
import { Input } from '../../../components/Input';
import { Select } from '../../../components/Select/Select5';
import { Switcher } from '../../../components/Switcher';
import { routers } from '../../../constantes/routers';
import { AppContext } from '../../../context/HubContext';
import { Container } from '../../../globalStyles';
import { Balance } from '../../../types/balance';
import { FiatKind } from '../../../types/fiatKind';
import { PaymentMethodKind } from '../../../types/paymentMethodKind';
import { Back } from '../components/Back';
import { Title } from '../components/ui/Title';


type dataBank = {
  name: string;
  bankName: string;
  bankNumber: string;
};

type dataCripto = {
  paymentAddress: string;
};

export const NewPayMethod: FC = () => {
  const query = new URLSearchParams(useLocation().search);

  const keysPay = Object.keys(PaymentMethodKind).filter(
    (k) => typeof PaymentMethodKind[k as any] === 'number'
  );

  const payList = keysPay.map((i) => {
    if (i === PaymentMethodKind[0]) {
      return PaymentMethodKind[0];
    }
    if (i === PaymentMethodKind[1]) {
      return PaymentMethodKind[1];
    }
    if (i === PaymentMethodKind[2]) {
      return PaymentMethodKind[2];
    }
    if (i === PaymentMethodKind[3]) {
      return 'АО «Тинькофф Банк»';
    }
    if (i === PaymentMethodKind[4]) {
      return 'ПАО Сбербанк';
    }
    if (i === PaymentMethodKind[5]) {
      return 'АО «Альфа-Банк»';
    } else {
      return '';
    }
  });

  const { t } = useTranslation();
  const { hubConnection, user } = useContext(AppContext);
  const keys = [
    FiatKind[0],
    FiatKind[1],
    FiatKind[2],
    FiatKind[3],
    FiatKind[4],
    FiatKind[5],
    FiatKind[6],
  ];
  const [bankName, setBankName] = useState(payList[0]);
  const [name, setName] = useState('');
  const [bankNumber, setBankNumber] = useState('');
  const [checked, setChecked] = useState(true);
  const [balanceType, setBalanceType] = useState(keys[0]);
  const [payAddress, setPayAddress] = useState('');
  const [kind, setKind] = useState<PaymentMethodKind | number>(PaymentMethodKind.ERC20);

  const isUSDT = [PaymentMethodKind[0], PaymentMethodKind[1], PaymentMethodKind[2]].includes(
    bankName
  );
  console.log('bankName', bankName);
  console.log('balanceType', balanceType);
  const addPayMethod = () => {
    if (isUSDT) {
      return {
        paymentAddress: payAddress,
      };
    } else {
      return {
        name,
        bankName,
        bankNumber,
      };
    }
  };

  const history = useHistory();

  const newMethod = {
    state: 1,
    kind: kind,
    assetKind: balanceType ? keys.findIndex((i) => i === balanceType) : 2,
    data: JSON.stringify(addPayMethod()),
  };

  const changeTypeMethod = (str: string) => {
    const id = payList.findIndex((i) => i === str);
    setBankName(str);
    setKind(id);
  };

  const addPaymentMethod = async () => {
    if (hubConnection) {
      try {
        await hubConnection.invoke(
          'AddPaymentMethod',
          kind,
          balanceType === FiatKind[7]
            ? FiatKind.USDT
            : balanceType
            ? keys.findIndex((i) => i === balanceType)
            : 2,
          checked ? 1 : 2,
          JSON.stringify(addPayMethod())
        );

        if(query.get('redirect')) {
          history.goBack();
        } else {
          history.push(routers.settings);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    if (isUSDT) {
      setBalanceType(FiatKind[7]);
    } else {
      setBalanceType(FiatKind[0]);
    }
  }, [isUSDT]);

  return (
    <Container>
      <Back text="Назад" onGoBackClick={() => history.push(routers.settings)} />

      <TitleWrapper>
        <Title>Добавление платежного метода</Title>
      </TitleWrapper>

      <Blocks>
        <LeftSide>
          <Entry>
            <span>Аккаунт:</span>
            <span>{user}</span>
          </Entry>
          <Entry>
            <span>Рейтинг аккаунта:</span>
            <span>0</span>
          </Entry>
        </LeftSide>

        <RightSide>
          <Entry>
            <span>Платежный метод:</span>
            <Select
              options={payList}
              selectedOption={bankName}
              setSelectedOption={(val: string) => changeTypeMethod(val)}
            />
          </Entry>
          <Entry>
            <span>Валюта:</span>
            <Select
              options={isUSDT ? [FiatKind[7]] : keys}
              selectedOption={balanceType}
              setSelectedOption={setBalanceType}
            />
          </Entry>
          {/* <Entry>
            <span>Номер карты:</span>
            <Input
              name="toSum"
              value={bankNumber}
              onChange={(e) => setBankNumber(e.target.value)}
            />
          </Entry>
          <Entry>
            <span>Держатель карты:</span>
            <Input name="toSum" value={name} onChange={(e) => setName(e.target.value)} />
          </Entry> */}
          {isUSDT ? (
            <Entry>
              <span>Адрес кошелька:</span>
              <Input
                name="toSum"
                value={payAddress}
                onChange={(e) => setPayAddress(e.target.value)}
              />
            </Entry>
          ) : (
            <>
              <Entry>
                <span>Номер карты:</span>
                <NumberField
                  value={bankNumber}
                  onChange={(e: any) => setBankNumber(e.target.value)}
                  format="#### #### #### ####"
                />
              </Entry>
              <Entry>
                <span>Держатель карты:</span>
                <Input name="toSum" value={name} onChange={(e) => setName(e.target.value)} />
              </Entry>
            </>
          )}
          <Entry sm>
            <span>Активность метода:</span>

            <SwitcherRow checked={checked}>
              <Switcher
                onChange={() => {
                  setChecked(!checked);
                }}
                checked={checked}
              />
              <span>{t(checked ? 'depositsPrograms.on' : 'depositsPrograms.off')}</span>
            </SwitcherRow>
          </Entry>

          <ButtonWrapper>
            <Button
              bigSize
              primary
              as="button"
              disabled={
                isUSDT ? payAddress.trim() === '' : bankNumber.length < 16 || name.trim() === ''
              }
              onClick={addPaymentMethod}
            >
              Сохранить
            </Button>
            <Button bigSize outlinePrimary onClick={() => history.push(routers.settings)}>
              Отмена
            </Button>
          </ButtonWrapper>
        </RightSide>
      </Blocks>
    </Container>
  );
};

const TitleWrapper = styled.div`
  margin: 0px 0px 20px;
`;

const NumberField = styled(NumberFormat)`
  background: #f9fafb;
  border: 1px solid #edf0f7;
  box-sizing: border-box;
  border-radius: 4px;
  width: 300px;
  padding: 12px;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: #000000;
  font-family: 'Roboto', sans-serif;
  &:focus {
    outline: none;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  margin-top: 18px;
`;
const SwitcherRow = styled.div<{ checked?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;

  > span {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    display: flex;
    align-items: center;

    color: ${(props) => (props.checked ? '#0094FF' : '')};

    &:hover {
      color: ${(props) => (props.checked ? '#0094FF' : '#52515F')};
    }
  }
`;

const Blocks = styled.div`
  display: flex;
  margin-bottom: 40px;
`;
const LeftSide = styled.div`
  width: calc(100% - 700px);
  background: #eaeff4;
  box-shadow: 0px 40px 40px -40px rgba(220, 220, 232, 0.5);
  border-radius: 4px;

  padding: 40px;

  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const Entry = styled.div<{ sm?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => (props.sm ? '5px' : '10px')};

  & > span {
    :nth-child(1) {
      font-weight: 300;
      font-size: 14px;
      line-height: 20px;

      color: #000000;
    }
    :nth-child(2) {
      font-weight: bold;
      font-size: 24px;
      line-height: 28px;
      display: flex;
      align-items: center;

      color: #3f3e4e;
    }
  }
`;
const RightSide = styled.div`
  max-width: 700px;
  width: 100%;
  padding: 40px;

  display: flex;
  flex-direction: column;
  gap: 20px;

  background: #ffffff;
  box-shadow: 0px 40px 40px -40px rgba(220, 220, 232, 0.5);
  border-radius: 0px 4px 4px 0px;

  ${Entry} {
    max-width: 300px;
    width: 100%;
    & > span {
      :nth-child(2) {
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;

        color: #000000;
      }
    }
  }
`;
