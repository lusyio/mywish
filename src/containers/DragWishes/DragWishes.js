import React, {Component} from "react";
import classes from './DragWishes.module.css'
import Section from "./Section/Section";
import {DragDropContext} from 'react-beautiful-dnd'

class DragWishes extends Component {
    state = {
        sections: {
            section: [
                {
                    sectionName: 'Секция 1',
                    sectionId: 1
                },
                {
                    sectionName: 'Секция 1',
                    sectionId: 2
                }
            ],
            tasks: [
                {
                    taskName: 'тестовая задача 1',
                    taskId: 1,
                    sectionId: 1,
                },
                {
                    taskName: 'тестовая задача 2',
                    taskId: 2,
                    sectionId: 1,
                },
                {
                    taskName: 'тестовая задача 3',
                    taskId: 3,
                    sectionId: 2,
                },
                {
                    taskName: 'тестовая задача 4',
                    taskId: 4,
                    sectionId: 2,
                }
            ]
        }
    };

    onDragEnd = result => {

    };

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div className={classes.DragWishesWrapper}>
                    {this.state.sections.section.map((section, index) => {
                        return (
                            <Section
                                key={index}
                                sectionName={section.sectionName}
                                sectionId={section.sectionId}
                                taskList={this.state.sections.tasks}
                            >
                            </Section>
                        )
                    })
                    }
                </div>
            </DragDropContext>
        )
    }
}

export default DragWishes