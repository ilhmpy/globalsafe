import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

import { Container } from '../../../components/UI/Container';
import { Back } from '../components/Back';
import { Title } from '../components/ui/Title';
import { Text } from '../components/ui/Text';
import * as S from './S.el';
import { ExchangeDetailCard } from './components/ExchangeDetailCard';
import { routers } from '../../../constantes/routers';

export const SingleExchangeDetails: FC = () => {
  const history = useHistory();

  return (
    <S.Container>
      <Container>
        <Back text="К списку обменов" onGoBackClick={() => history.replace(routers.p2pchangesOwn)} />
        <S.TitleContainer>
            <Title mB={0}>Обмен CWD-USD</Title>
            <Text size={14} lH={20}>
              № 4799646829
            </Text>
        </S.TitleContainer>

        <ExchangeDetailCard />
        
      </Container>
    </S.Container>
  );
};