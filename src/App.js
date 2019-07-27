import React from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "./Components/Layout/Layout";
import BurgerBuilder from "./Containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./Containers/Checkout/Checkout";

function App() {
  return (
    <div>
      <Layout />
      <Switch>
        <Route component={Checkout} path="/checkout"/>
        <Route component={BurgerBuilder} exact path="/"/>
      </Switch>
    </div>
  );
}

export default App;
