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
      {controls.map(ctrl => {
        return <BuildControl 
        label={ctrl.label} 
        key={ctrl.label} 
        addIngredient={() => props.addIngredient(ctrl.type)} 
        removeIngredient={() => props.removeIngredient(ctrl.type)}/>;
      })}
    </div>
  );
};

buildControls.propType = {
  addIngredient: PropTypes.func.isRequired,
  removeIngredient: PropTypes.func.isRequired,
}

export default buildControls;
