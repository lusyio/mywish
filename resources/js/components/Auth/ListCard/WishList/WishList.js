import React from 'react'
import WishItem from "./WishItem/WishItem";

const WishList = props => {
    return (
        props.wishItems.map((wish, index) => {
            return (
                <WishItem
                    key={wish.id + index}
                    id={wish.id}
                    title={wish.title}
                    url={wish.url}
                    picture={wish.picture}
                />
            )
        })
    )
}

export default WishList
