import React from 'react'
import classes from './AvailableMeals.module.css'
import { Card } from '../../Card/Card'
export const AvailableMeals = () => {
    return (
        <>
            <div className={classes.meals}>
                <ul>
                    <Card />
                </ul>
            </div>
        </>
    )
}
