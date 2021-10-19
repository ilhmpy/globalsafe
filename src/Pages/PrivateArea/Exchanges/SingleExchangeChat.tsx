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
import axios from 'axios';
import { API_URL } from '../../../constantes/api';
import useLocalStorage from '../../../hooks/useLocalStorage';

type PropsMatch = {
  slug: string;
};

export const SingleExchangeChat = ({ match }: RouteComponentProps<PropsMatch>) => {
  const [exchange, setExchange] = useState<ViewExchangeModel | null>(null);
  const history = useHistory();
  const safeId = match.params.slug;
  const { hubConnection } = useContext(AppContext);
  const [myToken] = useLocalStorage('token');
  console.log('safeId', safeId);

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
        }
      })();
    }
  }, [hubConnection, safeId]);

  const fetchText = async (str: string) => {
    try {
      const res = await axios.put(
        `${API_URL}/v1/exchange/${exchange?.safeId}/chat/text?access_token=${myToken}`,
        str,
        {
          headers: {
            'Content-Type': 'text/plain',
          },
        }
      );

      // scrollto();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPicture = async (img: any) => {
    const formData = new FormData();
    formData.append('file', img);

    try {
      const res = await axios.post(
        `${API_URL}/v1/exchange/${exchange?.safeId}/chat/picture?access_token=${myToken}`,
        formData
      );

      // scrollto();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <S.Container>
      <Container>
        <Back text="Назад к обмену" onGoBackClick={() => history.goBack()} />
        <S.TitleContainer>
          {exchange && (
            <Title mB={0}>
              Чат в рамках обмена {Balance[exchange.assetKind]} -{' '}
              {FiatKind[exchange.exchangeAssetKind]}
            </Title>
          )}
          <Text size={14} lH={20} black>
            № {safeId}
          </Text>
        </S.TitleContainer>

        <ExchangeChatCard exchange={exchange} />
      </Container>
    </S.Container>
  );
};
