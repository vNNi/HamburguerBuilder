import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import {INGREDIENT_PRICE} from '../../Constants/index';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';

export default class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice : 4,
        purcheaseAble: false,
        showBuyModal: false,
    }

    updatePurcheaseAble = (ingredientes = {}) => {
        const sum = Object.keys(ingredientes)
        .map((igKey)=>{
            return ingredientes[igKey];
        })
        .reduce((acc, el) => {
            return acc + el;
        });

        this.setState({
            purcheaseAble: sum > 0,
        });
    }

    addIngredientHandler = (type) => {
        const oldIngredientCount = this.state.ingredients[type];
        const updatedIngredientCount = {
            ...this.state.ingredients
        }
        updatedIngredientCount[type] = oldIngredientCount + 1;

        this.setState({
            ingredients: updatedIngredientCount
        }); 
        this.setState({
            totalPrice : this.state.totalPrice + INGREDIENT_PRICE[type]
        });
        this.updatePurcheaseAble(updatedIngredientCount);
    }

    removeIngredientHandler = (type) => {
        const oldIngredientCount = this.state.ingredients[type];
        if(oldIngredientCount > 0){
            const updatedIngredientCount = {
                ...this.state.ingredients
            }
            updatedIngredientCount[type] = oldIngredientCount - 1;
            this.setState({
                ingredients: updatedIngredientCount
            });
            this.setState({
                totalPrice: this.state.totalPrice - INGREDIENT_PRICE[type],
            });
            this.updatePurcheaseAble(updatedIngredientCount);
        }   
    }
    
    handleBuyModal = () => {
        this.setState({
            showBuyModal : !this.state.showBuyModal,
        })
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Aux>
                <Modal show={this.state.showBuyModal}>
                    <OrderSummary ingredients={this.state.ingredients}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                addIngredient={this.addIngredientHandler} 
                removeIngredient={this.removeIngredientHandler}
                disabledInfo={disabledInfo}
                price={this.state.totalPrice}
                purcheaseAble={!this.state.purcheaseAble}
                handleBuyModal={this.handleBuyModal}
                />
            </Aux>
        )
    }
}
