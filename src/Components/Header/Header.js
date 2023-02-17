import React from 'react'
import classes from './Header.module.css'
import headerImage from '../../assets/meals.jpg'
import MealsSummary from '../MealsSection/MealsSummary/MealsSummary'
import { HeaderCartButton } from "../HeaderCartButton/HeaderCartButton";
export const Header = () => {
    return (
        <>
            <header className={classes.header}>
                <h1> React Orders</h1>
                <HeaderCartButton />
            </header>
            <div className={classes['main-image']} >
                <img src={headerImage} alt="" />
            </div>
            <MealsSummary />
        </>
    )
}
