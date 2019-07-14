import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import {INGREDIENT_PRICE} from '../../Constants/index';

export default class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 2,
            meat: 2,
        },
        totalPrice : 4,
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
            })
        }   
    }

    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls addIngredient={this.addIngredientHandler} removeIngredient={this.removeIngredientHandler}/>
            </Aux>
        )
    }
}
