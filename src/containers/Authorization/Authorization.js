import React, {Component} from "react";
import classes from './Authorization.module.css'
import AuthorizationBlock from "../../components/AuthorizationBlock/AuthorizationBlock";

class Authorization extends Component {
    render() {
        return (
            <div className={classes.Authorization}>
                <div className={classes.AuthorizationWrapper}>
                    <AuthorizationBlock>
                    </AuthorizationBlock>
                </div>
            </div>
        )
    }
}

export default Authorization