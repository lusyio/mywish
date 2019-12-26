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
                    type='widget'>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0)">
                        <path
                            d="M15.7657 2.35925C15.4533 2.04681 14.9468 2.04681 14.6343 2.35925L5.04983 11.9439L1.3657 8.25972C1.0533 7.94729 0.546797 7.94732 0.234328 8.25972C-0.0781094 8.57213 -0.0781094 9.07863 0.234328 9.39107L4.48414 13.6408C4.79645 13.9532 5.30333 13.953 5.61552 13.6408L15.7657 3.49063C16.0781 3.17822 16.0781 2.67169 15.7657 2.35925Z"
                            fill="black"/>
                    </g>
                    <defs>
                        <clipPath id="clip0">
                            <rect width="16" height="16" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
            </Button>
            <Button onClick={props.showNewWishToggle} type='widget'>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M7.99995 13.8305C8.14964 13.8305 8.27113 13.7093 8.27113 13.5593V4.61018C8.27113 4.46021 8.14964 4.33899 7.99995 4.33899C7.85025 4.33899 7.72876 4.46021 7.72876 4.61018V13.5593C7.72876 13.7093 7.85025 13.8305 7.99995 13.8305Z"
                        fill="black"/>
                    <path
                        d="M5.28803 13.8305C5.43773 13.8305 5.55922 13.7093 5.55922 13.5593V4.61018C5.55922 4.46021 5.43773 4.33899 5.28803 4.33899C5.13834 4.33899 5.01685 4.46021 5.01685 4.61018V13.5593C5.01685 13.7093 5.13834 13.8305 5.28803 13.8305Z"
                        fill="black"/>
                    <path
                        d="M10.7119 13.8305C10.8616 13.8305 10.983 13.7093 10.983 13.5593V4.61018C10.983 4.46021 10.8616 4.33899 10.7119 4.33899C10.5622 4.33899 10.4407 4.46021 10.4407 4.61018V13.5593C10.4407 13.7093 10.5622 13.8305 10.7119 13.8305Z"
                        fill="black"/>
                    <path
                        d="M14.2372 1.62712H10.4287C10.3988 1.28814 10.2944 0.716475 9.93701 0.349559C9.71084 0.117695 9.42393 0 9.0844 0H6.37281C6.03329 0 5.74637 0.117695 5.5202 0.349559C5.16278 0.716475 5.05837 1.28814 5.02854 1.62712H1.76264C1.61295 1.62712 1.49146 1.74834 1.49146 1.89831C1.49146 2.04827 1.61295 2.16949 1.76264 2.16949H2.31613L2.83546 14.6498C2.84549 15.1167 3.1362 16 4.16644 16H11.8334C12.8637 16 13.1544 15.1167 13.1641 14.6555L13.6837 2.16949H14.2372C14.3869 2.16949 14.5084 2.04827 14.5084 1.89831C14.5084 1.74834 14.3869 1.62712 14.2372 1.62712ZM5.90962 0.727051C6.03112 0.602847 6.18271 0.542373 6.37281 0.542373H9.0844C9.27451 0.542373 9.4261 0.602847 9.54759 0.727051C9.7659 0.950237 9.85349 1.34292 9.88386 1.62712H5.57362C5.604 1.34292 5.69159 0.950237 5.90962 0.727051ZM12.622 14.6384C12.6204 14.7222 12.583 15.4576 11.8334 15.4576H4.16644C3.42501 15.4576 3.38054 14.7208 3.37756 14.6327L2.85878 2.16949H13.1408L12.622 14.6384Z"
                        fill="black"/>
                </svg>
            </Button>
        </WishWidget>;

    let widgetWish =
        <WishWidget>
            <Button onClick={() => props.deleteWish(props.listId, props.id)} type='widget'>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M7.99995 13.8305C8.14964 13.8305 8.27113 13.7093 8.27113 13.5593V4.61018C8.27113 4.46021 8.14964 4.33899 7.99995 4.33899C7.85025 4.33899 7.72876 4.46021 7.72876 4.61018V13.5593C7.72876 13.7093 7.85025 13.8305 7.99995 13.8305Z"
                        fill="black"/>
                    <path
                        d="M5.28803 13.8305C5.43773 13.8305 5.55922 13.7093 5.55922 13.5593V4.61018C5.55922 4.46021 5.43773 4.33899 5.28803 4.33899C5.13834 4.33899 5.01685 4.46021 5.01685 4.61018V13.5593C5.01685 13.7093 5.13834 13.8305 5.28803 13.8305Z"
                        fill="black"/>
                    <path
                        d="M10.7119 13.8305C10.8616 13.8305 10.983 13.7093 10.983 13.5593V4.61018C10.983 4.46021 10.8616 4.33899 10.7119 4.33899C10.5622 4.33899 10.4407 4.46021 10.4407 4.61018V13.5593C10.4407 13.7093 10.5622 13.8305 10.7119 13.8305Z"
                        fill="black"/>
                    <path
                        d="M14.2372 1.62712H10.4287C10.3988 1.28814 10.2944 0.716475 9.93701 0.349559C9.71084 0.117695 9.42393 0 9.0844 0H6.37281C6.03329 0 5.74637 0.117695 5.5202 0.349559C5.16278 0.716475 5.05837 1.28814 5.02854 1.62712H1.76264C1.61295 1.62712 1.49146 1.74834 1.49146 1.89831C1.49146 2.04827 1.61295 2.16949 1.76264 2.16949H2.31613L2.83546 14.6498C2.84549 15.1167 3.1362 16 4.16644 16H11.8334C12.8637 16 13.1544 15.1167 13.1641 14.6555L13.6837 2.16949H14.2372C14.3869 2.16949 14.5084 2.04827 14.5084 1.89831C14.5084 1.74834 14.3869 1.62712 14.2372 1.62712ZM5.90962 0.727051C6.03112 0.602847 6.18271 0.542373 6.37281 0.542373H9.0844C9.27451 0.542373 9.4261 0.602847 9.54759 0.727051C9.7659 0.950237 9.85349 1.34292 9.88386 1.62712H5.57362C5.604 1.34292 5.69159 0.950237 5.90962 0.727051ZM12.622 14.6384C12.6204 14.7222 12.583 15.4576 11.8334 15.4576H4.16644C3.42501 15.4576 3.38054 14.7208 3.37756 14.6327L2.85878 2.16949H13.1408L12.622 14.6384Z"
                        fill="black"/>
                </svg>
            </Button>
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
                    {props.tempFile ?
                        <div className={classes.WishItemImg} style={{background: `url(${props.tempFile}`}}>

                        </div>
                        :
                        <Label htmlFor={htmlFor}>
                            <img src={plusWish}/>
                            <Input id={htmlFor} onChange={event => props.uploadImg(event, props.id)} type='file'/>
                        </Label>
                    }
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
        let wishTitle = props.title;
        let wishLink = props.url;
        if (wishTitle !== null && wishTitle.length >= 67) {
            wishTitle = props.title.slice(0, 64) + '...'
        }
        if (wishLink !== null && wishLink.length >= 45) {
            wishLink = props.url.slice(0, 42) + '...'
        }
        renderWishItem =
            <React.Fragment>
                <div className={classes.WishItem}>
                    <div className={classes.WishItemImg} style={{background: `url(${pic}`, backgroundSize: `cover`, border: '1px solid whitesmoke'}}> </div>
                    <div>
                        <p className={classes.Title}>{wishTitle}</p>
                        <a target='_blank' href={props.url}>{wishLink}</a>
                    </div>
                    {widgetWish}
                </div>
            </React.Fragment>
    }

    return renderWishItem

};

export default WishItem

