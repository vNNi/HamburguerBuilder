import React, { Component } from "react";
import { Route } from "react-router-dom";

import CheckoutSummary from "../../Components/UI/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "../ContactData/ContactData";

export default class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  };

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ ingredients: ingredients, totalPrice: price });
  }

  onCheckoutCancelled = () => {
    this.props.history.goBack();
  };

  oncCheckoutContinued = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          cancelled={this.onCheckoutCancelled}
          continued={this.oncCheckoutContinued}
        />
        <Route
          component={() => (
            <ContactData
              ingredients={this.state.ingredients}
              totalPrice={this.state.totalPrice}
            />
          )}
          path={`${this.props.match.path}/contact-data`}
        />
      </div>
    );
  }
}
