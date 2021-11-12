import React, { useEffect } from 'react';
import Header from '../components/appbar'
import './login.css'
import { loginWithToken } from '../api/loginChat'
import WebIM from '../utils/WebIM';
// import { EaseChat } from 'es-uikit'
// import WebIM from '../utils/WebIM'

export default function Main() {

    useEffect(() => {
        const webimAuth = sessionStorage.getItem('webim_auth')
        if (webimAuth && WebIM.conn.logout) {
            let webimAuthObj = JSON.parse(webimAuth)
            loginWithToken(webimAuthObj.agoraId, webimAuthObj.accessToken)
        }
    }, [])

    return (
        <div className='main-container'>
            <Header />
        </div>
    )
}