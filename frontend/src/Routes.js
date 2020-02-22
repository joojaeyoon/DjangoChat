import React from "react";

import { Route, Switch } from "react-router-dom";

import Login from "./components/Login";

const BaseRouter = () => (
  <Switch>
    <Route path="" component={Login} />
  </Switch>
);

export default BaseRouter;
