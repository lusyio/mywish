import React from 'react'
import classes from './WishItem.module.css'
import Input from "../../../../UI/Input/Input";
import WishWidget from "./WishWidget/WishWidget";
import Button from "../../../../UI/Button/Button";
import Label from "../../../../UI/Label/Label";
import tick from '../../../../../../../public/svg/tick.svg'
import trashWish from '../../../../../../../public/svg/trashWish.svg'
import plusWish from '../../../../../../../public/svg/plusWish.svg'
import emptyWishImg from '../../../../../../../public/svg/emptyWishImg.svg'


const WishItem = props => {
    let renderWishItem;

    let widgetAddNew =
        <WishWidget>
            <Button onClick={() => props.addNewWish(props.listId, props.newWishId)}
                    type='widget'><img src={tick}/></Button>
            <Button onClick={props.showNewWishToggle} type='widget'><img src={trashWish}/></Button>
        </WishWidget>;

    let widgetWish =
        <WishWidget>
            <Button onClick={() => props.deleteWish(props.listId, props.id)} type='widget'><img
                src={trashWish}/></Button>
        </WishWidget>;

    if (props.widgetOff) {
        widgetAddNew = null;
        widgetWish = null;
    }

    const htmlFor = `${props.type}-${Math.random() * 100}`;

    if (props.type === 'addNew') {
        renderWishItem =
            <React.Fragment>
                <div className={classes.WishItem}>
                    <Label htmlFor={htmlFor}>
                        <img src={plusWish}/>
                        <Input id={htmlFor} onChange={event => props.uploadImg(event)} type='file'/>
                    </Label>
                    <div>
                        <Input placeholder='Название желания, н-р: Apple iPhone XS ' maxLength='100'
                               onChange={event => props.onChangeWishName(event)}/>
                        <Input placeholder='Ссылка на товар, н-р: https://apple.com/ru/' maxLength='255'
                               onChange={event => props.onChangeWishUrl(event)}/>
                    </div>
                    {widgetAddNew}
                </div>
            </React.Fragment>
    } else {
        let pic;
        if (props.picture === '') {
            pic = emptyWishImg
        } else {
            pic = props.picture
        }
        renderWishItem =
            <React.Fragment>
                <div className={classes.WishItem}>
                    <img src={pic} alt={props.title}/>
                    <div>
                        <p className={classes.Title}>{props.title}</p>
                        <a href={props.url}>{props.url}</a>
                    </div>
                    {widgetWish}
                </div>
            </React.Fragment>
    }

    return renderWishItem

};

export default WishItem

