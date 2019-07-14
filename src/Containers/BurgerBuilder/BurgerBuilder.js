import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import {INGREDIENT_PRICE} from '../../Constants/index';

export default class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
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
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                addIngredient={this.addIngredientHandler} 
                removeIngredient={this.removeIngredientHandler}
                disabledInfo={disabledInfo}
                />
                <h1>PRICE: {this.state.totalPrice}</h1>
            </Aux>
        )
    }
}
