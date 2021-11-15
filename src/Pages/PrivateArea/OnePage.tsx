import { FC, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect, RouteComponentProps, useHistory, useLocation } from 'react-router-dom';
import { ModalCancel } from '../../components/Table/ModalCancel';
import { InfoBlock } from '../../components/Table/TableModal';
import { AppContext } from '../../context/HubContext';
import { Card, Container } from '../../globalStyles';
import { Collection } from '../../types/info';
import * as Styled from './Styles.elements';

type PropsMatch = {
  slug: string;
};

export const OnePage: FC<RouteComponentProps<PropsMatch>> = ({
  match,
}: RouteComponentProps<PropsMatch>) => {
  const [active, setActive] = useState(1);
  const [cancelModal, setCancelModal] = useState<boolean>(false);
  const [calcExchange, setCalcExchange] = useState<null | string[]>(null);
  const appContext = useContext(AppContext);
  const user = appContext.user;
  const hubConnection = appContext.hubConnection;
  const location = useLocation();
  const state = location.state as Collection;
  const history = useHistory();

  const safeId = match.params.slug;
  const { t } = useTranslation();

  const showModalCancel = () => {
    setCancelModal(true);
  };

  const calculateBalanceExchange = async (amount: string, kind: number) => {
    if (hubConnection) {
      try {
        const res = await hubConnection.invoke<string[]>('CalculateDepositExchange', amount, kind);
        setCalcExchange(res);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const depositExchange = async (amountId: string, kind: number) => {
    if (hubConnection) {
      try {
        const res = await hubConnection.invoke('DepositExchange', amountId, kind);
        // console.log('res', res);
        setCancelModal(false);
        history.push('/info/deposits');
      } catch (e) {
        console.log(e);
      }
    }
  };

  if (user === null) {
    return null;
  }

  if (user === false) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Styled.Content active={active === 1}>
        <Container>
          <Styled.Back to="/info/deposits">
            <Styled.LeftIcon />
            {t('backTo')}
          </Styled.Back>
        </Container>
        <Container>
          <ModalCancel
            depositExchange={depositExchange}
            calcExchange={calcExchange}
            calculateBalanceExchange={calculateBalanceExchange}
            data={state}
            open={cancelModal}
            onClose={() => setCancelModal(false)}
          />
          <Card>
            <InfoBlock data={state} showModalCancel={showModalCancel} />
          </Card>
        </Container>
      </Styled.Content>
    </>
  );
};
