import React from 'react';
import { Container } from '../../../components/UI/Container';
import { Heading } from '../components/Heading';
import { useHistory } from 'react-router-dom';
import { routers } from '../../../constantes/routers';
import { TabNavItem, TabsBlock, Text, Chip, FilterButton } from '../components/ui';
import * as S from './S.el';
import { AdvertTable } from './components/AdvertTable/AdvertTable';
import { Button } from '../../../components/Button/V2/Button';

export const Advert = () => {
  const history = useHistory();
  return (
    <div>
      <Container>
        <Heading
          onClick={() => history.push(routers.orderCreate)}
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
