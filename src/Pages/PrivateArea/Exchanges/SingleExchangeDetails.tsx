import { useEffect, useState, useContext } from 'react';
import { useHistory, RouteComponentProps } from 'react-router-dom';

import { Container } from '../../../components/UI/Container';
import { Back } from '../components/Back';
import { Title } from '../components/ui/Title';
import { Text } from '../components/ui/Text';
import * as S from './S.el';
import { ExchangeDetailCard } from './components/ExchangeDetailCard';
import { routers } from '../../../constantes/routers';
import { ViewExchangeModel } from '../../../types/exchange';
import { AppContext } from '../../../context/HubContext';
import { Loading, NotItems } from "../components/Loading/Loading";
import { Balance } from "../../../types/balance";
import { FiatKind } from "../../../types/fiat";
import { PaymentMethodKind } from "../../../types/paymentMethodKind";

type PropsMatch = {
  exchangeId: string;
};

export const SingleExchangeDetails = ({ match }: RouteComponentProps<PropsMatch>) => {
  const history = useHistory();
  const [exchange, setExchange] = useState<ViewExchangeModel | undefined>();
  const { exchangeId } = match.params;
  const { hubConnection } = useContext(AppContext);
  const [loading, setLoading] = useState<boolean>(false);

  function getExchange(loading: boolean) {
    if (hubConnection) {
      setLoading(loading);
      hubConnection.invoke("GetExchange", exchangeId)
        .then((res) => {
          console.log(res);
          setExchange(res);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        })
    };
  };

  useEffect(() => {
    if (hubConnection) {
      getExchange(true);
    };
  }, [hubConnection]);

  function cb() {
    console.log("ExchangeChanged")
    getExchange(false);
  };

  useEffect(() => {
    if (hubConnection) {
      hubConnection.on("ExchangeCompleted", cb);
      hubConnection.on("BuyOrderCompleted", cb);
      hubConnection.on("ExchangeConfirmationRequired", cb);
      hubConnection.on("ExchangeAbused", cb);
    };
    return () => {
      hubConnection?.off("ExchangeCompleted", cb);
      hubConnection?.off("BuyOrderCompleted", cb);
      hubConnection?.off("ExchangeConfirmationRequired", cb);
      hubConnection?.off("ExchangeAbused", cb);
    };
  }, [hubConnection]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection.on("ExchangedCancelled", cb);
    } 
    return () => {
      hubConnection?.off("ExchangedCancelled", cb);
    };
  }, [hubConnection]);

  return (
    <S.Container>
      {loading ? <Loading /> : (
        <>
          {exchange === undefined ? <NotItems text="Не имеется информации по этому обмену" /> : (
            <>
              <Container>
                <Back text="К списку обменов" onGoBackClick={() => history.replace(routers.p2pchangesOwn)} />
                <S.TitleContainer>
                    <Title mB={0}>Обмен {`${Balance[exchange.assetKind]}-${FiatKind[exchange.exchangeAssetKind]}`}</Title>
                    <Text size={14} lH={20} black>
                      № {exchange.id}
                    </Text>
                </S.TitleContainer>
                <ExchangeDetailCard exchange={exchange} />
              </Container>
            </>
          )}
        </>
      )}
    </S.Container>
  );
};