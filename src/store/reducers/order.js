import * as actionTypes from '../actions/actionsTypes';

const initialState = {
    loading: false,
    error: false,
    orders: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {...action.orderData, id: action.id}
            return {
                ...state,
                orders: state.orders.concat(newOrder),
            }
        case actionTypes.SET_INGREDIENTS_FAILED:
            return {
                ...state,
                error: action.error
            }
        case actionTypes.PURCHASE_BURGER_END:
            return {
                ...state,
                loading: false
            }
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true,
            }
        default:
            return state;
    }
}

export default reducer;