import React, { useContext, useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { SideNavbar } from '../../components/SideNav';
import { Loading } from '../../components/UI/Loading';
import { AppContext } from '../../context/HubContext';
import useWindowSize from '../../hooks/useWindowSize';
import {
  AdminDeposit,
  AdminLottery,
  AdminMain,
  AdminPay,
  AdminPortfolio,
  AdminUserOnePage,
  AdminUsers,
} from './';
import { AdminDepositsPrograms } from './AdminDepositsPrograms';
import { AdminWallets } from './AdminWallets';
import * as Styled from './Styled.elements';

export const Admin = () => {
  const [navWidth, setNavWidth] = useState(false);
  const sizes = useWindowSize();
  const size = sizes < 1200;
  const appContext = useContext(AppContext);
  const admin = appContext.isAdmin;

  useEffect(() => {
    if (sizes !== 0 && size) {
      setNavWidth(true);
    }
  }, [sizes]);

  const navShow = (e: React.MouseEvent) => {
    e.preventDefault();
    setNavWidth(!navWidth);
    // if (!size) {
    //   setNavWidth(!navWidth);
    // }
  };

  if (admin === null) {
    return (
      <Styled.Loader>
        <Loading />
      </Styled.Loader>
    );
  }

  if (admin === false) {
    return <Redirect to="/" />;
  }

  return (
    <Styled.Wrapper>
      <Styled.HeaderWrap>
        <Header admPanel />
      </Styled.HeaderWrap>
      <SideNavbar navShow={navShow} navWidth={navWidth} />
      <Styled.Content widthCont={!navWidth}>
        <Switch>
          <Route path="/admin" component={AdminMain} exact />
          <Route path="/admin/payments" component={AdminPay} />
          <Route path="/admin/deposit" component={AdminDeposit} />
          <Route path="/admin/users" component={AdminUsers} exact />
          <Route path="/admin/users/:slug" component={AdminUserOnePage} />
          <Route path="/admin/portfolio" component={AdminPortfolio} />
          <Route path="/admin/lottery" component={AdminLottery} />
          <Route path="/admin/depositsPrograms" component={AdminDepositsPrograms} />
          <Route path="/admin/wallets" component={AdminWallets} />
          <Route path="/" component={AdminMain} exact />
        </Switch>
      </Styled.Content>
    </Styled.Wrapper>
  );
};
