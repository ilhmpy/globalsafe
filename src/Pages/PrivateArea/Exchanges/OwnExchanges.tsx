import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Container } from '../../../components/UI/Container';
import { Heading } from '../components/Heading';
import { routers } from '../../../constantes/routers';
import { TabNavItem, TabsBlock, Text, FilterButton } from '../components/ui';
import * as S from './S.el';
// import { Button } from '../../../components/Button/V2/Button';
import { OwnActiveExchangesTable } from './components/OwnActiveExchangesTable/OwnActiveExchangesTable';
import { OwnArchivedExchangesTable } from './components/OwnArchivedExchangeTable/OwnArchivedExchangeTable';
import { AppContext } from '../../../context/HubContext';
import { GetExchangesCollectionResult, ViewExchangeModel } from '../../../types/exchange';

export const OwnExchanges = () => {
  const history = useHistory();
  const { hubConnection } = useContext(AppContext);
  const [activeFilter, setActiveFilter] = useState<'active' | 'archived'>('active');
  const [userExchanges, setUserExchanges] = useState<ViewExchangeModel[]>([]);

  useEffect(() => {
    if (hubConnection) {
      getGetUserExchanges();
    };
  }, [hubConnection, activeFilter]);
  
  async function getGetUserExchanges() {
    try {
      const res = await hubConnection!.invoke<GetExchangesCollectionResult>(
       'GetExchanges',
        [0, 1],
        activeFilter === 'active' ? [0, 1, 3] : [2],
        0,
        10
      );
      console.log('getGetUserExchanges', res);
      setUserExchanges(res.collection);
    } catch (err) {
      console.log(err);
    };
  };

  return (
    <div>
      <Container>
        <Heading
          onClick={() => history.push(routers.p2pchangesOrderToBuy)}
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

        {activeFilter === 'active' && <OwnActiveExchangesTable exchanges={userExchanges} />}
        {activeFilter === 'archived' && <OwnArchivedExchangesTable exchanges={userExchanges} />}
        {/* <S.ButtonWrap>
          <Button>Показать еще</Button>
        </S.ButtonWrap> */}
      </Container>
    </div>
  );
};
