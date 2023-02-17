import React from 'react'
import classes from "./Input.module.css";
export const Input = ({ id }) => {
    return (
        <>
            <div className={classes.input}>
                <label htmlFor={id}>Amount</label>
                <input type="number" id={id} min='1' max='5' defaultValue='1' />
            </div>
        </>
    )
}
