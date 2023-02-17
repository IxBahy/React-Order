import React from 'react'
import classes from "./Card.module.css";
import { MealItem } from '../MealsSection/MealItem/MealItem'
import { DUMMY_MEALS as mealsData } from '../MealsSection/Meals/dummy-meals'
export const Card = () => {
    return (
        <>
            <div className={classes.card}>
                {mealsData.map(meal => {
                    return (<div> <MealItem key={meal.id} name={meal.name} price={meal.price} description={meal.description} /> </div>)
                })}
            </div>
        </>
    )
}
