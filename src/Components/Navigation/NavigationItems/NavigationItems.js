import React from "react";

import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.css";

const NavigationItems = props => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/">Montar</NavigationItem>
      <NavigationItem link="/orders">Compras</NavigationItem>
      <NavigationItem link="/auth">Logar</NavigationItem>
    </ul>
  );
};

export default NavigationItems;
