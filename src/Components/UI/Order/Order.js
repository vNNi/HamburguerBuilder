import React from 'react';

import classes from './Order.css';

 const Order = (props) => {
    return (
        <div className={classes.Order}>
            <p>Ingredient: </p>
            <p>Price: <strong>5,45 R$</strong></p>
        </div>
    )
}
export default Order;