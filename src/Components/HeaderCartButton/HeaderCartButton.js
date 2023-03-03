import React, { useContext, useState, useEffect } from 'react'
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../CartIcon/CartIcon";
import Context from '../../Context/Context';

export const HeaderCartButton = ({ openCart }) => {
    const contextAPI = useContext(Context);
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

    useEffect(() => {
        if (contextAPI.cartItemsState.length === 0) {
            return;
        }
        setBtnIsHighlighted(true);

        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [contextAPI.cartItemsState]);
    return (
        <>
            <button className={btnClasses} onClick={contextAPI.openCartHandler}>
                <span className={classes.icon}><CartIcon /></span>
                <span > Your Cart </span>
                <span className={classes.badge}> {contextAPI.cartItemsState.length} </span>
            </button>
        </>
    )
}
