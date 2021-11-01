import React, { useState } from 'react'
import './login.css'
import i18next from "i18next";
export default function Login() {
    const [notice, setNotice] = useState({
        show: false,
        text: 'slidjio dasioud ao diosau djio dasioud ao diosau'
    })

    const [buttonText, setButtonText] = useState(i18next.t('login-Login'))
    return (
        <div className='login-container'>
            <div className='login-form'>
                <div className='login-form-icon'></div>
                <div className='login-form-AC'></div>
                {notice.show ? <div className='login-form-notice'>
                    {notice.text}
                </div> : null}
                <input className='login-form-input' placeholder='AgoraID'></input>
                <input className='login-form-input' placeholder={i18next.t('login-NickName')}></input>
                <input type='button' className='login-form-input button' value={buttonText} />
            </div>
            <div className='login-copyright'>
                © 2021 Agora
            </div>
        </div>
    )
}


