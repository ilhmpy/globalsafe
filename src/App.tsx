import React from "react";
import GlobalStyle from "./globalStyles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Authentication } from "./Pages/Auth";
import { Main } from "./Pages/Main/Main";
import { HubProvider } from "./context/HubContext";
import { Admin } from "./Pages/Admin";
import { AmountProvider } from "./context/AmountContext";
import { InfoMain } from "./Pages/PrivateArea";

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
              <Route path="/info" component={InfoMain} />
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
