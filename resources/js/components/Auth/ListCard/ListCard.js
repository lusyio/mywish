import React from 'react'
import classes from './ListCard.module.css'
import WishList from "./WishList/WishList";
import Button from "../../UI/Button/Button";

const ListCard = props => {
    let renderList;

    if (props.lists.count !== 0) {
        renderList =
            props.lists.items.map((list) => {
                return list.id === props.selectedList ? (
                        <WishList
                            key={list.id}
                            wishItems={list.wishItems}
                        />
                    )
                    :
                    null
            })
    } else {
        renderList =
            <div className={classes.Empty}>
                <p>У вас еще нет не одного списка</p>
                <Button>Создать список</Button>
            </div>

    }

    return (
        <div className={classes.ListCard}>
            <div className={classes.ListCardBody}>
                {renderList}
            </div>
        </div>
    )
};


export default ListCard
