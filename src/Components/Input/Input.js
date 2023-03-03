import React, { } from 'react'
import classes from "./Input.module.css";
export const Input = React.forwardRef((props, ref) => {
    return (
        <>
            <div className={classes.input}>
                <label htmlFor={props.id}>Amount</label>
                <input ref={ref} type="number" id={props.id} min='1' max='5' defaultValue='1' />
            </div>
        </>
    )
})
