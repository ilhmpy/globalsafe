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
  const [call, setCall] = useState<boolean>(false);

  function getExchange(loading: boolean) {
    if (hubConnection) {
      setLoading(loading);
      setCall(false);
      hubConnection.invoke("GetExchange", exchangeId)
        .then((res) => {
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

  useEffect(() => {
    if (hubConnection && call === true) {
      getExchange(false);
    };
  }, [hubConnection, call]);

  function cb(res: any) {
    console.log("ExchangeChanged", res);
    if (exchange) {
      if (res.safeId === exchange.safeId) {
        setExchange(res);
      };
    };
  };

  useEffect(() => {
    if (hubConnection) {
      hubConnection.on("ExchangeAbused", cb);
    };
    return () => {
      hubConnection?.off("ExchangeAbused", cb);
    };
  }, [hubConnection]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection.on("ExchangeCancelled", cb);
    } 
    return () => {
      hubConnection?.off("ExchangeCancelled", cb);
    };
  }, [hubConnection]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection.on("ExchangeCompleted", cb);
    };
    return () => {
      hubConnection?.off("ExchangeCompleted", cb);
    };  
  }, [hubConnection]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection.on("ExchangeConfirmationRequired", cb);
    };
    return () => {
      hubConnection?.off("ExchangeConfirmationRequired", cb);
    };  
  }, [hubConnection]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection.on("BuyOrderVolumeChanged", cb);
    };
    return () => {
      hubConnection?.off("BuyOrderVolumeChanged", cb);
    };  
  }), [hubConnection];

  useEffect(() => {
    if (hubConnection) {
      hubConnection.on("SellOrderVolumeChanged", cb);
    };
    return () => {
      hubConnection?.off("SellOrderVolumeChanged", cb);
    };  
  }, [hubConnection])
  
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
                <ExchangeDetailCard setCall={setCall} exchange={exchange} />
              </Container>
            </>
          )}
        </>
      )}
    </S.Container>
  );
};