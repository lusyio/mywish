import React, {Component} from 'react';
import classes from './Authorization.module.css'
import Button from "../UI/Button/Button";
import FacebookLogin from 'react-facebook-login';
import Card from "../Card/Card";
import EventList from "./EventList/EventList";
import EventCounter from "./EventCounter/EventCounter";
import axios from 'axios';
import Sidebar from "./Sidebar/Sidebar";
import ListCard from "./ListCard/ListCard";
import Modal from "../UI/Modal/Modal";
// import VK, {Auth, Share} from "react-vk";
import {FacebookProvider, Share} from 'react-facebook';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ListPreview from "./ListPreview/ListPreview";
import {trackPromise} from "react-promise-tracker";
import LoaderSpinner from "../UI/LoaderSpinner/LoaderSpinner";

export default class Authorization extends Component {

    state = {
        count: '',
        events: [],

        deleteList: false,
        tempListId: null,
        tempListName: '',
        shareList: false,
        wishNameControl: '',
        wishUrlControl: '',
        listNameControl: '',
        tempLink: '',
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
            defaultListId: null,
            count: null,
            items: []
        },
        file: null,
        name: '',
        email: '',
    };

    timeConverter = (UNIX_timestamp, type) => {
        const a = new Date(UNIX_timestamp * 1000);
        let months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
        let year = a.getFullYear();
        let month;
        if (type === 'words') {
            month = months[a.getMonth()];
        } else {
            month = a.getMonth();
        }
        let date = a.getDate();
        let hour = a.getHours();
        let min = a.getMinutes();
        let sec = a.getSeconds();
        return date + '.' + month + '.' + year + ' в ' + hour + ':' + (min.toString().match(/[0-9]/g).length < 2 ? 0 : '') + min;
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
                localStorage.setItem('userId', res.data.userId);
                localStorage.setItem('authToken', res.data.authToken);
                if (localStorage.getItem('userId') !== null && localStorage.getItem('authToken') !== null) {
                    axios.post('/api/lists', {
                        'userId': localStorage.getItem('userId'),
                        'authToken': localStorage.getItem('authToken')
                    })
                        .then(res => {
                            if (typeof res.data['error'] !== "undefined" || res.data.error !== '') {
                                const lists = {...this.state.lists};
                                lists.items = res.data.items.sort((a, b) => a.updatedAt > b.updatedAt ? -1 : 1);
                                lists.count = res.data.count;
                                lists.defaultListId = res.data.defaultListId;
                                this.setState({
                                    lists
                                })
                            } else {
                                localStorage.setItem('userId', null);
                                localStorage.setItem('authToken', null);
                            }
                        }, res => console.log('error', res));
                }
            }, res => console.log('error', res));
    };

    responseVk = (response) => {
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
                localStorage.setItem('userId', res.data.userId);
                localStorage.setItem('authToken', res.data.authToken);
                if (localStorage.getItem('userId') !== null && localStorage.getItem('authToken') !== null) {
                    axios.post('/api/lists', {
                        'userId': localStorage.getItem('userId'),
                        'authToken': localStorage.getItem('authToken')
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
                                localStorage.setItem('userId', null);
                                localStorage.setItem('authToken', null);
                            }
                        }, res => console.log('error', res));
                }
            }, res => console.log('error', res));
    }

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
        if (localStorage.getItem('userId') === null && localStorage.getItem('authToken') === null) {
            trackPromise(axios.get('/api/events')
                .then(res => {
                    this.setState({
                        count: res.data.count,
                        events: res.data.events
                    })
                }, res => console.log('error', res)))
        } else {
            trackPromise(axios.post('/api/lists', {
                'userId': localStorage.getItem('userId'),
                'authToken': localStorage.getItem('authToken')
            })
                .then(res => {
                    if (typeof res.data['error'] !== "undefined" || res.data.error !== '') {
                        const lists = {...this.state.lists};
                        lists.items = res.data.items.sort((a, b) => a.updatedAt > b.updatedAt ? -1 : 1);
                        lists.count = res.data.count;
                        lists.defaultListId = res.data.defaultListId;
                        this.setState({
                            lists
                        })
                    } else {
                        localStorage.setItem('userId', null);
                        localStorage.setItem('authToken', null);
                    }
                }, res => console.log('error', res)));
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
        trackPromise(axios.post('/api/item/delete', {
            userId: localStorage.getItem('userId'),
            authToken: localStorage.getItem('authToken'),
            id: id
        })
            .then(res => {
                if (res.data.error !== '' || typeof res.data['error'] !== "undefined") {
                    const lists = {...this.state.lists};
                    const currentList = lists.items.find(item => item.id === listId);
                    for (let i = 0; i < currentList.wishItems.length; i++) {
                        if (currentList.wishItems[i].id === id) {
                            currentList.wishItems.splice(i, 1);
                            break;
                        }
                    }
                    this.setState({
                        lists
                    })
                } else {
                    localStorage.setItem('userId', null);
                    localStorage.setItem('authToken', null);
                }

            }))
    };

    addNewWishHandler = (listId) => {
        if (this.state.wishNameControl !== '') {
            trackPromise(axios.post('/api/item/add', {
                'userId': localStorage.getItem('userId'),
                'authToken': localStorage.getItem('authToken'),
                'listId': listId
            })
                .then((res) => {

                    if (res.data.error !== '' || typeof res.data['error'] !== "undefined") {
                        this.setState({
                            newWishId: res.data.id
                        });
                        const formData = new FormData();
                        formData.append('userId', localStorage.getItem('userId'));
                        formData.append('authToken', localStorage.getItem('authToken'));
                        formData.append('id', this.state.newWishId);
                        formData.append('name', this.state.wishNameControl);
                        formData.append('url', this.state.wishUrlControl);
                        formData.append('picture', this.state.file);

                        trackPromise(axios({
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
                                    currentList.wishItems.push(res.data);
                                    this.setState({
                                        lists,
                                        showNewWish: false
                                    });
                                } else {
                                    localStorage.setItem('userId', null);
                                    localStorage.setItem('authToken', null);
                                }
                            }, res => console.log('error', res)))
                    } else {
                        localStorage.setItem('userId', null);
                        localStorage.setItem('authToken', null);
                    }

                }, res => console.log('error', res)));
        } else {
            console.log('заполните поля навзания желания')
        }
    };

    addListHandler = () => {
        trackPromise(axios.post('/api/list/add', {
            "userId": localStorage.getItem('userId'),
            "authToken": localStorage.getItem('authToken')
        })
            .then((res) => {
                if (res.data.error !== '' || typeof res.data['error'] !== "undefined") {
                    const lists = {...this.state.lists};
                    lists.items.push(res.data);
                    lists.items = lists.items.sort((a, b) => a.updatedAt > b.updatedAt ? -1 : 1);
                    lists.defaultListId = res.data.id;
                    this.setState({
                        lists
                    })
                } else {
                    localStorage.setItem('userId', null);
                    localStorage.setItem('authToken', null);
                }
            }, (res) => console.log('error', res)))
    };

    onPickColorHandler = (index, listId, name) => {
        this.setState({
            newBackgroundNumber: index
        });
        trackPromise(axios.post('/api/list/update', {
            "userId": localStorage.getItem('userId'),
            "authToken": localStorage.getItem('authToken'),
            "id": listId,
            "name": name,
            "backgroundNumber": index
        })
            .then((res) => {
                if (res.data.error !== '' || typeof res.data['error'] !== "undefined") {
                    const lists = {...this.state.lists};
                    const currentList = lists.items.find(item => item.id === listId);
                    currentList.backgroundNumber = res.data.backgroundNumber;
                    this.setState({
                        lists
                    })
                } else {
                    localStorage.setItem('userId', null);
                    localStorage.setItem('authToken', null);
                }
            }, (res) => console.log('error', res)))

    };

    onBlurListTitleHandler = (listId, name, bgId) => {
        if (this.state.showNewListTitle) {
            trackPromise(axios.post('/api/list/update', {
                "userId": localStorage.getItem('userId'),
                "authToken": localStorage.getItem('authToken'),
                "id": listId,
                "name": this.state.listNameControl,
                "backgroundNumber": bgId
            })
                .then((res) => {
                    if (res.data.error !== '' || typeof res.data['error'] !== "undefined") {
                        const lists = {...this.state.lists};
                        const currentList = lists.items.find(item => item.id === listId);
                        currentList.name = res.data.name;
                        this.setState({
                            lists,
                            showNewListTitle: false
                        })
                    } else {
                        localStorage.setItem('userId', null);
                        localStorage.setItem('authToken', null);
                    }
                }, (res) => console.log('error', res)))
        }
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

    deleteListHandler = () => {
        trackPromise(axios.post('/api/list/delete', {
            "userId": localStorage.getItem('userId'),
            "authToken": localStorage.getItem('authToken'),
            "id": this.state.tempListId
        })
            .then(res => {
                if (res.data.error !== '' || typeof res.data['error'] !== "undefined") {
                    const lists = {...this.state.lists};
                    for (let i = 0; i < lists.items.length; i++) {
                        if (lists.items[i].id === this.state.tempListId) {
                            lists.items.splice(i, 1);
                            lists.items.sort((a, b) => a.updatedAt > b.updatedAt ? -1 : 1);
                            lists.defaultListId = lists.items[0].id;
                            break;
                        }
                    }
                    this.setState({
                        lists,
                        deleteList: !this.state.deleteList
                    })
                } else {
                    localStorage.setItem('userId', null);
                    localStorage.setItem('authToken', null);
                }

            }, res => console.log('error', res)))
    };

    shareListHandler = () => {
        trackPromise(axios.post('/api/share', {
            "userId": localStorage.getItem('userId'),
            "authToken": localStorage.getItem('authToken'),
            "listId": this.state.tempListId,
            "social": "string"
        })
            .then(res => {
                console.log(res)
            }))
    }

    clickOutsideHandler = (event) => {
        const block = document.getElementById('modal');
        if (event.target === block) {
            this.setState({
                deleteList: false,
                shareList: false
            })
        }
    };

    toggleModalHandler = (listId, listName, type, link) => {
        if (type === 'delete') {
            this.setState({
                deleteList: !this.state.deleteList,
                tempListId: listId,
                tempListName: listName,
            });
        }
        if (type === 'share') {
            this.setState({
                shareList: !this.state.shareList,
                tempListId: listId,
                tempListName: listName,
                tempLink: link
            });
        }
    };

    render() {
        function compare(eventsIds, resIds) {
            return eventsIds.length === resIds.length && eventsIds.every((v, i) => v === resIds[i])
        }

        if (localStorage.getItem('userId') === null && localStorage.getItem('authToken') === null) {
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

        let modal = null;

        if (this.state.deleteList) {
            modal =
                <Modal clickOutside={this.clickOutsideHandler}>
                    <p>Вы действительно хотите удалить список желаний <strong>"{this.state.tempListName}"?</strong></p>
                    <Button onClick={this.deleteListHandler}>Удалить список</Button>
                    <Button type='secondary'
                            onClick={() => this.toggleModalHandler(this.state.tempListId, this.state.tempListName, 'delete')}>Отмена</Button>
                </Modal>
        }

        if (this.state.shareList) {
            modal =
                <Modal clickOutside={this.clickOutsideHandler}>
                    <p>Ссылка на ваш список:</p>
                    <p>Расскажи о своих желаниях друзьям:</p>
                    <FacebookProvider appId="563234647569569">
                        <Share href={`https://mywish.su/${this.state.tempLink}`}>
                            {({handleClick, loading}) => (
                                <Button type="share" disabled={loading} onClick={handleClick}>Поделиться</Button>
                            )}
                        </Share>
                    </FacebookProvider>
                </Modal>
        }

        let authContent;

        if (localStorage.getItem('userId') !== null && localStorage.getItem('authToken') !== null) {
            authContent =
                <React.Fragment>
                    <div className={classes.Container}>
                        <div>
                            <Sidebar
                                timeConverter={this.timeConverter}
                                addList={this.addListHandler}
                                onClick={this.selectListHandler}
                                lists={this.state.lists}
                            />
                            <ListCard
                                shareList={this.toggleModalHandler}
                                deleteList={this.toggleModalHandler}
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
                    {modal}
                </React.Fragment>
        } else {
            authContent =
                <div className={classes.Auth}>
                    <div>
                        <p className={classes.AuthHeader}>MyWish - это сервис для составления списка желаний</p>
                        <p className={classes.AuthHeader}>Подскажите Вашим близким, друзьям, коллегам, чтобы Вы хотели
                            получить в подарок! Составьте свой
                            список и поделитесь им!</p>
                        <Card id='card'>
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
                            {/*<VK apiId={7244111}>*/}
                            {/*    <Auth*/}
                            {/*        elementId='card'*/}
                            {/*        onAuth={this.responseVk}*/}
                            {/*    />*/}
                            {/*</VK>*/}
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
                <LoaderSpinner/>
                <BrowserRouter>
                    <Switch>
                        <Route path='/' exact>
                            {authContent}
                        </Route>
                        <Route path='/list/:link' component={ListPreview}/>
                    </Switch>
                </BrowserRouter>
            </React.Fragment>
        )
    }
}
