import React from 'react'
import classes from './ListCard.module.css'
import WishList from "./WishList/WishList";
import Button from "../../UI/Button/Button";

const ListCard = props => {
    let renderList;

    if (props.lists.count !== 0) {
        renderList =
            props.lists.items.map((list) => {
                return list.id === props.lists.selectedList ? (
                        <WishList
                            addNewWish={props.addNewWish}
                            showNewWishToggle={props.showNewWishToggle}
                            onChangeWishUrl={props.onChangeWishUrl}
                            onChangeWishName={props.onChangeWishName}
                            listId={list.id}
                            showNewWish={props.showNewWish}
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
                <Button
                    type='showNewWish'
                    onClick={props.showNewWishToggle}
                >
                    Добавить еще желание
                </Button>
            </div>
        </div>
    )
};


export default ListCard
