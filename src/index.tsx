import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import './i18n/i18n';
import { Loader } from './components/Loader/Loader';
import { HubProvider } from './context/HubContext';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { ThemesProvider } from './context/ThemeContext';
import { ChartProvider } from './context/ChartContext';
import { SettingsProvider } from './context/SettingsContext';

ReactDOM.render(
  <ThemesProvider>
    <Suspense fallback={<Loader />}>
      <HubProvider>
        <SettingsProvider>
          <ChartProvider>
            <App />
          </ChartProvider>
        </SettingsProvider>
      </HubProvider>
    </Suspense>
  </ThemesProvider>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();
