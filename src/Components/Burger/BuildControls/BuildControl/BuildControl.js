import React from "react";
import PropTypes from "prop-types";

import classes from "./BuildControl.css";

const BuildControl = props => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button className={classes.Less} 
      onClick={props.removeIngredient} 
      disabled={props.disabled} >Menos</button>
      <button className={classes.More} 
      onClick={props.addIngredient}>Mais</button>
    </div>
  );
};

BuildControl.propTypes = {
  label: PropTypes.string.isRequired,
  addIngredient: PropTypes.func.isRequired,
  removeIngredient: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired
};

export default BuildControl;
