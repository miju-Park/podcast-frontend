import { ApolloProvider } from "@apollo/client";
import React from "react";
import { render } from "react-dom";
import { client } from "./apollo";

import App from "./App";

const rootElement = document.getElementById("root");
render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  rootElement
);
