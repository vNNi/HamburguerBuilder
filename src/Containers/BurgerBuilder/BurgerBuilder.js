import React, { Component } from "react";
import { connect } from 'react-redux';

import Aux from "../../hoc/Aux";
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import { INGREDIENT_PRICE } from "../../Constants/index";
import Modal from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary";
import { orders } from "../../axios";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Loading from "../../Components/UI/Loading/Loading";
import * as actionTypes from '../../store/actions';
class BurgerBuilder extends Component {
  constructor(props){
    super(props);
  }
  state = {
    showBuyModal: false,
    loading: false
  };
  componentDidMount() {
    // orders.get("/ingredients.json").then(res => {
    //   this.setState({ ingredients: res.data });
    // }).catch(e => {
    //   console.log('error', e);
    // })
  }
  updatePurcheaseAble = (ingredientes = {}) => {
    const sum = Object.keys(ingredientes)
      .map(igKey => {
        return ingredientes[igKey];
      })
      .reduce((acc, el) => {
        return acc + el;
      });

    return sum > 0;
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
    this.props.history.push('/checkout')
  };

  render() {
    const disabledInfo = {
      ...this.props.ingrs
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

    if (this.props.ingrs) {
      burger = (
        <>
          <Burger ingredients={this.props.ingrs} />
          <BuildControls
            addIngredient={this.props.onIngredientAdded}
            removeIngredient={this.props.onIngredientRemoved}
            disabledInfo={disabledInfo}
            price={this.props.price}
            purcheaseAble={!this.updatePurcheaseAble(this.props.ingrs)}
            handleBuyModal={this.handleBuyModal}
          />
        </>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingrs}
          cancelPurchease={this.closeModal}
          continuePurchease={this.continuePurchease}
          price={this.props.price}
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

const mapStateToProps = state => {
  return {
    ingrs: state.ingredients,
    price: state.totalPrice,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingredientName) => dispatch({type:actionTypes.ADD_INGREDIENT, ingredientName}),
    onIngredientRemoved: (ingredientName) => dispatch({type:actionTypes.REMOVE_INGREDIENT, ingredientName}),
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, orders));
