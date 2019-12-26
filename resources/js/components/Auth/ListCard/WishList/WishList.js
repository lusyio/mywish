import React from 'react'
import WishItem from "./WishItem/WishItem";
import classes from './WishList.module.css'

const WishList = props => {
    let renderWishItems =
        <div className={classes.WishList}>
            {props.wishItems.map((wish) => (
                    <WishItem
                        widgetOff={props.widgetOff}
                        deleteWish={props.deleteWish}
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
            )}
        </div>
    return (
        <React.Fragment>
            {renderWishItems}
            {props.showNewWish ?
                <WishItem
                    tempFile={props.tempFile}
                    key='edit'
                    uploadImg={props.uploadImg}
                    id={props.newWishId}
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
