import React, { useContext } from 'react'
import Context from '../../Context/Context';
import CartItem from '../CartItem/CartItem';
import { Modal } from '../Modal/Modal';
import classes from './Cart.module.css'
export const Cart = () => {
    const contextAPI = useContext(Context);
    let totalAmount = 0.00
    const cartHasItems = contextAPI.cartItemsState.length > 0
    if (cartHasItems) {
        totalAmount = `${contextAPI.cartItemsState.map(item => item.price * item.amount).reduce((acc, price) => acc + price).toFixed(2)}`
    }
    return (
        <Modal key={'modal'}>
            <div>
                <ul className={classes['cart-items']}>
                    {contextAPI.cartItemsState.map(item =>
                        <CartItem key={item.id} id={item.id} name={item.name} price={item.price} amount={item.amount} />
                    )
                    }
                </ul>

                <div className={classes.total}>
                    <span>Total Amount</span>
                    <span>${totalAmount}</span>
                </div>
                <div className={classes.actions}>
                    <button className={classes['button--alt']} onClick={contextAPI.openCartHandler} >Close</button>
                    {cartHasItems && <button className={classes.button} onClick={contextAPI.orderCartHandler}>Order</button>}
                </div>
            </div>
        </Modal>
    )
}
