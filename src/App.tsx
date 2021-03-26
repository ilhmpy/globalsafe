import React from "react";
import GlobalStyle from "./globalStyles";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Info } from "./Pages/PrivateArea/Info";
import { OnePage } from "./Pages/PrivateArea/OnePage";
import { Authentication } from "./Pages/Auth";
import { Main } from "./Pages/Main/Main";
import { HubProvider } from "./context/HubContext";
import {
  AdminLogin,
  AdminMain,
  AdminPay,
  AdminDeposit,
  AdminUsers,
  AdminPortfolio,
  Admin,
} from "./Pages/Admin";
import { AmountProvider } from "./context/AmountContext";
import { InfoDeposits } from "./Pages/PrivateArea/InfoDeposits";
import { InfoBalance } from "./Pages/PrivateArea/InfoBalance";

function App() {
  return (
    <Router>
      <HubProvider>
        <AmountProvider>
          <div className="App">
            <GlobalStyle />
            <Switch>
              <Route path="/" component={Main} exact />
              <Route path="/admin" component={Admin} />
              {/* <Route path="/admins" component={Admin} exact /> */}
              {/* <Route path="/admin/login" component={AdminLogin} /> */}
              {/* <Route path="/admin/payments" component={AdminPay} />
              <Route path="/admin/deposit" component={AdminDeposit} />
              <Route path="/admin/users" component={AdminUsers} />
              <Route path="/admin/portfolio" component={AdminPortfolio} /> */}
              <Route path="/info" component={Info} exact />
              <Route path="/deposits" component={InfoDeposits} exact />
              <Route path="/balance" component={InfoBalance} exact />
              <Route path="/deposits/:slug" component={OnePage} />
              <Route path="/login" component={Authentication} />
              <Route component={Main} />
            </Switch>
          </div>
        </AmountProvider>
      </HubProvider>
    </Router>
  );
}

export default App;
