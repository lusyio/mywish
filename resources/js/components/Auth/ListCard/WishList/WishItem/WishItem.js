import React from 'react'
import classes from './WishItem.module.css'

const WishItem = props => (
    <React.Fragment>
        <div className={classes.WishItem}>
            <img src={props.picture} alt={props.title}/>
            <div>
                <p className={classes.Title}>{props.title}</p>
                <a href={props.url}>{props.url}</a>
            </div>
        </div>
    </React.Fragment>
);

export default WishItem

