import React from 'react'

import classes from './Toolbar.css';
import Logo from '../../../Components/Logo/Logo';
import NavigationItems from '../../../Components/Navigation/NavigationItems/NavigationItems';
import DrawerToggle from '../../../Components/Navigation/SideDrawer/DrawerToggle/DrawerToggle';

const Toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <DrawerToggle clicked={props.drawerToggleClicked}/>
            <div className={classes.LogoWrapper}>
                <Logo/>
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems/>
            </nav>
        </header>
    )
}

export default Toolbar;
