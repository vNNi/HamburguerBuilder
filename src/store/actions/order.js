import * as actionTypes from '../actions/actionsTypes';
import { orders } from '../../axios';

export const purchaseBurgerSuccess = ({name:id}, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        error: false,
        id,
        orderData
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,
    }
}

export const purchaseBurgerEnd = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_END,
    }
}

export const purchaseBurgerFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error: error
    }
}

export const purchaseBurgerPost = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        orders.post( '/orders.json', orderData )
          .then( response => {
              dispatch(purchaseBurgerSuccess(response.data, orderData));
          } )
          .catch( error => {
              dispatch(purchaseBurgerFailed(error));
          })
          .finally(()=>{
            dispatch(purchaseBurgerEnd())
          });
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT,
    }
}

export const getAllOrdersSuccess = (orders) => {
    return {
        type: actionTypes.GET_ALL_ORDERS_SUCCESS,
        orders,
    }
}

export const getAllOrdersFailed = (error) => {
    return {
        type: actionTypes.GET_ALL_ORDERS_FAILED,
        error,
    }
}

export const getAllOrdersInit = () => {
    return {
        type: actionTypes.GET_ALL_ORDERS_INIT,
    }
}

export const getAllOrders = () => {
    return dispatch => {
        dispatch(getAllOrdersInit());
        orders.get('/orders.json').then(res => {
            const ordersFetched = [];
            for (let key in res.data) {
                ordersFetched.push({
                ...res.data[key],
                id: key
            });
        }
            dispatch(getAllOrdersSuccess(ordersFetched))
        }).catch((error)=>{
            dispatch(getAllOrdersFailed(error));
        })
    }
}
