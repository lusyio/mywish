import React from 'react'
import classes from './ListCard.module.css'
import WishList from "./WishList/WishList";
import Button from "../../UI/Button/Button";
import ColorPicker from "./ColorPicker/ColorPicker";
import Input from "../../UI/Input/Input";
import ListWidget from "./ListWidget/ListWidget";
import {Link} from "react-router-dom";
import Eye from '../../../../../public/svg/Eye.svg'
import share from '../../../../../public/svg/share.svg'
import trash from '../../../../../public/svg/trash.svg'
import plus from '../../../../../public/svg/plus.svg'
import giftbox from '../../../../../public/svg/giftbox.svg'

const ListCard = props => {
    let cls = [
        classes.ListCard,
        classes.Empty
    ];
    let renderList;

    if (props.lists.items.length !== 0) {
        renderList =
            props.lists.items.map((list) => {
                if (list.id === props.lists.defaultListId) {
                    let header = <p onClick={event => props.showNewListTitleToggle(event)}
                                    className={classes.CardHeader}>{list.name}</p>
                    if (props.showNewListTitle) {
                        header = <Input onChange={event => props.onChangeListTitle(event, list.id)}
                                        onBlur={() => props.onBlurListTitle(list.id, list.name, list.backgroundNumber)}
                                        value={list.name} addClass='inputHeader'/>
                    }
                    return (
                        <div key={list.id} className={classes.ListCard}
                             style={{background: `url(${props.background[list.backgroundNumber]})`}}>
                            <div className={classes.ListCardBody}>
                                {header}
                                <ColorPicker
                                    activeColor={list.backgroundNumber}
                                    name={list.name}
                                    listId={list.id}
                                    onPickColor={props.onPickColor}
                                    background={props.background}
                                />
                                <WishList
                                    widgetOff={props.widgetOff}
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
                                    <img src={plus}/>
                                    Добавить еще желание
                                </Button>
                            </div>
                            <ListWidget>
                                <Link to={`/list/${list.link}`}><Button type='listWidget'><img src={Eye}/> Предпросмотр</Button></Link>
                                <Button onClick={() => props.shareList(list.id, list.name, 'share', list.link)}
                                        type='listWidget'><img src={share}/>Рассказать
                                    друзьям</Button>
                                <Button onClick={() => props.deleteList(list.id, list.name, 'delete', list.link)}
                                        type='listWidget'><img src={trash}/>Удалить список</Button>
                            </ListWidget>
                        </div>
                    )
                }
            })
    } else {
        renderList =
            <div className={cls.join(' ')}>
                <div className={classes.ListCardBodyEmpty}>
                    <img src={giftbox}/>
                    <p>У вас еще нет не одного списка</p>
                    <Button onClick={props.addList} type='primary'>Создать список</Button>
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
