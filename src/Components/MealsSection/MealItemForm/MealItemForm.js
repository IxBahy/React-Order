import React, { useContext, useRef } from 'react'
import Context from '../../../Context/Context';
import { Input } from '../../Input/Input'
import classes from './MealItemForm.module.css'
export const MealItemForm = ({ meal }) => {
    const contextAPI = useContext(Context);
    const amountRef = useRef()
    const itemData = { ...meal }

    const submitHandler = (e) => {
        e.preventDefault()
        const enteredAmount = +(amountRef.current.value)
        itemData['amount'] = enteredAmount
        console.log(itemData);
        contextAPI.addCartItemHandler(itemData)
    }

    return (
        <>
            <form className={classes.form} onSubmit={submitHandler}>

                <Input id={`amount_${meal.id}`} ref={amountRef} />

                <button type='submit'>+Add</button>
            </form>
        </>
    )
}