import ReactDOM from "react-dom";
import ApolloClientProvider from "./ApolloClientProvider";
import React from "react";
import "semantic-ui-css/semantic.min.css";
ReactDOM.render(
  <>
    <ApolloClientProvider />
  </>,
  document.getElementById("root")
);
