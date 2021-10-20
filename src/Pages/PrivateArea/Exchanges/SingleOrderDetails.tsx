import React, { FC, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Container } from '../../../components/UI/Container';
import { Back } from '../components/Back';
import { Title } from '../components/ui/Title';
import { Text } from '../components/ui/Text';
import * as S from './S.el';
import { routers } from '../../../constantes/routers';
import { PrivateAreaContext } from '../../../context/PrivateAreaContext';
import { Balance } from '../../../types/balance';
import { FiatKind } from '../../../types/fiatKind';
import { OrderType } from '../../../types/orders';
import { OrderDetailsCard } from './components/OrderDetailsCard';

export const SingleOrderDetails: FC = () => {
  const history = useHistory();
  const { currentOrder, setCurrentOrder, currentOrderType, setCurrentOrderType } =
    useContext(PrivateAreaContext);

  console.log('currentOrder', currentOrder);
  console.log('currentOrderType', currentOrderType);

  const handleGoBack = () => {
    setCurrentOrder(null);
    setCurrentOrderType(undefined);
    history.replace(routers.p2pchanges);
  };

  useEffect(() => {
    return () => {
      setCurrentOrder(null);
      setCurrentOrderType(undefined);
    };
  }, []);

  if (!currentOrder || !currentOrderType) {
    history.replace(routers.p2pchanges);
    return null;
  }

  return (
    <S.Container>
      <Container>
        <Back text="К списку ордеров" onGoBackClick={handleGoBack} />
        <S.TitleContainer>
          <Title mB={0}>
            {`Ордер на ${currentOrderType === OrderType.Buy ? 'покупку' : 'продажу'} ${
              Balance[currentOrder.assetKind]
            }-${FiatKind[currentOrder.operationAssetKind]}`}
          </Title>
          <Text size={14} lH={20} black>
            {`№ ${currentOrder.safeId}`}
          </Text>
        </S.TitleContainer>

        <OrderDetailsCard order={currentOrder} orderType={currentOrderType} />
      </Container>
    </S.Container>
  );
};
