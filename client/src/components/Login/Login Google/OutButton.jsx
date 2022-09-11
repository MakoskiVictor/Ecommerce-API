import React from 'react';
import { useAuth0 } from "@auth0/auth0-react"

function OutButton() {
    const { loginWithRedirect, logout } = useAuth0();
    return (
        <button onClick={() => logout()}>Log Out</button>
    )
}

export default OutButton