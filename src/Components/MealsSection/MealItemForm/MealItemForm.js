import React from 'react'
import { Input } from '../../Input/Input'
import classes from './MealItemForm.module.css'
export const MealItemForm = ({ meal }) => {
    return (
        <>
            <form className={classes.form}>

                <Input id={`amount_${meal.id}`} />

                <button>+Add</button>
            </form>
        </>
    )
}
