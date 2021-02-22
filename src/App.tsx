import React from "react";
import { Header } from "./components/Header/Header";
import GlobalStyle from "./globalStyles";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Info } from "./Pages/PrivateArea/Info";
import { Authentication } from "./Pages/Auth";
import { Main } from "./Pages/Main/Main";
import { HubProvider } from "./context/HubContext";

function App() {
  return (
    <Router>
      <HubProvider>
        <div className="App">
          <Header />
          <GlobalStyle />
          <Switch>
            <Route path="/" component={Main} exact />
            <Route path="/info" component={Info} />
            <Route path="/login" component={Authentication} />
          </Switch>
        </div>
      </HubProvider>
    </Router>
  );
}

export default App;
