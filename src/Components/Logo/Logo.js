import React from 'react';

import LogoImg from '../../Assets/burger-logo.png';
import classes from './Logo.css';

 const Logo = () => {
    return (
        <div className={classes.Logo}>
            <img src={LogoImg} alt="burger logo"/>
        </div>
    )
}
export default Logo;