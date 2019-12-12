import React from "react";
import classes from './Task.module.css'

const Task = props => {
    const {provided, innerRef} = props;
    return (
        <div className={classes.Task}
             {...provided.draggableProps}
             {...provided.dragHandleProps}
             ref={innerRef}
        >
            <span>{props.taskName}</span>
        </div>
    )
}

export default Task