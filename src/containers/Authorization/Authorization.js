import React, {Component} from "react";
import classes from './Authorization.module.css'
import AuthorizationBlock from "../../components/AuthorizationBlock/AuthorizationBlock";

class Authorization extends Component {
    state = {
        name: null,
        image: null,
    };

    componentDidMount() {
        window.gapi.load('auth2', function () {
            window.gapi.auth2.init({
                client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID
            })
                .then(() => console.log('init OK'), () => console.log('init ERROR'))
        })
    }

    signInHandler = () => {
        const _authOk = GoogleUser => {
            console.log('auth OK', GoogleUser);
            this.setState({
                name: GoogleUser.getBasicProfile().getName(),
                image: GoogleUser.getBasicProfile().getImageUrl()
            });
        };
        const _authError = () => console.log('auth ERROR');

        const GoogleAuth = window.gapi.auth2.getAuthInstance();
        GoogleAuth.signIn(
            {
                scope: 'profile email',
            }
        )
            .then(_authOk, _authError);
    };

    render() {
        return (
            <div className={classes.Authorization}>
                <div className={classes.AuthorizationWrapper}>
                    <AuthorizationBlock
                        userName={this.state.name}
                        userImageUrl={this.state.image}
                        signIn={this.signInHandler}
                    >
                    </AuthorizationBlock>
                </div>
            </div>
        )
    }
}

export default Authorization