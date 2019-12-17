import React from 'react';
import classes from './AuthList.module.css'

const AuthList = props => {
    return (
        <React.Fragment>
            <div className={classes.AuthList}>
                <img src="" alt="image"/>
                <p>Список подарков <strong>“Хочу на Новый год!”</strong> опубликован ВКонтакте пользователем <strong>Дмитрий Ласковский</strong>
                    <span>
                        7 минут назад
                    </span>
                </p>
            </div>
        </React.Fragment>
    )
};

export default AuthList
