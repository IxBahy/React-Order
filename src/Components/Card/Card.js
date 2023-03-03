import React, { useContext } from 'react'
import classes from "./Card.module.css";
import Context from "../../Context/Context";
import { MealItem } from '../MealsSection/MealItem/MealItem'
import { ColorRing } from 'react-loader-spinner'
export const Card = () => {
    const contextAPI = useContext(Context);
    if (contextAPI.error) {
        alert(contextAPI.error)
    }
    return (
        <>
            <div className={classes.card}>

                {
                    contextAPI.isLoading ? (<div style={{ display: 'flex', justifyContent: 'center' }}> <ColorRing /></div>) :
                        contextAPI.mealsData.map(meal => {
                            return (
                                <MealItem key={meal.id} name={meal.name} price={meal.price} description={meal.description} />
                            )
                        })
                }
            </div>
        </>
    )
}
