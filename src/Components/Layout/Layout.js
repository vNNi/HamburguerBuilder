import React from 'react';

import Aux from '../../hoc/Aux';
import classes from './Layout.css';

export default function Layout(props) {
    console.log(classes)
    return (
        <Aux>
            <div className={classes.teste}>Toolbar,asdiaj,asd</div>
            <main>
                {props.children}
            </main>
        </Aux>
    )
}
