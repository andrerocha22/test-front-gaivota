import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import FarmMoreInfo from "./pages/FarmMoreInfo";
import Checkout from "./pages/Checkout";
import RegisterFarm from "./pages/RegisterFarm";
import RegisterUser from "./auth/RegisterUser";
import Login from "./auth/Login";
import PrivateRoute from "./components/PrivateRoute";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Redirect exact from="/app" to="/login" />
        <PrivateRoute exact path="/app/home" component={Home} />
        <PrivateRoute exact path="/app/farm" component={FarmMoreInfo} />
        <PrivateRoute exact path="/app/checkout" component={Checkout} />
        <PrivateRoute exact path="/app/register" component={RegisterFarm} />

        <Route exact path="/login/register" component={RegisterUser} />
        <Route path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}
