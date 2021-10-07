import React, { FC } from 'react';
import { NavLink, Route, Switch, useHistory } from 'react-router-dom';
import { OnePage } from './OnePage';
import { Settings } from './Settings';
import { NewPayMethod } from './Settings/NewPayMethod';
import { ViewPayMethod } from './Settings/ViewPayMethod';
import * as Styled from './Styles.elements';
import { Footer } from '../../components/Footer/Footer';
import { Advert } from './Exchanges/Advert';
import { HistoryOperations } from './HistoryOperations';
import { OwnExchanges } from './Exchanges/OwnExchanges';
import { SingleExchangeDetails } from './Exchanges/SingleExchangeDetails';
import { OrderToSell } from './Exchanges/OrderToSell';
import { Certificates } from './Certificates/Certificates';
import { HeadBar } from './components/HeadBar/HeadBar';
import { OrderCreate } from './Orders/OrderCreate';
import { DepositOpen } from './Deposits/DepositOpen';
import { DepositProgram } from './Deposits/DepositProgram';
import { Deposits } from './Deposits/Deposits';
import { routers } from '../../constantes/routers';
import { Header } from '../../components/Header/Header';

export const InfoMain: FC = () => {
  return (
    <>
      <Header />
      <Styled.Page>
        <HeadBar />
        <Switch>
          {/* <Route path="/info" component={Info} exact /> */}
          {/* <Route path="/info/deposits" component={InfoDeposits} exact /> */}
          <Route path={routers.deposits} component={Deposits} exact />
          <Route path={routers.depositsProgram} component={DepositProgram} exact />
          <Route path={routers.depositsOpen} component={DepositOpen} exact />
          {/* <Route path="/info/balance" component={InfoBalance} exact /> */}
          <Route path="/info/deposits/:slug" component={OnePage} exact />
          <Route path={routers.p2pchanges} component={Advert} exact />
          <Route path={routers.p2pchangesOrderToSell} component={OrderToSell} exact />
          <Route path={routers.p2pchangesOwn} component={OwnExchanges} exact />

          <Route path={routers.settings} component={Settings} exact />
          <Route path={routers.settingsNewPayMethod} component={NewPayMethod} exact />
          <Route path={routers.settingsViewPayMethod} component={ViewPayMethod} exact />
          <Route path={routers.operations} component={HistoryOperations} exact />
          <Route path={routers.certificates} component={Certificates} exact />
          <Route path={routers.orderCreate} component={OrderCreate} exact />
          <Route
            path={routers.p2pchangesSingleExchangeDetails}
            component={SingleExchangeDetails}
            exact
          />
        </Switch>
        <Footer />
      </Styled.Page>
    </>
  );
};
