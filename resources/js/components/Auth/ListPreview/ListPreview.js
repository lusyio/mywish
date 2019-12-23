import React, {Component} from 'react'
import classes from './ListPreview.module.css'
import axios from 'axios';
import WishList from "../ListCard/WishList/WishList";
import Button from "../../UI/Button/Button";
import {Link} from "react-router-dom";

export default class ListPreview extends Component {
    state = {
        background: [
            '/images/bg1.jpg',
            '/images/bg2.jpg',
            '/images/bg3.jpg',
            '/images/bg4.jpg',
            '/images/bg5.jpg',
        ],
        list: {
            status: "string",
            wishList: {
                id: 1,
                name: "",
                updatedAt: 1,
                backgroundNumber: 1,
                userId: 1,
                userName: "",
                createdAt: 1,
                link: "",
                wishItems: [
                    {
                        id: 1,
                        title: "",
                        url: "",
                        order: 1,
                        listId: 1,
                        picture: ""
                    }
                ]
            }
        }
    };

    componentDidMount() {
        axios.get(`/api${location.pathname}`)
            .then(res => {
                const list = {...this.state.list};
                list.status = res.data.status;
                list.wishList = res.data.wishList;
                this.setState({
                    list
                }, res => console.log(res))
            })
    }

    render() {
        let wishList;

        if (this.state.list.wishList.wishItems.length !== 0) {
            wishList =
                <div className={classes.ListPreview}
                     style={{background: `url(${this.state.background[this.state.list.wishList.backgroundNumber]})`}}>
                    <div className={classes.ListPreviewBody}>
                        <WishList
                            widgetOff
                            id={this.state.list.wishList.id}
                            listId={this.state.list.wishList.id}
                            key={this.state.list.wishList.id}
                            wishItems={this.state.list.wishList.wishItems}
                        />
                    </div>
                </div>

        } else {
            wishList =
                <div className={classes.ListPreview}
                     style={{background: `url(${this.state.background[this.state.list.wishList.backgroundNumber]})`}}>
                    <div className={classes.ListPreviewBody}>
                        <p>В этот список еще не добавили желания</p>
                        <Link to={'/'}>
                            <Button>Создать список желаний</Button>
                        </Link>
                    </div>
                </div>
        }

        return wishList
    }
}
