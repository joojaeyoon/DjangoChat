import React from "react";

import { Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import Chat from "./components/Chat";

const BaseRouter = () => (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route path="/chat" component={Chat} />
  </Switch>
);

export default BaseRouter;
