// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

import ReactDOM from "react-dom/client";
import { Fragment } from "react/jsx-runtime";
import { HelmetProvider } from "react-helmet-async";
import "assets/styles/_index.scss";
import "assets/styles/default.scss";

import App from "app";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <Fragment>
      <App />
    </Fragment>
  </HelmetProvider>
);
