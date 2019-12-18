import React, {Component} from 'react';
import classes from './Card.module.css'

const Card = props => {
    const cls = [
        classes.Card,
        classes[props.borderColor]
    ];

    return (
        <div className={cls.join(' ')}>
            <div>
                {props.children}
            </div>
        </div>
    )
};

export default Card
