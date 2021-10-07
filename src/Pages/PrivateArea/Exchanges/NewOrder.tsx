import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

import { Container } from '../../../components/UI/Container';
import { Back } from '../components/Back';
import { Title } from '../components/ui/Title';
import * as S from './S.el';
import { NewOrderCard } from './components/NewOrderCard';

export const NewOrder: FC = () => {
  const history = useHistory();

  return (
    <S.Container>
      <Container>
        <Back text="Назад" onGoBackClick={() => history.goBack()} />
        <S.TitleContainer>
            <Title mB={0}>Публикация ордера</Title>
        </S.TitleContainer>

        <NewOrderCard />

      </Container>
    </S.Container>
  );
};