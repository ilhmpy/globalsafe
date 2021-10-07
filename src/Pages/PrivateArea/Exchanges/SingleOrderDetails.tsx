import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Container } from '../../../components/UI/Container';
import { Back } from '../components/Back';
import { Title } from '../components/ui/Title';
import { Text } from '../components/ui/Text';
import * as S from './S.el';
import { OrderDetailCard } from './components/OrderDetailCard';
import { ExchangesInOrderTable } from './components/ExchangesInOrderTable';

export const SingleOrderDetails: FC = () => {
  const history = useHistory();
  const [activeFilter, setActiveFilter] = useState<'active' | 'archived' | 'all'>('active');

  return (
    <S.Container>
      <Container>
        <Back text="Назад" onGoBackClick={() => history.goBack()} />
        <S.TitleContainer>
            <Title mB={0}>Ордер на покупку CWD-RUB</Title>
            <Text size={14} lH={20} black>
              № 4799646829
            </Text>
        </S.TitleContainer>

        <S.Container>
            <OrderDetailCard />
        </S.Container>

        <S.Container>
            <Title mB={20}>Обмены в рамках ордера</Title>
            <S.Filters>
                <S.FilterButton 
                    active={activeFilter === 'all'}
                    onClick={() => setActiveFilter('all')}
                >
                    Все
                </S.FilterButton>
                <S.FilterButton 
                    active={activeFilter === 'active'}
                    onClick={() => setActiveFilter('active')}
                >
                    Активные
                </S.FilterButton>
                <S.FilterButton 
                    active={activeFilter === 'archived'}
                    onClick={() => setActiveFilter('archived')}
                >
                Архив
                </S.FilterButton>
            </S.Filters>

            <ExchangesInOrderTable />
        </S.Container>
        
      </Container>
    </S.Container>
  );
};