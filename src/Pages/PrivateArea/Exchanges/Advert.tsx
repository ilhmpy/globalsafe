import React from 'react';
import { Container } from '../../../components/UI/Container';
import { Heading } from '../components/Heading';
import { useHistory } from 'react-router-dom';
import { routers } from '../../../constantes/routers';
import { TabNavItem, TabsBlock, Text, Chip } from '../components/ui';
import * as S from './S.el';

export const Advert = () => {
  const history = useHistory();
  return (
    <div>
      <Container>
        <Heading
          onClick={() => history.push(routers.depositsProgram)}
          title="P2P обмены"
          btnText="Опубликовать ордер"
        />
        <S.SubHeader>
          <TabsBlock>
            <TabNavItem to={routers.p2pchanges} exact>
              <div>Объявления</div>
            </TabNavItem>
            <TabNavItem to={routers.deposits} exact>
              <div>Мои обмены</div>
            </TabNavItem>
            <TabNavItem to={routers.deposits} exact>
              <div>Сертификаты</div>
            </TabNavItem>
          </TabsBlock>
          <Text size={16} weight={500}>
            Рейтинг аккаунта: 5.0
          </Text>
        </S.SubHeader>
        <S.Filters>

        </S.Filters>
      </Container>
    </div>
  );
};
