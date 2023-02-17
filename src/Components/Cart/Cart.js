import React from 'react'
// import CartItem from "../CartItem/CartItem";
import { Modal } from '../Modal/Modal';
import classes from './Cart.module.css'
export const Cart = () => {
    const cartItems = <ul className={classes['cart-items']}>{[{ id: 'c1', name: 'sushi', amount: 2, price: 12.99 }].map(item => <li key={item.id}>{item.name}</li>)}</ul>;

    const closeCart = () => {
        
    }


    return (
        <Modal>
            <div>
                {cartItems}
                <div className={classes.total}>
                    <span>Total Amount</span>
                    <span>35.62</span>
                </div>
                <div className={classes.actions}>
                    <button className={classes['button--alt']}>Close</button>
                    <button className={classes.button}>Order</button>
                </div>
            </div>
        </Modal>
    )
}
