import React from 'react'
import classes from './Label.module.css'

const Label = props => (
    <label className={classes.Label} htmlFor={props.htmlFor}>
        {props.children}
    </label>
)

export default Label
