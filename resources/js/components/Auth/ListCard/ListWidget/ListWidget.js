import React from 'react'
import classes from './ListWidget.module.css'

const ListWidget = props => {
    return (
        <div className={classes.ListWidget}>
            {props.children}
        </div>
    )
};

export default ListWidget
