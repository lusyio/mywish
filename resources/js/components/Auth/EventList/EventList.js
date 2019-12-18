import React from 'react';
import classes from './EventList.module.css'
// import newUserImg from './newUser.svg'
// import newWishImg from 'newWish.svg'
// import shareImg from './share.svg'

const EventList = props => {

    let content = null;
    let image = null;
    let time = props.time;

    if (props.type === 'vk' || 'ok' || 'fb') {
        // image = <img src={shareImg} alt={props.type}/>;
        content =
            <p>
                Список подарков <strong>“{props.wishListName}”</strong> опубликован ВКонтакте
                пользователем <strong>{props.userName}</strong>
                <span>{time}</span>
            </p>;
    }
    if (props.type === 'user') {
        // image = <img src={newUserImg} alt={props.type}/>;
        content =
            <p>
                <strong>{props.userName}</strong> присоединился к сервису
                Добро пожаловать!
                <span>{time}</span>
            </p>;
    }
    if (props.type === 'list') {
        // image = <img src={newWishImg} alt={props.type}/>;
        content =
            <p>
                <strong>{props.userName}</strong> составил новый список подарков <strong>“{props.wishListName}”</strong>
                <span>{time}</span>
            </p>
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
