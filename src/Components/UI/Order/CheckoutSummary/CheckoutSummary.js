import React from 'react';

import Burger from '../../../Burger/Burger';
import Button from '../../Button/Button';
import classes from './CheckoutSummary.css';

const CheckoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>Hm... me parece gostoso!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button 
            btnType="Danger"
            clicked={props.cancelled}>
                CANCELAR
            </Button>
            <Button 
            btnType="Success"
            clicked={props.continued}>
                CONTINUAR
            </Button>
        </div>
    );
}

export default CheckoutSummary;