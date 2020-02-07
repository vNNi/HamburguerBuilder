import * as actionTypes from './actionsTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};

export const authSuccess = (data) => {
    console.log('Success auth', data)
    return {
        type: actionTypes.AUTH_SUCCESS,
        data,
    };
};

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error,
    }
}

export const auth = ({email, password, signup}) => {
    return (dispatch) => {
        dispatch(authStart());
       const data = { email, password, returnSecureToken: true };
       console.log(signup)
       const method = signup ? 'signUp' : 'signInWithPassword'
       console.log(method)
       const url = `https://identitytoolkit.googleapis.com/v1/accounts:${method}?key=AIzaSyAaF7qjtenb3paBilMggHg9hPUzGtP6L78`
       axios.post(url, data)
       .then((response) => {authSuccess(response.data)})
       .catch((error) => {authFailed(error)})
    }
}
