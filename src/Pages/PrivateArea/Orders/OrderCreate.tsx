import React from 'react';
import * as S from './S.el';
import { Container } from '../../../components/UI/Container';
import { Back } from '../components/Back';
import { useHistory } from 'react-router-dom';
import { routers } from '../../../constantes/routers';
import { Title } from '../components/ui/Title';
import {
  LeftSide,
  RightSide,
  Name,
  ProgramDescTitle,
  ChipWrap,
  ProgramDesc,
  TitleWrap,
  Chip,
  Field,
  Text,
  TextBlock,
} from '../components/ui';
import { Button } from '../../../components/Button/V2/Button';
import { Tabs } from '../components/Tabs/Tabs';

export const OrderCreate = () => {
  const history = useHistory();
  return (
    <S.Container>
      <Container>
        <Back text="Назад" onGoBackClick={() => history.push(routers.depositsProgram)} />
        <Title>Публикация ордера</Title>
        <S.Main>
          <LeftSide>
            <S.BlockWrapper>
              <TitleWrap small>
                <ProgramDescTitle>Аккаунт:</ProgramDescTitle>
              </TitleWrap>
              <Text size={24} lH={28} weight={700} mB={10}>
                viproller777
              </Text>
            </S.BlockWrapper>
            <S.BlockWrapper>
              <TitleWrap small>
                <ProgramDescTitle>Рейтинг аккаунта:</ProgramDescTitle>
              </TitleWrap>
              <Text size={24} lH={28} weight={700} mB={10}>
                5.0
              </Text>
            </S.BlockWrapper>
          </LeftSide>
          <RightSide>
            <Tabs>
              <div>Покупка</div>
              <div>Продажа</div>
            </Tabs>

            <Button bigSize primary>
              Опубликовать ордер
            </Button>
          </RightSide>
        </S.Main>
      </Container>
    </S.Container>
  );
};
