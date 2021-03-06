import React, {Component} from 'react';
import classes from './Layout.module.css'
import Auth from "./Auth/Authorization";
import Header from "./Navigation/Header/Header";
import Footer from "./Navigation/Footer/Footer";

export default class Layout extends Component {
    render() {
        return (
            <div id='Layout' className={classes.Layout}>
                <Header/>
                <main>
                    <Auth/>
                </main>
                <Footer/>
            </div>
        );
    }
}
