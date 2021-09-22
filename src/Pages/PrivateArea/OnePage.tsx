import React, { useState, useEffect, useContext } from 'react';
import { Header } from '../../components/Header/Header';
import * as Styled from './Styles.elements';
import { Card, Container, ContainerRow } from '../../globalStyles';
import { UpTitle } from '../../components/UI/UpTitle';
import { Redirect, useHistory } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { Tabs, Tab } from '../../components/UI/Tabs';
import { AppContext } from '../../context/HubContext';
import { RoundChart } from '../../components/Charts/Chart';
import { Tables } from '../../components/Table/Table';
import { InfoBlock } from '../../components/Table/TableModal';
import { RouteComponentProps, useLocation, Link } from 'react-router-dom';
import { ReactComponent as Left } from '../../assets/svg/left.svg';
import { useTranslation } from 'react-i18next';
import { ModalCancel } from '../../components/Table/ModalCancel';
import { Collection } from '../../types/info';

type PropsMatch = {
  slug: string;
};

export const OnePage = ({ match }: RouteComponentProps<PropsMatch>) => {
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
        // console.log('res', res);
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
