import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Farms from "./pages/Farms";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import RegisterFarm from "./pages/RegisterFarm";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/app/home" component={Home} />
        <Route path="/app/farms" component={Farms} />
        <Route path="/app/checkout" component={Checkout} />
        <Route path="/app/login" component={Login} />
        <Route path="/app/register" component={RegisterFarm} />
      </Switch>
    </BrowserRouter>
  );
}
