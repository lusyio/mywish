import React from 'react'
import classes from './ListCard.module.css'
import WishList from "./WishList/WishList";

const ListCard = props =>
    (
        <div className={classes.ListCard}>
            <div className={classes.ListCardBody}>
                {props.lists.items.map((list) => {
                    return list.id === 2 ? (
                            <WishList
                                key={list.id}
                                wishItems={list.wishItems}
                            />
                        )
                        :
                        null
                })}
            </div>
        </div>
    );


export default ListCard
