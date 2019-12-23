import React from 'react'
import classes from './Sidebar.module.css'
import Button from "../../UI/Button/Button";

const Sidebar = props => {
    let renderList;

    if (props.lists.count !== 0) {
        renderList =
            props.lists.items.map((list ) => {
                return (
                    <li key={list.id} onClick={() => props.onClick(list.id)}>
                        <a>{list.name}</a>
                        <span>Список создан {props.timeConverter(list.createdAt)}</span>
                    </li>
                )
            })
    } else {
        renderList =
            <li>
                <p className={classes.Empty}>У вас ещё нет ни одного списка</p>
            </li>
    }


    return (
        <nav className={classes.Sidebar}>
            <p className={classes.SidebarHeader}>Мои списки желаний:</p>
            <ul>
                {renderList}
                <li>
                    <Button onClick={props.addList} type='addListSidebar'>Добавить еще список</Button>
                </li>
            </ul>
        </nav>
    )
};

export default Sidebar
