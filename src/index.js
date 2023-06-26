import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route } from "react-router-dom";

import "./index.scss";
import App from "./App";
import Header from "./Components/Header";
import AllQuestion from "./Components/AllQuestion";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter basename="/quiz-app">
    <>
      <Header />
      <Route exact path="/" component={App} />
      <Route path="/:category" component={AllQuestion} />
    </>
  </BrowserRouter>
);
