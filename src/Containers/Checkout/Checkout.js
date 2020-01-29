import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

import CheckoutSummary from "../../Components/UI/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "../ContactData/ContactData";

import { connect } from 'react-redux';

class Checkout extends Component {

  onCheckoutCancelled = () => {
    this.props.history.goBack();
  };

  oncCheckoutContinued = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null
    let summary = this.props.ingrs ? (<div>
      {purchasedRedirect}
      <CheckoutSummary
        ingredients={this.props.ingrs}
        cancelled={this.onCheckoutCancelled}
        continued={this.oncCheckoutContinued}
      />
      <Route
        component={ContactData}
        path={`${this.props.match.path}/contact-data`}
      />
    </div>) : <Redirect to="/" />
    return summary;
  }
}

const mapPropsToState = state => {
  return {
    ingrs: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased,
  }
};
export default connect(mapPropsToState)(Checkout);