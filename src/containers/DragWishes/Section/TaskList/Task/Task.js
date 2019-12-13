import React from "react";
import classes from './Task.module.css'

const Task = props => {
    const cls = [
        classes.Task,
        (props.isDragging ? classes.dragging : '')
    ];
    const {provided, innerRef} = props;
    return (
        <div className={cls.join(' ')}

             {...provided.draggableProps}
             {...provided.dragHandleProps}
             ref={innerRef}
        >
            <span>{props.taskName}</span>
        </div>
    )
}

export default Task