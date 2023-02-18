import React, { useContext } from 'react';
import Context from '../../Context/Context';
import classes from './CartItem.module.css';

const CartItem = (props) => {
  const contextAPI = useContext(Context);
  const price = `$${props.price.toFixed(2)}`;
  const incrementHandler = () => {
    contextAPI.incrementCartItem(props.name)
  }
  const decrementHandler = () => {
    contextAPI.removeCartItemHandler(props.name)
  }
  return (
    <li className={classes['cart-item']} key={props.id}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={decrementHandler} >−</button>
        <button onClick={incrementHandler} >+</button>
      </div>
    </li>
  );
};

export default CartItem;
