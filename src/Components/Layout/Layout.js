import React from 'react';

import Aux from '../../hoc/Aux';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import classes from './Layout.css';

export default function Layout(props) {
    return (
        <Aux>
            <Toolbar/>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    )
}
