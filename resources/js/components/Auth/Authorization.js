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
import VK, {Auth, Share as ShareVk} from "react-vk";
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
        tempFile: '',
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
            month = a.getMonth() + 1;
        }
        let date = a.getDate();
        let hour = a.getHours();
        let min = a.getMinutes();
        let sec = a.getSeconds();
        return date + '.' + month + '.' + year + ' в ' + hour + ':' + (min.toString().match(/[0-9]/g).length < 2 ? 0 : '') + min;
    };

    responseFacebook = (response) => {
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
                            if (res.data.hasOwnProperty('error') && res.data.error !== '') {
                                localStorage.removeItem('userId');
                                localStorage.removeItem('authToken');
                                location.reload()
                            } else {
                                const lists = {...this.state.lists};
                                lists.items = res.data.items.sort((a, b) => a.updatedAt > b.updatedAt ? -1 : 1);
                                lists.count = res.data.count;
                                lists.defaultListId = res.data.defaultListId;
                                this.setState({
                                    lists
                                })
                            }
                        }, res => console.log('error', res));
                }
            }, res => console.log('error', res));
    };

    responseVk = (response) => {
        // отправка данных авторизации
        axios.post('/api/auth', {
            "social": 'vk',
            "name": response.first_name + ' ' + response.last_name,
            "url": "",
            "token": response.hash,
            "socialUserId": response.uid,
        })
            .then(res => {
                localStorage.setItem('userId', res.data.userId);
                localStorage.setItem('authToken', res.data.authToken);
                if (localStorage.getItem('userId') !== null && localStorage.getItem('authToken') !== null) {
                    trackPromise(axios.post('/api/lists', {
                        'userId': localStorage.getItem('userId'),
                        'authToken': localStorage.getItem('authToken')
                    })
                        .then(res => {
                            if (res.data.hasOwnProperty('error') && res.data.error !== '') {
                                localStorage.removeItem('userId');
                                localStorage.removeItem('authToken');
                                location.reload()
                            } else {
                                const lists = {...this.state.lists};
                                lists.items = res.data.items;
                                lists.count = res.data.count;
                                lists.defaultListId = res.data.defaultListId;
                                this.setState({
                                    lists
                                })
                            }
                        }, res => console.log('error', res)));
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

    showNewWishToggle = (listId, type, id) => {
        if (type === 'type') {
            axios.post('/api/item/delete', {
                'userId': localStorage.getItem('userId'),
                'authToken': localStorage.getItem('authToken'),
                'id': id
            })
        }
        if (type === 'add') {
            axios.post('/api/item/add', {
                'userId': localStorage.getItem('userId'),
                'authToken': localStorage.getItem('authToken'),
                'listId': listId
            })
                .then((res) => {
                    this.setState({
                        newWishId: res.data.id
                    });
                }, res => console.log('error', res));
        }
        this.setState({
            showNewWish: !this.state.showNewWish,
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
                    if (res.data.hasOwnProperty('error') && res.data.error !== '') {
                        localStorage.removeItem('userId');
                        localStorage.removeItem('authToken');
                        location.reload()
                    } else {
                        const lists = {...this.state.lists};
                        lists.items = res.data.items.sort((a, b) => a.updatedAt > b.updatedAt ? -1 : 1);
                        lists.count = res.data.count;
                        lists.defaultListId = res.data.defaultListId;
                        this.setState({
                            lists
                        })
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

    uploadImgHandler = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('userId', localStorage.getItem('userId'));
        formData.append('authToken', localStorage.getItem('authToken'));
        formData.append('id', this.state.newWishId);
        formData.append('name', '');
        formData.append('url', '');
        formData.append('picture', event.target.files[0]);
        trackPromise(axios({
            method: 'post',
            url: '/api/item/update',
            data: formData,
            headers: {'Content-Type': 'multipart/form-data'}
        })
            .then(res => {
                this.setState(
                    {
                        tempFile: res.data.picture
                    }
                )
            }));
    };

    deleteWishHandler = (listId, id) => {
        trackPromise(axios.post('/api/item/delete', {
            userId: localStorage.getItem('userId'),
            authToken: localStorage.getItem('authToken'),
            id: id
        })
            .then(res => {
                if (res.data.hasOwnProperty('error') && res.data.error !== '') {
                    localStorage.removeItem('userId');
                    localStorage.removeItem('authToken');
                    location.reload()
                } else {
                    const lists = {...this.state.lists};
                    const currentList = lists.items.find(item => item.id === listId);
                    for (let i = 0; i < currentList.wishItems.length; i++) {
                        if (currentList.wishItems[i].id === id) {
                            currentList.wishItems.splice(i, 1);
                            break;
                        }
                    }
                    currentList.updatedAt = res.data.updatedAt;
                    lists.items.sort((a, b) => a.updatedAt > b.updatedAt ? -1 : 1);
                    this.setState({
                        lists
                    })
                }
            }))
    };

    addNewWishHandler = (listId) => {
        const formData = new FormData();
        formData.append('userId', localStorage.getItem('userId'));
        formData.append('authToken', localStorage.getItem('authToken'));
        formData.append('id', this.state.newWishId);
        formData.append('name', this.state.wishNameControl);
        formData.append('url', this.state.wishUrlControl);
        formData.append('picture', '');

        trackPromise(axios({
                method: 'post',
                url: '/api/item/update',
                data: formData,
                headers: {'Content-Type': 'multipart/form-data'}
            },
        )
            .then((res) => {
                if (res.data.hasOwnProperty('error') && res.data.error !== '') {
                    localStorage.removeItem('userId');
                    localStorage.removeItem('authToken');
                    location.reload()
                } else {
                    const lists = {...this.state.lists};
                    const currentList = lists.items.find(item => item.id === listId);
                    res.data.picture = this.state.tempFile;
                    currentList.wishItems.push(res.data);
                    currentList.updatedAt = res.data.updatedAt;
                    lists.items.sort((a, b) => a.updatedAt > b.updatedAt ? -1 : 1);
                    this.setState({
                        lists,
                        showNewWish: false,
                        tempFile: '',
                        wishNameControl: '',
                        wishUrlControl: ''
                    });
                }
            }, res => console.log('error', res)))
    };

    addListHandler = () => {
        trackPromise(axios.post('/api/list/add', {
            "userId": localStorage.getItem('userId'),
            "authToken": localStorage.getItem('authToken')
        })
            .then((res) => {
                if (res.data.hasOwnProperty('error') && res.data.error !== '') {
                    localStorage.removeItem('userId');
                    localStorage.removeItem('authToken');
                    location.reload()
                } else {
                    const lists = {...this.state.lists};
                    lists.items.push(res.data);
                    lists.items = lists.items.sort((a, b) => a.updatedAt > b.updatedAt ? -1 : 1);
                    lists.defaultListId = res.data.id;
                    this.setState({
                        lists
                    })
                }
            }, (res) => console.log('error', res)))
    };

    onPickColorHandler = (index, listId, name) => {
        this.setState({
            newBackgroundNumber: index
        });
        axios.post('/api/list/update', {
            "userId": localStorage.getItem('userId'),
            "authToken": localStorage.getItem('authToken'),
            "id": listId,
            "name": name,
            "backgroundNumber": index
        })
            .then((res) => {
                if (res.data.hasOwnProperty('error') && res.data.error !== '') {
                    localStorage.removeItem('userId');
                    localStorage.removeItem('authToken');
                    location.reload()
                } else {
                    const lists = {...this.state.lists};
                    const currentList = lists.items.find(item => item.id === listId);
                    currentList.backgroundNumber = res.data.backgroundNumber;
                    this.setState({
                        lists
                    })
                }
            }, (res) => console.log('error', res))

    };

    onBlurListTitleHandler = (listId, name, bgId) => {
        if (this.state.showNewListTitle) {
            axios.post('/api/list/update', {
                "userId": localStorage.getItem('userId'),
                "authToken": localStorage.getItem('authToken'),
                "id": listId,
                "name": this.state.listNameControl,
                "backgroundNumber": bgId
            })
                .then((res) => {
                    if (res.data.hasOwnProperty('error') && res.data.error !== '') {
                        localStorage.removeItem('userId');
                        localStorage.removeItem('authToken');
                        location.reload()
                    } else {
                        const lists = {...this.state.lists};
                        const currentList = lists.items.find(item => item.id === listId);
                        currentList.name = res.data.name;
                        currentList.updatedAt = res.data.updatedAt;
                        lists.items.sort((a, b) => a.updatedAt > b.updatedAt ? -1 : 1);
                        this.setState({
                            lists,
                            showNewListTitle: false
                        })
                    }
                }, (res) => console.log('error', res))
        }
    };

    onChangeListTitleHandler = (event, listId) => {
        const lists = {...this.state.lists};
        const currentList = lists.items.find(item => item.id === listId);
        let listName;
        if (event.target.value.trim() === '') {
            listName = 'Мой список желаний';
            currentList.name = 'Мой список желаний'
        } else {
            listName = event.target.value;
            currentList.name = event.target.value;
        }
        currentList.name = event.target.value;
        this.setState({
            lists,
            listNameControl: listName
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
                if (res.data.hasOwnProperty('error') && res.data.error !== '') {
                    localStorage.removeItem('userId');
                    localStorage.removeItem('authToken');
                    location.reload()
                } else {
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
                        deleteList: false
                    })
                }

            }, res => console.log('error', res)))
    };

    shareListHandler = (social) => {
        trackPromise(axios.post('/api/share', {
            "userId": localStorage.getItem('userId'),
            "authToken": localStorage.getItem('authToken'),
            "listId": this.state.tempListId,
            "social": social
        })
            .then(res => {

            }))
    };

    clickOutsideHandler = (event) => {
        const block = document.getElementById('modal');
        if (event.target === block || event.target === block.firstChild) {
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
            window.document.getElementsByTagName('body')[0].style.overflow = 'hidden';
            modal =
                <Modal clickOutside={this.clickOutsideHandler}>
                    <p>Вы действительно хотите удалить список желаний <strong>"{this.state.tempListName}"?</strong></p>
                    <Button type='primary' onClick={this.deleteListHandler}>Удалить список</Button>
                    <Button type='secondary'
                            onClick={() => this.toggleModalHandler(this.state.tempListId, this.state.tempListName, 'delete')}>Отмена</Button>
                </Modal>
        } else if (this.state.shareList) {
            window.document.getElementsByTagName('body')[0].style.overflow = 'hidden';
            modal =
                <Modal clickOutside={this.clickOutsideHandler}>
                    <p>Ссылка на ваш список:</p>
                    <a href={"https://mywish.su/list/" + this.state.tempLink}
                       target="_blank">https://mywish.su/list/{this.state.tempLink}</a>
                    <p>Расскажи о своих желаниях друзьям:</p>
                    <FacebookProvider appId="563234647569569">
                        <Share href={"https://mywish.su/list/" + this.state.tempLink}>
                            {({handleClick, loading}) => (
                                <Button type="share" disabled={loading} onClick={(event) => {
                                    handleClick(event);
                                    this.shareListHandler('fb')
                                }}>Поделиться в Facebook</Button>
                            )}
                        </Share>
                    </FacebookProvider>
                    <Button type='share' onClick={() => this.shareListHandler('vk')}>
                        <ShareVk buttonOptions={{text: 'Поделиться в ВК'}}
                                 shareOptions={{
                                     url: "https://mywish.su/list/" + this.state.tempLink,
                                     title: this.state.tempListName
                                 }}/>
                    </Button>
                </Modal>

        } else {
            window.document.getElementsByTagName('body')[0].style.overflow = 'auto';
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
                                tempListId={this.state.tempListId}
                                newWishId={this.state.newWishId}
                                tempFile={this.state.tempFile}
                                addList={this.addListHandler}
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
            let authContentHeaderMobile;
            if (window.innerWidth <= 768) {
                authContentHeaderMobile =
                    <React.Fragment>
                        <p className={classes.authContentHeaderMobile}><strong>MyWish</strong> составь свой список
                            желаний и поделись им с друзьями</p>
                    </React.Fragment>
            } else {
                authContentHeaderMobile =
                    <React.Fragment>
                        <p className={classes.AuthHeader}>MyWish - это сервис для составления списка желаний</p>
                        <p className={classes.AuthHeader}>Подскажите Вашим близким, друзьям, коллегам, чтобы Вы хотели
                            получить в подарок! Составьте свой
                            список и поделитесь им!</p>
                    </React.Fragment>
            }
            authContent =
                <div className={classes.Auth}>
                    <div>
                        {authContentHeaderMobile}
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
                                textButton=''
                            />
                            <div className={classes.AuthVkBtn}>
                                <div className={classes.AuthVk}>
                                    <VK apiId='7244111'>
                                        <Auth
                                            elementId='7244111'
                                            options={{onAuth: this.responseVk}}
                                        />
                                    </VK>
                                </div>
                            </div>
                        </Card>
                        <EventCounter
                            count={this.state.count}
                        />
                        {this.state.events.map((event) => {
                            return (
                                <EventList
                                    timeConverter={this.timeConverter}
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
                        <Route path='/list/:link'>
                            <ListPreview timeConverter={this.timeConverter}/>
                        </Route>
                    </Switch>
                </BrowserRouter>
            </React.Fragment>
        )
    }
}
