import React from 'react'
import classes from './ListCard.module.css'
import WishList from "./WishList/WishList";
import Button from "../../UI/Button/Button";
import ColorPicker from "./ColorPicker/ColorPicker";

const ListCard = props => {
    let cls = [
        classes.ListCard,
        classes.Empty
    ];
    let renderList;

    if (props.lists.count !== 0) {
        renderList =
            props.lists.items.map((list) => {
                return list.id === props.lists.defaultListId ? (
                        <div key={list.id} className={classes.ListCard} style={{background: `url(${props.background[list.backgroundNumber]})`}}>
                            <div className={classes.ListCardBody}>
                                <ColorPicker
                                    listId={list.id}
                                    onPickColor={props.onPickColor}
                                    background={props.background}
                                />
                                <WishList
                                    uploadImg={props.uploadImg}
                                    deleteWish={props.deleteWish}
                                    newWishId={props.newWishId}
                                    addNewWish={props.addNewWish}
                                    showNewWishToggle={props.showNewWishToggle}
                                    onChangeWishUrl={props.onChangeWishUrl}
                                    onChangeWishName={props.onChangeWishName}
                                    listId={list.id}
                                    showNewWish={props.showNewWish}
                                    key={list.id}
                                    wishItems={list.wishItems}
                                />
                                <Button
                                    type='showNewWish'
                                    onClick={props.showNewWishToggle}
                                >
                                    Добавить еще желание
                                </Button>
                            </div>
                        </div>
                    )
                    :
                    null
            })
    } else {
        renderList =
            <div className={cls.join(' ')}>
                <div className={classes.ListCardBody}>
                    <p>У вас еще нет не одного списка</p>
                    <Button>Создать список</Button>
                </div>
            </div>

    }

    return (
        <React.Fragment>
            {renderList}
        </React.Fragment>
    )
};


export default ListCard
