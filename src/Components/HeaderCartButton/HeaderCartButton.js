import React, { useContext } from 'react'
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../CartIcon/CartIcon";
import Context from '../../Context/Context';

export const HeaderCartButton = ({ openCart }) => {
    const contextAPI = useContext(Context);
    return (
        <>
            <button className={classes.button} onClick={contextAPI.openCartHandler}>
                <span className={classes.icon}><CartIcon /></span>
                <span > Your Cart </span>
                <span className={classes.badge}> 3 </span>
            </button>
        </>
    )
}
