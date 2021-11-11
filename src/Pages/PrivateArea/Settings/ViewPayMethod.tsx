import { FC, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../../../components/Button/V2/Button';
import { Switcher } from '../../../components/Switcher';
import { routers } from '../../../constantes/routers';
import { AppContext } from '../../../context/HubContext';
import { Container } from '../../../globalStyles';
import { Back } from '../components/Back';
import { Title } from '../components/ui/Title';
import { DeleteModal } from './DeleteModal';
import { DeleteNotification } from './DeleteNotification';
import { SettingsContext } from '../../../context/SettingsContext';
import { PaymentMethodKind, CollectionPayMethod } from '../../../types/paymentMethodKind';
import { PaymentMethodState } from '../../../types/paymentMethodState';
import { FiatKind } from '../../../types/fiatKind';
import { payList } from './utils';
import { DontDeleteModal } from './DontDeleteModal';
import { Device } from '../consts';

type PropsMatch = {
  slug: string;
};

type PayMethod = {
  bankNumber?: string;
  name?: string;
  bankName?: string;
  paymentAddress?: string;
  assetKind?: number;
};

export const ViewPayMethod = ({ match }: RouteComponentProps<PropsMatch>) => {
  const appContext = useContext(AppContext);
  const { chosenMethod, setChosenMethod, user, hubConnection } = appContext;
  const { t } = useTranslation();
  const id = match.params.slug;
  const history = useHistory();
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [deleteNotificationIsOpen, setDeleteNotificationIsOpen] = useState(false);
  const [userMethod, setUserMethod] = useState<null | CollectionPayMethod>(null);
  const [dontDeleteModal, setDontDeleteModal] = useState(false);
  const { userPaymentsMethod, setUserPaymentsMethod, usePaymentMethods } =
    useContext(SettingsContext);

  useEffect(() => {
    if (!userPaymentsMethod.length) {
      history.push(routers.settings);
    } else {
      const obj = userPaymentsMethod.filter((i) => i.safeId === id)[0];
      setUserMethod(obj);
    }
  }, [userPaymentsMethod, id]);

  if (!userMethod) {
    return null;
  }

  const payMethod: PayMethod = JSON.parse(userMethod?.data);

  const adjustPaymentMethod = async (id: number) => {
    if (!hubConnection) return;
    try {
      await hubConnection.invoke('AdjustStatePaymentMethod', userMethod.safeId, id);
    } catch (e) {
      console.log(e);
    }
  };

  const active = (item: CollectionPayMethod) => {
    const isHave = usePaymentMethods
      ? usePaymentMethods.filter((i) => i.safeId === item.safeId)
      : [];

    if (isHave.length) {
      setDontDeleteModal(true);
      return;
    }
    const key = userPaymentsMethod.findIndex((i) => i.safeId === item.safeId);
    if (item.state === PaymentMethodState.Active) {
      adjustPaymentMethod(PaymentMethodState.Disabled);
      setUserPaymentsMethod([
        ...userPaymentsMethod.slice(0, key),
        { ...item, state: PaymentMethodState.Disabled },
        ...userPaymentsMethod.slice(key + 1),
      ]);
    } else {
      adjustPaymentMethod(PaymentMethodState.Active);
      setUserPaymentsMethod([
        ...userPaymentsMethod.slice(0, key),
        { ...item, state: PaymentMethodState.Active },
        ...userPaymentsMethod.slice(key + 1),
      ]);
    }
  };

  const deletePayMethod = () => {
    const isHave = usePaymentMethods
      ? usePaymentMethods.filter((i) => i.safeId === userMethod?.safeId)
      : [];

    if (isHave.length) {
      setDontDeleteModal(true);
      return;
    } else {
      setDeleteNotificationIsOpen(true);
      adjustPaymentMethod(PaymentMethodState.Removed);
    }
  };

  const isHaveDeleteMethod = () => {
    const isHave = usePaymentMethods
      ? usePaymentMethods.filter((i) => i.safeId === userMethod?.safeId)
      : [];

    if (isHave.length) {
      setDontDeleteModal(true);
      return;
    } else {
      setDeleteModalIsOpen(true);
    }
  };

  return (
    <Container pNone>
      <DeleteModal
        data={userMethod}
        open={deleteModalIsOpen}
        setOpen={setDeleteModalIsOpen}
        setConfirm={deletePayMethod}
      />
      <DeleteNotification
        data={userMethod}
        open={deleteNotificationIsOpen}
        setOpen={setDeleteNotificationIsOpen}
      />
      <DontDeleteModal open={dontDeleteModal} setOpen={setDontDeleteModal} />

      <Container>
        <Back
          text="К списку платежных методов"
          onGoBackClick={() => history.push(routers.settings)}
          btnText={'Добавить платежный метод'}
          onButtonClick={() => history.push(routers.settingsNewPayMethod)}
        />

        <TitleWrapper>
         <Title mB={0} heading2>
            {' '}
            {userMethod && !payMethod.paymentAddress ? (
              <>Платежный метод {payList[userMethod.kind]}</>
            ) : payMethod.paymentAddress ? (
              <>Криптокошелек {payList[userMethod.kind]}</>
            ) : (
              ''
            )}
          </Title>
        </TitleWrapper>
      </Container>
      {userMethod ? (
        <Blocks>
          <LeftSide>
            <Entry>
              <span>Аккаунт:</span>
              <span>{user}</span>
            </Entry>
            <Entry>
              <span>Рейтинг аккаунта:</span>
              <span>5.0</span>
            </Entry>
          </LeftSide>

          <RightSide>
            <Entry>
              <span>Платежный метод:</span>
              <span>{payList[userMethod.kind]}</span>
            </Entry>
            <Entry>
              <span>Валюта:</span>
              <span>{FiatKind[userMethod.assetKind]}</span>
            </Entry>
            {payMethod.bankNumber ? (
              <Entry>
                <span>Номер карты:</span>
                <span>{payMethod.bankNumber}</span>
              </Entry>
            ) : null}

            {payMethod.name ? (
              <Entry>
                <span>Держатель карты:</span>
                <span>{payMethod.name}</span>
              </Entry>
            ) : null}
            {payMethod.paymentAddress ? (
              <Entry>
                <span>Адрес кошелька:</span>
                <span>{payMethod.paymentAddress}</span>
              </Entry>
            ) : null}
            <Entry>
              <span>Активность метода:</span>
              <SwitcherRow checked={userMethod.state === PaymentMethodState.Active}>
                <Switcher
                  onChange={() => active(userMethod)}
                  checked={userMethod.state === PaymentMethodState.Active}
                />
                <span>
                  {t(
                    userMethod.state === PaymentMethodState.Active
                      ? 'depositsPrograms.on'
                      : 'depositsPrograms.off'
                  )}
                </span>
              </SwitcherRow>
            </Entry>

            <ButtonWrapper>
              <Button bigSize outlinePrimary fullWidthMobile onClick={isHaveDeleteMethod}>
                Удалить
              </Button>
            </ButtonWrapper>
          </RightSide>
        </Blocks>
      ) : null}
    </Container>
  );
};

const TitleWrapper = styled.div`
  margin: 0px 0px 20px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  max-width: 96px;
  margin-top: 20px;
  @media ${Device.mobile} {
    max-width: 100%;
  }
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
  }
`;

const Blocks = styled.div`
  display: flex;
  margin-bottom: 40px;

  @media ${Device.mobile} {
    flex-direction: column-reverse;
  }
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

  @media ${Device.tablet} {
    min-width: 300px;
  }

  @media ${Device.mobile} {
    min-width: 320px;
    width: 100%;
    padding: 20px;
  }
`;

const Entry = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

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

  @media ${Device.mobile} {
    width: 100%;
    max-width: 100%;
    padding: 20px;
  }

  ${Entry} {
    gap: 4px;
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
