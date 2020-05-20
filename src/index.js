import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import App from './App';

ReactDOM.render(
  <SnackbarProvider maxSnack={3}>
    <HashRouter>
      <App />
    </HashRouter>
  </SnackbarProvider>,
  document.getElementById('root')
);
