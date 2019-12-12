import React, {Component} from "react";
import classes from './Authorization.module.css'
import AuthorizationBlock from "../../components/AuthorizationBlock/AuthorizationBlock";
import FacebookLogin from 'react-facebook-login';
import VK, {Auth} from 'react-vk';

class Authorization extends Component {
    state = {
        isLoggedIn: false,
        userId: null,
        name: null,
        email: null,
        picture: null,
    };

    componentDidMount() {
        window.gapi.load('auth2', function () {
            window.gapi.auth2.init({
                client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID
            })
                .then(() => console.log('init google OK'), () => console.log('init google ERROR'))
        });
    }

    signInGoogleHandler = () => {
        const _authOk = GoogleUser => {
            console.log('auth OK', GoogleUser);
            this.setState({
                name: GoogleUser.getBasicProfile().getName(),
                isLoggedIn: true,
                picture: GoogleUser.getBasicProfile().getImageUrl()
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

    componentClicked = () => console.log('fb clicked');

    responseFacebook = response => {
        console.log(response);
        this.setState({
            name: response.name,
            email: response.email,
            picture: response.picture.data.url,
            userID: response.userID
        });
    };

    responseVk = response => {
        console.log(response);
    };

    render() {

        let fbContent;
        let vkContent;

        if (this.state.isLoggedIn) {
            fbContent = null;
            vkContent = null;
        } else {
            fbContent =
                <FacebookLogin
                    appId={process.env.REACT_APP_FB_APP_ID}
                    autoLoad={false}
                    fields="name,email,picture"
                    onClick={this.componentClicked}
                    callback={this.responseFacebook}/>
            ;
            vkContent =
                <VK apiId={process.env.REACT_APP_VK_APP_ID}>
                    <Auth onAuth={this.responseVk}/>
                </VK>
        }

        return (
            <div className={classes.Authorization}>
                <div className={classes.AuthorizationWrapper}>
                    <AuthorizationBlock
                        isLoggedIn={this.state.isLoggedIn}
                        userName={this.state.name}
                        userImageUrl={this.state.picture}
                        signInGoogle={this.signInGoogleHandler}
                    >
                    </AuthorizationBlock>
                    {fbContent}
                    {vkContent}
                </div>
            </div>
        )
    }
}

export default Authorization