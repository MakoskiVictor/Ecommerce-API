import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from './LoginButton';
import Profile from './Profile';
import OutButton from './OutButton';

function LoginGoogle() {

    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return (
        <div>
            {isAuthenticated ? <OutButton /> :
                <LoginButton />}
            <Profile />

        </div>
    )
}

export default LoginGoogle