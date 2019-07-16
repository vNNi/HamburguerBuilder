import React from 'react';
import PropTypes from 'prop-types';

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
            <p>Finalizar Compra?</p>
        </>
    );
}

orderSummary.propTypes = {
    ingredients: PropTypes.object.isRequired,
}

export default orderSummary;