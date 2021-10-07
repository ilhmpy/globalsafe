import React, { FC, useState } from 'react';
import * as S from './S.el';
import {
  LeftSide,
  RightSide,
  TabNavItem,
  TabsBlock,
  Text,
  Title,
} from '../../../components/ui';
import { Button } from '../../../../../components/Button/V2/Button';
import { useHistory } from 'react-router';
import { DeleteOrderModal } from '../modals/DeleteOrderModal';
import { DeleteOrderSuccessModal } from '../modals/DeleteOrderSuccessModal';
import { DeleteOrderErrorModal } from '../modals/DeleteOrderErrorModal';
import { routers } from '../../../../../constantes/routers';
 
export const NewOrderCard: FC = () => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);

  return (
    <S.Container>
      <LeftSide bg={'#EAEFF4'}>
        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10} black>Аккаунт:</Text>
          <Title lH={28}>viproller777</Title>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10} black>Рейтинг аккаунта:</Text>
          <Title lH={28}>5.0</Title>
        </S.BlockWrapper>

      </LeftSide>

      <RightSide>
        <TabsBlock>
            <TabNavItem to={routers.p2pchangesNewOrder} exact>
              <div>Покупка</div>
            </TabNavItem>

            <TabNavItem to={routers.p2pchangesOwn} exact>
              <div>Продажа</div>
            </TabNavItem>

          </TabsBlock>
      
          <Button primary onClick={() => setShowModal(true)}>
            Опубликовать ордер
          </Button>
      </RightSide>
    </S.Container>
  );
};
