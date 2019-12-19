import React from 'react'
import classes from './Sidebar.module.css'

const Sidebar = props => {

    let renderList;

    if (props.lists.count !== 0) {
        renderList =
            props.lists.items.map((list, index) => {
                return (
                    <li key={index} onClick={() => props.onClick(list.id)}>
                        <a>{list.name}</a>
                        <span>Список создан {list.createdAt}</span>
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
            </ul>
        </nav>
    )
};

export default Sidebar
