import React from 'react'
import classes from './EventCounter.module.css'

const EventCounter = props => {
    let counter;

    if (window.innerWidth <= 768) {
        counter =
            <p className={classes.EventCounterMobile}>
                <strong>{props.count}</strong> списков желаний уже в сервисе MyWish
            </p>
    } else {
        counter =
            <p className={classes.EventCounter}>
                {props.count} списков желаний уже в сервисе MyWish
            </p>
    }

    return counter
};

export default EventCounter
