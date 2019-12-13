import React from "react";
import Task from "./Task/Task";
import {Draggable} from "react-beautiful-dnd";

const TaskList = props => {
    const {provided, innerRef} = props;
    return (
        <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={innerRef}
        >
            {props.taskList.map((task, index) => {
                return task.sectionId === props.sectionId
                    ?
                    <Draggable key={index} draggableId={task.taskId.toString()} index={index}>
                        {(provided, snapshot) => (
                            <Task
                                provided={provided}
                                innerRef={provided.innerRef}
                                key={index}
                                taskId={task.taskId}
                                taskName={task.taskName}
                                index={index}
                                isDragging={snapshot.isDragging}
                            >
                            </Task>
                        )}
                    </Draggable>

                    :
                    null
            })}
        </div>
    )
};

export default TaskList