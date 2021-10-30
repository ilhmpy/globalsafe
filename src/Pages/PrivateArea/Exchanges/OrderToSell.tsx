import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

import { Container } from '../../../components/UI/Container';
import { Back } from '../components/Back';
import { Title } from '../components/ui/Title';
import * as S from './S.el';
import { OrderToSellCard } from './components/OrderToSellCard';
import { routers } from '../../../constantes/routers';

export const OrderToSell: FC = () => {
  const history = useHistory();

  return (
    <S.Container>
      <Container>
        <Back text="Назад" onGoBackClick={() => history.replace(routers.p2pchangesOwn)} />
        <S.TitleContainer>
          <Title mB={0}>Публикация ордера</Title>
        </S.TitleContainer>
      </Container>
      <Container pTabletNone pNone>  
        <OrderToSellCard />
      </Container>
    </S.Container>
  );
};