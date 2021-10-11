import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Container } from '../../../components/UI/Container';
import { Heading } from '../components/Heading';
import { routers } from '../../../constantes/routers';
import { TabNavItem, TabsBlock, Text, Chip, FilterButton } from '../components/ui';
import * as S from './S.el';
import { AdvertTable } from './components/AdvertTable/AdvertTable';
import { Button } from '../../../components/Button/V2/Button';
import { AppContext } from '../../../context/HubContext';

export const Advert = () => {
  const history = useHistory();
  const { hubConnection } = useContext(AppContext);

  useEffect(() => {
    if (hubConnection) {
      getGetUserExchanges();
    }
  }, [hubConnection]);

  async function getGetUserExchanges() {
      try {
        const res = await hubConnection!.invoke<any>(
          'GetSellOrders', 
          [0, 1], 
          [0, 1, 2, 3],  
          0, 
          20
        );
        console.log('getGetUserExchanges', res);
      } catch (err) {
        console.log(err);
      }
  };

  return (
    <div>
      <Container>
        <Heading
          onClick={() => history.push(routers.p2pchangesOrderToBuy)}
          // onClick={() => history.push(routers.orderCreate)}
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
          <Text size={14} lH={16} weight={500}>
            Рейтинг аккаунта: 5.0
          </Text>
        </S.SubHeader>
        <S.Filters>
          <FilterButton active>Все объявления</FilterButton>
          <S.Line />
          <FilterButton active>Все валюты</FilterButton>
          <S.Line />
          <FilterButton active>Все методы оплаты</FilterButton>
          <S.Line />
          <FilterButton active>Все рейтинги</FilterButton>
          <S.Line />
          <FilterButton active>Покупка</FilterButton>
          <S.Line />
          <FilterButton>Продажа</FilterButton>
        </S.Filters>

        <AdvertTable />

        <S.ButtonWrap>
          <Button>Показать еще</Button>
        </S.ButtonWrap>
      </Container>
    </div>
  );
};
