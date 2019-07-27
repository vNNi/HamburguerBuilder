import React, { Component } from "react";

import Button from "../../Components/UI/Button/Button";
import classes from "./ContactData.css";
import { orders } from "../../axios";
import Loading from "../../Components/UI/Loading/Loading";

export default class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false
  };

  orderHandler = e => {
    e.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: this.state.name,
        address: {
          street: this.state.address.street,
          zipCode: this.state.address.postalCode
        },
        email: this.state.email
      },
      deliveryMethod: "fastest"
    };
    console.log(order);
    orders
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false });
        console.log(response);
      })
      .catch(e => {
        this.setState({ loading: false });
        console.log(e);
      });
  };

  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {this.state.loading ? (
          <Loading />
        ) : (
          <React.Fragment>
            <form>
              <input type="text" name="name" placeholder="Seu Nome" />
              <input type="email" name="email" placeholder="Seu E-mail" />
              <input type="text" name="street" placeholder="Sua Rua" />
              <input type="text" name="postal" placeholder="Seu CEP" />
              <Button btnType="Success" clicked={this.orderHandler}>
                COMPRAR
              </Button>
            </form>
          </React.Fragment>
        )}
      </div>
    );
  }
}
