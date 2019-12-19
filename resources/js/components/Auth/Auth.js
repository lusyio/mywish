import React, {Component} from 'react';
import classes from './Auth.module.css'
import Button from "../UI/Button/Button";
import FacebookLogin from 'react-facebook-login';
import Card from "../Card/Card";
import EventList from "./EventList/EventList";
import EventCounter from "./EventCounter/EventCounter";
import axios from 'axios';
import Sidebar from "./Sidebar/Sidebar";
import ListCard from "./ListCard/ListCard";

export default class Auth extends Component {

    state = {
        count: '3',
        events: [
            {
                id: 1,
                userName: 'Дмитрий Ласковский',
                wishListName: 'Хочу на новый новый год',
                type: 'vk',
                time: 1576658122
            },
            {
                id: 2,
                userName: 'Дмитрий Ласковский',
                wishListName: 'Не хочу на новый год',
                type: 'user',
                time: 1576658122
            },
            {
                id: 3,
                userName: 'Дмитрий Ласковский',
                wishListName: 'Хочу на новый год',
                type: 'list',
                time: 1576658122
            },
        ],
        selectedList: 2,
        lists: {
            count: 2,
            items: [
                {
                    id: 1,
                    name: 'Новый список1',
                    updatedAt: 1213,
                    background: 1,
                    userId: 123,
                    userName: "Иван петров",
                    createdAt: 1200,
                    wishItems: [
                        {
                            id: 1,
                            title: "Смартфон",
                            url: "https://app.swaggerhub.com/apis-docs/igor0u/mywish/1.0.0-oas3#/default/post_lists",
                        },
                        {
                            id: 1,
                            title: "Новый смайртфон",
                            url: "https://app.swaggerhub.com/apis-docs/igor0u/mywish/1.0.0-oas3#/default/post_lists",
                        }
                    ]
                },
                {
                    id: 2,
                    name: 'Новый список2',
                    updatedAt: 1213,
                    background: 1,
                    userId: 123,
                    userName: "Иван петров",
                    createdAt: 1200,
                    wishItems: [
                        {
                            id: 2,
                            title: "Смартфон",
                            url: "https://app.swaggerhub.com/apis-docs/igor0u/mywish/1.0.0-oas3#/default/post_lists",
                            picture: 'https://ireplace.ru/images/watermarked/1/thumbnails/1308/1144/detailed/0/MMEF2_AV2_32wp-2p.jpg'
                        },
                        {
                            id: 2,
                            title: "Новый смайртфон",
                            url: "https://app.swaggerhub.com/apis-docs/igor0u/mywish/1.0.0-oas3#/default/post_lists",
                            picture: 'https://ireplace.ru/images/watermarked/1/thumbnails/1308/1144/detailed/0/MMEF2_AV2_32wp-2p.jpg'
                        }
                    ]
                }
            ]
        },
        isLoggedIn: true,
        userId: null,
        tokenAuth: null,
        name: null,
        email: null,
    };

    responseFacebook = (response) => {

        console.log(response);
        // отправка данных авторизации
        axios.post('/api/auth', {
            "social": 'fb',
            "name": response.name,
            "url": "",
            "token": response.accessToken,
            "socialUserId": response.userId,
        })
            .then(res => {
                this.setState({
                    userId: res.userId,
                    tokenAuth: res.tokenAuth
                })
            }, res => console.log('error', res));

        if (this.state.userId !== null && this.state.tokenAuth !== '') {
            this.setState({
                isLoggedIn: true
            });
        }
    };

    selectListHandler = (id) => {
        this.setState({
            selectedList: id
        })
        console.log(this.state.lists.selectedList);

    };

    // Получаю начальные данные eventov. count и event записываю в соответствующие state
    componentDidMount() {
        // axios.get('/events')
        //     .then(res => {
        //         this.setState({
        //             count: res.count,
        //             events: res.events
        //         })
        //     }, res => console.log('error', res))
    }

    render() {
        function compare(eventsIds, resIds) {
            return eventsIds.length === resIds.length && eventsIds.every((v, i) => v === resIds[i])
        }

        // setTimeout(() => axios.get('/events')
        //     .then(res => {
        //         let eventsId = [];
        //         let resId = [];
        //         this.state.events.map((events, index) => {
        //             eventsId.push(events.id)
        //         });
        //         res.events.map((events) => {
        //             resId.push(events.id)
        //         });
        //
        //         if (compare(eventsId, resId)) {
        //             this.setState({
        //                 count: res.count,
        //                 events: res.events
        //             })
        //         }
        //     }, res => console.log('error', res)), 30000);

        let authContent;

        if (this.state.isLoggedIn) {
            authContent =
                <div className={classes.Container}>
                    <div>
                        <Sidebar
                            onClick={this.selectListHandler}
                            lists={this.state.lists}
                        />
                        <ListCard
                            selectedList={this.state.selectedList}
                            lists={this.state.lists}
                        />
                    </div>
                </div>
        } else {
            authContent =
                <div className={classes.Auth}>
                    <div>
                        <p className={classes.AuthHeader}>MyWish - это сервис для составления списка желаний</p>
                        <p className={classes.AuthHeader}>Подскажите Вашим близким, друзьям, коллегам, чтобы Вы хотели
                            получить в подарок! Составьте свой
                            список и поделитесь им!</p>
                        <Card>
                            <p>Авторизуйтесь с помощью соц.сетей и составьте свой список подарков!</p>
                            <FacebookLogin
                                appId='563234647569569'
                                version='5.0'
                                language='ru_RU'
                                autoLoad={false}
                                fields="name,email"
                                callback={this.responseFacebook}
                                cssClass={classes.fbLogin}
                                textButton='FB'
                            />
                        </Card>
                        <EventCounter
                            count={this.state.count}
                        />
                        {this.state.events.map((event) => {
                            return (
                                <EventList
                                    key={event.id}
                                    id={event.id}
                                    userName={event.userName}
                                    time={event.time}
                                    wishListName={event.wishListName}
                                    type={event.type}
                                />
                            )
                        })}
                    </div>
                </div>
        }

        return (
            <React.Fragment>
                {authContent}
            </React.Fragment>
        )
    }
}
