import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
    .map((igKey, i)=>{
        return <li key={igKey + i}><span style={{textTransform: 'capitalize'}}>{igKey} </span>{props.ingredients[igKey]}</li>
    });
    return (
        <>
            <h3>Sua Compra</h3>
            <p>Um hamburguer delicioso com os seguintes ingredientes: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Preço final: {props.price.toFixed(2)}</strong></p>
            <p>Finalizar Compra?</p>
            <Button btnType="Danger" clicked={props.cancelPurchease}>CANCEL</Button>
            <Button btnType="Success" clicked={props.continuePurchease}>CONTINUAR</Button>
        </>
    );
}

orderSummary.propTypes = {
    ingredients: PropTypes.object.isRequired,
}

export default orderSummary;