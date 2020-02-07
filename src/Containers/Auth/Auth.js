import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../Components/UI/Input/Input'
import Button from '../../Components/UI/Button/Button'
import classes from './Auth.css'
import { auth }  from '../../store/actions'

class Auth extends Component {

    state = {
        loginForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true, 
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false
            }
        }
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
  
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
  
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }
  
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }
  
        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
  
        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.loginForm
        };
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({loginForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render (){ 
        const formElementsArray = [];
        for (let key in this.state.loginForm) {
            formElementsArray.push({
                id: key,
                config: this.state.loginForm[key]
            });
        }
        const inputs = formElementsArray.map((formElement) => {
            return (<Input 
                      key={formElement.id}
                      elementType={formElement.config.elementType}
                      elementConfig={formElement.config.elementConfig}
                      value={formElement.config.value}
                      invalid={!formElement.config.valid}
                      shouldValidate={formElement.config.validation}
                      touched={formElement.config.touched}
                      changed={(event) => this.inputChangedHandler(event, formElement.id)} />)
        })
        return ( <div className={classes.Auth}>
            <form>
                {inputs}
                
                <Button 
                btnType="Success"
                disabled={!this.state.formIsValid}
                clicked={()=>{this.props.onAuth(this.state.loginForm.email.value, this.state.loginForm.password.value)}}>
                    LOGIN
                </Button>
            </form>
         </div>)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password) => {dispatch(auth({email, password}))}
    }
}

export default connect(null, mapDispatchToProps)(Auth)