import React from 'react'
import WishItem from "./WishItem/WishItem";

const WishList = props => {
    let renderWishItems =
        props.wishItems.map((wish) => {
            return (
                <WishItem
                    onChangeWishName={props.onChangeWishName}
                    onChangeWishUrl={props.onChangeWishUrl}
                    listId={props.listId}
                    key={wish.id}
                    id={wish.id}
                    title={wish.title}
                    url={wish.url}
                    picture={wish.picture}
                />
            )
        })

    return (
        <React.Fragment>
            {renderWishItems}
            {props.showNewWish ?
                <WishItem
                    showNewWishToggle={props.showNewWishToggle}
                    onChangeWishName={props.onChangeWishName}
                    onChangeWishUrl={props.onChangeWishUrl}
                    addNewWish={props.addNewWish}
                    listId={props.listId}
                    type='addNew'/>
                :
                null
            }
        </React.Fragment>
    )
}

export default WishList
