import React, { useState } from 'react';
import { Container } from '../../../components/UI/Container';
import { Heading } from '../components/Heading';
import { useHistory } from 'react-router-dom';
import { routers } from '../../../constantes/routers';
import { TabNavItem, TabsBlock, Text, FilterButton } from '../components/ui';
import * as S from './S.el';
// import { Button } from '../../../components/Button/V2/Button';
import { OwnActiveExchangesTable } from './components/OwnActiveExchangesTable/OwnActiveExchangesTable';
import { OwnArchivedExchangesTable } from './components/OwnArchivedExchangeTable/OwnArchivedExchangeTable';

export const OwnExchanges = () => {
  const history = useHistory();
  const [activeFilter, setActiveFilter] = useState<'active' | 'archived'>('active');

  return (
    <div>
      <Container>
        <Heading
          onClick={() => history.push(routers.p2pchangesNewOrder)}
          title="P2P обмены"
          btnText="Опубликовать ордер"
        />
        <S.SubHeader>
          <TabsBlock>
            <TabNavItem to={routers.p2pchanges} exact>
              <div>Объявления</div>
            </TabNavItem>

            <TabNavItem to={routers.p2pchangesOwn} exact>
              <div>Мои обмены</div>
            </TabNavItem>

            <TabNavItem to={routers.certificates} exact>
              <div>Сертификаты</div>
            </TabNavItem>
          </TabsBlock>
          <Text size={14} lH={16} weight={500} black>
            Рейтинг аккаунта: 5.0
          </Text>
        </S.SubHeader>

        <S.Filters>
          <FilterButton
            active={activeFilter === 'active'}
            onClick={() => setActiveFilter('active')}
          >
            Активные
          </FilterButton>
          <FilterButton
            active={activeFilter === 'archived'}
            onClick={() => setActiveFilter('archived')}
          >
            Архив
          </FilterButton>
          <S.Line />
          <FilterButton active>Все валюты</FilterButton>
          <S.Line />
          <FilterButton active>Все методы оплаты</FilterButton>
          <S.Line />
          <FilterButton active>Все Статусы</FilterButton>
        </S.Filters>

        {activeFilter === 'active' && <OwnActiveExchangesTable />}
        {activeFilter === 'archived' && <OwnArchivedExchangesTable />}
        {/* <S.ButtonWrap>
          <Button>Показать еще</Button>
        </S.ButtonWrap> */}
      </Container>
    </div>
  );
};
