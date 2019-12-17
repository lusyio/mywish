import React, {Component} from 'react';
import classes from './Layout.module.css'
import Auth from "./Auth/Auth";
import Header from "./Navigation/Header/Header";

export default class Layout extends Component {
    render() {
        return (
            <div className={classes.Layout}>
                <Header />
                <main>
                    <Auth/>
                </main>
            </div>
        );
    }
}
