import React from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "./Components/Layout/Layout";
import BurgerBuilder from "./Containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./Containers/Checkout/Checkout";
import Orders from './Containers/Orders/Orders';

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route component={Checkout} path="/checkout"/>
          <Route component={Orders} path="/orders"/>
          <Route component={BurgerBuilder} exact path="/"/>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
