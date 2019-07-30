import React from 'react';

import classes from './Input.css';


const Input = (props) => {
    let inputElement = null;
    switch (props.inputType) {
        case ("input"):
            inputElement = <input
                className={classes.InputElement}
                {...props.elementConfig}
                onChange={props.changed} />
            break;
        case ("textarea"):
            inputElement = <textarea 
            className={classes.InputElement} 
            {...props.elementConfig} 
            onChange={props.changed} />
            break;
        case ("select"):
            inputElement =
                (<select
                    className={classes.InputElement}
                    value={props.value} onChange={props.changed}>
                    {props.elementConfig.options.map((opt) => {
                        return (<option
                            key={opt.value} value={opt.value}>
                            {opt.displayValue}
                        </option>)
                    })}

                </select>)
            break;
        default:
            inputElement = <input className={classes.InputElement} 
            {...props.elementConfig} 
            onChange={props.changed} />
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}


export default Input;