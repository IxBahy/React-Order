import React, { useContext } from 'react'
import classes from "./Card.module.css";
import Context from "../../Context/Context";
import { MealItem } from '../MealsSection/MealItem/MealItem'
import { DUMMY_MEALS as mealsData } from '../MealsSection/Meals/dummy-meals'
export const Card = () => {
    const contextAPI = useContext(Context);
    return (
        <>
            <div className={classes.card}>
                {contextAPI.mealsData.map(meal => {
                    return (
                        <MealItem key={meal.id} name={meal.name} price={meal.price} description={meal.description} />
                    )
                })}
            </div>
        </>
    )
}
