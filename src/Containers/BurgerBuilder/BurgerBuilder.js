import React, { Component } from "react";

import Aux from "../../hoc/Aux";
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import { INGREDIENT_PRICE } from "../../Constants/index";
import Modal from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary";
import { orders } from "../../axios";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Loading from "../../Components/UI/Loading/Loading";
class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purcheaseAble: false,
    showBuyModal: false,
    loading: false
  };
  componentDidMount() {
    orders.get("/ingredients.json").then(res => {
      this.setState({ ingredients: res.data });
    }).catch(e => {
        console.log('error', e);
    })
  }
  updatePurcheaseAble = (ingredientes = {}) => {
    const sum = Object.keys(ingredientes)
      .map(igKey => {
        return ingredientes[igKey];
      })
      .reduce((acc, el) => {
        return acc + el;
      });

    this.setState({
      purcheaseAble: sum > 0
    });
  };

  addIngredientHandler = type => {
    const oldIngredientCount = this.state.ingredients[type];
    const updatedIngredientCount = {
      ...this.state.ingredients
    };
    updatedIngredientCount[type] = oldIngredientCount + 1;

    this.setState({
      ingredients: updatedIngredientCount
    });
    this.setState({
      totalPrice: this.state.totalPrice + INGREDIENT_PRICE[type]
    });
    this.updatePurcheaseAble(updatedIngredientCount);
  };

  removeIngredientHandler = type => {
    const oldIngredientCount = this.state.ingredients[type];
    if (oldIngredientCount > 0) {
      const updatedIngredientCount = {
        ...this.state.ingredients
      };
      updatedIngredientCount[type] = oldIngredientCount - 1;
      this.setState({
        ingredients: updatedIngredientCount
      });
      this.setState({
        totalPrice: this.state.totalPrice - INGREDIENT_PRICE[type]
      });
      this.updatePurcheaseAble(updatedIngredientCount);
    }
  };

  handleBuyModal = () => {
    this.setState({
      showBuyModal: !this.state.showBuyModal
    });
  };

  closeModal = () => {
    this.setState({
      showBuyModal: false
    });
  };

  continuePurchease = () => {
    // this.setState({ loading: true });
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: "Vini k",
    //     address: {
    //       street: "Minha rua 1",
    //       zipCode: "12345",
    //       country: "Brasil"
    //     },
    //     email: "vini@eu.com"
    //   },
    //   deliveryMethod: "fastest"
    // };
    // orders
    //   .post("/orders.json", order)
    //   .then(response => {
    //     this.setState({ loading: false, showBuyModal: false });
    //     console.log(response);
    //   })
    //   .catch(e => {
    //     this.setState({ loading: false, showBuyModal: false });
    //     console.log(e);
    //   });
    const queryParams = [];
    for(let i in this.state.ingredients){
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: `?${queryString}`,
    });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let burger = (
      <center>
        <Loading />
      </center>
    );
    let orderSummary = (
      <center>
        <Loading />
      </center>
    );

    if (this.state.ingredients) {
      burger = (
        <>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            addIngredient={this.addIngredientHandler}
            removeIngredient={this.removeIngredientHandler}
            disabledInfo={disabledInfo}
            price={this.state.totalPrice}
            purcheaseAble={!this.state.purcheaseAble}
            handleBuyModal={this.handleBuyModal}
          />
        </>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          cancelPurchease={this.closeModal}
          continuePurchease={this.continuePurchease}
          price={this.state.totalPrice}
        />
      );
    }
    return (
      <Aux>
        <Modal show={this.state.showBuyModal} closeModal={this.closeModal}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, orders);
