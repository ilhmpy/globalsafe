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
  const [exchange, setExchange] = useState<ViewExchangeModel | null>(null);
  const { exchangeId } = match.params;
  const { hubConnection, account } = useContext(AppContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [call, setCall] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [showRejectModal, setShowRejectModal] = useState<boolean>(false);
  const buyer = () => {
    return (
      (exchange && exchange.kind === 0 && exchange.ownerSafeId !== account.safeId) ||
      (exchange && exchange.kind === 1 && exchange.ownerSafeId === account.safeId)
    );
  };

  const [owner, setOwner] = useState<'seller' | 'buyer'>(buyer() ? 'buyer' : 'seller');

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

  return (
    <S.Container>
      {loading ? <Loading /> : (
        <>
          {exchange === null ? <NotItems text="Не имеется информации по этому обмену" /> : (
            <>
              <Container>
                <Back text="К списку обменов" onGoBackClick={() => history.replace(routers.p2pchangesOwn)} />
                <S.TitleContainer>
                    <Title mB={0}>Обмен {`${Balance[exchange.assetKind]}-${FiatKind[exchange.exchangeAssetKind]}`}</Title>
                    <Text size={14} lH={20} black>
                      № {exchange.safeId}
                    </Text>
                </S.TitleContainer>
                <ExchangeDetailCard setCall={setCall} 
                  setShowSuccessModal={setShowSuccessModal} 
                  setShowRejectModal={setShowRejectModal}
                  showSuccessModal={showSuccessModal} 
                  showRejectModal={showRejectModal}
                  exchange={exchange}
                  setExchange={setExchange}
                  owner={owner}
                  setLoading={setLoading}
                  exchangeId={exchangeId}
                />
              </Container>
            </>
          )}
        </>
      )}
    </S.Container>
  );
};