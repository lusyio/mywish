import React from 'react';
import classes from './EventList.module.css'
import newUserImg from '../../../../../public/svg/userEvent.svg'
import newWishImg from '../../../../../public/svg/giftEvent.svg'
import shareImg from '../../../../../public/svg/shareEvent.svg'

const EventList = props => {

    let content = null;
    let image = null;
    let time = <span className={classes.EventListTime}>{props.timeConverter(props.time)}</span>;
    let wishName = props.wishListName;

    if (props.wishListName !== null && props.wishListName.length >= 38) {
        wishName = props.wishListName.slice(0, 35) + '...'
    }

    if (props.type === 'vk' || 'ok' || 'fb') {
        let socialName;
        if (props.type === 'vk') {
            socialName = 'ВКонтакте'
        }else if (props.type === 'fb') {
            socialName = 'в Facebook'
        } else {
            socialName = 'в Одноклассниках'
        }
        image = <img src={shareImg} alt={props.type}/>;
        content =
            <div>
                <p>
                    Список подарков <strong>“{wishName}”</strong> опубликован {socialName} пользователем <strong>{props.userName}</strong>
                </p>
                {time}
            </div>
    }
    if (props.type === 'user') {
        image = <img src={newUserImg} alt={props.type}/>;
        content =
            <div>
                <p>
                    <strong>{props.userName}</strong> присоединился к сервису.
                    Добро пожаловать!
                </p>
                {time}
            </div>
    }
    if (props.type === 'list') {
        image = <img src={newWishImg} alt={props.type}/>;
        content =
            <div>
                <p>
                    <strong>{props.userName}</strong> составил новый список
                    подарков <strong>“{wishName}”</strong>
                </p>
                {time}
            </div>
    }



    return (
        <React.Fragment>
            <div className={classes.EventList}>
                {image}
                {content}
            </div>
        </React.Fragment>
    )
};

export default EventList
