import React from "react";
import PropTypes from 'prop-types';

import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.css";

const buildControls = props => {
  const controls = [
    { label: "Salad", type: "salad" },
    { label: "Meat", type: "meat" },
    { label: "Bacon", type: "bacon" },
    { label: "Cheese", type: "cheese" }
  ];
  return (
    <div className={classes.BuildControls}>
      <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
      {controls.map(ctrl => {
        return <BuildControl 
        label={ctrl.label} 
        key={ctrl.label} 
        addIngredient={() => props.addIngredient(ctrl.type)} 
        removeIngredient={() => props.removeIngredient(ctrl.type)}
        disabled={props.disabledInfo[ctrl.type]}
        />
      })}
      <button 
      className={classes.OrderButton} 
      disabled={props.purcheaseAble}
      onClick={props.handleBuyModal}>
        Comprar Agora!
      </button>
    </div>
  );
};

buildControls.propType = {
  addIngredient: PropTypes.func.isRequired,
  removeIngredient: PropTypes.func.isRequired,
  disabledInfo: PropTypes.shape({
    salad: PropTypes.bool,
    bacon: PropTypes.bool,
    cheese: PropTypes.bool,
    meat: PropTypes.bool,
  }).isRequired,
  price: PropTypes.number.isRequired,
  purcheaseAble: PropTypes.bool.isRequired,
  handleBuyModal: PropTypes.func.isRequired,
}

export default buildControls;
