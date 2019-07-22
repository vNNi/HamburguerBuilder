import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './SideDrawer.css';

const SideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];

    if(props.show){
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <>
            <Backdrop show={props.show} click={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.LogoWrapper}> 
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems/> 
                </nav>
            </div>
        </>
    );
}

export default SideDrawer;