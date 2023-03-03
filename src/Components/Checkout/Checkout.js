import classes from './Checkout.module.css';
import Context from '../../Context/Context';
import useInput from "../../hooks/useInput";

import { useContext, useState } from "react";
import useHttp from '../../hooks/useHttp';

const Checkout = (props) => {
    //check functions 
    const checkEmail = (email) => {
        return email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    }
    const checkNotEmpty = (name) => {
        return name.trim().length > 0
    }
    //////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////

    // customer class
    class Customer {

        constructor(firstName, lastName, email, street) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.street = street;
        }

        getPostRequestConfigs = (url) => {
            return {
                url,
                method: 'POST',
                body: JSON.stringify({
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    street: this.street,
                    cartItems: contextAPI.cartItemsState
                })
            }
        }

    }
    const { sendRequest } = useHttp()
    const contextAPI = useContext(Context);
    // input states & functions

    //first name
    const { inputState: firstNameInputState,
        inputIsInvalid: firstNameIsInvalid,
        inputChangeHandler: firstNameInputChangeHandler,
        inputBlurHandler: firstNameInputBlurHandler,
        inputResetHandler: firstNameInputResetHandler
    } = useInput(checkNotEmpty)
    //last name
    const { inputState: lastNameInputState,
        inputIsInvalid: lastNameIsInvalid,
        inputChangeHandler: lastNameInputChangeHandler,
        inputBlurHandler: lastNameInputBlurHandler,
        inputResetHandler: lastNameInputResetHandler
    } = useInput(checkNotEmpty)
    //email
    const { inputState: emailInputState,
        inputIsInvalid: emailIsInvalid,
        inputChangeHandler: emailInputChangeHandler,
        inputBlurHandler: emailInputBlurHandler,
        inputResetHandler: emailInputResetHandler
    } = useInput(checkEmail)
    //street
    const { inputState: streetInputState,
        inputIsInvalid: streetIsInvalid,
        inputChangeHandler: streetInputChangeHandler,
        inputBlurHandler: streetInputBlurHandler,
        inputResetHandler: streetInputResetHandler
    } = useInput(checkNotEmpty)

    //style variables
    const firstNameInputClasses = !firstNameIsInvalid ? classes['form-control'] : `${classes['form-control']}  ${classes['invalid']}`
    const lastNameInputClasses = !lastNameIsInvalid ? classes['form-control'] : `${classes['form-control']}  ${classes['invalid']}`
    const emailInputClasses = !emailIsInvalid ? classes['form-control'] : `${classes['form-control']}  ${classes['invalid']}`
    const streetInputClasses = !streetIsInvalid ? classes['form-control'] : `${classes['form-control']}  ${classes['invalid']}`


    const formConfirmHandler = (event) => {
        event.preventDefault()
        blurAllInputs()
        if (checkAllInputsAreValid()) {
            let firstName = firstNameInputState.value
            let lastName = lastNameInputState.value
            let email = emailInputState.value
            let street = streetInputState.value
            const customerData = new Customer(firstName, lastName, email, street)
            sendRequest(customerData.getPostRequestConfigs('https://react-demo-ff703-default-rtdb.firebaseio.com/orders.json'))
            resetAllInputs()

        }
    };
    const blurAllInputs = () => {
        firstNameInputBlurHandler()
        lastNameInputBlurHandler()
        emailInputBlurHandler()
        streetInputBlurHandler()
    }
    const checkAllInputsAreValid = () => {
        return (firstNameInputState.isValid && lastNameInputState.isValid && emailInputState.isValid && streetInputState.isValid)
    }
    const resetAllInputs = () => {
        firstNameInputResetHandler()
        lastNameInputResetHandler()
        emailInputResetHandler()
        streetInputResetHandler()
        contextAPI.resetCartHandler()
        contextAPI.orderCartHandler()
        contextAPI.handleIsOrderProcessing()
        setTimeout(() => {
            contextAPI.openCartHandler()
            contextAPI.handleIsOrderProcessing()
        }, 2000);

    }


    return (
        <form className={classes.form} onSubmit={formConfirmHandler}>
            <div className={firstNameInputClasses}>
                <label htmlFor='firstName'>Your first name</label>
                <input type='text' id='firstName' value={firstNameInputState.value} onBlur={firstNameInputBlurHandler} onChange={firstNameInputChangeHandler} />
            </div>
            {firstNameIsInvalid && <p className={classes["error-text"]}> first name is not valid</p>}

            <div className={lastNameInputClasses}>
                <label htmlFor='lastName'>Your last name</label>
                <input type='text' id='lastName' value={lastNameInputState.value} onBlur={lastNameInputBlurHandler} onChange={lastNameInputChangeHandler} />
            </div>
            {lastNameIsInvalid && <p className={classes["error-text"]}> last name is not valid</p>}
            <div className={streetInputClasses}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' value={streetInputState.value} onBlur={streetInputBlurHandler} onChange={streetInputChangeHandler} />
            </div>
            {streetIsInvalid && <p className={classes["error-text"]}> street is not valid</p>}
            <div className={emailInputClasses}>
                <label htmlFor='email'> Email </label>
                <input type='email' id='email' value={emailInputState.value} onBlur={emailInputBlurHandler} onChange={emailInputChangeHandler} />
            </div>
            {emailIsInvalid && <p className={classes["error-text"]}> email is not valid</p>}

            <div className={classes.actions}>
                <button type='button' onClick={contextAPI.openCartHandler}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form >
    );
};

export default Checkout;