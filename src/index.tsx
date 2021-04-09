import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import "./i18n/i18n";

ReactDOM.render(
  <Suspense fallback={<div>Loading...</div>}>
    <App />
  </Suspense>,
  document.getElementById("root")
);
