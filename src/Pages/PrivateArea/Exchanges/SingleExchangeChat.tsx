import React, { FC, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Container } from '../../../components/UI/Container';
import { Back } from '../components/Back';
import { Title } from '../components/ui/Title';
import { Text } from '../components/ui/Text';
import * as S from './S.el';
import { routers } from '../../../constantes/routers';
import { ExchangeChatCard } from './components/ExchangeChatCard';
import { RouteComponentProps } from 'react-router-dom';
import { AppContext } from '../../../context/HubContext';
import { ViewExchangeModel } from '../../../types/exchange';
import { Balance } from '../../../types/balance';
import { FiatKind } from '../../../types/fiatKind';
import { Loader } from '../../../components/Loader/Loader';

type PropsMatch = {
  slug: string;
};

export const SingleExchangeChat = ({ match }: RouteComponentProps<PropsMatch>) => {
  const [exchange, setExchange] = useState<ViewExchangeModel | null>(null);
  const [loader, setLoader] = useState(true);
  const history = useHistory();
  const safeId = match.params.slug;
  const { hubConnection } = useContext(AppContext);

  useEffect(() => {
    if (hubConnection && safeId) {
      (async () => {
        try {
          const res = await hubConnection.invoke('GetExchange', safeId);
          if (res) {
            setExchange(res);
            console.log('GetExchange', res);
          }
        } catch (e) {
          console.log(e);
        } finally {
          setLoader(false);
        }
      })();
    }
  }, [hubConnection, safeId]);

  return (
    <S.Container>
      <Container pNone>
        <S.Heading>
          <Back text="Назад к обмену" onGoBackClick={() => history.goBack()} />
          <S.TitleContainer>
            {exchange && (
              <Title mB={0}>
                Чат в рамках обмена {Balance[exchange.assetKind]} -{' '}
                {FiatKind[exchange.exchangeAssetKind]}
              </Title>
            )}
            <Text size={14} sizeMobile={12} lH={20} black weightMobile={300}>
              № {safeId}
            </Text>
          </S.TitleContainer>
        </S.Heading>
        {loader ? <Loader /> : <ExchangeChatCard exchange={exchange} />}
      </Container>
    </S.Container>
  );
};
