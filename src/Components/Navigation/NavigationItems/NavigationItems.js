import React from "react";

import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.css";

const NavigationItems = props => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" active>Teste</NavigationItem>
      <NavigationItem link="/">Go</NavigationItem>
    </ul>
  );
};

export default NavigationItems;
