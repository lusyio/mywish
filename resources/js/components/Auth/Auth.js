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

        wishNameControl: '',
        wishUrlControl: '',
        listNameControl: '',
        newBackgroundNumber: null,
        background: [
            '/images/bg1.jpg',
            '/images/bg2.jpg',
            '/images/bg3.jpg',
            '/images/bg4.jpg',
            '/images/bg5.jpg',
        ],
        newWishId: null,
        newListId: null,
        showNewWish: false,
        showNewListTitle: false,

        lists: {
            defaultListId: 2,
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
                    backgroundNumber: 0,
                    wishItems: [
                        {
                            id: 1,
                            listId: 1,
                            title: "Смартфон",
                            url: "https://app.swaggerhub.com/apis-docs/igor0u/mywish/1.0.0-oas3#/default/post_lists",
                        },
                        {
                            id: 2,
                            listId: 1,
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
                            id: 3,
                            listId: 2,
                            title: "Смартфон",
                            url: "https://app.swaggerhub.com/apis-docs/igor0u/mywish/1.0.0-oas3#/default/post_lists",
                            picture: 'https://ireplace.ru/images/watermarked/1/thumbnails/1308/1144/detailed/0/MMEF2_AV2_32wp-2p.jpg'
                        },
                        {
                            id: 4,
                            listId: 2,
                            title: "Новый смайртфон",
                            url: "https://app.swaggerhub.com/apis-docs/igor0u/mywish/1.0.0-oas3#/default/post_lists",
                            picture: 'https://ireplace.ru/images/watermarked/1/thumbnails/1308/1144/detailed/0/MMEF2_AV2_32wp-2p.jpg'
                        }
                    ]
                }
            ]
        },
        file: null,
        isLoggedIn: false,
        userId: null,
        authToken: '',
        name: '',
        email: '',
    };

    responseFacebook = (response) => {

        console.log(response);
        // отправка данных авторизации
        axios.post('/api/auth', {
            "social": 'fb',
            "name": response.name,
            "url": "",
            "token": response.accessToken,
            "socialUserId": response.userID,
        })
            .then(res => {
                this.setState({
                    userId: res.data.userId,
                    authToken: res.data.authToken,
                });
                if (res.data.userId !== null && res.data.authToken !== '') {
                    this.setState({
                        isLoggedIn: true
                    })
                }
                axios.post('/api/lists', {
                    'userId': this.state.userId,
                    'authToken': this.state.authToken
                })
                    .then(res => {
                        if (typeof res.data['error'] !== "undefined" || res.data.error !== '') {
                            const lists = {...this.state.lists};
                            lists.items = res.data.items;
                            lists.count = res.data.count;
                            lists.defaultListId = res.data.defaultListId;
                            this.setState({
                                lists
                            })
                        } else {
                            this.setState({
                                authToken: '',
                                userId: null,
                                isLoggedIn: false
                            })
                        }
                    }, res => console.log('error', res));
            }, res => console.log('error', res));
    };

    selectListHandler = (id) => {
        const lists = {...this.state.lists};
        lists.defaultListId = id;
        this.setState({
            lists
        });
    };

    showNewWishToggle = () => {
        this.setState({
            showNewWish: !this.state.showNewWish
        })
    };

    // Получаю начальные данные eventov. count и event записываю в соответствующие state
    componentDidMount() {
        if (!this.state.isLoggedIn) {
            axios.get('/api/events')
                .then(res => {
                    this.setState({
                        count: res.data.count,
                        events: res.data.events
                    })
                }, res => console.log('error', res))
        }
    }

    onChangeWishUrlHandler = event => {
        this.setState({
            wishUrlControl: event.target.value
        })
    };

    onChangeWishNameHandler = event => {
        this.setState({
            wishNameControl: event.target.value
        })
    };

    uploadImgHandler = event => {
        event.preventDefault();
        this.setState(
            {
                file: event.target.files[0]
            }
        )
    };

    deleteWishHandler = (listId, id) => {
        axios.post('/api/item/delete', {
            userId: this.state.userId,
            authToken: this.state.authToken,
            id: id
        })
            .then(res => {
                if (res.data.error !== '' || typeof res.data['error'] !== "undefined") {
                    const lists = {...this.state.lists};
                    const currentList = lists.items.find(item => item.id === listId);
                    const currentWish = currentList.wishItems.find(wish => wish.id === id);
                    for (const prop of Object.getOwnPropertyNames(currentWish)) {
                        delete currentWish[prop];
                    }
                    this.setState({
                        lists
                    })
                } else {
                    this.setState({
                        authToken: '',
                        userId: null,
                        isLoggedIn: false
                    })
                }

            })
    };

    addNewWishHandler = (listId) => {
        if (this.state.wishNameControl !== '') {
            axios.post('/api/item/add', {
                'userId': this.state.userId,
                'authToken': this.state.authToken,
                'listId': listId
            })
                .then((res) => {

                    if (res.data.error !== '' || typeof res.data['error'] !== "undefined") {
                        this.setState({
                            newWishId: res.data.id
                        });
                        const formData = new FormData();
                        formData.append('userId', this.state.userId);
                        formData.append('authToken', this.state.authToken);
                        formData.append('id', this.state.newWishId);
                        formData.append('name', this.state.wishNameControl);
                        formData.append('url', this.state.wishUrlControl);
                        formData.append('picture', this.state.file);

                        axios({
                                method: 'post',
                                url: '/api/item/update',
                                data: formData,
                                headers: {'Content-Type': 'multipart/form-data'}
                            },
                        )
                            .then((res) => {
                                if (res.data.error !== '' || typeof res.data['error'] !== "undefined") {
                                    const lists = {...this.state.lists};
                                    const currentList = lists.items.find(item => item.id === listId);
                                    currentList.wishItems.push(res);
                                    this.setState({
                                        lists
                                    });
                                } else {
                                    this.setState({
                                        authToken: '',
                                        userId: null,
                                        isLoggedIn: false
                                    })
                                }
                            }, res => console.log('error', res))
                    } else {
                        this.setState({
                            authToken: '',
                            userId: null,
                            isLoggedIn: false
                        })
                    }

                }, res => console.log('error', res));
        } else {
            console.log('заполните поля навзания желания')
        }
    };

    addListHandler = () => {
        axios.post('/api/list/add', {
            "userId": this.state.userId,
            "authToken": this.state.authToken
        })
            .then((res) => {
                if (res.data.error !== '' || typeof res.data['error'] !== "undefined") {
                    const lists = {...this.state.lists};
                    lists.items.push(res.data);
                    this.setState({
                        lists
                    })
                } else {
                    this.setState({
                        authToken: '',
                        userId: null,
                        isLoggedIn: false
                    })
                }
            }, (res) => console.log('error', res))
    };

    onPickColorHandler = (index, listId, name) => {
        this.setState({
            newBackgroundNumber: index
        });
        axios.post('/api/list/update', {
            "userId": this.state.userId,
            "authToken": this.state.authToken,
            "id": listId,
            "name": name,
            "backgroundNumber": this.state.newBackgroundNumber
        })
            .then((res) => {
                const lists = {...this.state.lists};
                const currentList = lists.items.find(item => item.id === listId);
                currentList.backgroundNumber = res.data.backgroundNumber;
                this.setState({
                    lists
                })
            }, (res) => console.log('error', res))

    };

    onBlurListTitleHandler = (listId, name, bgId) => {
        console.log(this.state.listNameControl)
        console.log(name)
        console.log(bgId)
        axios.post('/api/list/update', {
            "userId": this.state.userId,
            "authToken": this.state.authToken,
            "id": listId,
            "name": this.state.listNameControl,
            "backgroundNumber": bgId
        })
            .then((res) => {
                const lists = {...this.state.lists};
                const currentList = lists.items.find(item => item.id === listId);
                currentList.name = res.data.name;
                this.setState({
                    lists,
                    showNewListTitle: false
                })
            }, (res) => console.log('error', res))
    };

    onChangeListTitleHandler = (event, listId) => {
        const lists = {...this.state.lists};
        const currentList = lists.items.find(item => item.id === listId);
        currentList.name = event.target.value;
        this.setState({
            lists,
            listNameControl: event.target.value
        })
    };

    showNewListTitleToggleHandler = () => {
        this.setState({
            showNewListTitle: !this.state.showNewListTitle
        })
    };

    render() {
        function compare(eventsIds, resIds) {
            return eventsIds.length === resIds.length && eventsIds.every((v, i) => v === resIds[i])
        }

        if (!this.state.isLoggedIn) {
            setTimeout(() => axios.get('/api/events')
                .then(res => {
                    let eventsId = [];
                    let resId = [];
                    this.state.events.map((events, index) => {
                        eventsId.push(events.id)
                    });
                    res.data.events.map((events) => {
                        resId.push(events.id)
                    });

                    if (compare(eventsId, resId)) {
                        this.setState({
                            count: res.data.count,
                            events: res.data.events
                        })
                    }
                }, res => console.log('error', res)), 30000);
        }

        let authContent;

        if (this.state.isLoggedIn) {
            authContent =
                <div className={classes.Container}>
                    <div>
                        <Sidebar
                            addList={this.addListHandler}
                            onClick={this.selectListHandler}
                            lists={this.state.lists}
                        />
                        <ListCard
                            onBlurListTitle={this.onBlurListTitleHandler}
                            onChangeListTitle={this.onChangeListTitleHandler}
                            showNewListTitleToggle={this.showNewListTitleToggleHandler}
                            showNewListTitle={this.state.showNewListTitle}
                            onPickColor={this.onPickColorHandler}
                            background={this.state.background}
                            uploadImg={this.uploadImgHandler}
                            deleteWish={this.deleteWishHandler}
                            addNewWish={this.addNewWishHandler}
                            onChangeWishUrl={this.onChangeWishUrlHandler}
                            onChangeWishName={this.onChangeWishNameHandler}
                            showNewWish={this.state.showNewWish}
                            showNewWishToggle={this.showNewWishToggle}
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
