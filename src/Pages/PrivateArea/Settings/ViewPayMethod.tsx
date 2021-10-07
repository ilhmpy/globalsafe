import { FC, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
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

export const ViewPayMethod: FC = () => {
  const appContext = useContext(AppContext);
  const { chosenMethod, setChosenMethod } = appContext;
  const { method, cardHolder, cardNumber, currency, isActive } = chosenMethod;
  const { t } = useTranslation();
  const history = useHistory();
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [deleteNotificationIsOpen, setDeleteNotificationIsOpen] = useState(false);

  return (
    <Container>
      <DeleteModal
        open={deleteModalIsOpen}
        setOpen={setDeleteModalIsOpen}
        setConfirm={setDeleteNotificationIsOpen}
      />
      <DeleteNotification open={deleteNotificationIsOpen} setOpen={setDeleteNotificationIsOpen} />

      <Back
        text="К списку платежных методов"
        onGoBackClick={() => history.push(routers.settings)}
        btnText={'Добавить платежный метод'}
        onButtonClick={() => history.push(routers.settingsNewPayMethod)}
      />

      <TitleWrapper>
        <Title>Платежный метод АО «Тинькофф Банк»</Title>
      </TitleWrapper>

      <Blocks>
        <LeftSide>
          <Entry>
            <span>Аккаунт:</span>
            <span>viproller777</span>
          </Entry>
          <Entry>
            <span>Рейтинг аккаунта:</span>
            <span>5.0</span>
          </Entry>
        </LeftSide>

        <RightSide>
          <Entry>
            <span>Платежный метод:</span>
            <span>{method}</span>
          </Entry>
          <Entry>
            <span>Валюта:</span>
            <span>{currency}</span>
          </Entry>
          <Entry>
            <span>Номер карты:</span>
            <span>{cardNumber}</span>
          </Entry>
          <Entry>
            <span>Держатель карты:</span>
            <span>{cardHolder}</span>
          </Entry>
          <Entry>
            <span>Активность метода:</span>

            <SwitcherRow checked={isActive}>
              <Switcher
                onChange={() => {
                  setChosenMethod((prev: any) => ({ ...prev, isActive: !prev.isActive }));
                }}
                checked={isActive}
              />
              <span>{t(isActive ? 'depositsPrograms.on' : 'depositsPrograms.off')}</span>
            </SwitcherRow>
          </Entry>

          <ButtonWrapper>
            <Button bigSize outlinePrimary onClick={() => setDeleteModalIsOpen(true)}>
              Удалить
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

const ButtonWrapper = styled.div`
  width: 100%;
  max-width: 96px;
  margin-top: 20px;
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
