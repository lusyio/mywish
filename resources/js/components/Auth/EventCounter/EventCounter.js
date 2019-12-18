import React from 'react'
import classes from './EventCounter.module.css'

const EventCounter = props => {
    return (
        <p className={classes.EventCounter}>
            {props.count} списков желаний уже в сервисе MyWish
        </p>
    )
};

export default EventCounter
