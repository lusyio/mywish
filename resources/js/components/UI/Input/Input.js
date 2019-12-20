import React from 'react'
import classes from './Input.module.css'

const Input = props =>{
    const inputType = props.type || 'text';
    const cls = [classes.Input];

    return(
        <input
            name={props.name}
            maxLength={props.maxLength}
            className={cls.join(' ')}
            type={inputType}
            value={props.value}
            onChange={props.onChange}
        />
    )
};

export default Input
