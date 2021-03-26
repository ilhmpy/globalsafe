import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import {
  AdminMain,
  AdminPay,
  AdminDeposit,
  AdminUsers,
  AdminPortfolio,
} from "./";
import * as Styled from "./Styled.elements";
import { SideNavbar } from "../../components/SideNav";
import useWindowSize from "../../hooks/useWindowSize";
import { Header } from "../../components/Header/Header";

export const Admin = () => {
  const [navWidth, setNavWidth] = useState(false);
  const sizes = useWindowSize();
  const size = sizes < 1200;
  const header = sizes < 992;

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

  return (
    <Styled.Wrapper>
      {header && <Header admPanel />}
      <SideNavbar navShow={navShow} navWidth={navWidth} />
      <Styled.Content widthCont={!navWidth}>
        <Switch>
          <Route path="/admin" component={AdminMain} exact />
          <Route path="/admin/payments" component={AdminPay} />
          <Route path="/admin/deposit" component={AdminDeposit} />
          <Route path="/admin/users" component={AdminUsers} />
          <Route path="/admin/portfolio" component={AdminPortfolio} />
          <Route path="/" component={AdminMain} exact />
        </Switch>
      </Styled.Content>
    </Styled.Wrapper>
  );
};
