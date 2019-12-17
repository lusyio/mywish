import React, {Component} from 'react';
import classes from './Auth.module.css'
import Button from "../UI/Button/Button";
import FacebookLogin from 'react-facebook-login';
import Card from "../Card/Card";
import AuthList from "./AuthList/AuthList";

export default class Auth extends Component {

    state = {
        authList: [
            {
                userName: 'Дмитрий Ласковский',
                listName: 'Хочу на новый год',
                type: 'share',
                time: '123'
            },
            {
                userName: 'Дмитрий Ласковский',
                listName: 'Хочу на новый год',
                type: 'newUser',
                time: '123'
            },
            {
                userName: 'Дмитрий Ласковский',
                listName: 'Хочу на новый год',
                type: 'newList',
                time: '123'
            },
        ],
        isLoggedIn: false,
        userId: null,
        name: null,
        email: null,
        picture: null,
    };

    responseFacebook = (response) => {
        console.log(response);
        this.setState({
            name: response.name,
            email: response.email,
            picture: response.picture.data.url,
            userID: response.userID
        });
    };

    componentClicked = () => console.log('fb clicked');


    render() {
        let fbContent;

        if (this.state.isLoggedIn) {
            fbContent = null;
        } else {
            fbContent =
                <FacebookLogin
                    appId='563234647569569'
                    autoLoad={false}
                    fields="name,email,picture"
                    onClick={this.componentClicked}
                    callback={this.responseFacebook}
                    cssClass={classes.fbLogin}
                    textButton=''
                />
            ;
        }

        return  (
            <div className={classes.Auth}>
                <div>
                    <p>MyWish - это сервис для составления списка желаний</p>
                    <p>Подскажите Вашим близким, друзьям, коллегам, чтобы Вы хотели получить в подарок! Составьте свой список и поделитесь им!</p>
                    <Card>
                        <p>Авторизуйтесь с помощью соц.сетей и составьте свой список подарков!</p>
                        {fbContent}
                    </Card>
                    <AuthList/>
                </div>
            </div>
        )
    }
}
