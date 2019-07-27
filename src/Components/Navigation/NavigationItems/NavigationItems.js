import React from "react";

import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.css";

const NavigationItems = props => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/">Montar</NavigationItem>
      <NavigationItem link="/orders">Compras</NavigationItem>
    </ul>
  );
};

export default NavigationItems;
