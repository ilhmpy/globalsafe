import { ChangeEvent, FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../../../components/Button/V2/Button';
import { Input } from '../../../components/Input';
import { Select } from '../../../components/Select/Select5';
import { Switcher } from '../../../components/Switcher';
import { routers } from '../../../constantes/routers';
import { Container } from '../../../globalStyles';
import { Back } from '../components/Back';
import { Title } from '../components/ui/Title';

export const NewPayMethod: FC = () => {
  const { t } = useTranslation();

  const [defaultState, setDefaultState] = useState({
    accaunt: 'viproller777',
    rating: '5.0',
    method: 'АО «Тинькофф Банк»',
    cardHolder: 'VYACHESLAV TROSCHIN',
    cardNumber: '5536 9137 9922 7240',
    currency: 'RUB',
    isActive: true,
  });
  const history = useHistory();

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
            <span>{defaultState.accaunt}</span>
          </Entry>
          <Entry>
            <span>Рейтинг аккаунта:</span>
            <span>{defaultState.rating}</span>
          </Entry>
        </LeftSide>

        <RightSide>
          <Entry>
            <span>Платежный метод:</span>
            <Select
              options={['АО «Тинькофф Банк»', 'ПАО Сбербанк', 'АО «Альфа-Банк»']}
              selectedOption={defaultState.method}
              setSelectedOption={(val: string) => setDefaultState({ ...defaultState, method: val })}
            />
          </Entry>
          <Entry>
            <span>Валюта:</span>
            <Select
              options={['RUB', 'USD', 'EUR']}
              selectedOption={defaultState.currency}
              setSelectedOption={(val: string) =>
                setDefaultState({ ...defaultState, currency: val })
              }
            />
          </Entry>
          <Entry>
            <span>Номер карты:</span>
            <Input
              name="toSum"
              value={defaultState.cardNumber}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setDefaultState({ ...defaultState, cardNumber: e.target.value })
              }
            />
          </Entry>
          <Entry>
            <span>Держатель карты:</span>
            <Input
              name="toSum"
              value={defaultState.cardHolder}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setDefaultState({ ...defaultState, cardHolder: e.target.value })
              }
            />
          </Entry>
          <Entry sm>
            <span>Активность метода:</span>

            <SwitcherRow checked={defaultState.isActive}>
              <Switcher
                onChange={() => {
                  console.log(111);
                  setDefaultState((prev: any) => ({ ...prev, isActive: !prev.isActive }));
                }}
                checked={defaultState.isActive}
              />
              <span>
                {t(defaultState.isActive ? 'depositsPrograms.on' : 'depositsPrograms.off')}
              </span>
            </SwitcherRow>
          </Entry>

          <ButtonWrapper>
            <Button bigSize primary onClick={() => history.push(routers.settings)}>
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
  }
`;

const Blocks = styled.div`
  display: flex;
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
