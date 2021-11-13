import React, { useEffect } from 'react';
import Header from '../components/appbar'
import './login.css'
import { loginWithToken } from '../api/loginChat'
import WebIM from '../utils/WebIM';
import { EaseApp } from 'es-uikit'

export default function Main() {
    const webimAuth = sessionStorage.getItem('webim_auth') && JSON.parse(sessionStorage.getItem("webim_auth"))
    const { agoraId, accessToken } = webimAuth
    useEffect(() => {

        if (webimAuth && WebIM.conn.logout) {
            let webimAuthObj = JSON.parse(webimAuth)
            loginWithToken(webimAuthObj.agoraId, webimAuthObj.accessToken)
        }
    }, [])

    // const onClickSessionItem = () =>{
    //     let session = {
    //         sessionType: "singleChat",
    //         sessionId: "qw10",
    //     };
    //     EaseApp.onClickSession(session);
    // }
    return (
        <div className='main-container'>
            <EaseApp 
                appkey={'61308276#489779'}
                username={agoraId}
                agoraToken={accessToken}
                chatType={'singleChat'}
                // // chatType="singleChat"
            header={<Header />}/>
        </div>
    )
}