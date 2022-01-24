import './style/style.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { CurrentSessionContextProvider } from './components/contexts/CurrentSession';
import { CurrentUserContextProvider } from './components/contexts/CurrentUser';

ReactDOM.render(
  <React.StrictMode>
    <CurrentUserContextProvider>
      <CurrentSessionContextProvider>
        <App />
      </CurrentSessionContextProvider>
    </CurrentUserContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
