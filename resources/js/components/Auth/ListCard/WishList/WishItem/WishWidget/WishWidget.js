import React from 'react'
import classes from './WishWidget.Module.css'

const WishWidget = props => (
    <div className={classes.WishWidget}>
        {props.children}
    </div>
)

export default WishWidget
