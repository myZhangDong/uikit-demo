import React, { useEffect } from 'react';
import Header from '../components/appbar'
import './login.css'
import { loginWithToken } from '../api/loginChat'
import WebIM from '../utils/WebIM';
import { EaseApp } from 'es-uikit'

export default function Main() {

    useEffect(() => {
        const webimAuth = sessionStorage.getItem('webim_auth')
        let webimAuthObj = {}
        console.log('123123', webimAuth, WebIM.conn.logOut)
        if (webimAuth && WebIM.conn.logOut) {
            webimAuthObj = JSON.parse(webimAuth)
            loginWithToken(webimAuthObj.agoraId, webimAuthObj.accessToken)
        }
    }, [])
    console.log('***  WebIM.conn **', WebIM.conn)
    return (
        <div className='main-container'>
            {/* <Header /> */}
            <EaseApp
                header={<Header />}
            />
        </div>
    )
}

