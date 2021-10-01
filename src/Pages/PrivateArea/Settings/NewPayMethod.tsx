import { FC } from 'react';
import { routers } from '../../../constantes/routers';
import { Card, Container } from '../../../globalStyles';
import { Back } from '../components/Back';
import { useHistory } from 'react-router-dom';

export const NewPayMethod: FC = () => {
  const history = useHistory();

  return (
    <Container>
      <Back
        text="К списку платежных методов"
        onGoBackClick={() => history.push(routers.settings)}
      />

      {/* <TitleWrapper>
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
                  console.log(111);
                  setChosenMethod((prev: any) => ({ ...prev, isActive: !prev.isActive }));
                }}
                checked={isActive}
              />
              <span>{t(isActive ? 'depositsPrograms.on' : 'depositsPrograms.off')}</span>
            </SwitcherRow>
          </Entry>

          <ButtonWrapper>
            <Button bigSize outlinePrimary onClick={() => undefined}>
              Удалить
            </Button>
          </ButtonWrapper>
        </RightSide>
      </Blocks>
     */}
    </Container>
  );
};
