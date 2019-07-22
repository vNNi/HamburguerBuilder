import React, { Component } from "react";

import Aux from "../../hoc/Aux";
import Toolbar from "../../Components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../Components/Navigation/SideDrawer/SideDrawer";
import classes from "./Layout.css";

export default class Layout extends Component {

    state = {
        showSideDrawer: true,
    }

    SideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    SideDrawerToggleHandler = () => {
        this.setState((prevState)=>{
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    }

  render() {
    return (
      <Aux>
        <Toolbar drawerToggleClicked={this.SideDrawerToggleHandler}/>
        <SideDrawer show={this.state.showSideDrawer} closed={this.SideDrawerClosedHandler} />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}
