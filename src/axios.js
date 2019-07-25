import axios from 'axios';

export const orders = axios.create({
    baseURL: 'https://burger-3d0d5.firebaseio.com/',
});