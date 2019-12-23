import React from 'react'
import classes from './LoaderSpinner.module.css'
import {usePromiseTracker} from "react-promise-tracker";
import Loader from 'react-loader-spinner';

const LoaderSpinner = props => {
    const {promiseInProgress} = usePromiseTracker();

    return (
        promiseInProgress &&
        <div className={classes.LoaderSpinner}>
            <div className={classes.LoaderSpinnerBody}>
                <Loader type="ThreeDots" color="#F2523A" height="100" width="100"/>
            </div>
        </div>
    )
}

export default LoaderSpinner
