import React from 'react'
import classes from './Sidebar.module.css'
import Button from "../../UI/Button/Button";
import plus from '../../../../../public/svg/plus.svg'

const Sidebar = props => {
    let renderList;

    if (props.lists.items.length !== 0) {
        renderList =
            props.lists.items.map((list) => {
                let listName = list.name;
                if (list.name.length >= 23) {
                    listName = list.name.slice(0, 20) + '...'
                }
                return (
                    <li key={list.id} onClick={() => props.onClick(list.id)}>
                        <a>{listName}</a>
                        <span>Список обновлен {props.timeConverter(list.updatedAt)}</span>
                        <hr className={classes.hr}/>
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
                    <Button onClick={props.addList} type='addListSidebar'>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M16 7.61905H8.38095V0H7.61905V7.61905H0V8.38095H7.61905V16H8.38095V8.38095H16V7.61905Z"
                                fill="#B9B5B4"/>
                        </svg>
                        Добавить еще список</Button>
                </li>
            </ul>
        </nav>
    )
};

export default Sidebar
