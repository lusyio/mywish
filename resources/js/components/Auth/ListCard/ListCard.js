import React from 'react'
import classes from './ListCard.module.css'
import WishList from "./WishList/WishList";
import Button from "../../UI/Button/Button";
import ColorPicker from "./ColorPicker/ColorPicker";
import Input from "../../UI/Input/Input";
import ListWidget from "./ListWidget/ListWidget";
import {Link} from "react-router-dom";
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
                    let listName = list.name;
                    if (list.name.length >= 23) {
                        listName = list.name.slice(0, 19) + '...'
                    }
                    let header = <p onClick={event => props.showNewListTitleToggle(event)}
                                    className={classes.CardHeader}>{listName}</p>
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
                                <Link target="_blank" to={`/list/${list.link}`}><Button type='listWidget'>
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0)">
                                            <path
                                                d="M12.6918 16.1831C12.448 15.9387 12.0518 15.9387 11.808 16.1831C11.5637 16.4269 11.5637 16.8231 11.808 17.0669C12.0518 17.3112 12.448 17.3112 12.6918 17.0669C12.9362 16.8231 12.9362 16.4269 12.6918 16.1831Z"
                                                fill="#8A8A8A"/>
                                            <path
                                                d="M16 17.25C14.9661 17.25 14.125 18.0911 14.125 19.125C14.125 20.1589 14.9661 21 16 21C17.0339 21 17.875 20.1589 17.875 19.125C17.875 18.0911 17.0339 17.25 16 17.25ZM16 19.75C15.6554 19.75 15.375 19.4696 15.375 19.125C15.375 18.7804 15.6554 18.5 16 18.5C16.3446 18.5 16.625 18.7804 16.625 19.125C16.625 19.4696 16.3446 19.75 16 19.75Z"
                                                fill="#8A8A8A"/>
                                            <path
                                                d="M16 14.125C15.3014 14.125 14.6258 14.2662 13.9923 14.5447C13.6763 14.6836 13.5327 15.0524 13.6716 15.3684C13.8104 15.6844 14.1792 15.8279 14.4952 15.6891C14.9693 15.4807 15.4756 15.375 16 15.375C18.0677 15.375 19.75 17.0573 19.75 19.125C19.75 21.1927 18.0677 22.875 16 22.875C13.9323 22.875 12.25 21.1927 12.25 19.125C12.25 19.1036 12.2499 19.0827 12.2504 19.0614C12.2584 18.7163 11.9852 18.4301 11.6401 18.4221C11.2945 18.4134 11.0088 18.6873 11.0008 19.0324C11.0001 19.0635 11 19.0939 11 19.125C11 21.882 13.243 24.125 16 24.125C18.757 24.125 21 21.882 21 19.125C21 16.368 18.757 14.125 16 14.125Z"
                                                fill="#8A8A8A"/>
                                            <path
                                                d="M16 4.75C15.6548 4.75 15.375 5.02981 15.375 5.375V9.125C15.375 9.47019 15.6548 9.75 16 9.75C16.3452 9.75 16.625 9.47019 16.625 9.125V5.375C16.625 5.02981 16.3452 4.75 16 4.75Z"
                                                fill="#8A8A8A"/>
                                            <path
                                                d="M9.0178 9.38361L6.36654 6.73236C6.12248 6.4883 5.72673 6.4883 5.48261 6.73236C5.23854 6.97643 5.23854 7.37217 5.48261 7.6163L8.13386 10.2675C8.37792 10.5116 8.77373 10.5117 9.0178 10.2675C9.26186 10.0235 9.26186 9.62774 9.0178 9.38361Z"
                                                fill="#8A8A8A"/>
                                            <path
                                                d="M26.5178 6.73236C26.2737 6.4883 25.878 6.4883 25.6338 6.73236L22.9826 9.38361C22.7385 9.62767 22.7385 10.0234 22.9826 10.2675C23.2266 10.5116 23.6224 10.5117 23.8665 10.2675L26.5178 7.6163C26.7618 7.37224 26.7618 6.97649 26.5178 6.73236Z"
                                                fill="#8A8A8A"/>
                                            <path
                                                d="M31.8434 19.2319C27.8731 14.7369 21.9779 11 16 11C10.0213 11 4.12612 14.7379 0.156557 19.2319C-0.071943 19.4906 -0.047443 19.8856 0.211244 20.1141C0.469994 20.3426 0.864995 20.3181 1.09343 20.0594C1.22662 19.9086 1.36306 19.7583 1.50124 19.609C4.58968 24.2755 10.1883 27.25 16 27.25C21.8117 27.25 27.4103 24.2755 30.4987 19.609C30.6369 19.7584 30.7734 19.9086 30.9066 20.0594C31.1343 20.3173 31.5292 20.3433 31.7887 20.1141C32.0474 19.8856 32.0719 19.4906 31.8434 19.2319ZM16 26C10.5053 26 5.22056 23.1451 2.39443 18.6887C4.62118 16.5068 9.76631 12.25 16 12.25C22.2337 12.25 27.3788 16.5068 29.6056 18.6887C26.7794 23.1451 21.4947 26 16 26Z"
                                                fill="#8A8A8A"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0">
                                                <rect width="32" height="32" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    Предпросмотр</Button></Link>
                                <Button onClick={() => props.shareList(list.id, list.name, 'share', list.link)}
                                        type='listWidget'>
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M31.8133 12.8851L20.7556 1.8275C20.5733 1.64519 20.2991 1.59069 20.0609 1.68937C19.8228 1.78806 19.6674 2.02056 19.6674 2.27831V8.29625H16.5609C12.1373 8.29625 7.9785 10.0189 4.85056 13.1468C1.72263 16.2747 0 20.4335 0 24.8571V29.7217C0 29.9848 0.161625 30.2208 0.406875 30.316C0.481813 30.3451 0.559937 30.3592 0.637312 30.3592C0.812937 30.3592 0.984875 30.2865 1.108 30.1517L6.91838 23.7928C10.0642 20.3501 14.5431 18.3755 19.2066 18.3755H19.6674V24.3935C19.6674 24.6514 19.8228 24.8837 20.0609 24.9824C20.2991 25.0812 20.5733 25.0266 20.7556 24.8443L31.8133 13.7866C31.9328 13.6671 32 13.5049 32 13.3358C32 13.1667 31.9328 13.0046 31.8133 12.8851ZM20.9424 22.8546V17.7381C20.9424 17.386 20.6569 17.1006 20.3049 17.1006H19.2066C14.1859 17.1006 9.364 19.2264 5.97731 22.9329L1.275 28.0791V24.8571C1.275 16.4284 8.13225 9.57119 16.561 9.57119H20.305C20.657 9.57119 20.9424 9.28581 20.9424 8.93375V3.81725L30.4611 13.3359L20.9424 22.8546Z"
                                            fill="#8A8A8A"/>
                                        <path
                                            d="M15.9657 10.6454C15.792 10.6454 15.6164 10.6489 15.4438 10.6559C15.0921 10.67 14.8183 10.9667 14.8326 11.3184C14.8464 11.6615 15.1288 11.9303 15.4691 11.9303C15.4778 11.9303 15.4864 11.9301 15.4951 11.9297C15.6507 11.9234 15.809 11.9203 15.9657 11.9203C16.3177 11.9203 16.6031 11.6349 16.6031 11.2828C16.6031 10.9308 16.3177 10.6454 15.9657 10.6454Z"
                                            fill="#8A8A8A"/>
                                        <path
                                            d="M13.8188 11.4551C13.7389 11.1123 13.3964 10.8991 13.0532 10.9791C11.3744 11.3706 9.81563 12.0878 8.42006 13.1109C8.13606 13.3191 8.07469 13.718 8.28281 14.0019C8.40769 14.1722 8.60119 14.2624 8.79744 14.2624C8.92825 14.2624 9.06025 14.2224 9.17388 14.139C10.4299 13.2182 11.8326 12.5728 13.3429 12.2205C13.6857 12.1407 13.8987 11.7979 13.8188 11.4551Z"
                                            fill="#8A8A8A"/>
                                    </svg>
                                    Рассказать
                                    друзьям</Button>
                                <Button onClick={() => props.deleteList(list.id, list.name, 'delete', list.link)}
                                        type='listWidget'>
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M27.4215 2.60494H20.1773V0.637438C20.1773 0.285438 19.8919 0 19.5399 0H12.4597C12.1077 0 11.8223 0.285438 11.8223 0.637438V2.60494H4.57811C4.22605 2.60494 3.94067 2.89037 3.94067 3.24237V7.85112C3.94067 8.20312 4.22605 8.48856 4.57811 8.48856H5.54374V31.3625C5.54374 31.7145 5.82911 31.9999 6.18117 31.9999H25.8185C26.1705 31.9999 26.4559 31.7145 26.4559 31.3625V8.48862H27.4215C27.7735 8.48862 28.059 8.20319 28.059 7.85119V3.24244C28.059 2.89038 27.7735 2.60494 27.4215 2.60494ZM13.0972 1.27488H18.9024V2.60494H13.0972V1.27488ZM25.181 30.7251H20.1105V13.2614C20.1105 12.9094 19.825 12.624 19.473 12.624C19.121 12.624 18.8356 12.9094 18.8356 13.2614V30.7251H13.164V10.5897C13.164 10.2377 12.8786 9.95225 12.5265 9.95225C12.1745 9.95225 11.8891 10.2377 11.8891 10.5897V30.7251H6.81861V8.48862H25.181V30.7251ZM26.784 7.21369H5.21555V3.87981H26.784V7.21369Z"
                                            fill="#8A8A8A"/>
                                        <path
                                            d="M19.4731 9.95224C19.1211 9.95224 18.8357 10.2377 18.8357 10.5897V11.0572C18.8357 11.4092 19.1211 11.6947 19.4731 11.6947C19.8251 11.6947 20.1106 11.4092 20.1106 11.0572V10.5897C20.1106 10.2377 19.8251 9.95224 19.4731 9.95224Z"
                                            fill="#8A8A8A"/>
                                    </svg>
                                    Удалить список</Button>
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
