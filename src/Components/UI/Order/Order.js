import React from 'react';

import classes from './Order.css';

 const Order = (props) => {

    //  const ingredients = Object.keys(props.ingredients)
    //  .map((igKey)=>{
    //     return [...Array(props.ingredients[igKey])].map((_,i)=>{
    //         return <p key={igKey+i}>Ingrediente: {igKey} ({props.ingredients[igKey]}) </p>
    //     });
    //  });

    //  other way to do same thing but clean
    const igr = [];
    for(let ingredientName in props.ingredients){
        igr.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }
    const listIgr = igr.map((igr,i)=>{
        return <p key={igr+i}>{igr.name} ({igr.amount}) </p>
    });

    return (
        <div className={classes.Order}>
            <h4>Ingredientes:</h4>
            {listIgr}
            <p>Preço: <strong>{props.totalPrice.toFixed(2)} R$</strong></p>
        </div>
    )
}
export default Order;