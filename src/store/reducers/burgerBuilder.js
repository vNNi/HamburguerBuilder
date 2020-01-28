import * as actionTypes from '../actions/actionsTypes';
import {INGREDIENT_PRICE} from '../../Constants';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName]+1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName]-1,
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName]
            };
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                error: false
            }
        case actionTypes.SET_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true,
            }
        default:    
            return state;
    }
}

export default reducer; 