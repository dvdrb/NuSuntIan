// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

import ReactDOM from 'react-dom/client';
import { Fragment } from 'react/jsx-runtime';
import 'assets/styles/_index.scss';
import 'assets/styles/default.scss';

import App from 'app';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Fragment>
    <App />
  </Fragment>
);
