import React, { Component } from "react";

import Button from "../../Components/UI/Button/Button";
import classes from "./ContactData.css";
import { orders } from "../../axios";
import Loading from "../../Components/UI/Loading/Loading";
import Input from "../../Components/UI/Input/Input";

export default class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        }
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Postal Code',
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
        }
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        }
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'E-mail'
        },
        value: '',
        validation: {
          required: true
        }
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'},
          ],
        },
        value: '',
      }
    },
    loading: false
  };

  orderHandler = e => {
    e.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for( let [key,value] of Object.entries(this.state.orderForm)){
      formData[key] = value.value;
    }
    console.log('formdata', formData);
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData,
      deliveryMethod: "fastest"
    };
    console.log(order);
    orders
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false });
        console.log(response);
      })
      .catch(e => {
        this.setState({ loading: false });
        console.log(e);
      });
  };

  checkValidity(value, rules){
    let isValid = true;

    if(rules.required){
      isValid = value.trim() !== '' && isValid;
    }

    if(rules.minLength){
      isValid = value.legth >= rules.minLength && isValid;
    }

    return isValid;
  }

  inputChangedHanlder = (ev, inputId) => {
    const updatedInput = {
      ...this.state.orderForm
    }
    const updatedFormElement = {
      ...updatedInput[inputId]
    }

    updatedFormElement.value = ev.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedInput[inputId] = updatedFormElement;
    this.setState({orderForm: updatedInput});
  }

  render() {
    const formElementsArray = [];

    for(let key in this.state.orderForm){
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });

    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {this.state.loading ? (
          <Loading />
        ) : (
          <React.Fragment>
            <form onSubmit={this.orderHandler}>
              {formElementsArray.map((inputData)=>{
              return (<Input 
                key={inputData.id}
                inputType={inputData.config.elementType}
                elementConfig={inputData.config.elementConfig}
                value={inputData.config.value}
                changed={(ev)=>this.inputChangedHanlder(ev, inputData.id)} />)                
              })}
              <Button btnType="Success">
                COMPRAR
              </Button>
            </form>
          </React.Fragment>
        )}
      </div>
    );
  }
}
