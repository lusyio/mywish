import React from "react";
import classes from './Section.module.css'
import TaskList from "./TaskList/TaskList";
import {Droppable} from "react-beautiful-dnd";

const Section = props => {
    return (
        <div className={classes.Section}>
            <h1>{props.sectionName}</h1>
            <Droppable droppableId={props.sectionId.toString()}>
                {provided => (
                    <React.Fragment>
                        <TaskList
                            innerRef={provided.innerRef}
                            provided={provided}
                            taskList={props.taskList}
                            sectionId={props.sectionId}
                        >
                        </TaskList>
                        {provided.placeholder}
                    </React.Fragment>

                )}
            </Droppable>
        </div>
    )
};

export default Section