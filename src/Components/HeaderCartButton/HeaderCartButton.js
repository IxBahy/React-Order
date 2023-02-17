import React from 'react'
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../CartIcon/CartIcon";
export const HeaderCartButton = () => {
    return (
        <>
            <button className={classes.button}>
                <span className={classes.icon}><CartIcon /></span>
                <span > Your Cart </span>
                <span className={classes.badge}> 3 </span>
            </button>
        </>
    )
}
