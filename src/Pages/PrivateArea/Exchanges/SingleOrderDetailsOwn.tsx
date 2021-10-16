import React, { FC, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Container } from '../../../components/UI/Container';
import { Back } from '../components/Back';
import { Title } from '../components/ui/Title';
import { Text } from '../components/ui/Text';
import * as S from './S.el';
import { OrderDetailCardOwn } from './components/OrderDetailCardOwn';
import { ExchangesInOrderTable } from './components/ExchangesInOrderTable';
import { routers } from '../../../constantes/routers';
import { PrivateAreaContext } from '../../../context/PrivateAreaContext';
import { Balance } from '../../../types/balance';
import { FiatKind } from '../../../types/fiatKind';
import { OrderType } from '../../../types/orders';

export const SingleOrderDetailsOwn: FC = () => {
  const history = useHistory();
  const { currentOrder, setCurrentOrder, currentOrderType, setCurrentOrderType } = useContext(PrivateAreaContext);
  const [activeFilter, setActiveFilter] = useState<'active' | 'archived' | 'all'>('active');

  console.log('currentOrder', currentOrder)
  console.log('currentOrderType', currentOrderType)

  const handleGoBack = () => {
    setCurrentOrder(null);
    setCurrentOrderType(undefined);
    history.replace(routers.p2pchanges);
  };

  useEffect(() => {
    return () => {
      setCurrentOrder(null);
      setCurrentOrderType(undefined);
    }
  }, []);

  if(!currentOrder || !currentOrderType) {
    history.replace(routers.p2pchanges);
    return null;
  };

  return (
    <S.Container>
      <Container>
        <Back text="Назад" onGoBackClick={handleGoBack} />
        <S.TitleContainer>
            <Title mB={0}>
              {
                `Ордер на ${currentOrderType === OrderType.Buy ? 
                'покупку' : 'продажу'} ${Balance[currentOrder.assetKind]}-${FiatKind[currentOrder.operationAssetKind]}`
              }
            </Title>
            <Text size={14} lH={20} black>
              {`№ ${currentOrder.safeId}`}
            </Text>
        </S.TitleContainer>

        <S.Container>
          <OrderDetailCardOwn order={currentOrder} orderType={currentOrderType} />
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