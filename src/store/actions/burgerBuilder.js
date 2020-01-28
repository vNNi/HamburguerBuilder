import * as actionTypes from './actionsTypes';
import { orders } from '../../axios';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name,
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name,
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients,
    }
}

export const setFetchIngredientsFailed = () => {
    return {
        type: actionTypes.SET_INGREDIENTS_FAILED
    }
}

export const fetchIngredients = () => {
    return dispatch => {
       orders.get('/ingredients.json')
       .then(response => {
            dispatch(setIngredients(response.data))
       })
       .catch (e => {
            console.log(e)
            dispatch(setFetchIngredientsFailed())
       });
        
    }
}