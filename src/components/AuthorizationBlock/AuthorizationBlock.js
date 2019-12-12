import React from "react";
import classes from './AuthorizationBlock.module.css'
import Button from "../UI/Button/Button";

const AuthorizationBlock = props => {
    return (
        <div className={classes.AuthorizationBlock}>
            {props.isLoggedIn ?
                <React.Fragment>
                <h1>Вы вошли как {props.userName}</h1>
                    <img src={props.userImageUrl} alt=""/>
                </React.Fragment>
                :
                <React.Fragment>
                    <h1>Авторизация</h1>
                    <Button onClick={props.signInGoogle}>Войти с помощью Google</Button>
                </React.Fragment>
            }

        </div>
    )
};

export default AuthorizationBlock;