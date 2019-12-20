import React from 'react'
import classes from './WishItem.module.css'
import Input from "../../../../UI/Input/Input";
import WishWidget from "./WishWidget/WishWidget";
import Button from "../../../../UI/Button/Button";

const WishItem = props => {
    let renderWishItem;

    if (props.type === 'addNew') {
        renderWishItem =
            <React.Fragment>
                <div className={classes.WishItem}>
                    <Input onChange={event => props.uploadImg(event)} type='file'/>
                    <div>
                        <Input maxLength='100' onChange={event => props.onChangeWishName(event)}/>
                        <Input maxLength='255' onChange={event => props.onChangeWishUrl(event)}/>
                    </div>
                    <WishWidget>
                        <Button onClick={() => props.addNewWish(props.listId, props.newWishId)}
                                type='widget'>ADD</Button>
                        <Button onClick={props.showNewWishToggle} type='widget'>DEL</Button>
                    </WishWidget>
                </div>
            </React.Fragment>
    } else {
        renderWishItem =
            <React.Fragment>
                <div className={classes.WishItem}>
                    <img src={'mywish.su/public/' + props.picture} alt={props.title}/>
                    <div>
                        <p className={classes.Title}>{props.title}</p>
                        <a href={props.url}>{props.url}</a>
                    </div>
                    <WishWidget>
                        <Button type='widget'>CNG</Button>
                        <Button onClick={() => props.deleteWish(props.listId, props.id)} type='widget'>DEL</Button>
                    </WishWidget>
                </div>
            </React.Fragment>
    }

    return renderWishItem

};

export default WishItem

