import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import { useEffect } from 'react';
import auth from './auth'
import { useNavigate } from 'react-router-dom';

export default () => {
    const navigate = useNavigate();
    useEffect(() => {
        const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
        ui.start('#firebaseui-auth-container', {
            callbacks: {
                signInSuccessWithAuthResult: function () {
                    return false;
                },
                uiShown: () => {
                }
            },
            signInFlow: 'popup',
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                "apple.com",
                firebase.auth.EmailAuthProvider.PROVIDER_ID
            ],
            tosUrl: function () {
                navigate('/about?section=terms')
            },
            privacyPolicyUrl: function () {
                navigate('/about?section=privacy')
            },
        });
    }, []);

    return (
        <div id="firebaseui-auth-container"></div>
    )
}